// src/pages/SummaryHistory.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

type HistoryItem = {
  summary: string
  keywords: string[]
}

const SummaryHistory = ({
  setSummary,
  darkMode,
}: {
  setSummary: (val: string) => void
  darkMode: boolean
}) => {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('summary_history')
    if (stored) {
      try {
        const parsed: HistoryItem[] = JSON.parse(stored)
        setHistory(parsed)
      } catch (err) {
        console.error('Error parsing history:', err)
      }
    }
  }, [])

  const handleReUse = (item: HistoryItem) => {
    localStorage.setItem('book_summary', item.summary)
    localStorage.setItem('book_keywords', JSON.stringify(item.keywords))
    setSummary(item.summary)
    navigate('/summary')
  }

  const handleDelete = (index: number) => {
    const newHistory = [...history]
    newHistory.splice(index, 1)
    setHistory(newHistory)
    localStorage.setItem('summary_history', JSON.stringify(newHistory))
  }

  const clearAll = () => {
    localStorage.removeItem('summary_history')
    setHistory([])
  }

  const containerStyle = {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: darkMode ? '#0f172a' : '#f9fafb',
    color: darkMode ? '#f8fafc' : '#1e293b',
    transition: 'all 0.4s ease',
  }

  const cardStyle = {
    backgroundColor: darkMode ? '#1e293b' : '#fff',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: darkMode
      ? '0 2px 10px rgba(0,0,0,0.3)'
      : '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  }

  const buttonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  }

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>🕘 Summary History</h1>
        {history.length === 0 ? (
          <p>No history available.</p>
        ) : (
          history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <p style={{ whiteSpace: 'pre-wrap', marginBottom: '0.8rem' }}>
                <b>Summary:</b> {item.summary}
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => handleReUse(item)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    flex: 1,
                  }}
                >
                  🔁 Re-use
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    flex: 1,
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </motion.div>
          ))
        )}

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button
            onClick={clearAll}
            style={{ ...buttonStyle, backgroundColor: '#e11d48', color: '#fff', flex: 1 }}
          >
            🧹 Clear All History
          </button>
          <button
            onClick={() => navigate('/')}
            style={{ ...buttonStyle, backgroundColor: '#10b981', color: '#fff', flex: 1 }}
          >
            🏠 Home
          </button>
          <button
            onClick={() => navigate('/upload')}
            style={{ ...buttonStyle, backgroundColor: '#3b82f6', color: '#fff', flex: 1 }}
          >
            🔙 Back to Upload
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default SummaryHistory
