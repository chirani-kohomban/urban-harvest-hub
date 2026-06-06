import { Link } from "react-router-dom";
import { useTranslation } from "../i18n";

function EventCard({ event, isRegistered, onRegister, onDelete }) {
  const { t } = useTranslation();

  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col">
      {/* Cover Image */}
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 bg-gray-200 dark:bg-gray-705">
            📅 No Image Available
          </div>
        )}
        <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
            {event.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <p className="flex items-center gap-1.5">
              <span>📅</span>
              <strong>{t("events.date")}:</strong> {formattedDate}
            </p>
            <p className="flex items-center gap-1.5">
              <span>📍</span>
              <strong>{t("events.location")}:</strong> {event.location}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-4 mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
          <Link
            to={`/events/${event.id}`}
            className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-1"
            aria-label={`View details of ${event.title}`}
          >
            {t("events.viewDetails")}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRegister && onRegister(event.id)}
              disabled={isRegistered}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
                isRegistered
                  ? "bg-gray-400 dark:bg-gray-600 cursor-default"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              aria-label={isRegistered ? `Already registered for ${event.title}` : `Register for ${event.title}`}
            >
              {isRegistered ? t("events.registered") : t("events.register")}
            </button>

            {onDelete && (
              <button
                onClick={() => onDelete(event.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded transition shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Delete ${event.title}`}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
