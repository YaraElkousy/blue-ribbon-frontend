import { useState } from 'react'
import { members as mockMembers } from '../mock/data'
import AddMemberForm from '../components/AddMemberForm'
import MemberList from '../components/MemberList'

type Member = { 
  id: number; 
  name: string; 
  email: string; 
  sports: string[]; 
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(mockMembers)

  // Updated to handle just name and generate a placeholder email
  const handleAddMember = (newName: string) => {
    const alreadyExists = members.some(
      (m) => m.name.toLowerCase() === newName.toLowerCase()
    )
    if (alreadyExists) {
      alert("Member already exists.")
      return
    }

    const newEntry: Member = { 
      id: members.length + 1, 
      name: newName,
      email: `${newName.toLowerCase().replace(/\s+/g, '.')}@club.com`, // Generate placeholder email
      sports: [] // Start with no sports subscriptions
    }
    setMembers([...members, newEntry])
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
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
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              👥
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
                Members Management
              </h1>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                margin: 0
              }}>
                Manage club members and memberships
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
          {/* Members Section */}
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
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                👥
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>
                Club Members
              </h2>
            </div>
            
            <MemberList members={members} />
          </div>

          {/* Add Member Form */}
          <AddMemberForm onAdd={handleAddMember} />
        </div>
      </div>
    </div>
  )
}