import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
import SummaryPage from './pages/SummaryPage'
import SummaryHistory from './pages/SummaryHistory'

const App = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [summary, setSummary] = useState('')

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#0f172a' : '#f9fafb'
    document.body.style.color = darkMode ? '#f8fafc' : '#111827'
  }, [darkMode])

  return (
    <>
      <button
        onClick={() => setDarkMode(prev => !prev)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: darkMode ? '#334155' : '#e2e8f0',
          color: darkMode ? '#f8fafc' : '#0f172a',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 999,
        }}
      >
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage setSummary={setSummary} darkMode={darkMode} />} />
        <Route path="/summary" element={<SummaryPage summary={summary} darkMode={darkMode} />} />
        <Route path="/history" element={<SummaryHistory setSummary={setSummary} darkMode={darkMode} />} />
      </Routes>
    </>
  )
}

export default App
