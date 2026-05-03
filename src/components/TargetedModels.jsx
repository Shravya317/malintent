/* Diagonal staircase layout for Top Targeted Models */
export default function TargetedModels() {
  const models = [
    { model: 'GPT-4o', attacks: 523, pct: 42 },
    { model: 'Claude 3.5 Sonnet', attacks: 312, pct: 25 },
    { model: 'Gemini Pro', attacks: 198, pct: 16 },
    { model: 'Llama 3.1 70B', attacks: 128, pct: 10 },
    { model: 'Mixtral 8x7B', attacks: 86, pct: 7 },
  ]

  const maxAttacks = Math.max(...models.map(m => m.attacks))

  return (
    <div
      style={{
        borderRadius: '24px',
        background: 'var(--surface)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        padding: 24,
        animation: 'float-delayed 6s ease-in-out 0.5s infinite',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.1rem',
          fontWeight: 400,
          color: 'var(--text-primary)',
          margin: '0 0 20px',
        }}
      >
        Top Targeted Models
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {models.map((item, i) => (
          <div
            key={item.model}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginLeft: i * 8,
              marginTop: i > 0 ? 4 : 0,
              padding: '10px 14px',
              borderRadius: '14px',
              background: i === 0 ? 'rgba(255,45,85,0.06)' : 'transparent',
              border: i === 0 ? '1px solid rgba(255,45,85,0.1)' : '1px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            {/* Vertical volume bar */}
            <div
              style={{
                width: 4,
                height: 32,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.06)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${(item.attacks / maxAttacks) * 100}%`,
                  borderRadius: 2,
                  background: i === 0 ? '#ff2d55' : i === 1 ? '#ff4d6f' : '#3b82f6',
                  transition: 'height 1s ease',
                }}
              />
            </div>

            {/* Model name */}
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                flex: 1,
              }}
            >
              {item.model}
            </span>

            {/* Attack count */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}
            >
              {item.attacks}
            </span>

            {/* Percentage pill */}
            <span
              style={{
                padding: '3px 8px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.05)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
              }}
            >
              {item.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
