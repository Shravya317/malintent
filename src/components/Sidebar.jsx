import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Shield,
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Settings,
  Bell,
  FileText,
  ChevronLeft,
  ChevronRight,
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

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside
      className={`
        relative flex flex-col h-screen
        bg-gunmetal-900 border-r border-white/5
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
      `}
    >
      {/* ── Brand ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-threat-500/10 glow-red animate-pulse-ring">
          <Shield className="w-5 h-5 text-threat-400" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold tracking-tight text-white truncate">
              Mal<span className="text-threat-400">Intent</span>
            </h1>
            <p className="text-[10px] font-medium tracking-widest uppercase text-slate-500">
              LLM Firewall
            </p>
          </div>
        )}
      </div>

      {/* ── Status Banner ─────────────────────────────────── */}
      {!collapsed && (
        <div className="mx-4 mt-4 px-3 py-2.5 rounded-lg bg-secure-500/8 border border-secure-500/15">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secure-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secure-500" />
            </span>
            <span className="text-xs font-medium text-secure-400">
              Firewall Active
            </span>
          </div>
        </div>
      )}

      {/* ── Navigation ────────────────────────────────────── */}
      <nav className="flex-1 px-3 mt-6 space-y-1 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              title={collapsed ? label : undefined}
              className={`
                group flex items-center gap-3 w-full rounded-lg px-3 py-2.5
                text-sm font-medium transition-all duration-200
                cursor-pointer
                ${
                  isActive
                    ? 'bg-threat-500/10 text-threat-400 shadow-[inset_0_0_0_1px_rgba(255,45,85,0.15)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                  isActive ? 'text-threat-400' : 'text-slate-500 group-hover:text-white'
                }`}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {isActive && !collapsed && (
                <Zap className="ml-auto w-3.5 h-3.5 text-threat-500/50" />
              )}
            </button>
          )
        })}
      </nav>

      {/* ── Footer ────────────────────────────────────────── */}
      {!collapsed && (
        <div className="px-4 py-4 mx-3 mb-3 rounded-lg border border-white/5 bg-white/[0.02]">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-400">v1.0.0</span> ·
            Engine running on{' '}
            <span className="text-secure-400 font-medium">GPT-4o-shield</span>
          </p>
        </div>
      )}

      {/* ── Collapse Toggle ───────────────────────────────── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 flex items-center justify-center
                   w-6 h-6 rounded-full bg-gunmetal-700 border border-white/10
                   text-slate-400 hover:text-white hover:bg-gunmetal-600
                   transition-all duration-200 cursor-pointer shadow-lg"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  )
}
