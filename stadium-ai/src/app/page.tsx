'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FeatureCard } from '@/components/FeatureCard';
import Link from 'next/link';

const features = [
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    title: 'AI Fan Assistant',
    description: 'Multilingual chatbot for navigation, accessibility, transport, and matchday questions.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    title: 'Crowd Intelligence',
    description: 'Gate, concourse, food court, and exit density signals for faster rerouting decisions.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    title: 'Volunteer Support',
    description: 'SOP cards and incident response suggestions for common stadium situations.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>,
    title: 'Accessibility Assistance',
    description: 'Accessible routing, restroom support, contrast controls, and readable form states.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m6 0a2 2 0 104 0" /></svg>,
    title: 'Transport Guidance',
    description: 'Post-match routing to metro, bus, and taxi pickup zones with queue-aware guidance.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Sustainability Tracker',
    description: 'Public transport, waste, water refill, and energy indicators for operations teams.',
  },
];

const liveSignals = [
  ['Gate B', '94% crowd load'],
  ['Metro Exit', '8 min fan route'],
  ['Water Stations', '45% refill use'],
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="ops-shell text-white overflow-hidden border-b border-white/10 min-h-[680px] flex items-end">
          <div className="stadium-scene hidden md:block" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
            <div className="max-w-3xl">
              <div className="ops-kicker mb-7">Live matchday command layer</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
                StadiumAI
                <span className="block text-blue-200">World Cup operations, routed in real time.</span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100/85 mb-10 max-w-2xl leading-relaxed">
                A GenAI control layer for crowded stadium days: fan routing, volunteer response, alerts,
                sustainability telemetry, and administrator decisions in one operations deck.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg shadow-blue-600/35">
                  Fan Demo
                </Link>
                <Link href="/login" className="bg-green-600 hover:bg-green-500 text-white px-8 py-3.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg shadow-green-600/35">
                  Volunteer Demo
                </Link>
                <Link href="/login" className="bg-white/8 hover:bg-white/14 text-white px-8 py-3.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white border border-white/15 backdrop-blur-sm">
                  Admin Dashboard
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-12 max-w-2xl">
                {liveSignals.map(([label, value]) => (
                  <div key={label} className="ops-panel-dark rounded-lg p-4">
                    <p className="text-[10px] uppercase font-bold text-blue-300 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" id="problem">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <p className="ops-kicker justify-center mb-3">Problem fit</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 tracking-tight">The Matchday Challenge</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                The 2026 tournament creates pressure on crowd flow, accessibility, multilingual support,
                sustainability, and real-time decisions across large venues.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: '70,000+', label: 'Fans per stadium' },
                { num: '3', label: 'Host countries' },
                { num: '104', label: 'Total matches' },
              ].map(item => (
                <div key={item.label} className="ops-surface text-center p-8 rounded-lg hover-lift">
                  <p className="text-5xl font-extrabold text-blue-700 mb-2.5">{item.num}</p>
                  <p className="text-gray-500 font-semibold text-xs uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <p className="ops-kicker justify-center mb-3">Operations modules</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 tracking-tight">Our Solution</h2>
              <p className="text-gray-500 text-lg">
                StadiumAI connects fan-facing assistance with the operational decisions happening behind the scenes.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(feature => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 ops-shell text-white border-t border-white/5" id="cta">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">Launch the operations demo</h2>
            <p className="text-blue-200/85 text-lg mb-12 max-w-2xl mx-auto">
              Use the demo credentials below to test the fan, volunteer, and administrator workflows.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/login" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-600/35">
                Launch Demo -&gt;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-blue-200/80">
              <div className="ops-panel-dark rounded-lg p-6 text-left">
                <p className="font-semibold text-white mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-500 rounded-full" />Fan Access</p>
                <p className="font-mono text-xs opacity-90">Email: fan@stadiumai.demo</p>
                <p className="font-mono text-xs opacity-90 mt-0.5">Pass: password123</p>
              </div>
              <div className="ops-panel-dark rounded-lg p-6 text-left">
                <p className="font-semibold text-white mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full" />Volunteer Access</p>
                <p className="font-mono text-xs opacity-90">Email: volunteer@stadiumai.demo</p>
                <p className="font-mono text-xs opacity-90 mt-0.5">Pass: password123</p>
              </div>
              <div className="ops-panel-dark rounded-lg p-6 text-left">
                <p className="font-semibold text-white mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-300 rounded-full" />Admin Access</p>
                <p className="font-mono text-xs opacity-90">Email: admin@stadiumai.demo</p>
                <p className="font-mono text-xs opacity-90 mt-0.5">Pass: password123</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
