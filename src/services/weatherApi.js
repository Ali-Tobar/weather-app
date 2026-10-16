import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// قائمة المدن السريعة المدعومة
export const CITIES = [
  {
    id: "riyadh",
    nameAr: "الرياض",
    nameEn: "Riyadh",
    lat: 24.7136,
    lon: 46.6753,
  },
  { id: "jeddah", nameAr: "جدة", nameEn: "Jeddah", lat: 21.4858, lon: 39.1925 },
  {
    id: "makkah",
    nameAr: "مكة المكرمة",
    nameEn: "Makkah",
    lat: 21.3891,
    lon: 39.8579,
  },
  {
    id: "cairo",
    nameAr: "القاهرة",
    nameEn: "Cairo",
    lat: 30.0444,
    lon: 31.2357,
  },
];

// حساب الصغرى والكبرى لليوم (أول 24 ساعة) من قائمة التوقعات
export function getMinMaxTemp(forecastList = [], initialMin = null, initialMax = null) {
  if (!forecastList?.length) return { minTemp: initialMin, maxTemp: initialMax };

  let minTemp = initialMin ?? forecastList[0].main.temp_min;
  let maxTemp = initialMax ?? forecastList[0].main.temp_max;

  const next24 = forecastList.slice(0, 8);
  for (const item of next24) {
    const currentMin = item.main.temp_min;
    const currentMax = item.main.temp_max;

    if (currentMin < minTemp) minTemp = currentMin;
    if (currentMax > maxTemp) maxTemp = currentMax;
  }

  return { minTemp, maxTemp };
}

// دالة جلب الطقس الحالية
export async function getCurrentWeather(city = CITIES[0], locale = "ar") {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=${locale}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=${locale}`;

  // 1. طلب بيانات الطقس الحالية
  const response = await axios.get(weatherUrl);
  const data = response.data;

  let minTemp = data.main.temp_min;
  let maxTemp = data.main.temp_max;

  // 2. طلب التوقعات واستخدام الدالة المساعدة لحساب الصغرى والكبرى لليوم بالكامل
  try {
    const forecastResponse = await axios.get(forecastUrl);
    const result = getMinMaxTemp(forecastResponse.data?.list, minTemp, maxTemp);
    minTemp = result.minTemp;
    maxTemp = result.maxTemp;
  } catch (error) {
    console.log("تعذر جلب التوقعات:", error);
  }

  return {
    city: locale === "ar" ? city.nameAr : city.nameEn,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    pressure: data.main.pressure,
    minTemperature: Math.round(minTemp),
    maxTemperature: Math.round(maxTemp),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}
