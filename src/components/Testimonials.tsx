import React from 'react';
import { FARMER_TESTIMONIALS } from '../data/communityData';
import { ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="success-stories" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase">
          Field Impact & Trust
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C251D] mt-1 tracking-tight">
          Real results from verified growers
        </h2>
        <p className="text-base text-[#4A5568] mt-3 leading-relaxed">
          How commercial smallholders and neighborhood garden networks use data-grounded recommendations to improve harvests, lower chemical dependency, and adapt to climate extremes.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FARMER_TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2E8DE] hover:border-[#CBD5E1] transition-all rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Metric Highlight Box */}
              <div className="p-4 rounded-xl bg-[#F8FAF7] border border-[#E8F0E5]">
                <div className="text-3xl font-extrabold text-[#2D6A4F] font-mono tabular-nums">
                  {item.impactMetric}
                </div>
                <div className="text-xs font-semibold text-[#1C251D] mt-0.5">
                  {item.impactContext}
                </div>
              </div>

              {/* Quote */}
              <div className="relative pt-1">
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>
            </div>

            {/* Author Attribution & Practice Citation */}
            <div className="mt-6 pt-4 border-t border-[#F0F4ED] space-y-1.5">
              <div className="text-sm font-bold text-[#1C251D]">{item.name}</div>
              {/* Clean unboxed metadata with separators */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#64748B]">
                <span>{item.role}</span>
                <span aria-hidden="true">·</span>
                <span>{item.farmScale}</span>
                <span aria-hidden="true">·</span>
                <span>{item.location}</span>
              </div>
              <div className="text-[11px] text-[#2D6A4F] font-medium pt-1">
                Practice: {item.establishedPractice}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aggregate Scientific Footnote */}
      <div className="mt-10 p-5 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#64748B]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
          <span>
            Documented results reflect adherence to certified Integrated Pest Management (IPM) guidelines published by the FAO and Land-Grant University Agricultural Extensions.
          </span>
        </div>
        <div className="font-mono text-[#1C251D] shrink-0">
          Peer-Reviewed Protocols
        </div>
      </div>
    </section>
  );
};
