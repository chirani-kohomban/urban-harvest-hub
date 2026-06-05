import { useState, useEffect } from "react";
import axios from "axios";

function NotificationButton() {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const subscribeToNotifications = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    try {
      const status = await Notification.requestPermission();
      setPermission(status);

      if (status === "granted") {
        // Send simulated subscription to backend
        await axios.post(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, {
          user_name: "Urban Farmer",
          endpoint: "mock-endpoint-url",
          keys: {
            auth: "mock-auth-key",
            p256dh: "mock-p256dh-key"
          }
        }).catch((err) => console.log("Backend subscription save skipped/mocked", err));

        // Show push notification
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification("Urban Harvest Hub 🌱", {
              body: "Successfully subscribed to notifications!",
              icon: "/pwa-192x192.png",
              badge: "/favicon.svg"
            });
          });
        } else {
          new Notification("Urban Harvest Hub 🌱", {
            body: "Successfully subscribed to notifications!",
            icon: "/pwa-192x192.png",
            badge: "/favicon.svg"
          });
        }
      }
    } catch (error) {
      console.error("Error subscribing to notifications:", error);
    }
  };

  if (!("Notification" in window)) {
    return null;
  }

  return (
    <button
      onClick={subscribeToNotifications}
      className={`flex items-center gap-1.5 px-3 py-1 text-sm rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
        permission === "granted"
          ? "bg-green-700 text-green-200 cursor-default"
          : permission === "denied"
          ? "bg-red-800 text-red-200 cursor-not-allowed"
          : "bg-black/25 text-white hover:bg-black/40"
      }`}
      disabled={permission === "denied" || permission === "granted"}
      aria-label={
        permission === "granted"
          ? "Notifications Subscribed"
          : permission === "denied"
          ? "Notifications Blocked"
          : "Subscribe to notifications"
      }
    >
      {permission === "granted" ? (
        <>
          <span>🔔</span>
          <span className="hidden md:inline">Subscribed</span>
        </>
      ) : permission === "denied" ? (
        <>
          <span>🔕</span>
          <span className="hidden md:inline">Blocked</span>
        </>
      ) : (
        <>
          <span className="animate-bounce">🔔</span>
          <span className="hidden md:inline">Subscribe</span>
        </>
      )}
    </button>
  );
}

export default NotificationButton;
