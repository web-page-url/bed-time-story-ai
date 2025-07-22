import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Bedtime Story AI - Create magical personalized bedtime stories for children'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: '120px',
              marginBottom: '20px',
            }}
          >
            📚✨
          </div>
          
          {/* Title */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Bedtime Story AI
          </h1>
          
          {/* Subtitle */}
          <p
            style={{
              fontSize: '32px',
              margin: '0 0 30px 0',
              opacity: 0.9,
              maxWidth: '800px',
            }}
          >
            Create magical personalized bedtime stories for children
          </p>
          
          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              fontSize: '24px',
              opacity: 0.8,
            }}
          >
            <span>🎨 Personalized</span>
            <span>🤖 AI-Powered</span>
            <span>🌙 Bedtime Ready</span>
          </div>
        </div>
        
        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '20px',
            opacity: 0.7,
          }}
        >
          Created with ❤️ by Anubhav
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}