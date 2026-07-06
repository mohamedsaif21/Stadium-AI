'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Chatbot } from '@/components/Chatbot';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EmergencyButton } from '@/components/EmergencyButton';
import { Incident } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';

export default function VolunteerDashboard() {
  const { user, loading, logout } = useAuth();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ type: 'other', title: '', description: '', location: '', severity: 'medium' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchIncidents = async () => {
    try {
      const res = await fetch('/api/incidents', {
        headers: { 'X-User-Role': 'volunteer' }
      });
      const data = await res.json();
      setIncidents(data.incidents || []);
    } catch {}
  };

  useEffect(() => {
    if (user) {
      fetchIncidents();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Role': 'volunteer' },
        body: JSON.stringify({ ...formData, reportedBy: user?.id || 'unknown' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      setFormSuccess('Incident reported successfully!');
      setFormData({ type: 'other', title: '', description: '', location: '', severity: 'medium' });
      setShowForm(false);
      fetchIncidents();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const sopCards = [
    { type: 'lost_child', title: 'Lost Child', icon: '👶', severity: 'high', color: 'bg-orange-50 border-orange-200' },
    { type: 'medical', title: 'Medical Emergency', icon: '🚑', severity: 'critical', color: 'bg-red-50 border-red-200' },
    { type: 'ticket', title: 'Ticket Issue', icon: '🎫', severity: 'low', color: 'bg-yellow-50 border-yellow-200' },
    { type: 'crowd', title: 'Crowd Rerouting', icon: '🚶', severity: 'medium', color: 'bg-blue-50 border-blue-200' },
    { type: 'accessibility', title: 'Accessibility Assistance', icon: '♿', severity: 'medium', color: 'bg-green-50 border-green-200' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium text-sm animate-pulse-slow">Loading volunteer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute role="volunteer">
      <Navbar user={user || undefined} onLogout={logout} />
      <main className="flex-1 bg-gray-50">
        <div className="bg-gradient-to-r from-green-950 via-green-900 to-emerald-950 text-white border-b border-green-800/40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-72 h-72 bg-green-500 rounded-full blur-3xl animate-pulse-slow" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-extrabold mb-1 tracking-tight">Volunteer Dashboard</h1>
            <p className="text-green-200/80 text-sm font-light font-medium">Welcome, {user?.name || 'Volunteer'}! Your SOP assistant & dispatch console are active.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-navy-900 tracking-tight mb-4">SOP Quick Reference</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sopCards.map(sop => (
                    <button
                      key={sop.type}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, type: sop.type, severity: sop.severity }));
                        setShowForm(true);
                      }}
                      className={`${sop.color} border rounded-2xl p-5 text-left hover-lift transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-col items-start`}
                      aria-label={`${sop.title} SOP card`}
                    >
                      <span className="text-2xl mb-2 block">{sop.icon}</span>
                      <h3 className="font-bold text-navy-900 text-sm mb-1">{sop.title}</h3>
                      <p className="text-[10px] font-semibold text-gray-400">Click to file report</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-navy-900 tracking-tight">Recent Incidents</h2>
                  <button
                    onClick={() => { setShowForm(!showForm); setFormError(''); setFormSuccess(''); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-600/20"
                  >
                    {showForm ? 'Cancel' : '+ Report Incident'}
                  </button>
                </div>

                {showForm && (
                  <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6 animate-fade-in">
                    <h3 className="font-bold text-navy-900 text-sm mb-4">Report New Incident</h3>
                    {formError && <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl mb-4 border border-red-200" role="alert">{formError}</div>}
                    {formSuccess && <div className="bg-green-50 text-green-700 text-xs p-3 rounded-xl mb-4 border border-green-200" role="status">{formSuccess}</div>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="inc-type" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Type</label>
                        <select id="inc-type" value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all" aria-label="Incident type">
                          <option value="lost_child">Lost Child</option>
                          <option value="medical">Medical</option>
                          <option value="ticket">Ticket Issue</option>
                          <option value="crowd">Crowd</option>
                          <option value="accessibility">Accessibility</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="inc-severity" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Severity</label>
                        <select id="inc-severity" value={formData.severity} onChange={e => setFormData(p => ({ ...p, severity: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all" aria-label="Severity level">
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="inc-title" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Title</label>
                      <input id="inc-title" type="text" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all" aria-label="Incident title" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="inc-location" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Location</label>
                      <input id="inc-location" type="text" value={formData.location} onChange={e => setFormData(p => ({ ...p, location: e.target.value }))} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all" aria-label="Incident location" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="inc-description" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Description</label>
                      <textarea id="inc-description" value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} required rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transition-all" aria-label="Incident description" />
                    </div>
                    <button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-750 hover:scale-[1.01] active:scale-[0.99] text-white py-2.5 rounded-xl font-semibold transition-all disabled:opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md shadow-blue-600/10">
                      {submitting ? 'Submitting...' : 'Submit Incident Report'}
                    </button>
                  </form>
                )}

                <div className="space-y-4 custom-scrollbar max-h-[500px] overflow-y-auto pr-1">
                  {incidents.map(inc => (
                    <div key={inc.id} className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow transition-all border-l-4 ${
                      inc.severity === 'critical' ? 'border-l-red-500' :
                      inc.severity === 'high' ? 'border-l-orange-500' :
                      'border-l-yellow-500'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-navy-900 text-sm">{inc.title}</h3>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{inc.location} • {new Date(inc.createdAt).toLocaleString()}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusColor(inc.status)}`}>
                          {inc.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">{inc.description}</p>
                      {inc.aiSuggestedResponse && (
                        <div className="bg-gradient-to-br from-blue-55 via-indigo-50 to-emerald-50/20 border border-blue-100/50 rounded-xl p-4 shadow-sm mb-3">
                          <p className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            AI Suggested SOP Action
                          </p>
                          <p className="text-xs text-blue-750/90 leading-relaxed font-medium">{inc.aiSuggestedResponse}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                         <button
                          onClick={async () => {
                            await fetch('/api/incidents', {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json', 'X-User-Role': 'volunteer' },
                              body: JSON.stringify({ id: inc.id, status: 'in_progress', assignedTo: user?.id }),
                            });
                            fetchIncidents();
                          }}
                          className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow shadow-blue-600/10"
                        >
                          Accept
                        </button>
                        <button
                          onClick={async () => {
                            await fetch('/api/incidents', {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json', 'X-User-Role': 'volunteer' },
                              body: JSON.stringify({ id: inc.id, status: 'resolved' }),
                            });
                            fetchIncidents();
                          }}
                          className="text-xs px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 shadow shadow-green-600/10"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                  {incidents.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-dashed border-gray-200">
                      <svg className="w-8 h-8 text-gray-300 mb-2 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-400 text-xs font-semibold">All clear! No incidents reported yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="h-[650px]">
              <Chatbot role="volunteer" />
            </div>
          </div>
        </div>
      </main>
      <EmergencyButton />
    </ProtectedRoute>
  );
}
