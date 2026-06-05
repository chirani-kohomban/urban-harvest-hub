import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    navbar: {
      home: "Home",
      products: "Products",
      workshops: "Workshops",
      events: "Events",
      admin: "Admin"
    },
    home: {
      title: "Urban Harvest Hub 🌱",
      subtitle: "Discover sustainable eco-friendly products in a modern marketplace.",
      explore: "Explore Products",
      admin: "Admin Panel"
    },
    products: {
      title: "Products",
      searchPlaceholder: "Search products...",
      allCategories: "All Categories",
      category: "Category",
      price: "Price",
      loading: "Loading products...",
      error: "Failed to load products",
      empty: "No products found 😢",
      viewDetails: "View Details",
      delete: "Delete",
      food: "Food",
      lifestyle: "Lifestyle",
      education: "Education",
      ecoProducts: "Eco Products"
    },
    workshops: {
      title: "Workshops 🌿",
      searchPlaceholder: "Search workshops...",
      allLocations: "All Locations",
      date: "Date",
      location: "Location",
      slots: "Available Slots",
      requestJoin: "Request Join",
      requested: "Requested",
      viewDetails: "View Details",
      bookingTitle: "Book Workshop",
      userName: "Your Name",
      submit: "Submit Request",
      cancel: "Cancel",
      success: "Workshop request submitted successfully!"
    },
    events: {
      title: "Events 📅",
      searchPlaceholder: "Search events...",
      allCategories: "All Categories",
      date: "Date",
      location: "Location",
      category: "Category",
      register: "Register Now",
      registered: "Registered",
      viewDetails: "View Details",
      registrationTitle: "Register for Event",
      userName: "Your Name",
      submit: "Submit Registration",
      cancel: "Cancel",
      success: "Registered for event successfully!"
    },
    admin: {
      title: "Admin Dashboard",
      loginTitle: "Admin Login",
      username: "Username",
      password: "Password",
      signIn: "Sign In",
      invalidCreds: "Invalid credentials",
      stats: "Statistics",
      productCount: "Product Count",
      workshopCount: "Workshop Count",
      eventCount: "Event Count",
      requestCount: "Request Count",
      manageProducts: "Manage Products",
      manageWorkshops: "Manage Workshops",
      manageEvents: "Manage Events",
      workshopRequests: "Workshop Join Requests",
      eventRegistrations: "Event Registrations",
      addProduct: "Add Product",
      addWorkshop: "Add Workshop",
      addEvent: "Add Event",
      productName: "Product Name",
      price: "Price",
      selectCategory: "Select Category",
      titleLabel: "Title",
      descLabel: "Description",
      dateLabel: "Date",
      locationLabel: "Location",
      slotsLabel: "Total Slots",
      imageUrlLabel: "Image URL",
      status: "Status",
      action: "Actions",
      approve: "Approve",
      reject: "Reject",
      edit: "Edit",
      update: "Update",
      save: "Save"
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Success",
      dark: "Dark",
      light: "Light",
      search: "Search"
    }
  },
  si: {
    navbar: {
      home: "මුල් පිටුව",
      products: "නිෂ්පාදන",
      workshops: "වැඩමුළු",
      events: "වැඩසටහන්",
      admin: "පරිපාලක"
    },
    home: {
      title: "අර්බන් හාර්වස්ට් හබ් 🌱",
      subtitle: "නවීන වෙළඳපොලක තිරසාර පරිසර හිතකාමී නිෂ්පාදන සොයා ගන්න.",
      explore: "නිෂ්පාදන ගවේෂණය කරන්න",
      admin: "පරිපාලක පැනලය"
    },
    products: {
      title: "නිෂ්පාදන",
      searchPlaceholder: "නිෂ්පාදන සොයන්න...",
      allCategories: "සියලුම වර්ග",
      category: "වර්ගය",
      price: "මිල",
      loading: "නිෂ්පාදන පූරණය වෙමින් පවතී...",
      error: "නිෂ්පාදන පූරණය කිරීමට නොහැකි විය",
      empty: "නිෂ්පාදන කිසිවක් හමු නොවීය 😢",
      viewDetails: "විස්තර බලන්න",
      delete: "මකන්න",
      food: "ආහාර",
      lifestyle: "ජීවන රටාව",
      education: "අධ්‍යාපනය",
      ecoProducts: "පරිසර හිතකාමී නිෂ්පාදන"
    },
    workshops: {
      title: "වැඩමුළු 🌿",
      searchPlaceholder: "වැඩමුළු සොයන්න...",
      allLocations: "සියලුම ස්ථාන",
      date: "දිනය",
      location: "ස්ථානය",
      slots: "තිබෙන ඉඩ ප්‍රමාණය",
      requestJoin: "සම්බන්ධ වීමට ඉල්ලන්න",
      requested: "ඉල්ලුම් කර ඇත",
      viewDetails: "විස්තර බලන්න",
      bookingTitle: "වැඩමුළුව වෙන්කරවා ගැනීම",
      userName: "ඔබගේ නම",
      submit: "ඉල්ලීම ඉදිරිපත් කරන්න",
      cancel: "අවලංගු කරන්න",
      success: "වැඩමුළු ඉල්ලීම සාර්ථකව ඉදිරිපත් කරන ලදී!"
    },
    events: {
      title: "වැඩසටහන් 📅",
      searchPlaceholder: "වැඩසටහන් සොයන්න...",
      allCategories: "සියලුම වර්ග",
      date: "දිනය",
      location: "ස්ථානය",
      category: "වර්ගය",
      register: "දැන් ලියාපදිංචි වන්න",
      registered: "ලියාපදිංචි වී ඇත",
      viewDetails: "විස්තර බලන්න",
      registrationTitle: "වැඩසටහන සඳහා ලියාපදිංචි වන්න",
      userName: "ඔබගේ නම",
      submit: "ලියාපදිංචිය ඉදිරිපත් කරන්න",
      cancel: "අවලංගු කරන්න",
      success: "වැඩසටහන සඳහා සාර්ථකව ලියාපදිංචි විය!"
    },
    admin: {
      title: "පරිපාලක පැනලය",
      loginTitle: "පරිපාලක ඇතුල්වීම",
      username: "පරිශීලක නාමය",
      password: "මුරපදය",
      signIn: "ඇතුල් වන්න",
      invalidCreds: "පරිශීලක නාමය හෝ මුරපදය වැරදියි",
      stats: "සංඛ්‍යාලේඛන",
      productCount: "නිෂ්පාදන සංඛ්‍යාව",
      workshopCount: "වැඩමුළු සංඛ්‍යාව",
      eventCount: "වැඩසටහන් සංඛ්‍යාව",
      requestCount: "ඉල්ලීම් සංඛ්‍යාව",
      manageProducts: "නිෂ්පාදන කළමනාකරණය",
      manageWorkshops: "වැඩමුළු කළමනාකරණය",
      manageEvents: "වැඩසටහන් කළමනාකරණය",
      workshopRequests: "වැඩමුළු සම්බන්ධ වීමේ ඉල්ලීම්",
      eventRegistrations: "වැඩසටහන් ලියාපදිංචි කිරීම්",
      addProduct: "නිෂ්පාදනයක් එක් කරන්න",
      addWorkshop: "වැඩමුළුවක් එක් කරන්න",
      addEvent: "වැඩසටහනක් එක් කරන්න",
      productName: "නිෂ්පාදන නාමය",
      price: "මිල",
      selectCategory: "වර්ගය තෝරන්න",
      titleLabel: "මාතෘකාව",
      descLabel: "විස්තරය",
      dateLabel: "දිනය",
      locationLabel: "ස්ථානය",
      slotsLabel: "මුළු ඉඩ ප්‍රමාණය",
      imageUrlLabel: "රූප සබැඳිය (Image URL)",
      status: "තත්වය",
      action: "ක්‍රියාකාරකම්",
      approve: "අනුමත කරන්න",
      reject: "ප්‍රතික්ෂේප කරන්න",
      edit: "සංස්කරණය කරන්න",
      update: "යාවත්කාලීන කරන්න",
      save: "සුරකින්න"
    },
    common: {
      loading: "පූරණය වෙමින්...",
      error: "දෝෂයක් සිදු විය",
      success: "සාර්ථකයි",
      dark: "අඳුරු",
      light: "එළිදරව්",
      search: "සොයන්න"
    }
  },
  ta: {
    navbar: {
      home: "முகப்பு",
      products: "தயாரிப்புகள்",
      workshops: "பயிற்சிப் பட்டறைகள்",
      events: "நிகழ்வுகள்",
      admin: "நிர்வாகி"
    },
    home: {
      title: "அர்பன் ஹார்வெஸ்ட் ஹப் 🌱",
      subtitle: "நவீன சந்தையில் நிலையான சூழல் நட்பு தயாரிப்புகளைக் கண்டறியவும்.",
      explore: "தயாரிப்புகளை ஆராயுங்கள்",
      admin: "நிர்வாக குழு"
    },
    products: {
      title: "தயாரிப்புகள்",
      searchPlaceholder: "தயாரிப்புகளைத் தேடுங்கள்...",
      allCategories: "அனைத்து பிரிவுகள்",
      category: "பிரிவு",
      price: "விலை",
      loading: "தயாரிப்புகள் ஏற்றப்படுகின்றன...",
      error: "தயாரிப்புகளை ஏற்ற முடியவில்லை",
      empty: "தயாரிப்புகள் எதுவும் கிடைக்கவில்லை 😢",
      viewDetails: "விவரங்களைப் பார்க்கவும்",
      delete: "நீக்கு",
      food: "உணவு",
      lifestyle: "வாழ்க்கை முறை",
      education: "கல்வி",
      ecoProducts: "சுழல் நட்பு பொருட்கள்"
    },
    workshops: {
      title: "பயிற்சிப் பட்டறைகள் 🌿",
      searchPlaceholder: "பயிற்சிப் பட்டறைகளைத் தேடுங்கள்...",
      allLocations: "அனைத்து இடங்கள்",
      date: "தேதி",
      location: "இடம்",
      slots: "கிடைக்கக்கூடிய இடங்கள்",
      requestJoin: "இணையக் கோருங்கள்",
      requested: "கோரப்பட்டது",
      viewDetails: "விவரங்களைப் பார்க்கவும்",
      bookingTitle: "பயிற்சிப் பட்டறை முன்பதிவு",
      userName: "உங்கள் பெயர்",
      submit: "கோரிக்கையைச் சமர்ப்பிக்கவும்",
      cancel: "ரத்துசெய்",
      success: "பயிற்சிப் பட்டறை கோரிக்கை வெற்றிகரமாகச் சமர்ப்பிக்கப்பட்டது!"
    },
    events: {
      title: "நிகழ்வுகள் 📅",
      searchPlaceholder: "நிகழ்வுகளைத் தேடுங்கள்...",
      allCategories: "அனைத்து பிரிவுகள்",
      date: "தேதி",
      location: "இடம்",
      category: "வகை",
      register: "இப்போது பதிவு செய்யுங்கள்",
      registered: "பதிவு செய்யப்பட்டுள்ளது",
      viewDetails: "விவரங்களைப் பார்க்கவும்",
      registrationTitle: "நிகழ்வுக்குப் பதிவு செய்யுங்கள்",
      userName: "உங்கள் பெயர்",
      submit: "பதிவைச் சமர்ப்பிக்கவும்",
      cancel: "ரத்துசெய்",
      success: "நிகழ்வில் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!"
    },
    admin: {
      title: "நிர்வாகி டாஷ்போர்டு",
      loginTitle: "நிர்வாகி உள்நுழைவு",
      username: "பயனர் பெயர்",
      password: "கடவுச்சொல்",
      signIn: "உள்நுழையவும்",
      invalidCreds: "பயனர் பெயர் அல்லது கடவுச்சொல் தவறானது",
      stats: "புள்ளிவிவரங்கள்",
      productCount: "தயாரிப்பு எண்ணிக்கை",
      workshopCount: "பயிற்சிப் பட்டறை எண்ணிக்கை",
      eventCount: "நிகழ்வு எண்ணிக்கை",
      requestCount: "கோரிக்கை எண்ணிக்கை",
      manageProducts: "தயாரிப்புகளை நிர்வகித்தல்",
      manageWorkshops: "பயிற்சிப் பட்டறைகளை நிர்வகித்தல்",
      manageEvents: "நிகழ்வுகளை நிர்வகித்தல்",
      workshopRequests: "பயிற்சிப் பட்டறை சேர்க்கை கோரிக்கைகள்",
      eventRegistrations: "நிகழ்வு பதிவுகள்",
      addProduct: "தயாரிப்பைச் சேர்க்கவும்",
      addWorkshop: "பயிற்சிப் பட்டறையைச் சேர்க்கவும்",
      addEvent: "நிகழ்வைச் சேர்க்கவும்",
      productName: "தயாரிப்பு பெயர்",
      price: "விலை",
      selectCategory: "வகையைத் தேர்ந்தெடுக்கவும்",
      titleLabel: "தலைப்பு",
      descLabel: "விளக்கம்",
      dateLabel: "தேதி",
      locationLabel: "இடம்",
      slotsLabel: "மொத்த இடங்கள்",
      imageUrlLabel: "பட இணைப்பு (Image URL)",
      status: "நிலை",
      action: "செயல்கள்",
      approve: "அங்கீகரி",
      reject: "நிராகரி",
      edit: "திருத்து",
      update: "புதுப்பி",
      save: "சேமி"
    },
    common: {
      loading: "ஏற்றப்படுகிறது...",
      error: "ஒரு பிழை ஏற்பட்டது",
      success: "வெற்றி",
      dark: "இருள்",
      light: "ஒளி",
      search: "தேடு"
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const changeLanguage = (lng) => {
    if (translations[lng]) {
      setLanguage(lng);
      localStorage.setItem("language", lng);
    }
  };

  const t = (keyPath) => {
    const keys = keyPath.split(".");
    let current = translations[language];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = translations.en;
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return keyPath; // return key if not found in English
          }
        }
        return fallback;
      }
    }
    return current;
  };

  const i18n = {
    changeLanguage,
    language
  };

  return (
    <LanguageContext.Provider value={{ t, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
