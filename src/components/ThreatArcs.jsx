/* Concentric arc segment design for Threat Distribution */
export default function ThreatArcs() {
  const data = [
    { label: 'Prompt Injection', pct: 42, color: '#ff2d55' },
    { label: 'Jailbreak', pct: 28, color: '#f97316' },
    { label: 'Data Exfiltration', pct: 18, color: '#ffb020' },
    { label: 'Other', pct: 12, color: '#3b82f6' },
  ]

  const size = 200
  const center = size / 2
  const startAngle = -90

  function arcPath(radius, startDeg, endDeg) {
    const startRad = (startDeg * Math.PI) / 180
    const endRad = (endDeg * Math.PI) / 180
    const x1 = center + radius * Math.cos(startRad)
    const y1 = center + radius * Math.sin(startRad)
    const x2 = center + radius * Math.cos(endRad)
    const y2 = center + radius * Math.sin(endRad)
    const largeArc = endDeg - startDeg > 180 ? 1 : 0
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`
  }

  return (
    <div
      style={{
        borderRadius: '24px',
        background: 'var(--surface)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        padding: 24,
        animation: 'float 5s ease-in-out infinite',
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
        Threat Distribution
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, i) => {
            const radius = 85 - i * 18
            const sweep = (item.pct / 100) * 360
            const end = startAngle + sweep
            return (
              <path
                key={item.label}
                d={arcPath(radius, startAngle, end)}
                fill="none"
                stroke={item.color}
                strokeWidth={10}
                strokeLinecap="round"
                opacity={0.85}
                style={{
                  filter: `drop-shadow(0 0 6px ${item.color}40)`,
                  transition: 'all 0.5s ease',
                }}
              />
            )
          })}
          {/* Center label */}
          <text
            x={center}
            y={center - 6}
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fill: 'var(--text-primary)',
            }}
          >
            1,247
          </text>
          <text
            x={center}
            y={center + 14}
            textAnchor="middle"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              fill: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            TOTAL THREATS
          </text>
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}60`,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  marginLeft: 'auto',
                }}
              >
                {item.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
