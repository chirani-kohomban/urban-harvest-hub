import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "../i18n";
import WorkshopCard from "../components/WorkshopCard";
import SearchBar from "../components/SearchBar";

function Workshops() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState([]);
  const [requests, setRequests] = useState({});
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch workshops and existing requests on mount
  useEffect(() => {
    fetchWorkshops();
    fetchRequests();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const res = await axios.get("http://localhost:5000/workshops");
      setWorkshops(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load workshops");
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/workshops/requests");
      // Map requests by workshop_id for the current dummy user
      const reqMap = {};
      res.data.forEach((r) => {
        reqMap[r.workshop_id] = r.status;
      });
      setRequests(reqMap);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequestJoin = (workshopId) => {
    navigate(`/workshops/${workshopId}`);
  };

  // Get unique locations for dropdown filter
  const locations = ["all", ...new Set(workshops.map((w) => w.location).filter(Boolean))];

  // Filtering
  const filteredWorkshops = workshops.filter((w) => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase()) || 
                          w.description.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = selectedLocation === "all" || w.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-950">
      
      <h1 className="text-3xl font-black mb-6 text-green-700 dark:text-green-400">
        {t("workshops.title")}
      </h1>

      {/* Filters Panel */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="flex-1 w-full">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        
        <div className="w-full md:w-64 flex gap-2 items-center mb-4">
          <label htmlFor="location-select" className="text-sm font-bold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {t("workshops.location")}:
          </label>
          <select
            id="location-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">{t("workshops.allLocations")}</option>
            {locations.filter(loc => loc !== "all").map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-300">
          <div className="animate-pulse">Loading workshops...</div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center py-6 font-semibold">
          {error}
        </p>
      )}

      {/* Empty State */}
      {!loading && filteredWorkshops.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-semibold">
          No workshops found 😢
        </div>
      )}

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredWorkshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            workshop={workshop}
            isRequested={requests[workshop.id]}
            onRequest={handleRequestJoin}
          />
        ))}
      </div>

    </div>
  );
}

export default Workshops;