export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/60 py-12 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center shadow shadow-blue-600/35">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-white font-bold text-sm tracking-tight">StadiumAI</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-gray-400">GenAI-powered stadium operations assistant for the FIFA World Cup 2026 experience. Elevating tournament logistics.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
              <li><a href="/register" className="hover:text-white transition-colors">Register</a></li>
              <li><a href="/fan" className="hover:text-white transition-colors">Fan Demo</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Roles</h3>
            <ul className="space-y-2 text-sm">
              <li><span>Fans - Matchday Experience</span></li>
              <li><span>Volunteers - Operations Support</span></li>
              <li><span>Admins - Stadium Management</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} StadiumAI. Demo project for Hackathon. Not affiliated with FIFA.</p>
        </div>
      </div>
    </footer>
  );
}
