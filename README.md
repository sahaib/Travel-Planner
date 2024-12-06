# 🌟 India Travel Planner

An AI-powered travel itinerary generator for exploring India's diverse destinations.

## 🚀 Features

- 🤖 AI-powered itinerary generation using Gemini Pro
- 🗺️ Interactive map of Indian states and attractions
- 📅 Personalized travel plans based on:
  - Duration
  - Budget
  - Interests
  - Current and destination cities
- 🎯 Hidden gems and local experiences
- 📱 Responsive design for all devices
- 🔐 Secure authentication with Clerk
- 💾 PostgreSQL database with Prisma ORM

## 🛠️ Tech Stack

- **Frontend:**
  - Next.js 14
  - React
  - Tailwind CSS
  - Framer Motion
  - React Icons

- **Backend:**
  - Node.js
  - Prisma
  - PostgreSQL
  - Google Gemini AI API

- **Authentication:**
  - Clerk

## 🏗️ Project Structure

```
india-travel-planner/
├── app/
│ ├── api/
│ ├── components/
│ ├── dashboard/
│ ├── itinerary/
│ └── ...
├── prisma/
├── public/
└── lib/
```

## 🚦 Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/india-travel-planner.git
    cd india-travel-planner
    ``` 

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file based on the `.env.example` file.
    - Obtain the necessary API keys and set them in the `.env` file.

4. Configure your environment variables:
```
POSTGRES_PRISMA_URL=
GEMINI_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

5. Run Prisma migrations:
```
npx prisma migrate dev

```

6. Start the development server:
```
npm run dev
```


## 🌐 Environment Variables

- `POSTGRES_PRISMA_URL`: PostgreSQL database connection URL
- `GEMINI_API_KEY`: Google Gemini AI API key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `CLERK_SECRET_KEY`: Clerk secret key

## 📝 API Routes

- `POST /api/generate-itinerary`: Generates a personalized travel itinerary
- Authentication routes handled by Clerk

## 🔒 Authentication

This project uses Clerk for authentication with the following routes protected:
```
typescript:middleware.ts
```


## 💡 Key Components

- **Hero**: Dynamic landing page with parallax effect
- **InteractiveMap**: SVG-based clickable map of Indian states
- **PreferencesForm**: User input form for travel preferences
- **PopularDestinations**: Image carousel of featured locations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- Images from Unsplash
- Icons from React Icons
- Indian destinations and attractions data

## 📧 Contact

For any queries or suggestions, please reach out through the contact form on the website or create an issue in the repository.
