type Subscription = {
    id: number
    memberId: number
    sportId: number
    memberName: string
    sportName: string
    subscriptionDate: string
  }
  
  type Props = {
    subscriptions: Subscription[]
    onUnsubscribe: (subscriptionId: number) => void
  }
  
  export default function SubscriptionList({ subscriptions, onUnsubscribe }: Props) {
    // Group subscriptions by member
    const subscriptionsByMember = subscriptions.reduce((acc, sub) => {
      if (!acc[sub.memberId]) {
        acc[sub.memberId] = {
          memberName: sub.memberName,
          subscriptions: []
        }
      }
      acc[sub.memberId].subscriptions.push(sub)
      return acc
    }, {} as Record<number, { memberName: string; subscriptions: Subscription[] }>)
  
    if (subscriptions.length === 0) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
          textAlign: 'center',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#f3f4f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            fontSize: '24px'
          }}>
            📋
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            No subscriptions yet
          </h3>
          <p style={{
            color: '#6b7280',
            margin: 0
          }}>
            Subscribe members to sports to see them here!
          </p>
        </div>
      )
    }
  
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {Object.entries(subscriptionsByMember).map(([memberId, data]) => (
          <div
            key={memberId}
            style={{
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Member Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid #f3f4f6'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #a5b4fc, #c7d2fe)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                👤
              </div>
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: '0 0 4px 0'
                }}>
                  {data.memberName}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {data.subscriptions.length} sport{data.subscriptions.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
  
            {/* Sports List */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              {data.subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'linear-gradient(135deg, #dbeafe, #e0e7ff)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #a5b4fc, #c7d2fe)',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px'
                    }}>
                      🏆
                    </div>
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#065f46',
                        margin: '0 0 2px 0'
                      }}>
                        {subscription.sportName}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        Subscribed: {subscription.subscriptionDate}
                      </p>
                    </div>
                  </div>
  
                  <button
                    onClick={() => onUnsubscribe(subscription.id)}
                    style={{
                      padding: '6px 12px',
                      background: 'linear-gradient(135deg, #991b1b, #7f1d1d)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #7f1d1d, #6b1d1d)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #991b1b, #7f1d1d)'
                      }}
                  >
                    <span>❌</span>
                    Unsubscribe
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }