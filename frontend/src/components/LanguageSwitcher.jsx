import { useTranslation } from "../i18n";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="lang-switcher" className="sr-only">
        Change Language
      </label>
      <select
        id="lang-switcher"
        value={i18n.language}
        onChange={handleLanguageChange}
        className="bg-black/25 text-white border border-white/20 rounded px-2.5 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 font-semibold cursor-pointer transition hover:bg-black/40"
      >
        <option value="en" className="text-gray-900 bg-white">English 🇬🇧</option>
        <option value="si" className="text-gray-900 bg-white">සිංහල 🇱🇰</option>
        <option value="ta" className="text-gray-900 bg-white">தமிழ் 🇱🇰</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
