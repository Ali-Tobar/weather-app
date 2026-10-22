import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import WeatherCard from "./Components/WeatherCard";
import "./App.css";
function App() {
  // Lazy state initialization: read saved language once on mount
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("weather_locale") || "ar";
  });

  // Persist language selection to localStorage on changes
  useEffect(() => {
    localStorage.setItem("weather_locale", locale);
  }, [locale]);

  // Toggle between Arabic and English locales
  function handleLanguageToggle() {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  }

  // WeatherCard manages fetching internally after reading saved city from localStorage,
  // avoiding duplicate concurrent API calls and keeping App.jsx clean.
  return (
    <div className="app-container" dir={locale === "ar" ? "rtl" : "ltr"}>
      <Container maxWidth="sm">
        <WeatherCard locale={locale} onLanguageToggle={handleLanguageToggle} />
      </Container>
    </div>
  );
}

export default App;
