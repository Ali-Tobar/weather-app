# 🌦️ Weather App

A fast, responsive, and bilingual weather application built with **React 19**, **Vite**, and **Material UI**. It fetches live weather data from the **OpenWeatherMap API** for major Arab cities, featuring an elegant glassmorphism UI and a clean component architecture.

---

## 📸 Preview

![Weather App Preview](./design/design.jpg)

---

## 🌟 Features

- **Real-Time Weather Data**: Displays current temperature, feels-like temperature, humidity, wind speed, and atmospheric pressure.
- **Accurate 24-Hour Min/Max Forecast**: Calculates true daily highs and lows by analyzing the next 24-hour intervals from the forecast API.
- **Bilingual Interface (Arabic & English)**:
  - One-click language switching.
  - Automatic layout direction switching (`RTL` / `LTR`).
  - Localized dates using `Intl.DateTimeFormat`.
- **Preference Persistence (`localStorage`)**: Remembers the selected city and language across browser reloads.
- **Custom Vector Icons**: Crisp, handcrafted SVG icons for sun, moon, clouds, and rain that scale seamlessly across devices.
- **Loading Indicators**: Smooth spinner animations during asynchronous API requests.

---

## 🏗️ Project Architecture

The project follows the **Separation of Concerns (SoC)** principle to keep the UI decoupled from the data layer:

```text
weather-app/
├── public/                 # Static fonts (IBM Plex Sans Arabic)
├── src/
│   ├── app/
│   │   └── store.js             # Central Redux store configuration
│   ├── features/
│   │   └── weatherApi/
│   │       └── weatherApiSlice.js # Async Thunk, weather slice & extraReducers
│   ├── Components/
│   │   ├── WeatherCard.jsx      # Weather UI connected via useSelector & useDispatch
│   │   ├── WeatherCard.css      # Glassmorphism styling & animations
│   │   └── WeatherIcons.jsx     # Modular SVG weather icons
│   ├── services/
│   │   └── weatherApi.js        # Axios instance, cities config & forecast calculations
│   ├── App.jsx                  # Root layout, language state & direction handling
│   ├── main.jsx                 # React root wrapped in Redux Provider & MUI Theme
│   └── App.css                  # Global layout styles
├── .env                         # Secret API key (git-ignored)
└── package.json
```

---

## 🔄 State Management Refactor: Local State to Redux Toolkit

This branch (`feature/redux-weather`) represents an architectural migration from local React state (`useState` & `useEffect`) to a centralized store architecture powered by **Redux Toolkit (RTK)** and **React-Redux**.

### Why the Refactor?
- **Decoupling Business Logic:** Extracted asynchronous network requests and state coordination from UI components into a dedicated Redux Slice (`weatherApiSlice.js`).
- **Standardized Async Lifecycle:** Replaced manual boolean loading flags with `createAsyncThunk`, leveraging automatic promise lifecycle actions (`pending`, `fulfilled`, `rejected`).
- **Single Source of Truth:** Centralized weather data, loading spinners, and network error messages into a single global Store (`src/app/store.js`).
- **Preserved Domain Logic:** Maintained the modular SVG system (`WeatherIcons.jsx`), localized date formatters, and the 24-hour min/max forecast algorithm intact.

### Architectural Comparison

| Aspect | Initial Version (`main`) | Refactored Version (`feature/redux-weather`) |
|---|---|---|
| **State Scope** | Local component state via `useState` | Centralized global store via `createSlice` |
| **Async Fetching** | `useEffect` with cleanup (`isCancelled`) | `createAsyncThunk` handled via `extraReducers` |
| **Component Role** | Managed fetch cycles and internal states | Pure presentation & action dispatching |
| **Error Handling** | Local `try/catch` with manual error state | Integrated `rejectWithValue` with `extraReducers` |

---

## 🧠 Key Implementation Decisions

### 1. Data Normalization & Unit Conversion
The OpenWeatherMap API returns wind speed in meters per second (m/s). For a better user experience, it is converted to kilometers per hour (km/h) before reaching the UI:

```javascript
windSpeed: Math.round(data.wind.speed * 3.6)
```

### 2. Overcoming Current Weather API Limitations
The free `/weather` endpoint provides minimum and maximum temperatures scoped only to the exact moment of the request.
- **Approach**: We fetch the `/forecast` endpoint and inspect the first 8 intervals (covering the next 24 hours).
- **Helper Function**: Extracted the calculation into a clean `getMinMaxTemp` function that iterates through the upcoming readings to extract the true daily high and low.

### 3. Handling Network Race Conditions
When switching rapidly between cities, a slower network response from a previous selection could overwrite newer data.
- **Approach**: Used a cleanup flag (`isCancelled`) inside the `useEffect` hook to discard stale responses:

```javascript
useEffect(() => {
  let isCancelled = false;

  getCurrentWeather(selectedCity, locale).then((data) => {
    if (!isCancelled) {
      setWeather(data);
      setLoading(false);
    }
  });

  return () => {
    isCancelled = true;
  };
}, [selectedCity, locale]);
```

### 4. Lazy State Initialization
To avoid unnecessary synchronous reads from `localStorage` on every re-render, we pass an initializer function to `useState`:

```javascript
const [locale, setLocale] = useState(() => {
  return localStorage.getItem("weather_locale") || "ar";
});
```

### 5. Component Modularization
Extracted all raw SVG icons from `WeatherCard.jsx` into a dedicated `WeatherIcons.jsx` file with a `WeatherVisual` router component, reducing file size and improving maintainability.

---

## 💡 Learning Milestone: My First API Integration

This project was my first hands-on experience integrating a real-world third-party REST API into a React application. Moving away from static mock data helped me understand:

- **The Request/Response Cycle**: How HTTP requests work in practice, passing query parameters (`lat`, `lon`, `appid`, `units`), and reading response objects.
- **Asynchronous JavaScript**: Managing Promises with `async/await` and handling network delays cleanly using `loading` states.
- **Data Normalization**: Realizing that API data isn't always ready for immediate display—requiring data cleanup, unit conversions (`m/s` to `km/h`), and edge-case handling before passing it to UI components.
- **Defensive UI Rendering**: Using optional chaining (`?.`) and fallback values to prevent crashes before asynchronous data arrives.

---

## 🛠️ Tech Stack

- **React 19**
- **Redux Toolkit (RTK)** & **React-Redux**
- **Vite**
- **Axios**
- **Material UI (MUI)**
- **OpenWeatherMap API**
- **CSS3** (Glassmorphism & Flexbox/Grid)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Ali-Tobar/weather-app.git
cd weather-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the environment variable
Create a `.env` file in the root directory:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Start the development server
```bash
npm run dev
```

---
## 🛠️ Notes & Acknowledgments

- **Custom SVG Icons**: Generative AI was used to assist in generating the raw mathematical SVG vector paths and glow filters (`SunIcon`, `MoonIcon`, etc.) to achieve a high-definition aesthetic without heavy external icon packages. All icons were then structured and modularized into a dedicated `WeatherIcons.jsx` component.
---
## 👨‍💻 Author

**Ali Tobar**  
Frontend Developer | Computer Science Student  
[GitHub Profile](https://github.com/Ali-Tobar)
