import React, { useState, useMemo, useEffect } from 'react';
import { CROPS_DATA } from '../data/cropData';
import { Crop } from '../types/agriculture';
import { Sliders, Sun, Droplets, Sprout, CheckCircle2, ChevronRight, X, CloudSun } from 'lucide-react';

interface CropSelectorProps {
  weatherSync?: {
    climateZone: string;
    rainfallMm: number;
    timestamp: number;
  } | null;
}

export const CropSelector: React.FC<CropSelectorProps> = ({ weatherSync }) => {
  // Interactive filters
  const [climate, setClimate] = useState<string>('Temperate');
  const [rainfallMm, setRainfallMm] = useState<number>(650);
  const [soilType, setSoilType] = useState<string>('Loamy');
  const [soilPh, setSoilPh] = useState<number>(6.5);
  const [sunlightHours, setSunlightHours] = useState<number>(6);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCropModal, setActiveCropModal] = useState<Crop | null>(null);
  const [syncedNotice, setSyncedNotice] = useState<string | null>(null);

  // Sync when external weather data is applied
  useEffect(() => {
    if (weatherSync) {
      setClimate(weatherSync.climateZone);
      setRainfallMm(weatherSync.rainfallMm);
      setSyncedNotice(`Updated from live weather: ${weatherSync.climateZone} Climate & ${weatherSync.rainfallMm} mm rainfall.`);
      const timer = setTimeout(() => setSyncedNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [weatherSync]);

  // Helper to describe pH in plain English
  const getPhDescription = (ph: number) => {
    if (ph < 5.8) return 'Acidic (berries & potatoes thrive)';
    if (ph <= 7.2) return 'Balanced / Neutral (ideal for most crops)';
    return 'Alkaline / Calcareous (add compost/organic matter)';
  };

  // Helper to describe rainfall in plain English
  const getRainfallDescription = (mm: number) => {
    if (mm < 350) return 'Arid / Low Rainfall (dryland farming, mulching vital)';
    if (mm <= 850) return 'Moderate Rainfall (ideal temperate garden baseline)';
    return 'High Rainfall (ensure good soil drainage / raised beds)';
  };

  // Dynamic suitability scoring algorithm
  const matchedCrops = useMemo(() => {
    return CROPS_DATA.map((crop) => {
      let score = 0;

      // 1. Climate matching (35 points)
      if (crop.climateSuitability.includes(climate as any)) {
        score += 35;
      } else {
        score += 10;
      }

      // 2. Rainfall range matching (25 points)
      if (rainfallMm >= crop.minRainfallMm && rainfallMm <= crop.maxRainfallMm) {
        score += 25;
      } else {
        const diff = Math.min(
          Math.abs(rainfallMm - crop.minRainfallMm),
          Math.abs(rainfallMm - crop.maxRainfallMm)
        );
        const penalty = Math.min(20, Math.round(diff / 50));
        score += Math.max(5, 25 - penalty);
      }

      // 3. Soil type matching (20 points)
      if (crop.preferredSoil.includes(soilType as any)) {
        score += 20;
      } else {
        score += 8;
      }

      // 4. Soil pH matching (15 points)
      if (soilPh >= crop.minPh && soilPh <= crop.maxPh) {
        score += 15;
      } else {
        const phDiff = Math.min(
          Math.abs(soilPh - crop.minPh),
          Math.abs(soilPh - crop.maxPh)
        );
        const penalty = Math.min(12, Math.round(phDiff * 10));
        score += Math.max(2, 15 - penalty);
      }

      // 5. Sunlight matching (5 points)
      if (sunlightHours >= crop.sunlightHours) {
        score += 5;
      } else {
        score += 2;
      }

      return {
        crop,
        score: Math.min(99, Math.max(45, score)),
      };
    })
      .filter(({ crop }) => selectedCategory === 'All' || crop.category === selectedCategory)
      .sort((a, b) => b.score - a.score);
  }, [climate, rainfallMm, soilType, soilPh, sunlightHours, selectedCategory]);

  return (
    <section id="crop-selector" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
          Interactive Tool
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C251D] mt-1 tracking-tight">
          Find the best crops for your soil and climate
        </h2>
        <p className="text-base text-[#4A5568] mt-3 leading-relaxed">
          Adjust the sliders to match your local garden or farm conditions. TerraCrop will evaluate suitable crops and provide tailored soil preparation suggestions based on agronomic research.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Controls (Drop-downs & Sliders) */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8DE] rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F0F4ED]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E8F1EC] text-[#2D6A4F] flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#1C251D] text-sm">Your Growing Conditions</span>
            </div>
            <button
              onClick={() => {
                setClimate('Temperate');
                setRainfallMm(650);
                setSoilType('Loamy');
                setSoilPh(6.5);
                setSunlightHours(6);
                setSelectedCategory('All');
                setSyncedNotice(null);
              }}
              className="text-xs text-[#2D6A4F] hover:text-[#1B4332] font-semibold underline underline-offset-4"
            >
              Reset to default
            </button>
          </div>

          {/* Sync notification banner */}
          {syncedNotice && (
            <div className="p-3 bg-[#E8F1EC] border border-[#C5DEC8] rounded-xl flex items-center gap-2 text-xs text-[#1B4332] animate-in fade-in-50">
              <CloudSun className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span className="font-medium">{syncedNotice}</span>
            </div>
          )}

          {/* Control 1: Climate Zone Dropdown */}
          <div className="space-y-2">
            <label htmlFor="climate-select" className="block text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
              1. Local Climate Zone
            </label>
            <select
              id="climate-select"
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3.5 py-2.5 text-sm font-medium text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] transition-colors"
            >
              <option value="Temperate">Temperate (Mild summers, moderate winters)</option>
              <option value="Subtropical">Subtropical (Warm, long growing seasons)</option>
              <option value="Arid / Semi-arid">Arid / Semi-arid (Dry, high sun, low rainfall)</option>
              <option value="Tropical">Tropical (Year-round warmth, wet/dry seasons)</option>
              <option value="Continental">Continental (Hot summers, cold freezing winters)</option>
            </select>
          </div>

          {/* Control 2: Rainfall Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#4A5568] flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#0284C7]" />
                2. Annual Rainfall
              </span>
              <span className="font-mono font-bold text-[#1C251D] text-sm tabular-nums">
                {rainfallMm} mm / year
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="1400"
              step="50"
              value={rainfallMm}
              onChange={(e) => setRainfallMm(Number(e.target.value))}
              className="w-full cursor-pointer h-2 bg-[#E2E8DE] rounded-lg"
              aria-label="Annual Rainfall in millimeters"
            />
            <div className="text-[11px] text-[#64748B] flex justify-between">
              <span>Dry (200 mm)</span>
              <span className="font-medium text-[#2D6A4F]">{getRainfallDescription(rainfallMm)}</span>
              <span>Wet (1400 mm)</span>
            </div>
          </div>

          {/* Control 3: Soil Type Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5568]">
              3. Soil Texture Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Loamy', 'Sandy', 'Clay', 'Silty', 'Peaty'].map((soil) => (
                <button
                  key={soil}
                  type="button"
                  onClick={() => setSoilType(soil)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap text-center ${
                    soilType === soil
                      ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-sm'
                      : 'bg-[#FBFBF9] text-[#4A5568] border-[#CBD5E1] hover:border-[#94A3B8]'
                  }`}
                >
                  {soil}
                </button>
              ))}
            </div>
          </div>

          {/* Control 4: Soil pH Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#4A5568]">
                4. Soil pH Level
              </span>
              <span className="font-mono font-bold text-[#1C251D] text-sm tabular-nums">
                pH {soilPh.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="5.0"
              max="8.5"
              step="0.1"
              value={soilPh}
              onChange={(e) => setSoilPh(parseFloat(e.target.value))}
              className="w-full cursor-pointer h-2 bg-[#E2E8DE] rounded-lg"
              aria-label="Soil pH level"
            />
            <div className="text-[11px] text-[#64748B] flex justify-between">
              <span>Acidic (5.0)</span>
              <span className="font-medium text-[#2D6A4F]">{getPhDescription(soilPh)}</span>
              <span>Alkaline (8.5)</span>
            </div>
          </div>

          {/* Control 5: Sunlight Hours Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#4A5568] flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#D97706]" />
                5. Direct Sunlight per Day
              </span>
              <span className="font-mono font-bold text-[#1C251D] text-sm tabular-nums">
                {sunlightHours} Hours
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="10"
              step="1"
              value={sunlightHours}
              onChange={(e) => setSunlightHours(Number(e.target.value))}
              className="w-full cursor-pointer h-2 bg-[#E2E8DE] rounded-lg"
              aria-label="Direct sunlight in hours per day"
            />
            <div className="text-[11px] text-[#64748B] flex justify-between">
              <span>Partial Shade (4h)</span>
              <span>Full Sun (10h)</span>
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="pt-2 border-t border-[#F0F4ED]">
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#4A5568] mb-2">
              Filter by Crop Category
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Vegetables', 'Grains', 'Legumes', 'Fruits', 'Root Crops'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#1C251D] text-white shadow-xs'
                      : 'bg-[#F1F5F0] text-[#4A5568] hover:text-[#1C251D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations Results */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="text-sm font-semibold text-[#1C251D]">
              {matchedCrops.length} Recommended {matchedCrops.length === 1 ? 'Crop' : 'Crops'} Matched
            </div>
            <div className="text-xs text-[#64748B]">
              Ranked by environmental compatibility
            </div>
          </div>

          {/* Crops Grid */}
          {matchedCrops.length === 0 ? (
            <div className="bg-white border border-[#E2E8DE] rounded-xl p-8 text-center space-y-3">
              <Sprout className="w-8 h-8 text-[#94A3B8] mx-auto" />
              <div className="text-sm font-bold text-[#1C251D]">No crops found in this category</div>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                No crops in the "{selectedCategory}" category currently match your active climate or soil filters.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="px-4 py-2 text-xs font-semibold text-[#2D6A4F] bg-[#E8F1EC] rounded-lg hover:bg-[#D4E6DB] transition-colors"
              >
                View All Categories ({CROPS_DATA.length} Crops)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedCrops.map(({ crop, score }) => (
                <div
                  key={crop.id}
                className="bg-white border border-[#E2E8DE] hover:border-[#2D6A4F] transition-all rounded-xl p-5 shadow-xs flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header: Title & Clean Unboxed Metadata */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[#1C251D] group-hover:text-[#2D6A4F] transition-colors">
                        {crop.name}
                      </h3>
                      <div className="text-xs italic text-[#64748B] mt-0.5 font-serif">
                        {crop.scientificName}
                      </div>
                    </div>

                    {/* Match Score Display */}
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-[#2D6A4F] tabular-nums">
                        {score}% Match
                      </div>
                      <div className="w-14 h-1.5 bg-[#E8F1EC] rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-[#2D6A4F] rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Clean unboxed metadata with bullet separators */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#64748B] mt-3">
                    <span>{crop.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{crop.growthDurationDays} days</span>
                    <span aria-hidden="true">·</span>
                    <span>Water: {crop.waterNeed}</span>
                    <span aria-hidden="true">·</span>
                    <span>{crop.difficulty}</span>
                  </div>

                  <p className="text-xs text-[#4A5568] mt-3 line-clamp-2 leading-relaxed">
                    {crop.overview}
                  </p>

                  {/* Soil Prep Advice */}
                  <div className="mt-3 p-2.5 rounded-lg bg-[#F8FAF7] border border-[#E9F0E6] text-xs text-[#334155] space-y-1">
                    <div className="font-semibold text-[#2D6A4F] flex items-center gap-1.5">
                      <Sprout className="w-3.5 h-3.5" />
                      Soil Recommendation
                    </div>
                    <p className="text-[11px] text-[#475569] leading-normal">
                      {crop.soilPrepTip}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Detail Button */}
                <div className="mt-4 pt-3 border-t border-[#F0F4ED] flex items-center justify-between">
                  <div className="text-[11px] text-[#64748B]">
                    Season: {crop.plantingSeason.split('(')[0]}
                  </div>
                  <button
                    onClick={() => setActiveCropModal(crop)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] group-hover:underline underline-offset-4"
                  >
                    <span>Full Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Modal: Deep Dive on Selected Crop */}
      {activeCropModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#CBD5E1] shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-[#E2E8DE]">
              <div>
                <div className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
                  Crop Profile & Cultivation Guide
                </div>
                <h3 className="text-2xl font-bold text-[#1C251D] mt-0.5">
                  {activeCropModal.name}
                </h3>
                <div className="text-sm italic text-[#64748B] font-serif">
                  {activeCropModal.scientificName} · {activeCropModal.category}
                </div>
              </div>
              <button
                onClick={() => setActiveCropModal(null)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1C251D] hover:bg-[#F1F5F0]"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                Agronomic Overview
              </h4>
              <p className="text-sm text-[#334155] mt-1.5 leading-relaxed">
                {activeCropModal.overview}
              </p>
            </div>

            {/* Agronomic Profile Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE]">
                <div className="text-[11px] text-[#64748B] font-medium">Growth Window</div>
                <div className="text-sm font-bold text-[#1C251D] mt-0.5">
                  {activeCropModal.growthDurationDays} Days
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE]">
                <div className="text-[11px] text-[#64748B] font-medium">Optimal Soil pH</div>
                <div className="text-sm font-bold text-[#1C251D] mt-0.5">
                  {activeCropModal.minPh} – {activeCropModal.maxPh}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE]">
                <div className="text-[11px] text-[#64748B] font-medium">Water Demand</div>
                <div className="text-sm font-bold text-[#1C251D] mt-0.5">
                  {activeCropModal.waterNeed} Need
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE]">
                <div className="text-[11px] text-[#64748B] font-medium">Min Sunlight</div>
                <div className="text-sm font-bold text-[#1C251D] mt-0.5">
                  {activeCropModal.sunlightHours}+ Hours / Day
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] sm:col-span-2">
                <div className="text-[11px] text-[#64748B] font-medium">Expected Yield</div>
                <div className="text-sm font-bold text-[#1C251D] mt-0.5">
                  {activeCropModal.yieldEstimate}
                </div>
              </div>
            </div>

            {/* Practical Advice */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#E8F1EC] border border-[#D1E3D8]">
                <div className="text-xs font-bold text-[#1B4332] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                  Soil Preparation & Amendments
                </div>
                <p className="text-xs text-[#2D5A43] mt-1 leading-relaxed">
                  {activeCropModal.soilPrepTip}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A]">
                <div className="text-xs font-bold text-[#92400E]">
                  Recommended Companion Plants
                </div>
                <p className="text-xs text-[#78350F] mt-1">
                  Plant alongside: <span className="font-semibold">{activeCropModal.companionPlants.join(', ')}</span> for natural pest repulsion and improved pollinator attraction.
                </p>
              </div>
            </div>

            {/* Scientific Citation */}
            <div className="pt-3 border-t border-[#E2E8DE] text-xs text-[#64748B]">
              <span className="font-semibold text-[#4A5568]">Evidence Source: </span>
              {activeCropModal.citation}
            </div>

            {/* Close button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveCropModal(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] rounded-lg transition-colors"
              >
                Close Crop Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
