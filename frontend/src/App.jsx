import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Workshops from "./pages/Workshops";
import WorkshopDetail from "./pages/WorkshopDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Footer from "./components/Footer";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-250 transition-colors duration-300">
        
        {/* Navbar always visible */}
        <Navbar />

        {/* Main Content Area */}
        <div className="flex-grow">
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* Workshops module */}
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/workshops/:id" element={<WorkshopDetail />} />

            {/* Events module */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />

            {/* Admin panel */}
            <Route path="/admin" element={<Admin />} />

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Reusable Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;