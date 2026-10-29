import React, { useState } from 'react';
import { Sprout, Menu, X, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenOutline: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOutline }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#E2E8DE]">
      {/* 3-zone Top Bar Contract: Brand Wordmark — 4-5 Nav Links — 1 Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line, single element) */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1C251D]">
            TerraCrop
          </span>
        </a>

        {/* Zone 2: 4-5 Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A5568]">
          <a href="#crop-selector" className="hover:text-[#1C251D] transition-colors whitespace-nowrap shrink-0">
            Crop Selector
          </a>
          <a href="#garden-layout" className="hover:text-[#1C251D] transition-colors whitespace-nowrap shrink-0">
            Garden Layout
          </a>
          <a href="#pest-treatments" className="hover:text-[#1C251D] transition-colors whitespace-nowrap shrink-0">
            Pest & Remedies
          </a>
          <a href="#field-guides" className="hover:text-[#1C251D] transition-colors whitespace-nowrap shrink-0">
            Field Guides
          </a>
          <a href="#community-forum" className="hover:text-[#1C251D] transition-colors whitespace-nowrap shrink-0">
            Community
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenOutline}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] active:bg-[#1B4332] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Platform Outline</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A5568] hover:text-[#1C251D] rounded-md focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8DE] bg-[#FBFBF9] px-4 pt-3 pb-5 space-y-2 text-sm font-medium text-[#4A5568]">
          <a
            href="#crop-selector"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#1C251D]"
          >
            Crop Selector
          </a>
          <a
            href="#garden-layout"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#1C251D]"
          >
            Garden Layout
          </a>
          <a
            href="#pest-treatments"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#1C251D]"
          >
            Pest & Remedies
          </a>
          <a
            href="#field-guides"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#1C251D]"
          >
            Field Guides
          </a>
          <a
            href="#community-forum"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#1C251D]"
          >
            Community
          </a>
        </div>
      )}
    </header>
  );
};
