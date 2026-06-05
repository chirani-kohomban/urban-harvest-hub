import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "../i18n";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";

function Events() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events");
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events/registrations");
      const regMap = {};
      res.data.forEach((r) => {
        regMap[r.event_id] = true;
      });
      setRegistrations(regMap);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  // Get unique categories for filtering
  const categories = ["all", ...new Set(events.map((e) => e.category).filter(Boolean))];

  // Filtering
  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          e.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950">
      
      <h1 className="text-3xl font-black mb-6 text-green-700 dark:text-green-400">
        {t("events.title")}
      </h1>

      {/* Filters Panel */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="flex-1 w-full">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        
        <div className="w-full md:w-64 flex gap-2 items-center mb-4">
          <label htmlFor="category-select" className="text-sm font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {t("events.category")}:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">{t("events.allCategories")}</option>
            {categories.filter(cat => cat !== "all").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-300">
          <div className="animate-pulse">Loading events...</div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center py-6 font-semibold">
          {error}
        </p>
      )}

      {/* Empty State */}
      {!loading && filteredEvents.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-semibold">
          No events found 😢
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isRegistered={registrations[event.id]}
            onRegister={handleRegister}
          />
        ))}
      </div>

    </div>
  );
}

export default Events;
