import React from 'react';
import { Sprout } from 'lucide-react';

interface FooterProps {
  onOpenOutline: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOutline }) => {
  return (
    <footer className="bg-[#1C251D] text-[#D8E2DC] py-14 border-t border-[#2D3A2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#2D6A4F] flex items-center justify-center text-white">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                TerraCrop Advisory
              </span>
            </div>
            <p className="text-xs text-[#9BB0A5] leading-relaxed max-w-sm">
              Empowering farmers, community growers, and garden hobbyists with practical, jargon-free agricultural recommendations grounded in peer-reviewed agronomy.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenOutline}
                className="text-xs font-semibold text-[#8FD5A6] hover:text-white underline underline-offset-4"
              >
                View UX/UI Concept Blueprint & Outline
              </button>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-2.5 text-xs">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              Platform Modules
            </div>
            <ul className="space-y-1.5 text-[#9BB0A5]">
              <li>
                <a href="#crop-selector" className="hover:text-white transition-colors">
                  Interactive Crop Selector
                </a>
              </li>
              <li>
                <a href="#garden-layout" className="hover:text-white transition-colors">
                  Garden Bed Layout Planner
                </a>
              </li>
              <li>
                <a href="#pest-treatments" className="hover:text-white transition-colors">
                  IPM Pest & Remedy Database
                </a>
              </li>
              <li>
                <a href="#field-guides" className="hover:text-white transition-colors">
                  Agricultural Field Guides
                </a>
              </li>
              <li>
                <a href="#community-forum" className="hover:text-white transition-colors">
                  Grower Community Exchange
                </a>
              </li>
              <li>
                <a href="#success-stories" className="hover:text-white transition-colors">
                  Impact Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Agronomic Citations & References */}
          <div className="md:col-span-4 space-y-2.5 text-xs">
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              Scientific Evidence Partners
            </div>
            <ul className="space-y-1.5 text-[#9BB0A5]">
              <li>UN Food and Agriculture Organization (FAO)</li>
              <li>USDA Agricultural Research Service (ARS)</li>
              <li>University Cooperative Extension IPM Programs</li>
              <li>International Potato Center (CIP) & CIMMYT</li>
            </ul>
            <p className="text-[11px] text-[#768C80] pt-2">
              All advisory data represents general agronomic best practices. Local soil tests and environmental spot checks are strongly encouraged before wide application.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#2D3A2F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#768C80]">
          <div>
            © {new Date().getFullYear()} TerraCrop Advisory Platform. Practical Agriculture for Everyone.
          </div>
          <div className="flex items-center gap-4">
            <span>WCAG AA Accessible</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Jargon Promise</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
