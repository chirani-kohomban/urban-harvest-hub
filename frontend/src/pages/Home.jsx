import { Link } from "react-router-dom";
import { useTranslation } from "../i18n";
import WeatherWidget from "../components/WeatherWidget";

function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-950 dark:to-gray-900 flex items-center py-12 px-6">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center w-full">
        
        {/* Hero Section */}
        <section className="md:col-span-7 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-green-700 dark:text-green-400 tracking-tight leading-none animate-fade-in">
            {t("home.title")}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-lg leading-relaxed">
            {t("home.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label={t("home.explore")}
            >
              {t("home.explore")}
            </Link>

            <Link
              to="/admin"
              className="bg-white/80 dark:bg-gray-800/80 border-2 border-green-600 dark:border-green-400 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-gray-700 font-bold px-8 py-3.5 rounded-xl shadow-sm transition text-center focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={t("home.admin")}
            >
              {t("home.admin")}
            </Link>
          </div>
        </section>

        {/* Weather Widget Panel */}
        <section className="md:col-span-5 flex justify-center md:justify-end">
          <WeatherWidget />
        </section>

      </div>

    </main>
  );
}

export default Home;