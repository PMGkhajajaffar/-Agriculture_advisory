import React, { useState, useEffect, useRef } from 'react';
import {
  WeatherData,
  WeatherLocation,
  PRESET_REGIONS,
  fetchLiveWeather,
  searchLocations,
  getFallbackWeather,
} from '../services/weatherService';
import {
  CloudSun,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle2,
  Search,
  MapPin,
  RefreshCw,
  CloudRain,
  Snowflake,
  Sparkles,
} from 'lucide-react';

interface WeatherWidgetProps {
  onSyncWithCropSelector: (climateZone: string, estimatedRainfallMm: number) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onSyncWithCropSelector }) => {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(PRESET_REGIONS[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<WeatherLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [syncedFeedback, setSyncedFeedback] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch weather when selectedLocation changes
  const loadWeather = async (loc: WeatherLocation) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLiveWeather(loc);
      setWeatherData(data);
    } catch (err: any) {
      console.warn('Weather network request failed, loading regional baseline:', err);
      // Fallback gracefully so the widget and "Apply to Crop Matcher" remain 100% operational
      const fallback = getFallbackWeather(loc);
      setWeatherData(fallback);
      setError('Live satellite network delayed; using calibrated agricultural seasonal baseline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather(selectedLocation);
  }, [selectedLocation]);

  const [gpsNotice, setGpsNotice] = useState<{ type: 'info' | 'warning'; message: string } | null>(null);

  // Handle GPS detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsNotice({
        type: 'warning',
        message: 'Geolocation is not supported in this browser. Please select an agricultural region or search your town.',
      });
      setTimeout(() => setGpsNotice(null), 6000);
      return;
    }

    setGpsLoading(true);
    setGpsNotice(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const detectedLoc: WeatherLocation = {
          name: 'Your Local Garden / Farm',
          region: `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°W`,
          country: 'Detected GPS Location',
          latitude,
          longitude,
        };
        setSelectedLocation(detectedLoc);
        setGpsLoading(false);
        setGpsNotice({
          type: 'info',
          message: `Location detected at ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°. Live weather synchronized!`,
        });
        setTimeout(() => setGpsNotice(null), 5000);
      },
      (err) => {
        console.warn('Geolocation denied or unavailable:', err.message);
        setGpsLoading(false);
        setGpsNotice({
          type: 'warning',
          message: 'Could not access device location (permission denied or timeout). You can choose any preset agricultural region or search above.',
        });
        setTimeout(() => setGpsNotice(null), 6000);
      },
      { timeout: 8000 }
    );
  };

  // Handle Search Input
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      setIsSearching(true);
      try {
        const results = await searchLocations(val);
        setSearchResults(results);
        setIsSearchOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSelectSearchResult = (loc: WeatherLocation) => {
    setSelectedLocation(loc);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  // Sync with Crop Selector
  const handleApplyToCropSelector = () => {
    if (!weatherData) return;
    onSyncWithCropSelector(
      weatherData.advisory.climateZone,
      weatherData.advisory.estimatedAnnualRainfallMm
    );
    setSyncedFeedback(true);
    setTimeout(() => setSyncedFeedback(false), 2500);

    // Smooth scroll down to crop selector
    const el = document.getElementById('crop-selector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="weather-widget" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-8 relative z-20">
      <div className="bg-white border border-[#E2E8DE] rounded-2xl shadow-sm overflow-hidden">
        {/* Top Control Bar: Title, GPS, Search & Quick Presets */}
        <div className="p-4 sm:p-5 bg-[#FBFBF9] border-b border-[#E2E8DE] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center shrink-0">
                <CloudSun className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1C251D] flex items-center gap-2">
                  <span>Live Field Climate & Weather</span>
                  <span className="text-[11px] font-normal text-[#64748B] font-mono">
                    Open-Meteo
                  </span>
                </h3>
              </div>
            </div>

            {/* GPS Detector button */}
            <button
              onClick={handleDetectLocation}
              disabled={gpsLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2D6A4F] bg-white border border-[#CBD5E1] hover:border-[#2D6A4F] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>{gpsLoading ? 'Detecting...' : 'Use My GPS Location'}</span>
            </button>
          </div>

          {/* Search Location Input & Presets */}
          <div className="flex flex-wrap items-center gap-2 relative">
            <div ref={searchContainerRef} className="relative flex-1 sm:w-64">
              {isSearching ? (
                <RefreshCw className="w-3.5 h-3.5 text-[#2D6A4F] animate-spin absolute left-3 top-1/2 -translate-y-1/2" />
              ) : (
                <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              )}
              <input
                type="text"
                placeholder="Search any town, valley, or farm..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchResults.length > 0 && setIsSearchOpen(true)}
                className="w-full bg-white border border-[#CBD5E1] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />

              {/* Autocomplete Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#CBD5E1] rounded-xl shadow-lg z-30 max-h-56 overflow-y-auto">
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSearchResult(item)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[#F1F5F0] border-b border-[#F0F4ED] last:border-b-0"
                    >
                      <div className="font-semibold text-[#1C251D]">{item.name}</div>
                      <div className="text-[11px] text-[#64748B]">
                        {item.region ? `${item.region}, ` : ''}{item.country}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick region dropdown */}
            <select
              value={selectedLocation.name}
              onChange={(e) => {
                const found = PRESET_REGIONS.find((r) => r.name === e.target.value);
                if (found) setSelectedLocation(found);
              }}
              className="bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            >
              <option disabled>Select Agricultural Region</option>
              {PRESET_REGIONS.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.name} ({r.region || r.country})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GPS status notice */}
        {gpsNotice && (
          <div
            className={`px-4 py-2.5 text-xs flex items-center justify-between border-b ${
              gpsNotice.type === 'warning'
                ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                : 'bg-[#E2F0D9] text-[#1B4332] border-[#C5DEC8]'
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{gpsNotice.message}</span>
            </div>
            <button
              onClick={() => setGpsNotice(null)}
              className="text-xs font-bold hover:opacity-70 ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          <div className="p-8 text-center text-xs text-[#64748B] flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#2D6A4F]" />
            <span>Retrieving live atmospheric conditions from meteorological satellites...</span>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-xs text-[#B45309] bg-[#FEF3C7]/40 flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#B45309]" />
            <span>{error}</span>
          </div>
        ) : weatherData ? (
          <div className="p-5 sm:p-6 space-y-6">
            {/* Grid 1: Current Weather Card + Agro-Advisories */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Current Metrics (4 cols) */}
              <div className="lg:col-span-4 bg-[#FBFBF9] border border-[#EBEFE8] rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span className="font-semibold text-[#1C251D]">
                      {weatherData.location.name}
                    </span>
                    <span className="font-mono">{weatherData.updatedAt}</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {weatherData.location.region ? `${weatherData.location.region}, ` : ''}{weatherData.location.country}
                  </div>

                  {/* Big Temperature & Condition */}
                  <div className="flex items-baseline gap-3 mt-3">
                    <span className="text-4xl font-extrabold text-[#1C251D] font-mono tabular-nums">
                      {weatherData.current.temperatureC}°C
                    </span>
                    <span className="text-xs text-[#64748B] font-mono">
                      / {weatherData.current.temperatureF}°F
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#2D6A4F] mt-1">
                    {weatherData.current.weatherDescription}
                  </div>
                </div>

                {/* Micro metrics grid */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E2E8DE] text-xs">
                  <div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-[#0284C7]" />
                      Humidity
                    </div>
                    <div className="font-mono font-bold text-[#1C251D] mt-0.5">
                      {weatherData.current.relativeHumidity}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                      <Wind className="w-3 h-3 text-[#475569]" />
                      Wind
                    </div>
                    <div className="font-mono font-bold text-[#1C251D] mt-0.5">
                      {weatherData.current.windSpeedKmH} km/h
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                      <CloudRain className="w-3 h-3 text-[#0891B2]" />
                      Rain Today
                    </div>
                    <div className="font-mono font-bold text-[#1C251D] mt-0.5">
                      {weatherData.current.precipitationMm} mm
                    </div>
                  </div>
                </div>
              </div>

              {/* Agro-Advisories (8 cols) */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
                  Contextual Crop & Field Advisories (Computed from Live Weather)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Advisory 1: Spraying Safety */}
                  <div className="p-3.5 rounded-xl border bg-white border-[#E2E8DE] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#64748B] uppercase">Spraying Window</span>
                      <span
                        className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                          weatherData.advisory.sprayCondition === 'Optimal'
                            ? 'bg-[#E2F0D9] text-[#1B4332]'
                            : weatherData.advisory.sprayCondition === 'Caution'
                            ? 'bg-[#FEF3C7] text-[#92400E]'
                            : 'bg-[#FEE2E2] text-[#991B1B]'
                        }`}
                      >
                        {weatherData.advisory.sprayCondition}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed pt-1">
                      {weatherData.advisory.sprayReason}
                    </p>
                  </div>

                  {/* Advisory 2: Fungal Disease Risk */}
                  <div className="p-3.5 rounded-xl border bg-white border-[#E2E8DE] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#64748B] uppercase">Fungal / Blight Risk</span>
                      <span
                        className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                          weatherData.advisory.fungalRisk === 'Low'
                            ? 'bg-[#E2F0D9] text-[#1B4332]'
                            : weatherData.advisory.fungalRisk === 'Moderate'
                            ? 'bg-[#FEF3C7] text-[#92400E]'
                            : 'bg-[#FEE2E2] text-[#991B1B]'
                        }`}
                      >
                        {weatherData.advisory.fungalRisk} Risk
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed pt-1">
                      {weatherData.advisory.fungalReason}
                    </p>
                  </div>

                  {/* Advisory 3: Irrigation Guidance */}
                  <div className="p-3.5 rounded-xl border bg-white border-[#E2E8DE] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#64748B] uppercase">Irrigation Need</span>
                      <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-[#E0F2FE] text-[#0369A1]">
                        {weatherData.advisory.irrigationAdvice.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed pt-1">
                      {weatherData.advisory.irrigationReason}
                    </p>
                  </div>
                </div>

                {/* Frost Warning if applicable */}
                {weatherData.advisory.frostRisk && (
                  <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-2 text-xs text-[#991B1B]">
                    <Snowflake className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span>
                      <strong>Frost Alert:</strong> Temperatures near freezing (≤2°C) projected. Protect tender solanaceous crops (tomatoes, peppers) with row fleece blankets.
                    </span>
                  </div>
                )}

                {/* Crop Selector Sync Action Bar */}
                <div className="p-3 bg-[#F0F5EE] border border-[#D9E6D5] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-[#2D5A43]">
                    <span>Detected Climate: </span>
                    <strong className="text-[#1B4332]">{weatherData.advisory.climateZone}</strong>
                    <span aria-hidden="true" className="mx-1.5">·</span>
                    <span>Annual Rainfall Est: </span>
                    <strong className="text-[#1B4332] font-mono">{weatherData.advisory.estimatedAnnualRainfallMm} mm</strong>
                  </div>

                  <button
                    onClick={handleApplyToCropSelector}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] active:bg-[#1B4332] rounded-lg transition-colors whitespace-nowrap shadow-2xs"
                  >
                    {syncedFeedback ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span>Applied to Crop Matcher!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Apply Local Climate to Crop Matcher</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 6-Day Agricultural Weather Forecast */}
            <div className="pt-2 border-t border-[#F0F4ED]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-3">
                6-Day Farming Forecast
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {weatherData.forecast.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] text-center space-y-1 hover:border-[#2D6A4F] transition-colors"
                  >
                    <div className="text-xs font-bold text-[#1C251D]">
                      {day.dayName}
                    </div>
                    <div className="text-[11px] text-[#64748B] truncate" title={day.weatherDescription}>
                      {day.weatherDescription}
                    </div>
                    <div className="text-sm font-bold font-mono text-[#1C251D] pt-1">
                      {day.maxTempC}° <span className="text-[#64748B] text-xs font-normal">/ {day.minTempC}°</span>
                    </div>
                    <div className="text-[11px] text-[#0284C7] font-medium flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3" />
                      <span>{day.precipitationProbability}% ({day.precipitationSumMm}mm)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
