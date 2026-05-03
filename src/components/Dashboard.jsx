import { ShieldAlert, ShieldCheck, Cpu, Gauge } from 'lucide-react'
import { useTheme } from '../ThemeContext'
import Sidebar from './Sidebar'
import MetricBlob from './MetricBlob'
import ThreatFeed from './ThreatFeed'
import ThreatArcs from './ThreatArcs'
import TargetedModels from './TargetedModels'
import HealthGauge from './HealthGauge'

/* SVG stitch connector lines between sections */
function StitchLine({ x1, y1, x2, y2, delay = 0 }) {
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 0,
      }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        style={{
          animation: `stitchDash 2s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </svg>
  )
}

/* Theme toggle pill */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 18px',
        borderRadius: '999px',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        backdropFilter: 'blur(12px)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.78rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--surface-hover)'
        e.currentTarget.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--surface)'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <span style={{ fontSize: '1rem' }}>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      {/* Main content — offset for floating sidebar */}
      <main
        style={{
          flex: 1,
          marginLeft: 272,
          minHeight: '100vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* ── Top Bar ──────────────────────────────────────── */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 32px',
            background: 'linear-gradient(180deg, var(--bg-primary) 60%, transparent)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 400,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Security Overview
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                margin: '4px 0 0',
              }}
            >
              Real-time LLM threat monitoring · Last updated just now
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Status indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: '999px',
                background: 'var(--surface)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border)',
              }}
            >
              <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-block' }}>
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#00e6bb',
                    animation: 'pulse-ring 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    display: 'block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#00d4aa',
                  }}
                />
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#00e6bb',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                All Systems Nominal
              </span>
            </div>

            <ThemeToggle />
          </div>
        </header>

        {/* ── Content ──────────────────────────────────────── */}
        <div style={{ padding: '8px 32px 48px', position: 'relative' }}>

          {/* ── Metric Blobs ───────────────────────────────── */}
          <section style={{ position: 'relative', marginBottom: 48 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 24,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <MetricBlob
                title="Threats Blocked"
                value="1,247"
                subtitle="Last 24 hours"
                icon={ShieldAlert}
                accent="red"
                delay={0}
              />
              <MetricBlob
                title="Safe Queries"
                value="48.3K"
                subtitle="99.7% pass rate"
                icon={ShieldCheck}
                accent="teal"
                delay={1}
              />
              <MetricBlob
                title="Active Models"
                value="7"
                subtitle="All models protected"
                icon={Cpu}
                accent="blue"
                delay={2}
              />
              <MetricBlob
                title="Avg Latency"
                value="2.4ms"
                subtitle="Firewall overhead"
                icon={Gauge}
                accent="amber"
                delay={3}
              />
            </div>
          </section>

          {/* ── Stitch connector from blobs to analytics ──── */}
          <div style={{ position: 'relative', height: 32 }}>
            <svg
              style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
            >
              <line
                x1="15%"
                y1="0"
                x2="20%"
                y2="100%"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                style={{ animation: 'stitchDash 2s linear infinite' }}
              />
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                style={{ animation: 'stitchDash 2s linear infinite', animationDelay: '0.3s' }}
              />
              <line
                x1="85%"
                y1="0"
                x2="80%"
                y2="100%"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                style={{ animation: 'stitchDash 2s linear infinite', animationDelay: '0.6s' }}
              />
            </svg>
          </div>

          {/* ── Analytics Row ──────────────────────────────── */}
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
              marginBottom: 48,
            }}
          >
            <ThreatArcs />
            <TargetedModels />
            <HealthGauge />
          </section>

          {/* ── Stitch connector from analytics to feed ───── */}
          <div style={{ position: 'relative', height: 24 }}>
            <svg
              style={{
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
            >
              <line
                x1="10%"
                y1="0"
                x2="5%"
                y2="100%"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                style={{ animation: 'stitchDash 2s linear infinite', animationDelay: '0.5s' }}
              />
              <line
                x1="60%"
                y1="0"
                x2="65%"
                y2="100%"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                style={{ animation: 'stitchDash 2s linear infinite', animationDelay: '0.8s' }}
              />
            </svg>
          </div>

          {/* ── Threat Feed ────────────────────────────────── */}
          <section>
            <ThreatFeed />
          </section>
        </div>
      </main>
    </div>
  )
}
