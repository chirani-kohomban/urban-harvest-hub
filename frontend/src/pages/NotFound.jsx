import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 text-center">

      {/* Big Error Code */}
      <h1 className="text-8xl font-extrabold text-red-500 mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
        The page you are looking for doesn’t exist or may have been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>

    </div>
  );
}

export default NotFound;