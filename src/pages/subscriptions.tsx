import { useState } from 'react'
import { members as mockMembers, sports as mockSports } from '../mock/data'
import SubscribeForm from '../components/SubscribeForm'
import SubscriptionList from '../components/SubscriptionList'

type Subscription = {
  id: number
  memberId: number
  sportId: number
  memberName: string
  sportName: string
  subscriptionDate: string
}

export default function SubscriptionsPage() {
  const [members] = useState(mockMembers)
  const [sports] = useState(mockSports)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  const handleSubscribe = (memberId: number, sportIds: number[]) => {
    const member = members.find(m => m.id === memberId)
    if (!member) return

    const newSubscriptions: Subscription[] = []
    
    sportIds.forEach(sportId => {
      const sport = sports.find(s => s.id === sportId)
      if (!sport) return

      // Check if already subscribed
      const alreadySubscribed = subscriptions.some(
        sub => sub.memberId === memberId && sub.sportId === sportId
      )
      
      if (!alreadySubscribed) {
        const newSubscription: Subscription = {
          id: Date.now() + Math.random(), // Simple ID generation
          memberId,
          sportId,
          memberName: member.name,
          sportName: sport.name,
          subscriptionDate: new Date().toLocaleDateString()
        }
        newSubscriptions.push(newSubscription)
      }
    })

    if (newSubscriptions.length > 0) {
      setSubscriptions(prev => [...prev, ...newSubscriptions])
    }
  }

  const handleUnsubscribe = (subscriptionId: number) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== subscriptionId))
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
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              📋
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
                Subscriptions Management
              </h1>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                margin: 0
              }}>
                Subscribe members to sports activities
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
          {/* Subscribe Form */}
          <SubscribeForm 
            members={members}
            sports={sports}
            subscriptions={subscriptions}
            onSubscribe={handleSubscribe}
          />

          {/* Subscriptions List */}
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
                background: 'linear-gradient(135deg, #a5b4fc, #c7d2fe)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📝
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>
                Active Subscriptions ({subscriptions.length})
              </h2>
            </div>
            
            <SubscriptionList 
              subscriptions={subscriptions}
              onUnsubscribe={handleUnsubscribe}
            />
          </div>
        </div>
      </div>
    </div>
  )
}