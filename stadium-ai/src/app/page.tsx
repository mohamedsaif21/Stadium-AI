'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FeatureCard } from '@/components/FeatureCard';
import Link from 'next/link';

const features = [
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    title: 'AI Fan Assistant',
    description: 'Multilingual chatbot for navigation, accessibility, transport, and matchday queries. Ask in English, Spanish, French, Arabic, or Hindi.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'Crowd Intelligence',
    description: 'Real-time crowd density monitoring across gates, stands, food courts, and exits. Smart rerouting suggestions during peak times.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    title: 'Volunteer Support',
    description: 'AI-powered SOP cards for lost children, medical emergencies, ticket issues, and crowd management. Instant incident response suggestions.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>,
    title: 'Accessibility Assistance',
    description: 'Wheelchair routes, accessible restrooms, high contrast mode, large text, screen reader support, and multilingual assistance.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
    title: 'Transport Guidance',
    description: 'Post-match route planning to metro, bus, and taxi stands. Real-time transport status and estimated wait times.',
  },
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Sustainability Tracker',
    description: 'Live sustainability metrics: public transport usage, waste collection, water refill station utilization, and energy monitoring.',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-blue-950 text-white overflow-hidden border-b border-white/5 py-12">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4.5 py-1.5 text-xs font-semibold text-blue-300 mb-8 uppercase tracking-wider shadow-inner">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                FIFA World Cup 2026 — GenAI Powered
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                StadiumAI:{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 bg-clip-text text-transparent drop-shadow-sm">
                  Smarter Stadium, Better Experience
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100/80 mb-10 max-w-2xl leading-relaxed font-light">
                A Generative AI-powered operations assistant that transforms the matchday experience — 
                helping fans navigate, volunteers respond, and administrators manage the stadium 
                in real time during the FIFA World Cup 2026.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg shadow-blue-600/35"
                >
                  Fan Demo
                </Link>
                <Link
                  href="/login"
                  className="bg-green-600 hover:bg-green-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg shadow-green-600/35"
                >
                  Volunteer Demo
                </Link>
                <Link
                  href="/login"
                  className="bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white border border-white/15 backdrop-blur-sm"
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white" id="problem">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 tracking-tight">The Matchday Challenge</h2>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                FIFA World Cup 2026 will be the largest in history, hosted across three countries. 
                Stadiums face unprecedented challenges in crowd management, accessibility, multilingual 
                support, sustainability, and real-time operational decision-making.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: '70,000+', label: 'Fans per stadium' },
                { num: '3', label: 'Host countries' },
                { num: '104', label: 'Total matches' },
              ].map(item => (
                <div key={item.label} className="text-center p-8 bg-gray-50/50 rounded-2xl border border-gray-100/80 hover-lift shadow-inner">
                  <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2.5">{item.num}</p>
                  <p className="text-gray-400 font-semibold text-xs uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 tracking-tight">Our Solution</h2>
              <p className="text-gray-500 text-lg font-light">
                StadiumAI leverages Generative AI to address every aspect of the matchday experience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(feature => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-navy-950 to-navy-900 text-white border-t border-white/5" id="cta">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">Ready to Experience the Future of Stadium Operations?</h2>
            <p className="text-blue-200/80 text-lg mb-12 max-w-2xl mx-auto font-light">
              Try StadiumAI with demo credentials. No setup required.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/35">Launch Demo →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-blue-200/70">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all text-left shadow-inner hover:scale-[1.02]">
                <p className="font-semibold text-white mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-500 rounded-full" />Fan Access</p>
                <p className="font-mono text-xs opacity-90">Email: fan@stadiumai.demo</p>
                <p className="font-mono text-xs opacity-90 mt-0.5">Pass: password123</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all text-left shadow-inner hover:scale-[1.02]">
                <p className="font-semibold text-white mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full" />Volunteer Access</p>
                <p className="font-mono text-xs opacity-90">Email: volunteer@stadiumai.demo</p>
                <p className="font-mono text-xs opacity-90 mt-0.5">Pass: password123</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all text-left shadow-inner hover:scale-[1.02]">
                <p className="font-semibold text-white mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5"><span className="w-2 h-2 bg-purple-500 rounded-full" />Admin Access</p>
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
