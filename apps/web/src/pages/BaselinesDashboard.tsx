import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  ShieldCheck, 
  ClipboardCheck, 
  AlertTriangle, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Clock,
  History,
  CheckCircle2,
  XCircle,
  Zap
} from 'lucide-react';

const complianceData = [
  { name: 'Mon', score: 82 },
  { name: 'Tue', score: 85 },
  { name: 'Wed', score: 84 },
  { name: 'Thu', score: 88 },
  { name: 'Fri', score: 92 },
  { name: 'Sat', score: 91 },
  { name: 'Sun', score: 94 },
];

const KPI_CARDS = [
  { title: 'Fleet Compliance', value: '94.2%', trend: '+2.4%', color: 'cyan', icon: ClipboardCheck },
  { title: 'Active Violations', value: '18', trend: '-5', color: 'rose', icon: AlertTriangle },
  { title: 'Validation Speed', value: '450ms', trend: 'p99', color: 'cyan', icon: Zap },
  { title: 'Resources Scanned', value: '1.2k', trend: 'Last 24h', color: 'slate', icon: Activity },
];

const BaselinesDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Baseline Intelligence</h1>
          <p className="text-slate-400">Strategic oversight of secure configuration standards and drift detection.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Export Compliance PDF
          </button>
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Validate All Baselines
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') || card.trend === 'Healthy' ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Trend Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Aggregate Compliance Score (7d)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#06b6d4" fill="url(#colorScore)" name="Compliance Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Framework Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Framework Coverage</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'CIS Benchmarks', value: 85, color: 'bg-cyan-500' },
              { name: 'NIST 800-53', value: 72, color: 'bg-indigo-500' },
              { name: 'ISO 27001', value: 65, color: 'bg-emerald-500' },
              { name: 'PCI-DSS (v4.0)', value: 45, color: 'bg-slate-500' },
            ].map((fw) => (
              <div key={fw.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{fw.name}</span>
                  <span className="text-slate-400">{fw.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${fw.color}`} style={{ width: `${fw.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Violations Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Baseline Violations Stream</h3>
          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Manage Exceptions</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Baseline ID</th>
                <th className="px-6 py-4 font-semibold">Resource</th>
                <th className="px-6 py-4 font-semibold">Rule Key</th>
                <th className="px-6 py-4 font-semibold">Violation</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'k8s-01', res: 'aks-prod-01', rule: 'privilegeEscalation', type: 'True != False', sev: 'CRITICAL' },
                { id: 'os-42', res: 'vm-app-05', rule: 'sshRootLogin', type: 'Enabled != Disabled', sev: 'HIGH' },
                { id: 'cloud-09', res: 's3-audit-logs', rule: 'versioning', type: 'Disabled != Enabled', sev: 'MEDIUM' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium text-slate-300">{row.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.res}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.rule}</td>
                  <td className="px-6 py-4 text-sm text-rose-400 font-medium">{row.type}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.sev === 'CRITICAL' ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' : 
                      row.sev === 'HIGH' ? 'text-amber-400 border-amber-500/20 bg-amber-500/10' : 
                      'text-cyan-400 border-cyan-500/20 bg-cyan-500/10'
                    }`}>
                      {row.sev}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-cyan-400 hover:text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      Remediate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BaselinesDashboard;
