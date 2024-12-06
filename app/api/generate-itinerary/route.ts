import { GoogleGenerativeAI } from '@google/generative-ai'
import { auth } from '@clerk/nextjs'
import { PrismaClient } from '@prisma/client'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing Gemini API key')
}

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn']
})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: `${userId}@clerk.com`,
        name: userId
      },
    })

    const { duration, interests, budget, currentCity, destinationCity, includeHiddenGems } = await req.json()

    const prompt = `Create a detailed ${duration}-day travel itinerary for ${destinationCity}, considering arrival from ${currentCity}. Budget: ${budget}/day.
Focus areas: ${interests.join(', ')}.

Format each day's activities exactly as follows (3 activities per day):

Day 1:
1. Activity Name (no asterisks or special characters)
Time: [specific time]
Cost: [amount in INR]
Transport: [how to get there]
Description: [brief description]
Food Nearby: [specific restaurants]
Tips: [practical advice]

[Repeat format for activities 2 and 3]
[Repeat for remaining days]

Important:
- First day must include arrival and check-in details from ${currentCity}
- Include exact costs for travel, food, and activities
- ${includeHiddenGems ? 'Prioritize hidden gems and local experiences' : ''}
- Keep each activity within budget
- Do not use any asterisks (*) or special characters`

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    if (!text) {
      throw new Error('No response from AI')
    }

    console.log('AI Response:', text) // Debug log

    const itinerary = await prisma.itinerary.create({
      data: {
        userId,
        name: `${duration}-day ${destinationCity} Adventure`,
        duration: parseInt(duration),
        budget,
        interests,
        currentCity,
        destinationCity,
      },
    })

    const days = text.split(/Day \d+:/gi)
      .filter(Boolean)
      .map(day => day.trim())

    console.log('Days split:', days.length) // Debug log

    for (let dayIndex = 0; dayIndex < Math.min(days.length, parseInt(duration)); dayIndex++) {
      const dayContent = days[dayIndex]
      const activities = dayContent
        .split(/(?:Activity \d+:|^\d+\.)/gm)
        .filter(Boolean)
        .map(activity => activity.trim())
        .slice(0, 3) // Limit to 3 activities per day

      console.log(`Day ${dayIndex + 1} activities:`, activities.length) // Debug log

      for (let activityIndex = 0; activityIndex < activities.length; activityIndex++) {
        const activity = activities[activityIndex]
        const sections = activity.split(/\n(?=[A-Za-z]+:)/).filter(Boolean)
        
        if (sections.length < 2) continue // Skip invalid activities

        const name = sections[0]
          .replace(/^[^a-zA-Z]+/, '')  // Remove leading non-letters
          .replace(/\*+/g, '')         // Remove asterisks
          .replace(/\s+/g, ' ')        // Normalize spaces
          .trim()
        const description = sections
          .slice(1)
          .map(s => {
            const [key, ...valueParts] = s.split(':')
            return `${key.trim()}: ${valueParts.join(':').trim()}`
          })
          .join('\n')

        console.log(`Creating place for Day ${dayIndex + 1}:`, {
          name,
          description,
          day: dayIndex + 1,
          order: activityIndex + 1
        })

        await prisma.place.create({
          data: {
            name,
            description,
            itineraryId: itinerary.id,
            day: dayIndex + 1,
            order: activityIndex + 1,
          },
        })
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      itineraryId: itinerary.id,
      text 
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('API route error:', error)
    return new Response('Error processing request', { status: 500 })
  }
}

