import { useState } from 'react'

type Member = { id: number; name: string; email: string }
type Sport = { id: number; name: string }
type Subscription = { memberId: number; sportId: number }

type Props = {
  members: Member[]
  sports: Sport[]
  subscriptions: any[] // existing subscriptions to check duplicates
  onSubscribe: (memberId: number, sportIds: number[]) => void
}

export default function SubscribeForm({ members, sports, subscriptions, onSubscribe }: Props) {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [selectedSports, setSelectedSports] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSportToggle = (sportId: number) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    )
  }

  const handleSubmit = async () => {
    if (!selectedMember || selectedSports.length === 0) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onSubscribe(selectedMember, selectedSports)
    
    // Reset form
    setSelectedMember(null)
    setSelectedSports([])
    setIsSubmitting(false)
  }

  const getAvailableSports = () => {
    if (!selectedMember) return sports
    
    return sports.filter(sport => {
      const isAlreadySubscribed = subscriptions.some(
        sub => sub.memberId === selectedMember && sub.sportId === sport.id
      )
      return !isAlreadySubscribed
    })
  }

  const availableSports = getAvailableSports()
  const selectedMemberData = members.find(m => m.id === selectedMember)

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
          background: 'linear-gradient(135deg, #10b981, #059669)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          📋
        </div>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            margin: '0 0 4px 0'
          }}>
            Subscribe Member to Sports
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Select a member and choose sports to subscribe them to
          </p>
        </div>
      </div>

      {/* Member Selection */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Select Member
        </label>
        <select
          value={selectedMember || ''}
          onChange={(e) => {
            const value = e.target.value
            setSelectedMember(value ? parseInt(value) : null)
            setSelectedSports([]) // Reset sports when member changes
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          <option value="">Choose a member...</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>
              {member.name} ({member.email})
            </option>
          ))}
        </select>
      </div>

      {/* Sports Selection */}
      {selectedMember && (
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Select Sports ({selectedSports.length} selected)
          </label>
          
          {availableSports.length === 0 ? (
            <div style={{
              padding: '16px',
              background: '#fef3c7',
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              color: '#92400e'
            }}>
              {selectedMemberData?.name} is already subscribed to all available sports!
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              {availableSports.map(sport => (
                <div
                  key={sport.id}
                  onClick={() => handleSportToggle(sport.id)}
                  style={{
                    padding: '12px 16px',
                    border: selectedSports.includes(sport.id) 
                      ? '2px solid #10b981' 
                      : '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: selectedSports.includes(sport.id) 
                      ? '#ecfdf5' 
                      : 'white',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: selectedSports.includes(sport.id) 
                      ? '2px solid #10b981' 
                      : '2px solid #d1d5db',
                    background: selectedSports.includes(sport.id) 
                      ? '#10b981' 
                      : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    color: 'white'
                  }}>
                    {selectedSports.includes(sport.id) && '✓'}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: selectedSports.includes(sport.id) ? '#059669' : '#374151'
                  }}>
                    {sport.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !selectedMember || selectedSports.length === 0}
        style={{
          width: '100%',
          padding: '12px 24px',
          background: isSubmitting || !selectedMember || selectedSports.length === 0
            ? '#9ca3af' 
            : 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          fontWeight: '500',
          borderRadius: '8px',
          border: 'none',
          cursor: isSubmitting || !selectedMember || selectedSports.length === 0 
            ? 'not-allowed' 
            : 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '16px'
        }}
      >
        {isSubmitting ? (
          <>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            Processing...
          </>
        ) : (
          <>
            <span>📋</span>
            Subscribe to {selectedSports.length} sport{selectedSports.length !== 1 ? 's' : ''}
          </>
        )}
      </button>

      {/* Helper text */}
      {selectedMember && availableSports.length > 0 && (
        <p style={{
          fontSize: '12px',
          color: '#9ca3af',
          marginTop: '12px',
          marginBottom: 0,
          textAlign: 'center'
        }}>
          Select one or more sports for {selectedMemberData?.name}
        </p>
      )}
      
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