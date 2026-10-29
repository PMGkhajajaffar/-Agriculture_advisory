# Interactive Crop Growth Cycle Timeline (D3.js)

An interactive, responsive D3.js timeline visualization embedded within the **ResourceGuides** component of TerraCrop Advisory. It maps out multi-stage crop lifecycles (germination, seedling/vegetative, flowering/tasseling, fruit set, ripening/harvest) on a day-by-day axis, allowing growers to compare 2 to 4 crops side-by-side to plan succession planting, labor, and pest interventions.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed via interactive clarification and will guide the implementation:

- **Confirmed Decision 1 (Timeline Format):** Day-by-day growth stage progression (0 to 140+ days) mapping germination, vegetative establishment, flowering/bloom, fruit set, and harvest readiness.
- **Confirmed Decision 2 (Multi-Crop Comparison):** Interactive toggle chips allowing users to select and overlay 2 to 4 crops concurrently on aligned horizontal timeline tracks.
- **Confirmed Decision 3 (Rich Milestone Inspector):** Hover and click interactions that reveal a rich stage inspector card detailing day spans, ideal soil temperature, water adjustments, vital care tasks, and pest/disease vulnerability alerts for that specific developmental phase.

---

## 1. Overview & Core Concept

- **What It Does:** Translates abstract crop duration metrics into an intuitive visual timeline. Growers select between staple vegetables, legumes, fruits, and grains to visualize overlapping growth phases, anticipate critical flowering and fruit set windows, and synchronize garden bed turnover.
- **Target Audience:** Backyard hobbyists planning raised bed rotations, market farmers managing succession sowing schedules, and agriculture students analyzing developmental phenology.
- **Key Value:** Eliminates the guesswork in garden planning by providing exact timing milestones, warning growers ahead of vulnerability windows (e.g., armyworm threat during corn whorl formation, or blossom-end rot risk during tomato fruit expansion).

---

## 2. User Experience & Visual Design

### A. Layout & Placement within ResourceGuides
- Positioned seamlessly at the top of the **Field Guides & Best Practices** section (`#field-guides`) as a dedicated visual exploratory module titled *"Crop Growth Phenology & Succession Planner"*.
- Features a quick crop selector toolbar where users toggle crops (e.g., Tomato, Bush Beans, Sweet Corn, Spinach, Carrot, Bell Pepper, Potato, Strawberry).
- Includes preset quick-comparison buttons: *"Spring Salad Bed"* (Spinach + Carrot + Bush Bean), *"Three Sisters Guild"* (Sweet Corn + Bush Bean), and *"Solanaceae Block"* (Tomato + Bell Pepper + Potato).

### B. Visual Identity & Theme (60-30-10 Rule)
- **60% Neutral Canvas:** Crisp white and light bone (`#FBFBF9` / `#FFFFFF`) chart background with subtle horizontal guide lines (`#E2E8DE`).
- **30% Structural Tracks & Labels:** Clean stage tracks with rounded pill-free bar segments, muted day tick axes, and high-contrast typography (`#1C251D` / `#4A5568`).
- **10% Semantic Stage Color Coding:**
  - *Germination & Sprout:* Warm Saffron Amber (`#D97706` / `#FEF3C7`)
  - *Vegetative & Leaf Canopy:* Fresh Emerald Green (`#059669` / `#D1FAE5`)
  - *Flowering & Pollination:* Vibrant Sky Cyan (`#0284C7` / `#E0F2FE`)
  - *Fruit / Pod Setting:* Deep Forest Teal (`#0D9488` / `#CCFBF1`)
  - *Ripening & Harvest:* Golden Harvest Ochre (`#B45309` / `#FDE68A`)

### C. Interactive Feedback & Stage Inspector
- **Smooth Cursor Scrubbing:** A vertical dashed indicator line tracks the mouse across the day axis to evaluate what each selected crop is doing on Day 15, Day 45, or Day 75.
- **Active Stage Highlighting:** Hovering or tapping a stage bar gently dims adjacent stages and elevates the active segment with a smooth D3 transition.
- **Rich Stage Detail Drawer / Tooltip:** Displays:
  - *Stage Title & Day Range:* e.g., "Days 35 – 55 (20 days duration)"
  - *Biological Milestone:* Plain-English description of what is happening above and below soil.
  - *Care Instructions:* Critical watering volume shifts, fertilizing notes, or trellis support.
  - *Pest / Blight Watch:* Linked directly to TerraCrop's IPM guidance (e.g., "Aphid risk high on young shoots; check under leaves").

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: D3.js Scalable Vector Graphics (SVG) with React Integration**
  - *Chosen Approach:* Use `d3-scale`, `d3-axis`, and `d3-selection` inside a React `useRef` hook with responsive resize observation (`ResizeObserver`).
  - *Why:* Guarantees smooth sub-pixel rendering, crisp SVG vector exports, and accessibility across desktop and mobile screens without canvas blurring.
  - *Alternatives Considered:* Pure HTML/CSS bars lacked dynamic time axis ticks and synchronized multi-track scrubbers.
- **Decision 2: 2–4 Crop Multi-Select Constraint**
  - *Chosen Approach:* Allow a minimum of 1 and maximum of 4 concurrent crops on the visualization.
  - *Why:* Prevents vertical chart clutter and cognitive overload while empowering realistic intercropping and succession comparisons.
- **Decision 3: Zero-Jargon Agricultural Terminology**
  - *Chosen Approach:* Replace dense phenological terms (e.g., "V6 collar emergence", "BBCH stage 71") with everyday clear equivalents ("Rapid stem growth", "Green fruit swelling").

---

## 4. Technical Architecture & Data Strategy

### A. Component Hierarchy & System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                       ResourceGuides                        │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         CropGrowthTimeline (New D3 Component)         │  │
│  │                                                       │  │
│  │   [Crop Selection Chips: Tomato, Corn, Carrot...]     │  │
│  │   [Preset Comparison Packs: Spring Bed, Guild...]     │  │
│  │                                                       │  │
│  │   ┌─────────────────────────────────────────────────┐ │  │
│  │   │  D3 SVG Canvas (Linear Day Scale 0 → 140+ days) │ │  │
│  │   │  ├── Day-Axis (Ticks: 0, 20, 40, 60, 80, 100...)│ │  │
│  │   │  ├── Track 1: Tomato [Germ][Veg][Bloom][Fruit]  │ │  │
│  │   │  ├── Track 2: Bush Beans [Germ][Vegetative][Pod]│ │  │
│  │   │  ├── Scrub Line (Interactive Day Cursor)        │ │  │
│  │   │  └── Event Markers (Harvest Window, Frost Cut)  │ │  │
│  │   └─────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │   ┌─────────────────────────────────────────────────┐ │  │
│  │   │       Active Stage Rich Inspector Card          │ │  │
│  │   │       (Care Tips, Soil Temp, Pest Alerts)       │ │  │
│  │   └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │        Field Guides Accordion & Best Practices        │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### B. Phenology Data Model (`src/data/growthTimelineData.ts`)

```typescript
export interface GrowthStage {
  id: string;
  name: string; // e.g. "Germination & Emergence"
  shortName: string; // e.g. "Germination"
  startDay: number;
  endDay: number;
  stageColor: string;
  stageCategory: 'germination' | 'vegetative' | 'flowering' | 'fruiting' | 'harvest';
  description: string;
  careAdvice: string;
  wateringNeed: 'Minimal' | 'Moderate' | 'Heavy / Deep' | 'Tapering off';
  soilTempRequirement: string;
  pestVulnerabilities: string[];
}

export interface CropTimelineData {
  cropId: string;
  cropName: string;
  category: string;
  totalDays: number;
  stages: GrowthStage[];
}
```

### C. Execution Steps (Post-Approval)
1. **Package Installation:** Install `d3` and `@types/d3` via `install_applet_package`.
2. **Phenology Dataset:** Create `src/data/growthTimelineData.ts` with comprehensive growth stages for all standard TerraCrop crops.
3. **D3 Timeline Component:** Build `src/components/CropGrowthTimeline.tsx` with D3 linear scales, SVG rendering, responsive resize listeners, interactive tooltips, and click-to-inspect drawers.
4. **Integration:** Embed the timeline into `src/components/ResourceGuides.tsx` with preset toggles and seamless styling.
5. **Validation:** Run `compile_applet` and `lint_applet` to ensure zero compilation or TypeScript errors.
