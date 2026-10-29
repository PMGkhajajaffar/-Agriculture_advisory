import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Users, BookOpen, Sprout } from 'lucide-react';

interface HeroProps {
  onOpenOutline: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOutline }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E2E8DE]">
      {/* Background organic botanical ambient accents */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D8E2DC] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#E8EFE9] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
              Practical Agricultural Advisory Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C251D] leading-[1.12]" style={{ textWrap: 'balance' }}>
              Clear crop advice for every grower, from backyards to open fields.
            </h1>

            <p className="text-lg text-[#4A5568] max-w-2xl leading-relaxed">
              Match crops to your local climate and soil, diagnose pests with gentle IPM remedies, and learn directly from experienced farmers—free of complex technical jargon.
            </p>

            {/* Credible standard citation */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#52796F] font-medium pt-1">
              <span>FAO Eco-Farming Standards</span>
              <span aria-hidden="true">·</span>
              <span>USDA Extension IPM Guides</span>
              <span aria-hidden="true">·</span>
              <span>University Agronomy Research</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#crop-selector"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] active:bg-[#1B4332] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                <span>Launch Crop Selector</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenOutline}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#1C251D] bg-white hover:bg-[#F3F5F1] border border-[#CBD5E1] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4 text-[#2D6A4F]" />
                <span>Read Platform Outline</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Focal Carrier & Quick Feature Highlights */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E2E8DE] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0F4ED]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F1EC] flex items-center justify-center text-[#2D6A4F]">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#1C251D]">Advisory Overview</h2>
                    <p className="text-xs text-[#64748B]">Actionable, accessible agronomy</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#2D6A4F] bg-[#E8F1EC] px-2.5 py-1 rounded">
                  2026 Edition
                </span>
              </div>

              {/* 3 Pillar Bento items */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBEFE8]">
                  <div className="w-8 h-8 rounded-lg bg-[#E2F0D9] text-[#1B4332] flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1C251D]">Smart Climate & Soil Matcher</div>
                    <div className="text-xs text-[#64748B] mt-0.5">
                      Tailor planting choices to your rainfall, soil pH, and daylight hours with live suitability scoring.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBEFE8]">
                  <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1C251D]">Safe Pest & Medication Database</div>
                    <div className="text-xs text-[#64748B] mt-0.5">
                      Structured 3-tier IPM guidance: cultural prevention first, biological controls second, and safe targeted treatments third.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBEFE8]">
                  <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1C251D]">Grower Community & Guides</div>
                    <div className="text-xs text-[#64748B] mt-0.5">
                      Exchange real regional lessons with neighborhood growers, homesteaders, and commercial farmers.
                    </div>
                  </div>
                </div>
              </div>

              {/* Notice note */}
              <div className="pt-2 text-xs text-[#64748B] border-t border-[#F0F4ED]">
                Recommendations are formulated as agronomic suggestions rather than certainties. Always test on sample plants.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
