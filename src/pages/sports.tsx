import { useState } from 'react'
import { sports as mockSports } from '../mock/data'
import AddSportForm from '../components/AddSportForm'
import SportList from '../components/SportList'

export default function SportsPage() {
  const [sports, setSports] = useState(mockSports)

  const handleAddSport = (newSport: string) => {
    const alreadyExists = sports.some(
      (s) => s.name.toLowerCase() === newSport.toLowerCase()
    )
    if (alreadyExists) {
      alert("Sport already exists.")
      return
    }

    const newEntry = { id: sports.length + 1, name: newSport }
    setSports([...sports, newEntry])
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%)',
      padding: '0'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              ⚡
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #111827, #6b7280)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                margin: 0
              }}>
                Sports Management
              </h1>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                margin: 0
              }}>
                Manage and organize sports activities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Sports Section */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #3b82f6, #4f46e5)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                🏆
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>
                Available Sports
              </h2>
            </div>
            
            <SportList sports={sports} />
          </div>

          {/* Add Sport Form */}
          <AddSportForm onAdd={handleAddSport} />
        </div>
      </div>
    </div>
  )
}