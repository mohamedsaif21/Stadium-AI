'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Chatbot } from '@/components/Chatbot';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { StatCard } from '@/components/StatCard';
import { Incident, Alert, SustainabilityMetric } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import dynamic from 'next/dynamic';

const StadiumHeatmap = dynamic(() => import('@/components/StadiumHeatmap').then(mod => mod.StadiumHeatmap), { ssr: false });

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [sustainability, setSustainability] = useState<{ metrics: SustainabilityMetric[]; score: number; suggestions: string[] } | null>(null);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertData, setAlertData] = useState<{ title: string; message: string; zone: string; severity: 'info' | 'warning' | 'critical' }>({ title: '', message: '', zone: '', severity: 'info' });
  const [alertError, setAlertError] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const headers = { 'X-User-Role': 'admin' };
      const [incRes, alertRes, susRes] = await Promise.all([
        fetch('/api/incidents', { headers }),
        fetch('/api/alerts', { headers }),
        fetch('/api/sustainability', { headers }),
      ]);
      const incData = await incRes.json();
      const alertData = await alertRes.json();
      const susData = await susRes.json();
      setIncidents(incData.incidents || []);
      setAlerts(alertData.alerts || []);
      setSustainability(susData);
    } catch {}
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertError('');
    setAlertSuccess('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Role': 'admin' },
        body: JSON.stringify({ ...alertData, createdBy: user?.id || 'admin' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create alert');
      setAlertSuccess('Alert created!');
      setAlertData({ title: '', message: '', zone: '', severity: 'info' });
      setShowAlertForm(false);
      fetchData();
    } catch (err) {
      setAlertError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setSubmitting(false);
    }
  };

  const triggerSimulation = async (type: string) => {
    try {
      if (type === 'crowd_surge') {
        await fetch('/api/alerts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-User-Role': 'admin' },
          body: JSON.stringify({
            title: 'Critical Crowd Surge',
            message: 'Gate B: Entrance lanes are critically backed up. Recommend dynamic redirection.',
            zone: 'Gate B',
            severity: 'critical',
            createdBy: 'Simulator',
          }),
        });
      } else if (type === 'medical') {
        await fetch('/api/incidents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-User-Role': 'admin' },
          body: JSON.stringify({
            title: 'Heat Exhaustion Incident',
            location: 'Food Court',
            type: 'medical',
            severity: 'high',
            description: 'Fan requires assistance due to suspected heat exhaustion near kiosk 3.',
            reportedBy: user?.id || 'Simulator',
          }),
        });
      } else if (type === 'power') {
        await fetch('/api/incidents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-User-Role': 'admin' },
          body: JSON.stringify({
            title: 'Auxiliary Power Failure',
            location: 'Stand 2',
            type: 'other',
            severity: 'critical',
            description: 'Backup generator failure in stand 2 sector G. Maintenance required.',
            reportedBy: user?.id || 'Simulator',
          }),
        });
      } else if (type === 'post_match') {
        await fetch('/api/alerts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-User-Role': 'admin' },
          body: JSON.stringify({
            title: 'Dispersal Exit Surge',
            message: 'Metro Exit: Severe passenger accumulation. Dynamic staggered release recommended.',
            zone: 'Metro Exit',
            severity: 'warning',
            createdBy: 'Simulator',
          }),
        });
      }
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const openIncidents = incidents.filter(i => i.status === 'open' || i.status === 'in_progress');

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-semibold text-sm animate-pulse-slow">Loading Operations Deck...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute role="admin">
      <Navbar user={user || undefined} onLogout={logout} />
      <main className="flex-1 bg-gray-50">
        <div className="dashboard-band text-white border-b border-navy-800/40">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="ops-kicker mb-3">Operations command deck</p>
            <h1 className="text-3xl font-extrabold mb-1 tracking-tight">Admin Operations Dashboard</h1>
            <p className="text-blue-200/85 text-sm font-medium">Welcome, {user?.name || 'Admin'}. Monitor crowd flow, incidents, alerts, and sustainability signals.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Judge Demo Simulator Panel */}
          <div className="ops-panel-dark text-white rounded-lg p-5 mb-8 relative overflow-hidden">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 text-indigo-300">
                  <span>⚡</span> Judge Simulation Deck
                </h2>
                <p className="text-xs text-blue-200/80 font-light mt-0.5">Click any scenario to inject real-time incidents and evaluate AI/Operations reaction telemetry.</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => triggerSimulation('crowd_surge')}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-md transition-all hover:-translate-y-0.5 active:translate-y-0 border border-white/10"
                >
                  🚨 Gate B Surge
                </button>
                <button
                  onClick={() => triggerSimulation('medical')}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-md transition-all hover:-translate-y-0.5 active:translate-y-0 border border-white/10"
                >
                  🚑 Food Court Heat
                </button>
                <button
                  onClick={() => triggerSimulation('power')}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-md transition-all hover:-translate-y-0.5 active:translate-y-0 border border-white/10"
                >
                  🔌 Stand 2 Power Cut
                </button>
                <button
                  onClick={() => triggerSimulation('post_match')}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-2 rounded-md transition-all hover:-translate-y-0.5 active:translate-y-0 border border-white/10"
                >
                  🚇 Post-Match Exit
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Total Fans" value="8,247" color="purple" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
            <StatCard label="Active Gates" value="6" color="blue" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} />
            <StatCard label="Crowd Density" value="62%" trend="down" color="yellow" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
            <StatCard label="Open Incidents" value={openIncidents.length} trend="up" color="red" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />
            <StatCard label="Sustainability" value={`${sustainability?.score || 78}%`} trend="up" color="green" icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <StadiumHeatmap />
            </div>
            <div>
              {sustainability && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100/80 h-full flex flex-col">
                  <h3 className="text-navy-900 font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    Sustainability Overview
                  </h3>
                  <div className="space-y-4 flex-1">
                    {sustainability.metrics.map(m => (
                      <div key={m.id} className="space-y-1.5 py-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 font-semibold">{m.label}</span>
                          <span className={`font-bold ${m.status === 'good' ? 'text-green-600' : m.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`}>
                            {m.value}{m.unit}
                          </span>
                         </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              m.status === 'good' ? 'bg-green-500' : m.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ 
                              width: `${
                                m.unit === '%' 
                                  ? parseFloat(String(m.value)) 
                                  : m.unit === 'k' 
                                  ? Math.min(100, parseFloat(String(m.value)) * 3) 
                                  : Math.min(100, parseFloat(String(m.value)) * 1.5)
                              }%` 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50/30 border border-green-100/50 rounded-xl p-4 shadow-sm">
                    <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      AI Optimization Tips
                    </p>
                    {sustainability.suggestions.map((s, i) => (
                      <p key={i} className="text-xs text-green-700/90 leading-relaxed mb-1.5 last:mb-0 font-medium">• {s}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-navy-900 tracking-tight">System Alerts</h2>
                <button
                  onClick={() => { setShowAlertForm(!showAlertForm); setAlertError(''); setAlertSuccess(''); }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md shadow-purple-600/20"
                >
                  {showAlertForm ? 'Cancel' : '+ Create Alert'}
                </button>
              </div>

              {showAlertForm && (
                <form onSubmit={handleAlertSubmit} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100/85 mb-6 animate-fade-in">
                  <h3 className="font-bold text-navy-900 text-sm mb-4">Create New Alert</h3>
                  {alertError && <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl mb-4 border border-red-200" role="alert">{alertError}</div>}
                  {alertSuccess && <div className="bg-green-50 text-green-700 text-xs p-3 rounded-xl mb-4 border border-green-200" role="status">{alertSuccess}</div>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="alert-zone" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Zone</label>
                      <select id="alert-zone" value={alertData.zone} onChange={e => setAlertData(p => ({ ...p, zone: e.target.value }))} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all">
                        <option value="">Select zone</option>
                        <option value="Gate A">Gate A</option>
                        <option value="Gate B">Gate B</option>
                        <option value="Gate C">Gate C</option>
                        <option value="Food Court">Food Court</option>
                        <option value="Metro Exit">Metro Exit</option>
                        <option value="Stand 1">Stand 1</option>
                        <option value="Stand 2">Stand 2</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="alert-severity" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Severity</label>
                      <select id="alert-severity" value={alertData.severity} onChange={e => setAlertData(p => ({ ...p, severity: e.target.value as 'info' | 'warning' | 'critical' }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all">
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="alert-title" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Title</label>
                    <input id="alert-title" type="text" value={alertData.title} onChange={e => setAlertData(p => ({ ...p, title: e.target.value }))} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="alert-message" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Message</label>
                    <textarea id="alert-message" value={alertData.message} onChange={e => setAlertData(p => ({ ...p, message: e.target.value }))} required rows={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all" />
                  </div>
                  <button type="submit" disabled={submitting} className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-[1.01] active:scale-[0.99] text-white py-2.5 rounded-xl font-semibold transition-all disabled:opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md shadow-purple-600/10">
                    {submitting ? 'Creating...' : 'Create Alert'}
                  </button>
                </form>
              )}

              <div className="space-y-3 custom-scrollbar max-h-[500px] overflow-y-auto pr-1">
                {alerts.map(a => (
                  <div key={a.id} className={`rounded-xl p-4 border transition-all hover:translate-x-0.5 shadow-sm ${
                    a.severity === 'critical' ? 'bg-red-50/80 border-red-200/60' :
                    a.severity === 'warning' ? 'bg-yellow-50/80 border-yellow-200/60' :
                    'bg-blue-50/80 border-blue-200/60'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${
                        a.severity === 'critical' ? 'bg-red-500 animate-pulse' :
                        a.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <span className={`text-[10px] font-bold uppercase ${
                        a.severity === 'critical' ? 'text-red-600' :
                        a.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      }`}>{a.severity}</span>
                      <span className="text-[10px] text-gray-400 font-medium font-mono">• {a.zone}</span>
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm mb-0.5">{a.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{a.message}</p>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-dashed border-gray-200">
                    <svg className="w-8 h-8 text-gray-300 mb-2 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <p className="text-gray-400 text-xs font-semibold">No active system alerts.</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-navy-900 tracking-tight mb-4">Active Incidents ({openIncidents.length})</h2>
              <div className="space-y-3 mb-6 custom-scrollbar max-h-[220px] overflow-y-auto pr-1">
                {incidents.slice(0, 5).map(inc => (
                  <div key={inc.id} className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow transition-all hover:translate-x-0.5 border-l-4 ${
                    inc.severity === 'critical' ? 'border-l-red-500' :
                    inc.severity === 'high' ? 'border-l-orange-500' :
                    'border-l-yellow-500'
                  }`}>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-navy-900 text-sm">{inc.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        inc.severity === 'critical' ? 'bg-red-50 text-red-600' :
                        inc.severity === 'high' ? 'bg-orange-50 text-orange-600' :
                        'bg-yellow-50 text-yellow-600'
                      }`}>{inc.severity}</span>
                    </div>
                    <p className="text-[10px] font-semibold text-gray-400 font-mono">{inc.location} • {inc.type.replace('_', ' ')}</p>
                  </div>
                ))}
                {incidents.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-dashed border-gray-200">
                    <svg className="w-8 h-8 text-gray-300 mb-2 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-400 text-xs font-semibold">All clear! No incidents reported.</p>
                  </div>
                )}
              </div>

              <div className="h-[380px]">
                <Chatbot role="admin" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
