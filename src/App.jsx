import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import WeatherCard from "./Components/WeatherCard";
import "./App.css";

function App() {
  // حفظ واسترجاع اللغة من localStorage لتذكر اختيار المستخدم
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("weather_locale") || "ar";
  });

  // تحديث التخزين عند تغير اللغة
  useEffect(() => {
    localStorage.setItem("weather_locale", locale);
  }, [locale]);

  // دالة تبديل اللغة
  function handleLanguageToggle() {
    setLocale((prev) => (prev === "ar" ? "en" : "ar"));
  }

  return (
    <div className="app-container" dir={locale === "ar" ? "rtl" : "ltr"}>
      <Container maxWidth="sm">
        <WeatherCard
          locale={locale}
          onLanguageToggle={handleLanguageToggle}
        />
      </Container>
    </div>
  );
}

export default App;