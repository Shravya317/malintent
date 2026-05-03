import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Settings,
  Bell,
  FileText,
  Zap,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Activity, label: 'Live Feed', path: '/feed' },
  { icon: AlertTriangle, label: 'Threats', path: '/threats' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

/* Animated SVG shield logo */
function ShieldLogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      style={{ animation: 'shieldPulse 3s ease-in-out infinite' }}
    >
      <path
        d="M20 4L6 10v10c0 9.33 5.97 18.06 14 20 8.03-1.94 14-10.67 14-20V10L20 4z"
        fill="none"
        stroke="var(--color-threat-400)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4L6 10v10c0 9.33 5.97 18.06 14 20 8.03-1.94 14-10.67 14-20V10L20 4z"
        fill="url(#shieldFill)"
        opacity="0.15"
      />
      <path
        d="M14 20l4 4 8-8"
        stroke="var(--color-secure-400)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="shieldFill" x1="6" y1="4" x2="34" y2="34">
          <stop offset="0%" stopColor="#ff2d55" />
          <stop offset="100%" stopColor="#ff4d6f" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        bottom: 16,
        width: collapsed ? 72 : 240,
        zIndex: 50,
        borderRadius: '28px',
        background: 'var(--sidebar-bg)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Inner glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '28px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,45,85,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Brand ───────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: collapsed ? '24px 18px' : '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <ShieldLogo />
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 400,
                color: '#f1f5f9',
                margin: 0,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              Mal<span style={{ color: 'var(--color-threat-400)' }}>Intent</span>
            </h1>
            <p
              style={{
                fontSize: '0.6rem',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#64748b',
                margin: 0,
                marginTop: 2,
              }}
            >
              LLM Firewall
            </p>
          </div>
        )}
      </div>

      {/* ── Status ──────────────────────────────────────── */}
      {!collapsed && (
        <div
          style={{
            margin: '16px 16px 0',
            padding: '10px 14px',
            borderRadius: '16px',
            background: 'rgba(0, 212, 170, 0.08)',
            border: '1px solid rgba(0, 212, 170, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ position: 'relative', width: 8, height: 8 }}>
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
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#00e6bb',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Firewall Active
          </span>
        </div>
      )}

      {/* ── Navigation with thread line ─────────────────── */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? '24px 12px' : '24px 12px',
          position: 'relative',
          overflowY: 'auto',
        }}
      >
        {/* Vertical animated stitch thread */}
        {!collapsed && (
          <svg
            style={{
              position: 'absolute',
              left: 30,
              top: 0,
              bottom: 0,
              width: 2,
              height: '100%',
              overflow: 'visible',
            }}
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="rgba(255,45,85,0.15)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              style={{ animation: 'stitchDash 1.5s linear infinite' }}
            />
          </svg>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                title={collapsed ? label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: collapsed ? '12px 14px' : '10px 16px',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: 'var(--font-sans)',
                  color: isActive ? '#ff4d6f' : '#94a3b8',
                  background: isActive
                    ? 'rgba(255, 45, 85, 0.1)'
                    : 'transparent',
                  boxShadow: isActive
                    ? 'inset 0 0 0 1px rgba(255,45,85,0.15)'
                    : 'none',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = '#f1f5f9'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#94a3b8'
                  }
                }}
              >
                <Icon
                  style={{
                    width: 18,
                    height: 18,
                    flexShrink: 0,
                    color: isActive ? '#ff4d6f' : '#64748b',
                    transition: 'color 0.2s',
                  }}
                />
                {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{label}</span>}
                {isActive && !collapsed && (
                  <Zap
                    style={{
                      marginLeft: 'auto',
                      width: 14,
                      height: 14,
                      color: 'rgba(255,45,85,0.5)',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* ── Footer ──────────────────────────────────────── */}
      {!collapsed && (
        <div
          style={{
            margin: '0 12px 16px',
            padding: '12px 16px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <p
            style={{
              fontSize: '0.68rem',
              color: '#64748b',
              lineHeight: 1.6,
              margin: 0,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ fontWeight: 600, color: '#94a3b8' }}>v1.0.0</span>{' · '}
            Engine:{' '}
            <span style={{ color: '#00e6bb', fontWeight: 500 }}>GPT-4o-shield</span>
          </p>
        </div>
      )}

      {/* ── Collapse Toggle ─────────────────────────────── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute',
          right: -12,
          top: 80,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: '#1c2432',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'all 0.2s',
          zIndex: 10,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#f1f5f9'
          e.currentTarget.style.background = '#243042'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = '#94a3b8'
          e.currentTarget.style.background = '#1c2432'
        }}
      >
        {collapsed ? '›' : '‹'}
      </button>
    </aside>
  )
}
