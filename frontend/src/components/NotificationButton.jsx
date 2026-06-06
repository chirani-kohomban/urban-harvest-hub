import { useState, useEffect } from "react";
import axios from "axios";

function NotificationButton() {
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToNotifications = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    try {
      const status = await Notification.requestPermission();
      setPermission(status);

      if (status === "granted" && "serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        
        // Fetch VAPID public key
        const vapidRes = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/vapidPublicKey`);
        const { publicKey } = vapidRes.data;
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey)
        });

        // Send subscription to backend
        await axios.post(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, subscription);

        alert("Successfully subscribed to notifications!");
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
