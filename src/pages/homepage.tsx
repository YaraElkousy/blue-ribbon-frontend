import { useRouter } from 'next/router'

export default function HomePage() {
  const router = useRouter()

  const navigationCards = [
    {
      title: 'Sports Management',
      description: 'View and manage available sports activities',
      icon: '🏆',
      color: 'linear-gradient(135deg, #3b82f6, #4f46e5)',
      path: '/sports',
      stats: 'Manage sports catalog'
    },
    {
      title: 'Members Directory',
      description: 'View and add new club members',
      icon: '👥',
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      path: '/members',
      stats: 'Member management'
    },
    {
      title: 'Subscriptions',
      description: 'Subscribe members to sports activities',
      icon: '📋',
      color: 'linear-gradient(135deg, #10b981, #059669)',
      path: '/subscriptions',
      stats: 'Manage subscriptions'
    }
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%)',
      padding: '0'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 24px'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
              fontSize: '32px'
            }}>
              🏅
            </div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #111827, #4b5563)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              margin: '0 0 16px 0',
              letterSpacing: '-0.02em'
            }}>
              Sports Club Manager
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#6b7280',
              margin: 0,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6
            }}>
              Manage your sports club with ease. Handle sports, members, and subscriptions all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          {navigationCards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(card.path)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}
            >
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: card.color,
                borderRadius: '50%',
                opacity: 0.1,
                transform: 'translate(40px, -40px)'
              }}></div>

              {/* Card content */}
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: card.color,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                  }}>
                    {card.icon}
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#111827',
                      margin: '0 0 4px 0'
                    }}>
                      {card.title}
                    </h2>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      {card.stats}
                    </p>
                  </div>
                </div>

                <p style={{
                  fontSize: '16px',
                  color: '#4b5563',
                  lineHeight: 1.6,
                  margin: '0 0 24px 0'
                }}>
                  {card.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#6366f1',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  <span>Get started</span>
                  <span style={{
                    transition: 'transform 0.2s ease'
                  }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}