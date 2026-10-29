export interface WeatherLocation {
  name: string;
  region?: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperatureC: number;
  temperatureF: number;
  apparentTempC: number;
  relativeHumidity: number;
  precipitationMm: number;
  windSpeedKmH: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  maxTempC: number;
  minTempC: number;
  precipitationSumMm: number;
  precipitationProbability: number;
  weatherCode: number;
  weatherDescription: string;
}

export interface AgroAdvisory {
  sprayCondition: 'Optimal' | 'Caution' | 'Poor';
  sprayReason: string;
  fungalRisk: 'Low' | 'Moderate' | 'High';
  fungalReason: string;
  irrigationAdvice: 'Irrigate deeply' | 'Light watering' | 'Hold irrigation (Rain forecast)';
  irrigationReason: string;
  frostRisk: boolean;
  climateZone: 'Temperate' | 'Subtropical' | 'Arid / Semi-arid' | 'Tropical' | 'Continental';
  estimatedAnnualRainfallMm: number;
}

export interface WeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: ForecastDay[];
  advisory: AgroAdvisory;
  updatedAt: string;
}

// Preset agricultural reference regions
export const PRESET_REGIONS: WeatherLocation[] = [
  { name: 'Salinas Valley', region: 'California', country: 'United States', latitude: 36.6777, longitude: -121.6555 },
  { name: 'Willamette Valley', region: 'Oregon', country: 'United States', latitude: 44.9429, longitude: -123.0351 },
  { name: 'Des Moines', region: 'Iowa', country: 'United States', latitude: 41.5868, longitude: -93.6250 },
  { name: 'Valencia Orchard Belt', region: 'Valencia', country: 'Spain', latitude: 39.4699, longitude: -0.3763 },
  { name: 'Nairobi Agro District', region: 'Nairobi', country: 'Kenya', latitude: -1.2921, longitude: 36.8219 },
  { name: 'Cotswolds Farmland', region: 'Gloucestershire', country: 'United Kingdom', latitude: 51.8330, longitude: -1.8433 },
];

// Translate WMO Weather Codes to plain language
export function getWeatherDescription(code: number): string {
  switch (code) {
    case 0: return 'Clear sunny skies';
    case 1: return 'Mainly clear';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45: case 48: return 'Morning fog or mist';
    case 51: case 53: case 55: return 'Gentle drizzle';
    case 61: case 63: case 65: return 'Rain showers';
    case 71: case 73: case 75: return 'Snowfall';
    case 80: case 81: case 82: return 'Passing heavy rain showers';
    case 95: case 96: case 99: return 'Thunderstorms';
    default: return 'Fair conditions';
  }
}

// Compute agronomic advisories based on real meteorological telemetry
export function computeAgroAdvisory(
  current: CurrentWeather,
  forecast: ForecastDay[],
  lat: number
): AgroAdvisory {
  const isFrostRisk = current.temperatureC <= 2 || forecast.some(f => f.minTempC <= 2);
  const next3DaysRain = forecast.slice(0, 3).reduce((sum, f) => sum + f.precipitationSumMm, 0);

  // 1. Spraying Conditions (Wind < 15 km/h, no immediate heavy rain)
  let sprayCondition: 'Optimal' | 'Caution' | 'Poor' = 'Optimal';
  let sprayReason = 'Calm winds and dry foliage make conditions suitable for organic and IPM treatments.';

  if (current.windSpeedKmH > 18) {
    sprayCondition = 'Poor';
    sprayReason = `High wind (${current.windSpeedKmH} km/h) creates spray drift hazard for pollinators and neighboring beds.`;
  } else if (current.precipitationMm > 0 || next3DaysRain > 12) {
    sprayCondition = 'Caution';
    sprayReason = 'Rain in forecast will wash away foliar sprays and biological controls.';
  } else if (current.temperatureC > 30) {
    sprayCondition = 'Caution';
    sprayReason = 'High heat (>30°C) increases risk of foliar oil scorch. Spray early morning or dusk.';
  }

  // 2. Fungal / Blight Risk (high humidity + moderate/warm temp)
  let fungalRisk: 'Low' | 'Moderate' | 'High' = 'Low';
  let fungalReason = 'Moderate humidity and airflow keep spore germination pressure low.';

  if (current.relativeHumidity >= 80 && current.temperatureC >= 15 && current.temperatureC <= 28) {
    fungalRisk = 'High';
    fungalReason = `Sustained high humidity (${current.relativeHumidity}%) and warm temperatures favor tomato early blight and powdery mildew.`;
  } else if (current.relativeHumidity >= 70 || next3DaysRain > 8) {
    fungalRisk = 'Moderate';
    fungalReason = 'Damp canopy conditions present. Ensure bottom foliar pruning and avoid overhead watering.';
  }

  // 3. Irrigation Advice
  let irrigationAdvice: 'Irrigate deeply' | 'Light watering' | 'Hold irrigation (Rain forecast)' = 'Light watering';
  let irrigationReason = 'Maintain consistent soil moisture at root level.';

  if (next3DaysRain >= 12 || current.precipitationMm > 5) {
    irrigationAdvice = 'Hold irrigation (Rain forecast)';
    irrigationReason = `Expected precipitation (${next3DaysRain.toFixed(1)} mm) provides sufficient soil moisture. Prevent waterlogging.`;
  } else if (current.temperatureC > 26 && current.relativeHumidity < 50) {
    irrigationAdvice = 'Irrigate deeply';
    irrigationReason = 'Warm temperatures and dry air increase evapo-transpiration. Deep morning watering recommended.';
  } else {
    irrigationAdvice = 'Light watering';
    irrigationReason = 'Standard maintenance watering. Check topsoil 5 cm finger test before running drip.';
  }

  // 4. Climate Zone classification based on latitude and temperatures
  let climateZone: 'Temperate' | 'Subtropical' | 'Arid / Semi-arid' | 'Tropical' | 'Continental' = 'Temperate';
  const absLat = Math.abs(lat);

  if (absLat < 18) {
    climateZone = 'Tropical';
  } else if (absLat >= 18 && absLat < 32) {
    climateZone = current.relativeHumidity < 40 ? 'Arid / Semi-arid' : 'Subtropical';
  } else if (absLat >= 48) {
    climateZone = 'Continental';
  } else {
    climateZone = 'Temperate';
  }

  // Estimated annual rainfall based on 7-day pattern projection
  const avgWeekly = forecast.reduce((acc, f) => acc + f.precipitationSumMm, 0);
  const projectedAnnual = Math.round(Math.min(1400, Math.max(250, avgWeekly * 52)));

  return {
    sprayCondition,
    sprayReason,
    fungalRisk,
    fungalReason,
    irrigationAdvice,
    irrigationReason,
    frostRisk: isFrostRisk,
    climateZone,
    estimatedAnnualRainfallMm: projectedAnnual,
  };
}

// Fetch real-time weather from Open-Meteo API
export async function fetchLiveWeather(
  location: WeatherLocation
): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto&forecast_days=6`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather service returned ${res.status}`);
  }

  const data = await res.json();
  const c = data.current;
  const d = data.daily;

  const current: CurrentWeather = {
    temperatureC: Math.round(c.temperature_2m),
    temperatureF: Math.round((c.temperature_2m * 9) / 5 + 32),
    apparentTempC: Math.round(c.apparent_temperature),
    relativeHumidity: c.relative_humidity_2m,
    precipitationMm: c.precipitation || 0,
    windSpeedKmH: Math.round(c.wind_speed_10m),
    weatherCode: c.weather_code,
    weatherDescription: getWeatherDescription(c.weather_code),
    isDay: c.is_day === 1,
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const forecast: ForecastDay[] = (d.time || []).map((dateStr: string, idx: number) => {
    const dateObj = new Date(dateStr);
    const dayName = idx === 0 ? 'Today' : daysOfWeek[dateObj.getDay()];

    return {
      date: dateStr,
      dayName,
      maxTempC: Math.round(d.temperature_2m_max[idx]),
      minTempC: Math.round(d.temperature_2m_min[idx]),
      precipitationSumMm: Math.round((d.precipitation_sum[idx] || 0) * 10) / 10,
      precipitationProbability: d.precipitation_probability_max[idx] || 0,
      weatherCode: d.weather_code[idx],
      weatherDescription: getWeatherDescription(d.weather_code[idx]),
    };
  });

  const advisory = computeAgroAdvisory(current, forecast, location.latitude);

  return {
    location,
    current,
    forecast,
    advisory,
    updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

// Search locations worldwide using Open-Meteo Geocoding
export async function searchLocations(query: string): Promise<WeatherLocation[]> {
  if (!query || query.trim().length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  if (!data.results) return [];

  return data.results.map((item: any) => ({
    name: item.name,
    region: item.admin1 || item.admin2 || '',
    country: item.country || '',
    latitude: item.latitude,
    longitude: item.longitude,
  }));
}

// Fallback baseline in case network request fails or environment is offline
export function getFallbackWeather(location: WeatherLocation): WeatherData {
  const current: CurrentWeather = {
    temperatureC: 21,
    temperatureF: 70,
    apparentTempC: 21,
    relativeHumidity: 62,
    precipitationMm: 0,
    windSpeedKmH: 11,
    weatherCode: 1,
    weatherDescription: 'Mainly clear skies',
    isDay: true,
  };

  const daysOfWeek = ['Today', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const forecast: ForecastDay[] = daysOfWeek.map((dayName, idx) => ({
    date: `2026-10-${29 + idx}`,
    dayName,
    maxTempC: 22 + (idx % 2 === 0 ? 1 : -1),
    minTempC: 12 + (idx % 2),
    precipitationSumMm: idx === 2 ? 3.5 : 0,
    precipitationProbability: idx === 2 ? 35 : 10,
    weatherCode: idx === 2 ? 61 : 1,
    weatherDescription: idx === 2 ? 'Passing rain showers' : 'Mainly clear',
  }));

  const advisory = computeAgroAdvisory(current, forecast, location.latitude);

  return {
    location,
    current,
    forecast,
    advisory,
    updatedAt: 'Seasonal Baseline (Offline Mode)',
  };
}
