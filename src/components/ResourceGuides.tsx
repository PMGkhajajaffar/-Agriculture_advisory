import React, { useState } from 'react';
import { GUIDES_DATA } from '../data/guidesData';
import { CropGrowthTimeline } from './CropGrowthTimeline';
import { Clock, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

export const ResourceGuides: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(GUIDES_DATA[0].id);

  const categories = ['All', 'Soil & Compost', 'Irrigation & Water', 'Pest Management', 'Sowing & Calendars'];

  const filteredGuides = GUIDES_DATA.filter(
    (g) => selectedCategory === 'All' || g.category === selectedCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedGuideId(expandedGuideId === id ? null : id);
  };

  return (
    <section id="field-guides" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-10">
        <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
          Field Guides & Visual Planners
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C251D] mt-1 tracking-tight">
          Crop cycles, succession planning, and field playbooks
        </h2>
        <p className="text-base text-[#4A5568] mt-3 leading-relaxed">
          Explore interactive phenology timelines and step-by-step agricultural playbooks. Built for both first-time garden hobbyists and experienced smallholders to synchronize sowing and soil care.
        </p>
      </div>

      {/* Interactive D3 Growth Timeline Visualization */}
      <CropGrowthTimeline />

      {/* Written Field Guides Heading & Category Tabs */}
      <div className="pt-6 border-t border-[#E2E8DE] mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1C251D]">
              Written Field Guides & Soil Playbooks
            </h3>
            <p className="text-xs text-[#64748B]">
              Practical agronomic fundamentals structured as straightforward checklists
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#2D6A4F] text-white shadow-2xs'
                    : 'bg-white text-[#4A5568] border border-[#CBD5E1] hover:border-[#94A3B8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guides Accordion List */}
      <div className="space-y-4">
        {filteredGuides.map((guide) => {
          const isExpanded = expandedGuideId === guide.id;

          return (
            <div
              key={guide.id}
              className={`bg-white border rounded-xl transition-all overflow-hidden ${
                isExpanded ? 'border-[#2D6A4F] shadow-sm' : 'border-[#E2E8DE] hover:border-[#CBD5E1]'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleExpand(guide.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
              >
                <div className="space-y-1.5">
                  {/* Clean unboxed metadata with bullet separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                    <span>{guide.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{guide.audience}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#2D6A4F]" />
                      {guide.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1C251D]">
                    {guide.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4A5568] max-w-3xl leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#F1F5F0] text-[#1C251D] flex items-center justify-center shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Body Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#F0F4ED] space-y-6">
                  {/* Steps List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guide.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#FBFBF9] border border-[#EBEFE8] space-y-1.5"
                      >
                        <div className="text-xs font-bold text-[#1C251D]">
                          {step.heading}
                        </div>
                        <p className="text-xs text-[#475569] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Practical Field Tip */}
                  <div className="p-3.5 rounded-xl bg-[#E8F1EC] border border-[#D1E3D8] flex items-start gap-3">
                    <Lightbulb className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#2D5A43] leading-relaxed">
                      <strong className="text-[#1B4332]">Practical Grower Tip: </strong>
                      {guide.practicalTip}
                    </div>
                  </div>

                  {/* Scientific Citation */}
                  <div className="text-xs text-[#64748B] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#4A5568]">Evidence Source: </span>
                      {guide.sourceCitation}
                    </div>
                    <span className="text-[11px] text-[#64748B]">Updated for 2026 Season</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
