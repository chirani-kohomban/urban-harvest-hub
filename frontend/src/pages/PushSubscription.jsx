import { useState, useEffect } from "react";
import axios from "axios";

// Helper to convert VAPID key
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function PushSubscription() {
  const [status, setStatus] = useState("Not subscribed");
  const [error, setError] = useState("");

  const subscribe = async () => {
    try {
      // Explicitly request notification permission
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          throw new Error("Notification permission denied");
        }
      }

      // Get VAPID public key from backend
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/notifications/vapidPublicKey`);
      const publicKey = data.publicKey;

      // Register service worker (should already be registered in main.jsx)
      const registration = await navigator.serviceWorker.ready;

      // Subscribe
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      // Send subscription to backend
      await axios.post(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, subscription);
      setStatus("Subscribed successfully");
    } catch (err) {
      console.error(err);
      setError(err.message || "Subscription failed");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Push Subscription</h3>
      <p className="mb-2 text-gray-600 dark:text-gray-300">Click the button to register for push notifications.</p>
      <button
        onClick={subscribe}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Subscribe
      </button>
      {status && <p className="mt-2 text-green-600">{status}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
