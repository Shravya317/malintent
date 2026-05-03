import { useEffect, useRef } from 'react'

/* Multi-layer donut gauge with rotating dot ring */
export default function HealthGauge() {
  const dotCount = 12
  const outerRadius = 58
  const value = 99.7

  return (
    <div
      style={{
        borderRadius: '24px',
        background: 'var(--surface)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
        animation: 'float-slow 7s ease-in-out infinite',
      }}
    >
      {/* Scan line */}
      <div className="scan-line" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: 400,
          color: 'var(--text-primary)',
          margin: '0 0 16px',
          position: 'relative',
        }}
      >
        Firewall Health
      </h3>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0', position: 'relative' }}>
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <svg width={140} height={140} viewBox="0 0 140 140">
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            {/* Inner decorative ring */}
            <circle
              cx="70"
              cy="70"
              r="44"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="4"
              strokeDasharray="4 6"
            />
            {/* Main value arc */}
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="none"
              stroke="url(#healthGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${value * 3.267} ${326.7}`}
              transform="rotate(-90 70 70)"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0, 212, 170, 0.4))',
                transition: 'stroke-dasharray 1s ease',
              }}
            />
            {/* Outer decorative ring */}
            <circle
              cx="70"
              cy="70"
              r="60"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="2 8"
            />
            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00d4aa" />
                <stop offset="100%" stopColor="#00e6bb" />
              </linearGradient>
            </defs>
          </svg>

          {/* Rotating dots ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              animation: 'spinSlow 30s linear infinite',
            }}
          >
            {Array.from({ length: dotCount }).map((_, i) => {
              const angle = (i / dotCount) * 360 - 90
              const rad = (angle * Math.PI) / 180
              const x = 70 + outerRadius * Math.cos(rad)
              const y = 70 + outerRadius * Math.sin(rad)
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: x - 2,
                    top: y - 2,
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: i < dotCount * (value / 100)
                      ? '#00d4aa'
                      : 'rgba(255,255,255,0.1)',
                    boxShadow: i < dotCount * (value / 100)
                      ? '0 0 6px rgba(0,212,170,0.5)'
                      : 'none',
                    transition: 'all 0.3s',
                  }}
                />
              )
            })}
          </div>

          {/* Center text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}
            >
              {value}%
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--text-muted)',
                marginTop: 4,
              }}
            >
              Uptime
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginTop: 16,
          position: 'relative',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '10px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: '#00e6bb',
              margin: 0,
            }}
          >
            0
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              margin: '2px 0 0',
            }}
          >
            False Pos
          </p>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '10px',
            borderRadius: '14px',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: '#ffc04d',
              margin: 0,
            }}
          >
            2
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              margin: '2px 0 0',
            }}
          >
            Warnings
          </p>
        </div>
      </div>
    </div>
  )
}
