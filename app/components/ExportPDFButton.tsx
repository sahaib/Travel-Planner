 'use client'

import { FaFileDownload } from 'react-icons/fa'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ExportPDFButton({ itinerary }) {
  const exportToPDF = async () => {
    const element = document.getElementById('itinerary-content')
    if (!element) return

    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`${itinerary.name}.pdf`)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={exportToPDF}
      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
    >
      <FaFileDownload />
      Export PDF
    </motion.button>
  )
}