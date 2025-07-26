type Member = { id: number; name: string }

export default function MemberList({ members }: { members: Member[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    }}>
      {members.map((member) => (
        <div
          key={member.id}
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              👤
            </div>
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 4px 0'
              }}>
                {member.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0
              }}>
                Active member
              </p>
            </div>
          </div>
          
          {/* Member stats or additional info could go here */}
          <div style={{
            marginTop: '16px',
            display: 'flex',
            gap: '8px'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500',
              background: '#dcfce7',
              color: '#166534',
              border: '1px solid #bbf7d0'
            }}>
              Active
            </span>
          </div>
        </div>
      ))}
      
      {/* Empty state */}
      {members.length === 0 && (
        <div style={{
          gridColumn: '1 / -1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            👥
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            No members yet
          </h3>
          <p style={{
            color: '#6b7280',
            margin: 0
          }}>
            Add your first member to get started!
          </p>
        </div>
      )}
    </div>
  )
}