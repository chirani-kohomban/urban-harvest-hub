function Footer() {
  return (
    <footer className="bg-green-800 text-green-100 py-8 px-6 mt-12 border-t border-green-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-1">
            Urban Harvest Hub 🌱
          </h2>
          <p className="text-xs text-green-300 mt-1 max-w-sm">
            Empowering city dwellers to cultivate green spaces and build healthy, sustainable communities.
          </p>
        </div>

        <nav aria-label="Footer Links" className="flex gap-6 text-sm">
          <a href="#privacy" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-300 rounded px-1">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-300 rounded px-1">Terms of Service</a>
          <a href="#contact" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-300 rounded px-1">Contact Us</a>
        </nav>

      </div>

      <div className="border-t border-green-700/50 mt-6 pt-4 text-center text-xs text-green-400">
        © {new Date().getFullYear()} Urban Harvest Hub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
