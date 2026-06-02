'use client'
import { useState, useRef, useCallback } from 'react'
import { Upload, FileText, X, AlertCircle, CheckCircle } from 'lucide-react'

const MAX_SIZE_MB = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB || '10')

export function UploadZone({ onUpload, loading }) {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)

  const validateFile = (f) => {
    if (!f) return 'No file selected.'
    if (f.type !== 'application/pdf') return 'Please upload a PDF file.'
    if (f.size > MAX_SIZE_MB * 1024 * 1024)
      return `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`
    return null
  }

  const handleFile = useCallback(
    (f) => {
      setError('')
      const err = validateFile(f)
      if (err) {
        setError(err)
        return
      }
      setFile(f)
    },
    []
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(false)
      const f = e.dataTransfer.files[0]
      handleFile(f)
    },
    [handleFile]
  )

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleInput = (e) => {
    const f = e.target.files[0]
    handleFile(f)
  }

  const removeFile = () => {
    setFile(null)
    setError('')
    setProgress(0)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleGenerate = async () => {
    if (!file) return
    setError('')

    // Simulate upload progress
    setProgress(10)
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) {
          clearInterval(progressInterval)
          return 85
        }
        return p + Math.random() * 15
      })
    }, 400)

    try {
      await onUpload(file)
      setProgress(100)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      clearInterval(progressInterval)
      setProgress(0)
    }
  }

  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {!file ? (
        /* Drop zone */
        <div
          className={`drop-zone p-10 text-center cursor-pointer ${dragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload PDF"
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleInput}
            className="hidden"
            aria-label="Choose PDF file"
          />

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float"
            style={{ background: 'linear-gradient(135deg, rgba(61,92,255,0.15), rgba(16,201,123,0.15))' }}
          >
            <Upload size={28} style={{ color: '#3d5cff' }} />
          </div>

          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {dragging ? 'Drop your PDF here!' : 'Upload Your PDF'}
          </h3>
          <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
            Drag & drop or click to browse
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            PDF files only · Max {MAX_SIZE_MB}MB
          </p>

          {/* Supported subjects */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Biology', 'History', 'Physics', 'Law', 'Economics', 'Chemistry'].map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* File selected */
        <div className="card p-6">
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(61, 92, 255, 0.1)' }}
            >
              <FileText size={22} style={{ color: '#3d5cff' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {formatSize(file.size)} · PDF Document
              </p>
            </div>
            <button
              onClick={removeFile}
              disabled={loading}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}
              aria-label="Remove file"
            >
              <X size={15} />
            </button>
          </div>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="mb-4">
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: '4px', background: 'var(--bg-secondary)' }}
              >
                <div
                  className="progress-bar"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                {progress < 90 ? 'Uploading & processing...' : 'AI is generating...'}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              className="flex items-start gap-3 p-3 rounded-xl mb-4 text-sm"
              style={{ background: 'rgba(244, 63, 94, 0.08)', color: '#f43f5e' }}
            >
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                ✨ Generate Study Materials
              </>
            )}
          </button>
        </div>
      )}

      {/* Error (no file selected) */}
      {error && !file && (
        <div
          className="flex items-center gap-3 p-3 rounded-xl mt-4 text-sm"
          style={{ background: 'rgba(244, 63, 94, 0.08)', color: '#f43f5e' }}
        >
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  )
}
