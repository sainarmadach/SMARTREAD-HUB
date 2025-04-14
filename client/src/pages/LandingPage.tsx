// src/pages/LandingPage.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0e2431, #153d5c, #1b5e82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f8fafc',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ maxWidth: '800px', width: '100%' }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Welcome to SmartRead Hub
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.5', fontStyle: 'italic' }}>
          Simplify the web with instant summaries. Save time, boost productivity, and get insights at a glance.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/upload')}
          style={{
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  )
}

export default LandingPage
