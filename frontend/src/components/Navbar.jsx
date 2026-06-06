import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import NotificationButton from "./NotificationButton";

function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const desktopLinkStyle = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
      : "text-white hover:text-yellow-200 transition pb-1 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded";

  const mobileLinkStyle = ({ isActive }) =>
    isActive
      ? "block w-full text-left px-5 py-3 text-yellow-300 font-bold bg-green-800 border-l-4 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-300"
      : "block w-full text-left px-5 py-3 text-white hover:bg-green-800 hover:text-yellow-200 transition border-l-4 border-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-300";

  return (
    <nav aria-label="Main Navigation" className="bg-green-700 text-white shadow-md relative" ref={menuRef}>

      {/* ── Desktop navbar (lg and above) ── */}
      <div className="hidden lg:flex justify-between items-center px-6 py-4 gap-4">
        <div className="flex gap-6 items-center">
          <NavLink
            to="/"
            aria-label="Urban Harvest Home"
            className="font-extrabold text-white text-lg tracking-wide hover:scale-105 transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded px-1"
          >
            <span>Urban Harvest</span>
            <span className="text-xl">🌱</span>
          </NavLink>

          <NavLink to="/products" className={desktopLinkStyle}>
            {t("navbar.products")}
          </NavLink>
          <NavLink to="/workshops" className={desktopLinkStyle}>
            {t("navbar.workshops")}
          </NavLink>
          <NavLink to="/events" className={desktopLinkStyle}>
            {t("navbar.events")}
          </NavLink>
          <NavLink to="/admin" className={desktopLinkStyle}>
            {t("navbar.admin")}
          </NavLink>
        </div>

        <div className="flex gap-3 items-center">
          <NotificationButton />
          <LanguageSwitcher />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-black/25 hover:bg-black/40 text-white px-3.5 py-1.5 rounded text-sm font-semibold transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>
      </div>

      {/* ── Mobile / tablet header (below lg) ── */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink
          to="/"
          aria-label="Urban Harvest Home"
          onClick={() => setMenuOpen(false)}
          className="font-extrabold text-white text-lg tracking-wide hover:scale-105 transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded px-1"
        >
          <span>Urban Harvest</span>
          <span className="text-xl">🌱</span>
        </NavLink>

        {/* Right-side controls */}
        <div className="flex items-center gap-2">
          <NotificationButton />
          <LanguageSwitcher />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-black/25 hover:bg-black/40 text-white px-3 py-1.5 rounded text-sm font-semibold transition flex items-center focus:outline-none focus:ring-2 focus:ring-yellow-300"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? "☀" : "🌙"}
          </button>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="bg-black/25 hover:bg-black/40 text-white w-9 h-9 rounded flex items-center justify-center text-xl font-bold transition focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 z-50 bg-green-700 border-t border-green-600 shadow-lg"
          role="menu"
          aria-label="Mobile navigation"
        >
          <NavLink
            to="/products"
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            {t("navbar.products")}
          </NavLink>
          <NavLink
            to="/workshops"
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            {t("navbar.workshops")}
          </NavLink>
          <NavLink
            to="/events"
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            {t("navbar.events")}
          </NavLink>
          <NavLink
            to="/admin"
            className={mobileLinkStyle}
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            {t("navbar.admin")}
          </NavLink>
        </div>
      )}

    </nav>
  );
}

export default Navbar;