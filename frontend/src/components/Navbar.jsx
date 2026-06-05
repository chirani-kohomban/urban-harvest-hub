import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import NotificationButton from "./NotificationButton";

function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded"
      : "text-white hover:text-yellow-200 transition pb-1 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded";

  return (
    <nav aria-label="Main Navigation" className="flex flex-col md:flex-row justify-between items-center p-4 bg-green-700 text-white shadow-md gap-4">
      
      <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-between w-full md:w-auto">
        <NavLink to="/" aria-label="Urban Harvest Home" className="font-extrabold text-white text-lg tracking-wide hover:scale-105 transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded px-1">
          <span>Urban Harvest</span>
          <span className="text-xl">🌱</span>
        </NavLink>

        <div className="flex gap-4 md:gap-6 items-center">
          <NavLink to="/products" className={linkStyle}>
            {t("navbar.products")}
          </NavLink>

          <NavLink to="/workshops" className={linkStyle}>
            {t("navbar.workshops")}
          </NavLink>

          <NavLink to="/events" className={linkStyle}>
            {t("navbar.events")}
          </NavLink>

          <NavLink to="/admin" className={linkStyle}>
            {t("navbar.admin")}
          </NavLink>
        </div>
      </div>

      <div className="flex gap-3 items-center justify-end w-full md:w-auto">
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

    </nav>
  );
}

export default Navbar;