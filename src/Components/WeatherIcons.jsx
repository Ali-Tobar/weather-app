

// Standalone vector SVG weather icons with custom gradients and glow effects
export function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="weather-svg-icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff275" />
          <stop offset="60%" stopColor="#fbb714" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <filter id="sunGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#f59e0b" floodOpacity="0.55" />
        </filter>
      </defs>
      <circle cx="60" cy="60" r="34" fill="url(#sunGrad)" filter="url(#sunGlow)" />
    </svg>
  );
}

export function MoonIcon(props) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="weather-svg-icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id="moonGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#facc15" />
        </radialGradient>
        <filter id="moonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#facc15" floodOpacity="0.6" />
        </filter>
      </defs>
      <circle cx="34" cy="36" r="2.5" fill="#ffffff" opacity="0.9" />
      <circle cx="88" cy="30" r="2" fill="#ffffff" opacity="0.8" />
      <circle cx="28" cy="78" r="1.8" fill="#ffffff" opacity="0.75" />
      <circle cx="86" cy="80" r="2.2" fill="#ffffff" opacity="0.85" />
      <path
        d="M68 28a34 34 0 1 0 24 58 32 32 0 0 1-24-58z"
        fill="url(#moonGrad)"
        filter="url(#moonGlow)"
      />
    </svg>
  );
}

export function SunCloudIcon(props) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="weather-svg-icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient id="scSunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe566" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <linearGradient id="scCloudGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <filter id="scCloudShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#0284c7" floodOpacity="0.35" />
        </filter>
        <filter id="scSunGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#f59e0b" floodOpacity="0.5" />
        </filter>
      </defs>
      <circle cx="76" cy="46" r="26" fill="url(#scSunGrad)" filter="url(#scSunGlow)" />
      <g filter="url(#scCloudShadow)">
        <path
          d="M36 82h52a18 18 0 0 0 4-35.5 24 24 0 0 0-45-6.5A17 17 0 0 0 36 82z"
          fill="url(#scCloudGrad)"
        />
      </g>
    </svg>
  );
}

export function CloudyIcon(props) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="weather-svg-icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="cCloudGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfe3fb" />
        </linearGradient>
        <filter id="cCloudShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#0369a1" floodOpacity="0.35" />
        </filter>
      </defs>
      <path
        d="M32 78h56a20 20 0 0 0 5-39 26 26 0 0 0-49-7A19 19 0 0 0 32 78z"
        fill="url(#cCloudGrad)"
        filter="url(#cCloudShadow)"
      />
    </svg>
  );
}

export function RainIcon(props) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="weather-svg-icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="rCloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
        <filter id="rShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0369a1" floodOpacity="0.35" />
        </filter>
      </defs>
      <path
        d="M30 66h58a18 18 0 0 0 4-35.5 24 24 0 0 0-46-6.5A17 17 0 0 0 30 66z"
        fill="url(#rCloud)"
        filter="url(#rShadow)"
      />
      <line x1="42" y1="76" x2="38" y2="90" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      <line x1="58" y1="76" x2="54" y2="90" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      <line x1="74" y1="76" x2="70" y2="90" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// Visual router: maps OpenWeatherMap icon code to corresponding SVG component
export function WeatherVisual({ iconCode, ...props }) {
  if (iconCode === "01d") return <SunIcon {...props} />;
  if (iconCode === "01n") return <MoonIcon {...props} />;
  if (iconCode === "02d" || iconCode === "02n") return <SunCloudIcon {...props} />;
  if (iconCode === "03d" || iconCode === "03n" || iconCode === "04d" || iconCode === "04n") {
    return <CloudyIcon {...props} />;
  }
  if (iconCode === "09d" || iconCode === "10d" || iconCode === "09n" || iconCode === "10n") {
    return <RainIcon {...props} />;
  }
  return <SunCloudIcon {...props} />;
}

export default WeatherVisual;
