import { ShieldAlert, ShieldCheck, Activity, Eye, Cpu, Gauge } from 'lucide-react'
import Sidebar from './Sidebar'
import MetricCard from './MetricCard'
import ThreatFeed from './ThreatFeed'

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-gunmetal-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-gunmetal-950/80 backdrop-blur-xl">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Security Overview
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time LLM threat monitoring · Last updated just now
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secure-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secure-500" />
              </span>
              <span className="text-secure-400 font-medium">All Systems Nominal</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 stagger">
            <MetricCard
              title="Threats Blocked"
              value="1,247"
              subtitle="Last 24 hours"
              icon={ShieldAlert}
              trend="up"
              trendValue="+12.5%"
              accent="red"
            />
            <MetricCard
              title="Safe Queries"
              value="48.3K"
              subtitle="99.7% pass rate"
              icon={ShieldCheck}
              trend="up"
              trendValue="+3.2%"
              accent="teal"
            />
            <MetricCard
              title="Active Models"
              value="7"
              subtitle="All models protected"
              icon={Cpu}
              trend="neutral"
              trendValue=""
              accent="blue"
            />
            <MetricCard
              title="Avg Latency"
              value="2.4ms"
              subtitle="Firewall overhead"
              icon={Gauge}
              trend="down"
              trendValue="-0.8ms"
              accent="amber"
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger">
            <div className="glass rounded-2xl p-5 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-4 h-4 text-secure-400" />
                <span className="text-sm font-semibold text-white">Threat Distribution</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Prompt Injection', pct: 42, color: 'bg-threat-500' },
                  { label: 'Jailbreak', pct: 28, color: 'bg-orange-500' },
                  { label: 'Data Exfiltration', pct: 18, color: 'bg-warn-500' },
                  { label: 'Other', pct: 12, color: 'bg-info-500' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-slate-300 font-medium">{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-4 h-4 text-info-400" />
                <span className="text-sm font-semibold text-white">Top Targeted Models</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { model: 'GPT-4o', attacks: 523, pct: 42 },
                  { model: 'Claude 3.5 Sonnet', attacks: 312, pct: 25 },
                  { model: 'Gemini Pro', attacks: 198, pct: 16 },
                  { model: 'Llama 3.1 70B', attacks: 128, pct: 10 },
                ].map(item => (
                  <div key={item.model} className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
                    <span className="text-sm text-slate-300">{item.model}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500">{item.attacks}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-medium">{item.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5 animate-fade-in-up relative overflow-hidden scan-line">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-4 h-4 text-secure-400" />
                <span className="text-sm font-semibold text-white">Firewall Health</span>
              </div>
              <div className="flex items-center justify-center py-4">
                <div className="relative">
                  <svg className="w-28 h-28" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="url(#healthGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${99.7 * 3.267} ${326.7}`} transform="rotate(-90 60 60)" />
                    <defs>
                      <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00d4aa" />
                        <stop offset="100%" stopColor="#00e6bb" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">99.7%</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Uptime</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-center p-2 rounded-lg bg-white/[0.02]">
                  <p className="text-lg font-bold text-secure-400">0</p>
                  <p className="text-[10px] text-slate-500 uppercase">False Pos</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/[0.02]">
                  <p className="text-lg font-bold text-warn-400">2</p>
                  <p className="text-[10px] text-slate-500 uppercase">Warnings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Threat Feed */}
          <ThreatFeed />
        </div>
      </main>
    </div>
  )
}
