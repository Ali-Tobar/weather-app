import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpeedIcon from "@mui/icons-material/Speed";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { CITIES } from "../services/weatherApi";
import { fetchWeather } from "../features/weatherApi/weatherApiSlice";
import { WeatherVisual } from "./WeatherIcons";
import "./WeatherCard.css";

function WeatherCard({ locale, onLanguageToggle }) {
  const dispatch = useDispatch();

  // Read weather data, loading state, and error message directly from Redux
  const {
    weatherData: weather,
    isLoading: loading,
    error,
  } = useSelector((state) => state.weather);

  // Lazy state initialization: restore last chosen city from localStorage
  const [selectedCity, setSelectedCity] = useState(() => {
    const savedId = localStorage.getItem("weather_city");
    const found = CITIES.find((c) => c.id === savedId);
    return found || CITIES[0];
  });

  // Fetch weather data via Redux Thunk whenever selected city or locale changes
  useEffect(() => {
    localStorage.setItem("weather_city", selectedCity.id);
    dispatch(fetchWeather({ city: selectedCity, locale }));
  }, [dispatch, selectedCity, locale]);

  // Format today's date dynamically based on active locale
  const today = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="weather-card">
      {/* 1. Top Toolbar: City selection chips & language toggle */}
      <div className="top-toolbar">
        <div className="cities-bar">
          {CITIES.map((city) => (
            <button
              key={city.id}
              type="button"
              className={`city-chip ${selectedCity.id === city.id ? "active" : ""}`}
              onClick={() => {
                if (selectedCity.id !== city.id) {
                  setSelectedCity(city);
                }
              }}
            >
              {locale === "ar" ? city.nameAr : city.nameEn}
            </button>
          ))}
        </div>

        {/* Language toggle button */}
        <button
          type="button"
          className="lang-toggle-btn"
          onClick={onLanguageToggle}
          title={locale === "ar" ? "Switch to English" : "التحويل للعربية"}
        >
          <LanguageIcon className="btn-icon" fontSize="small" />
          <span>{locale === "ar" ? "English" : "عربي"}</span>
        </button>
      </div>

      <hr className="divider subtle-divider" />

      {/* 2. Loading State: Spinner while fetching data */}
      {loading ? (
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <Typography className="loading-text">
            {locale === "ar" ? "جارٍ جلب حالة الطقس..." : "Fetching weather..."}
          </Typography>
        </div>
      ) : error ? (
        /* Error State with Retry Button */
        <div className="weather-loading" style={{ textAlign: "center" }}>
          <Typography style={{ color: "#ffcdd2", marginBottom: "12px" }}>
            {locale === "ar"
              ? `تعذر جلب البيانات: ${error}`
              : `Failed to load weather: ${error}`}
          </Typography>
          <button
            type="button"
            className="city-chip active"
            onClick={() => dispatch(fetchWeather({ city: selectedCity, locale }))}
          >
            {locale === "ar" ? "إعادة المحاولة" : "Retry"}
          </button>
        </div>
      ) : (
        <>
          {/* 3. Card Header: City name, localized date, and condition badge */}
          <div className="card-header">
            <div className="header-text">
              <div className="city-row">
                <LocationOnIcon className="location-pin" />
                <Typography variant="h2" className="city-name">
                  {weather?.city}
                </Typography>
              </div>
              <Typography variant="body1" className="date-time">
                {today}
              </Typography>
            </div>
            <div className="weather-desc-badge">
              {weather?.description}
            </div>
          </div>

          <hr className="divider" />

          {/*  Card Body: Main temperature, feels-like, 24h min/max, and SVG icon */}
          <div className="card-body">
            <div className="temp-info">
              <div className="temp-row">
                <Typography variant="h1" className="main-temp">
                  {weather?.temperature}°
                </Typography>
                <span className="feels-like">
                  {locale === "ar" ? "كأنه" : "Feels like"} {weather?.feelsLike}°
                </span>
              </div>

              {/* 24-hour Min & Max temperature badge */}
              <div className="min-max-badge">
                <span className="min-tag">
                  <ArrowDownwardIcon className="arrow-icon arrow-down" fontSize="small" />
                  <span>{locale === "ar" ? "الصغرى" : "Min"} {weather?.minTemperature}°</span>
                </span>
                <span className="max-tag">
                  <ArrowUpwardIcon className="arrow-icon arrow-up" fontSize="small" />
                  <span>{locale === "ar" ? "الكبرى" : "Max"} {weather?.maxTemperature}°</span>
                </span>
              </div>
            </div>

            {/* Dynamic vector SVG weather icon */}
            <div className="icon-wrapper">
              <WeatherVisual iconCode={weather?.icon} />
            </div>
          </div>

          {/* 5. Metrics Grid: Material UI icons for weather indicators */}
          <div className="metrics-grid">
            <div className="metric-card">
              <WaterDropIcon className="metric-mui-icon drop-color" />
              <span className="metric-label">{locale === "ar" ? "الرطوبة" : "Humidity"}</span>
              <span className="metric-value">{weather?.humidity}%</span>
            </div>

            <div className="metric-card">
              <AirIcon className="metric-mui-icon wind-color" />
              <span className="metric-label">{locale === "ar" ? "الرياح" : "Wind"}</span>
              <span className="metric-value">
                {weather?.windSpeed} {locale === "ar" ? "كم/س" : "km/h"}
              </span>
            </div>

            <div className="metric-card">
              <ThermostatIcon className="metric-mui-icon temp-color" />
              <span className="metric-label">{locale === "ar" ? "الإحساس" : "Feels"}</span>
              <span className="metric-value">{weather?.feelsLike}°</span>
            </div>

            <div className="metric-card">
              <SpeedIcon className="metric-mui-icon press-color" />
              <span className="metric-label">{locale === "ar" ? "الضغط" : "Pressure"}</span>
              <span className="metric-value">{weather?.pressure} hPa</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherCard;
