// src/pages/UploadPage.tsx
import React from 'react'
import UploadForm from '../components/UploadForm'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const UploadPage = ({
  setSummary,
  darkMode,
}: {
  setSummary: (val: string) => void
  darkMode: boolean
}) => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #0f172a, #1e293b, #334155)'
          : 'linear-gradient(135deg, #e0f2fe, #f0f9ff, #ffffff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        transition: 'all 0.5s ease',
        backgroundAttachment: 'fixed',
        backgroundSize: '400% 400%',
        animation: 'gradientMotion 12s ease infinite',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: darkMode ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '2rem 3rem',
          boxShadow: darkMode
            ? '0 8px 32px rgba(0, 0, 0, 0.4)'
            : '0 12px 24px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
          transition: 'all 0.3s ease'
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: darkMode ? '#60a5fa' : '#2563eb',
          }}
        >
          SmartRead Hub
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: darkMode ? '#cbd5e1' : '#334155',
            marginBottom: '2rem',
          }}
        >
          Upload a book, paste text, or enter a URL to generate a smart summary.
        </p>

        <UploadForm setSummary={setSummary} darkMode={darkMode} />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: darkMode ? '#334155' : '#f3f4f6',
              color: darkMode ? '#f8fafc' : '#1f2937',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            🏠 Home
          </button>
          <button
            onClick={() => navigate('/history')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            📜 View History
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default UploadPage
