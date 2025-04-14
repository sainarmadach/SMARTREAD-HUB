// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { countWords, estimateReadingTime } from '../utils/stats'

// const SummaryPage = ({
//   summary,
//   darkMode
// }: {
//   summary: string
//   darkMode: boolean
// }) => {
//   const navigate = useNavigate()
//   const wordCount = countWords(summary)
//   const readTime = estimateReadingTime(summary)

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(summary)
//     alert('📋 Summary copied to clipboard!')
//   }

//   const handleDownload = () => {
//     const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' })
//     const link = document.createElement('a')
//     link.href = URL.createObjectURL(blob)
//     link.download = 'summary.txt'
//     link.click()
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       style={{
//         padding: '2rem',
//         maxWidth: '800px',
//         margin: '0 auto',
//         color: darkMode ? '#e2e8f0' : '#0f172a'
//       }}
//     >
//       <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄 Summary</h1>

//       <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: darkMode ? '#94a3b8' : '#555' }}>
//         <strong>🧮 {wordCount} words</strong> • <strong>⏱️ {readTime}</strong>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.5 }}
//         style={{
//           background: darkMode ? '#1e293b' : '#fff',
//           border: '1px solid #ddd',
//           padding: '1rem',
//           borderRadius: '8px',
//           whiteSpace: 'pre-wrap',
//           lineHeight: '1.6',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//         }}
//       >
//         {summary || 'No summary found!'}
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
//       >
//         <AnimatedButton onClick={() => navigate('/')}>🔁 Summarize Another</AnimatedButton>
//         <AnimatedButton onClick={handleCopy}>📋 Copy</AnimatedButton>
//         <AnimatedButton onClick={handleDownload}>💾 Download .txt</AnimatedButton>
//       </motion.div>
//     </motion.div>
//   )
// }

// const AnimatedButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
//   return (
//     <motion.button
//       onClick={onClick}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       style={{
//         padding: '0.5rem 1rem',
//         backgroundColor: '#6366f1',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer'
//       }}
//     >
//       {children}
//     </motion.button>
//   )
// }

// export default SummaryPage


import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { countWords, estimateReadingTime } from '../utils/stats'

const SummaryPage = () => {
  const navigate = useNavigate()

  const summary = localStorage.getItem('book_summary') || ''
  const keywords = JSON.parse(localStorage.getItem('book_keywords') || '[]')

  const wordCount = countWords(summary)
  const readTime = estimateReadingTime(summary)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary)
    alert('📋 Summary copied to clipboard!')
  }

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'summary.txt'
    link.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        color: 'inherit'
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄 Summary</h1>

      <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#888' }}>
        <strong>🧮 {wordCount} words</strong> • <strong>⏱️ {readTime}</strong>
      </div>

      {keywords.length > 0 && (
        <div style={{ marginBottom: '1rem', fontSize: '1rem' }}>
          <strong>🧠 Keywords:</strong>{' '}
          <span style={{ color: '#10b981' }}>
            {keywords.join(', ')}
          </span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid #ccc',
          padding: '1.2rem',
          borderRadius: '12px',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.7',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {summary}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
      >
        <AnimatedButton onClick={() => navigate('/')}>🔁 Summarize Another</AnimatedButton>
        <AnimatedButton onClick={handleCopy}>📋 Copy</AnimatedButton>
        <AnimatedButton onClick={handleDownload}>💾 Download .txt</AnimatedButton>
      </motion.div>
    </motion.div>
  )
}

const AnimatedButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: '0.6rem 1rem',
        backgroundColor: '#6366f1',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 500
      }}
    >
      {children}
    </motion.button>
  )
}

export default SummaryPage

