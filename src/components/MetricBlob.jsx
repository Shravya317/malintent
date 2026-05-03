import { useEffect, useState } from 'react'

const accentColors = {
  red: { main: 'var(--color-threat-400)', glow: 'var(--color-threat-glow)', bg: 'rgba(255,45,85,0.08)' },
  teal: { main: 'var(--color-secure-400)', glow: 'var(--color-secure-glow)', bg: 'rgba(0,212,170,0.08)' },
  amber: { main: 'var(--color-warn-400)', glow: 'var(--color-warn-glow)', bg: 'rgba(255,176,32,0.08)' },
  blue: { main: 'var(--color-info-400)', glow: 'var(--color-info-glow)', bg: 'rgba(59,130,246,0.08)' },
}

export default function MetricBlob({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'teal',
  delay = 0,
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const colors = accentColors[accent] || accentColors.teal

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
        background: 'var(--surface)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        animation: mounted
          ? `float ${3 + delay * 0.3}s ease-in-out ${delay * 150}ms infinite`
          : 'none',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        cursor: 'default',
        minHeight: 180,
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 30px ${colors.glow}, 0 0 80px ${colors.glow}`
        e.currentTarget.style.borderColor = colors.main
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {/* Accent radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(circle at 50% 30%, ${colors.bg} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: colors.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          position: 'relative',
        }}
      >
        <Icon style={{ width: 22, height: 22, color: colors.main }} />
      </div>

      {/* Massive number */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          lineHeight: 1,
          color: 'var(--text-primary)',
          margin: 0,
          position: 'relative',
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </p>

      {/* Title */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          margin: '8px 0 0',
          position: 'relative',
        }}
      >
        {title}
      </p>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            margin: '4px 0 0',
            position: 'relative',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
