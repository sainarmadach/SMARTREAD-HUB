// UploadForm.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  setSummary: (val: string) => void
  darkMode: boolean
}

const UploadForm = ({ setSummary, darkMode }: Props) => {
  const [mode, setMode] = useState<'pdf' | 'text' | 'url'>('pdf')
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [summaryMode, setSummaryMode] = useState('full')
  const [length, setLength] = useState('medium')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let response

      if (mode === 'pdf') {
        if (!file) return alert('Upload a PDF file.')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('mode', summaryMode)
        formData.append('length', length)
        formData.append('language', 'en')
        response = await fetch('http://127.0.0.1:8000/summarize', {
          method: 'POST',
          body: formData,
        })
      } else {
        const payload = {
          mode: summaryMode,
          length,
          language: 'en',
          ...(mode === 'text' ? { text } : { url }),
        }

        const endpoint =
          mode === 'text'
            ? 'http://127.0.0.1:8000/summarize-text'
            : 'http://127.0.0.1:8000/summarize-url'

        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (!response || !response.ok) {
        const errorText = await response.text()
        throw new Error(`❌ Request failed: ${errorText}`)
      }

      const data = await response.json()
      setSummary(data.summary)
      localStorage.setItem('book_summary', data.summary)
      localStorage.setItem('book_keywords', JSON.stringify(data.keywords || []))

      const history = JSON.parse(localStorage.getItem('summary_history') || '[]')
      const newEntry = { summary: data.summary, keywords: data.keywords || [] }
      localStorage.setItem('summary_history', JSON.stringify([newEntry, ...history.slice(0, 9)]))

      navigate('/summary')
    } catch (err: any) {
      console.error('❌ Submit error:', err)
      alert('Something went wrong!\n' + (err.message || err))
    } finally {
      setIsLoading(false)
    }
  }

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '0.3rem',
    color: darkMode ? '#e2e8f0' : '#1e293b',
    display: 'block',
  }

  const inputStyle = {
    padding: '0.5rem',
    border: '1px solid',
    borderColor: darkMode ? '#475569' : '#cbd5e1',
    borderRadius: '6px',
    backgroundColor: darkMode ? '#0f172a' : '#fff',
    color: darkMode ? '#e2e8f0' : '#0f172a',
    width: '100%',
    marginBottom: '1rem',
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {['pdf', 'text', 'url'].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m as any)}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: mode === m ? '#3b82f6' : '#e5e7eb',
              color: mode === m ? '#fff' : '#111827',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {m === 'pdf' ? '📁 PDF' : m === 'text' ? '✍️ Paste Text' : '🔗 From URL'}
          </button>
        ))}
      </div>

      {mode === 'pdf' && (
        <>
          <label style={labelStyle}>Choose PDF File:</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={inputStyle}
          />
        </>
      )}

      {mode === 'text' && (
        <>
          <label style={labelStyle}>Paste Your Text:</label>
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ ...inputStyle, fontFamily: 'inherit', resize: 'vertical' }}
          />
        </>
      )}

      {mode === 'url' && (
        <>
          <label style={labelStyle}>Enter a URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={inputStyle}
          />
        </>
      )}

      <label style={labelStyle}>Summary Mode:</label>
      <select
        value={summaryMode}
        onChange={(e) => setSummaryMode(e.target.value)}
        style={inputStyle}
      >
        <option value="full">Full</option>
        <option value="chapter">Chapter</option>
        <option value="bullet">Bullet Points</option>
      </select>

      <label style={labelStyle}>Summary Length:</label>
      <select
        value={length}
        onChange={(e) => setLength(e.target.value)}
        style={inputStyle}
      >
        <option value="short">Short</option>
        <option value="medium">Medium</option>
        <option value="detailed">Detailed</option>
      </select>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: isLoading ? '#93c5fd' : '#3b82f6',
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {isLoading ? 'Summarizing...' : 'Summarize'}
      </button>
    </form>
  )
}

export default UploadForm
