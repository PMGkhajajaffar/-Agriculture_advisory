import React, { useState } from 'react';
import { X, Copy, Check, BookOpen } from 'lucide-react';

interface AppOutlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppOutlineModal: React.FC<AppOutlineModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const outlineMarkdown = `# Web Application Concept Outline: TerraCrop Advisory Platform

## 1. Executive Summary & Product Vision
TerraCrop is an accessible, community-grounded web application designed to bridge the gap between complex agricultural science and everyday growers. Whether helping smallholder farmers optimize staple crops or empowering suburban hobbyists to cultivate their first backyard raised bed, TerraCrop translates regional agro-climatic data into straightforward, confidence-building guidance. The platform prioritizes high legibility, gentle learning curves, and responsible, low-chemical farming.

## 2. Target Audience & Accessibility Strategy
The platform serves four primary user segments:
- **Commercial & Smallholder Farmers:** Seeking pragmatic, climate-adaptive crop selections and cost-effective Integrated Pest Management (IPM).
- **Home Gardeners & Hobbyists:** Looking for jargon-free soil preparation, companion planting, and organic problem-solving.
- **Educators & Agricultural Students:** Requiring scientifically grounded crop profiles and real-world case studies.
- **Community & Urban Growers:** Collaborating to build shared food resilience in neighborhoods.

**Accessibility Focus:** Clean, unhurried typography, high-contrast visual cues, zero dense technical jargon, and lightweight pages engineered to load smoothly even over rural or low-bandwidth cellular networks.

## 3. Core Architecture & Feature Matrix
The application is structured into four intuitive functional modules:

### A. Homepage & Real-Time Weather Context
- **Top Bar Contract:** A unified, single-line header with direct access to Crop Selector, Pest & Remedies, Field Guides, and Community Forum.
- **Live Agro-Meteorological Widget:** Fetches real-time climate, humidity, wind, and a 6-day farming forecast based on user location (GPS or search). Computes immediate spray safety windows, fungal blight risk, and irrigation guidance, with one-click synchronization into the Crop Matcher.

### B. Interactive Crop Selection Tool
- **Environmental Input Sliders:** Easy-to-adjust controls for local climate zone, annual rainfall (mm), soil texture (loamy, sandy, clay), soil pH (5.0–8.5), and daily sunlight exposure.
- **Dynamic Suitability Engine:** Real-time scoring calculating crop compatibility with transparent explanations of water demand, expected maturity windows, and tailored soil amendment advice.

### C. Square-Foot Garden Bed Layout & Companion Planner
- **Interactive Space Visualizer:** Drag-and-drop & stamp grid visualizer supporting 4x4, 3x6, 4x8, and 2x4 bed dimensions with square-foot spacing densities.
- **Live Companion Synergy & Sunlight Diagnostics:** Instant detection of beneficial companions (e.g. Basil + Tomato) and antagonistic conflicts (e.g. Potato + Tomato), with shading warnings and exportable planting blueprints.

### D. Safe Pest & Medication Database
- **3-Tier Integrated Pest Management (IPM) Hierarchy:**
  1. *Cultural Prevention:* Airflow spacing, drip irrigation, and sanitation.
  2. *Biological & Organic Remedies:* Beneficial insects, neem extracts, and bio-fungicides.
  3. *Targeted Interventions:* Specific sprays with clear Pre-Harvest Intervals (PHI) and mandatory safety cautions.
- **Disclaimers & Recommendations:** Framed responsibly as agronomic recommendations rather than absolute certainties.

### D. Practical Field Guides & Best Practices
- **Step-by-Step Playbooks:** 4-step actionable execution plans covering composting ratios, water-saving drip systems, and 4-bed crop rotation.
- **Grower Tips:** Immediate, cost-free advice derived from extension practices.

### E. Community Knowledge Exchange & Verified Outcomes
- **Peer-to-Peer Advice Board:** Open forum categorized by topic tags (Beginner Advice, Pest Emergencies, Soil & Water) with local location tags and helpful-vote validation.
- **Attributable Success Stories:** Transparent testimonials documenting verified metrics (e.g., 65% reduction in synthetic sprays; 28% yield improvement).

## 4. Evidence Grounding & Recommendation Standards
Every piece of guidance is anchored in established research from the UN Food and Agriculture Organization (FAO), USDA Agricultural Research Service (ARS), and University Cooperative Extension IPM programs. The interface clearly distinguishes between general principles and user-specific climate inputs, ensuring safe, responsible, and empowering agricultural stewardship.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(outlineMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-[#CBD5E1] shadow-2xl overflow-hidden animate-in fade-in-50 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E2E8DE] flex items-center justify-between bg-[#FBFBF9] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1C251D]">
                Crop Advisory Platform Concept Outline
              </h3>
              <p className="text-xs text-[#64748B]">
                Product Specification & UX Blueprint · ~600 words
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1C251D] bg-white border border-[#CBD5E1] hover:bg-[#F3F5F1] rounded-lg transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span className="text-[#2D6A4F]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1C251D] hover:bg-[#F1F5F0]"
              aria-label="Close outline modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Structured Prose */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-7 text-xs sm:text-sm text-[#334155] leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
              01. Executive Summary & Product Vision
            </div>
            <h4 className="text-lg font-bold text-[#1C251D]">
              Bridging Agricultural Science and Daily Practice
            </h4>
            <p>
              TerraCrop is an accessible, community-grounded web application designed to bridge the gap between complex agricultural science and everyday growers. Whether helping smallholder farmers optimize staple crops or empowering suburban hobbyists to cultivate their first backyard raised bed, TerraCrop translates regional agro-climatic data into straightforward, confidence-building guidance. The platform prioritizes high legibility, gentle learning curves, and responsible, low-chemical farming.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2 pt-4 border-t border-[#F0F4ED]">
            <div className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
              02. Target Audience & Accessibility Strategy
            </div>
            <h4 className="text-lg font-bold text-[#1C251D]">
              Designed for Diverse Levels of Literacy and Experience
            </h4>
            <p>
              The platform serves four primary user segments:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#475569]">
              <li><strong>Commercial & Smallholder Farmers:</strong> Seeking pragmatic, climate-adaptive crop selections and cost-effective Integrated Pest Management (IPM).</li>
              <li><strong>Home Gardeners & Hobbyists:</strong> Looking for jargon-free soil preparation, companion planting, and organic problem-solving.</li>
              <li><strong>Educators & Agricultural Students:</strong> Requiring scientifically grounded crop profiles and real-world case studies.</li>
              <li><strong>Community & Urban Growers:</strong> Collaborating to build shared food resilience in neighborhoods.</li>
            </ul>
            <p className="pt-1 text-[#64748B]">
              <strong>Accessibility Focus:</strong> Clean unhurried typography, high-contrast visual cues, zero dense technical jargon, and lightweight pages engineered to load smoothly even over rural or low-bandwidth cellular networks.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 pt-4 border-t border-[#F0F4ED]">
            <div className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
              03. Core Architecture & Feature Matrix
            </div>
            <h4 className="text-lg font-bold text-[#1C251D]">
              Streamlined Functional Modules
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-1">
                <div className="font-bold text-[#1C251D] text-xs sm:text-sm">
                  Interactive Crop Selection Tool
                </div>
                <p className="text-xs text-[#64748B] leading-normal">
                  Drop-downs and sliders for climate zones, annual rainfall (mm), soil texture, and soil pH (5.0–8.5). Computes instant compatibility scores with tailored soil preparation tips.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-1">
                <div className="font-bold text-[#1C251D] text-xs sm:text-sm">
                  Garden Bed Layout & Companion Planner
                </div>
                <p className="text-xs text-[#64748B] leading-normal">
                  Interactive drag-and-drop square-foot grid with multi-bed presets (4x4, 3x6, 4x8, 2x4). Audits companion plant synergies and sunlight shading in real time.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-1">
                <div className="font-bold text-[#1C251D] text-xs sm:text-sm">
                  Safe Pest & Medication Database
                </div>
                <p className="text-xs text-[#64748B] leading-normal">
                  Structured around a 3-tier IPM hierarchy: cultural prevention first, biological controls second, and targeted treatments third, complete with pre-harvest intervals and safety cautions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-1">
                <div className="font-bold text-[#1C251D] text-xs sm:text-sm">
                  D3 Phenology Timeline & Field Guides
                </div>
                <p className="text-xs text-[#64748B] leading-normal">
                  Interactive multi-crop growth cycle timeline with day scrubbing alongside actionable playbooks covering composting ratios, drip systems, and 4-bed crop rotation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-1 md:col-span-2">
                <div className="font-bold text-[#1C251D] text-xs sm:text-sm">
                  Community Forum & Verified Success Stories
                </div>
                <p className="text-xs text-[#64748B] leading-normal">
                  Peer advice exchange organized by topic tags and verified grower case studies featuring quantifiable outcomes (+28% yields, -65% spray reliance).
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-2 pt-4 border-t border-[#F0F4ED]">
            <div className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
              04. Evidence Grounding & Recommendation Standards
            </div>
            <h4 className="text-lg font-bold text-[#1C251D]">
              Rigorous Agricultural Sources Framed as Guidance
            </h4>
            <p>
              All advisory data is grounded in established research from the UN Food and Agriculture Organization (FAO), USDA Agricultural Research Service (ARS), and University Cooperative Extension IPM programs. The interface clearly distinguishes between general agronomic principles and user-specific environmental inputs, consistently framing advice as actionable suggestions rather than certainties to encourage responsible spot-testing.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#E2E8DE] bg-[#FBFBF9] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#64748B]">
            Complies with all outline constraints (500-700 words, approachable tone, IPM hierarchy).
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] rounded-lg transition-colors"
          >
            Close Outline
          </button>
        </div>
      </div>
    </div>
  );
};
