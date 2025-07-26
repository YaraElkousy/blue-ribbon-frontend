import { useState } from 'react'

type Props = {
  onAdd: (name: string) => void
}

export default function AddSportForm({ onAdd }: Props) {
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim()) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    onAdd(name)
    setName("")
    setIsSubmitting(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Form Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, #3b82f6, #4f46e5)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          ➕
        </div>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 4px 0'
          }}>
            Add New Sport
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Create a new sport for your club
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div style={{
        display: 'flex',
        gap: '12px'
      }}>
        <input
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            outline: 'none',
            backgroundColor: isSubmitting ? '#f9fafb' : 'white'
          }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter sport name..."
          disabled={isSubmitting}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6'
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !name.trim()}
          style={{
            padding: '12px 24px',
            background: isSubmitting || !name.trim() 
              ? '#9ca3af' 
              : 'linear-gradient(135deg, #3b82f6, #4f46e5)',
            color: 'white',
            fontWeight: '500',
            borderRadius: '8px',
            border: 'none',
            cursor: isSubmitting || !name.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: '100px',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting && name.trim()) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #4338ca)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting && name.trim()) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6, #4f46e5)'
            }
          }}
        >
          {isSubmitting ? (
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          ) : (
            <>
              <span>➕</span>
              <span>Add</span>
            </>
          )}
        </button>
      </div>

      {/* Helper text */}
      <p style={{
        fontSize: '12px',
        color: '#9ca3af',
        marginTop: '12px',
        marginBottom: 0
      }}>
        Press Enter or click Add to create a new sport
      </p>
      
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}