import React, { useState, useMemo } from 'react';
import { PEST_TREATMENTS } from '../data/treatmentData';
import { Search, ShieldAlert, Leaf, AlertCircle, Clock, Eye } from 'lucide-react';

export const PestMedicationDb: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Available crops in dataset
  const uniqueCrops = useMemo(() => {
    return Array.from(new Set(PEST_TREATMENTS.map(t => t.cropName)));
  }, []);

  // Filtered treatments
  const filteredTreatments = useMemo(() => {
    return PEST_TREATMENTS.filter((t) => {
      const matchesSearch =
        searchQuery === '' ||
        t.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.conditionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.visualSymptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.targetedTreatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.biologicalRemedy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCrop = selectedCrop === 'All' || t.cropName === selectedCrop;
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;

      return matchesSearch && matchesCrop && matchesCategory;
    });
  }, [searchQuery, selectedCrop, selectedCategory]);

  return (
    <section id="pest-treatments" className="py-16 lg:py-24 bg-[#F5F8F4] border-y border-[#E2E8DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
            Pest & Crop Health Database
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C251D] mt-1 tracking-tight">
            Tailored remedies and crop protections
          </h2>
          <p className="text-base text-[#4A5568] mt-3 leading-relaxed">
            Follow the established Integrated Pest Management (IPM) tier: prioritize cultural prevention and gentle biological remedies first, reserving targeted treatments for high-risk situations.
          </p>
        </div>

        {/* Framing & Disclaimer banner */}
        <div className="mb-8 p-4 rounded-xl bg-white border border-[#CBD5E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#475569]">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#1C251D]">Guidance Note: </span>
              Suggestions are framed as agronomic recommendations, not certainties. Always spot-test sprays on a single branch 24 hours prior to broad application and observe pre-harvest intervals.
            </div>
          </div>
          <div className="text-[11px] text-[#64748B] shrink-0 font-medium">
            Sources: FAO & UC Statewide IPM
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white border border-[#E2E8DE] rounded-xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by crop, disease, symptom, or treatment (e.g. blight, aphid, soap)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#1C251D]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter by Crop */}
            <div className="sm:col-span-3">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              >
                <option value="All">All Crops ({PEST_TREATMENTS.length})</option>
                {uniqueCrops.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Filter by Category */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#FBFBF9] border border-[#CBD5E1] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#1C251D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              >
                <option value="All">All Problem Categories</option>
                <option value="Fungal">Fungal Diseases</option>
                <option value="Insect / Pest">Insect Pests</option>
                <option value="Bacterial">Bacterial Diseases</option>
                <option value="Nutrient Deficiency">Nutrient Deficiencies</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-xs text-[#64748B] mb-4 px-1">
          Showing {filteredTreatments.length} matching health and remedy guides
        </div>

        {/* Database List */}
        <div className="space-y-5">
          {filteredTreatments.length === 0 ? (
            <div className="bg-white border border-[#E2E8DE] rounded-xl p-12 text-center space-y-3">
              <Leaf className="w-8 h-8 text-[#94A3B8] mx-auto" />
              <div className="text-sm font-bold text-[#1C251D]">No exact matches found</div>
              <p className="text-xs text-[#64748B] max-w-md mx-auto">
                Try searching for a simpler term like "blight", "caterpillar", or reset the category filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCrop('All'); setSelectedCategory('All'); }}
                className="px-4 py-2 text-xs font-semibold text-[#2D6A4F] bg-[#E8F1EC] rounded-lg hover:bg-[#D4E6DB]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredTreatments.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E2E8DE] hover:border-[#CBD5E1] transition-all rounded-xl p-6 sm:p-7 shadow-xs space-y-5"
              >
                {/* Header: Crop Name, Condition Name, and Category */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#F0F4ED]">
                  <div>
                    <div className="text-xs font-semibold text-[#2D6A4F]">
                      {item.cropName} Advisory
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1C251D] mt-0.5">
                      {item.conditionName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <span>Category: <strong className="text-[#1C251D]">{item.category}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono text-[#0F766E]">
                      <Clock className="w-3.5 h-3.5" />
                      PHI: {item.preHarvestInterval}
                    </span>
                  </div>
                </div>

                {/* Visible Symptoms */}
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F8FAF7] border border-[#EBEFE8] text-xs">
                  <Eye className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1C251D]">What to look for (Symptoms): </span>
                    <span className="text-[#475569]">{item.visualSymptoms}</span>
                  </div>
                </div>

                {/* The 3-Tier Treatment Progression */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Tier 1: Cultural Prevention */}
                  <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-1.5">
                    <div className="text-xs font-bold text-[#2D6A4F] flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#E8F1EC] flex items-center justify-center text-[10px] font-mono">1</span>
                      Cultural Prevention
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {item.preventionStep}
                    </p>
                  </div>

                  {/* Tier 2: Biological & Organic Remedy */}
                  <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-1.5">
                    <div className="text-xs font-bold text-[#0D9488] flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#CCFBF1] flex items-center justify-center text-[10px] font-mono">2</span>
                      Biological & Organic Remedy
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {item.biologicalRemedy}
                    </p>
                  </div>

                  {/* Tier 3: Targeted Treatment */}
                  <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-1.5">
                    <div className="text-xs font-bold text-[#B45309] flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[10px] font-mono">3</span>
                      Targeted Treatment (If needed)
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {item.targetedTreatment}
                    </p>
                  </div>
                </div>

                {/* Safety & Pre-Harvest Caution Box */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-[#F0F4ED]">
                  <div className="flex items-center gap-2 text-[#B45309]">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span><strong className="text-[#78350F]">Application Safety: </strong>{item.safetyCaution}</span>
                  </div>

                  <div className="text-[11px] text-[#64748B] shrink-0 font-medium">
                    Evidence Citation: {item.sourceCitation}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
