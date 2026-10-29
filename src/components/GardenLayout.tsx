import React, { useState, useMemo } from 'react';
import {
  GARDEN_PLANTS,
  BED_PRESETS,
  GardenPlant,
  BedDimensions,
  LAYOUT_STARTER_PRESETS,
  analyzeGridLayout,
} from '../data/gardenLayoutData';
import {
  Grid,
  Sparkles,
  Trash2,
  Download,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Sprout,
  Layers,
  Eraser,
  FileText,
  X,
  Compass,
} from 'lucide-react';

const STORAGE_BED_KEY = 'terracrop_garden_bed_v1';
const STORAGE_GRID_KEY = 'terracrop_garden_grid_v1';

export const GardenLayout: React.FC = () => {
  // Current bed size with localStorage recovery
  const [currentBed, setCurrentBed] = useState<BedDimensions>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BED_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.rows && parsed.cols) {
          const matched = BED_PRESETS.find((b) => b.id === parsed.id);
          if (matched) return matched;
        }
      }
    } catch {
      // ignore
    }
    return BED_PRESETS[0];
  });

  // Initial grid state with localStorage recovery
  const [grid, setGrid] = useState<(string | null)[][]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GRID_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && Array.isArray(parsed[0])) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return LAYOUT_STARTER_PRESETS[0].grid.map((row) => [...row]);
  });

  // Persist to localStorage on change
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BED_KEY, JSON.stringify(currentBed));
    } catch {
      // storage unavailable or quota exceeded
    }
  }, [currentBed]);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GRID_KEY, JSON.stringify(grid));
    } catch {
      // storage unavailable or quota exceeded
    }
  }, [grid]);

  // Active brush tool for click-to-place (null = select mode, 'eraser' = erase mode, cropId = stamp mode)
  const [activeBrush, setActiveBrush] = useState<string | null>('tomato');

  // Currently dragged plant ID for visual feedback
  const [draggedPlantId, setDraggedPlantId] = useState<string | null>(null);

  // Inspected cell coordinates
  const [inspectedCell, setInspectedCell] = useState<{ r: number; c: number } | null>({ r: 0, c: 0 });

  // Plan export modal
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [copiedPlan, setCopiedPlan] = useState(false);

  // Plant lookup map
  const plantMap = useMemo(() => {
    return new Map<string, GardenPlant>(GARDEN_PLANTS.map((p) => [p.id, p]));
  }, []);

  // Companion & Sunlight Analysis
  const analysis = useMemo(() => {
    return analyzeGridLayout(grid, GARDEN_PLANTS);
  }, [grid]);

  // Handle changing bed size
  const handleSelectBedPreset = (preset: BedDimensions) => {
    setCurrentBed(preset);
    // Resize grid while preserving existing placed crops safely
    const newGrid: (string | null)[][] = Array.from({ length: preset.rows }, (_, r) =>
      Array.from({ length: preset.cols }, (_, c) => {
        return grid[r]?.[c] ?? null;
      })
    );
    setGrid(newGrid);
    setInspectedCell(null);
  };

  // Handle Loading a Starter Preset
  const handleLoadStarterPreset = (preset: typeof LAYOUT_STARTER_PRESETS[0]) => {
    const matchedBed = BED_PRESETS.find((b) => b.id === preset.presetId) || BED_PRESETS[0];
    setCurrentBed(matchedBed);
    setGrid(preset.grid.map((row) => [...row]));
    setInspectedCell({ r: 0, c: 0 });
  };

  // Clear all grid cells
  const handleClearBed = () => {
    setGrid(Array.from({ length: currentBed.rows }, () => Array.from({ length: currentBed.cols }, () => null)));
    setInspectedCell(null);
  };

  // Place a plant in a cell
  const handlePlacePlant = (r: number, c: number, plantId: string | null) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = plantId;
      return next;
    });
    setInspectedCell({ r, c });
  };

  // Cell Click Handler
  const handleCellClick = (r: number, c: number) => {
    if (activeBrush === 'eraser') {
      handlePlacePlant(r, c, null);
    } else if (activeBrush) {
      handlePlacePlant(r, c, activeBrush);
    } else {
      setInspectedCell({ r, c });
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, plantId: string) => {
    e.dataTransfer.setData('text/plain', plantId);
    setDraggedPlantId(plantId);
  };

  const handleDragEnd = () => {
    setDraggedPlantId(null);
  };

  const handleDrop = (e: React.DragEvent, r: number, c: number) => {
    e.preventDefault();
    const plantId = e.dataTransfer.getData('text/plain');
    if (plantId) {
      handlePlacePlant(r, c, plantId);
    }
    setDraggedPlantId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Details for currently inspected cell
  const inspectedPlant = useMemo(() => {
    if (!inspectedCell) return null;
    const cropId = grid[inspectedCell.r]?.[inspectedCell.c];
    return cropId ? plantMap.get(cropId) || null : null;
  }, [inspectedCell, grid, plantMap]);

  // Aggregate seed inventory for export
  const seedInventory = useMemo(() => {
    const counts: { [id: string]: { plant: GardenPlant; sqFtCount: number; totalCount: number } } = {};
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < (grid[0]?.length || 0); c++) {
        const id = grid[r][c];
        if (id) {
          const plant = plantMap.get(id);
          if (plant) {
            if (!counts[id]) {
              counts[id] = { plant, sqFtCount: 0, totalCount: 0 };
            }
            counts[id].sqFtCount += 1;
            counts[id].totalCount += plant.sqFtDensity;
          }
        }
      }
    }
    return Object.values(counts);
  }, [grid, plantMap]);

  // Generate plain text plan for clipboard
  const generatePlanText = () => {
    let text = `TERRACROP GARDEN BED PLAN (${currentBed.name})\n`;
    text += `Dimensions: ${currentBed.rows} rows × ${currentBed.cols} cols (${currentBed.totalSqFt} sq ft)\n`;
    text += `Total Plant Count: ${analysis.totalPlants} plants\n\n`;
    text += `PLANTING INVENTORY:\n`;
    seedInventory.forEach(({ plant, sqFtCount, totalCount }) => {
      text += `- ${plant.name}: ${sqFtCount} sq ft (${totalCount} plants/seeds @ ${plant.sqFtDensity}/sq ft)\n`;
    });
    text += `\nGRID LAYOUT MATRIX (North/Back to South/Front):\n`;
    for (let r = 0; r < currentBed.rows; r++) {
      const rowItems = grid[r].map((id) => (id ? (plantMap.get(id)?.shortName || id) : '[Empty]')).join(' | ');
      text += `Row ${r + 1}: ${rowItems}\n`;
    }
    return text;
  };

  const handleCopyPlan = () => {
    navigator.clipboard.writeText(generatePlanText());
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  return (
    <section id="garden-layout" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E2E8DE]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wider text-[#2D6A4F] uppercase flex items-center gap-1.5">
            <Grid className="w-4 h-4" />
            <span>Interactive Space Visualizer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C251D] mt-1 tracking-tight">
            Square-Foot Garden Bed Layout Planner
          </h2>
          <p className="text-base text-[#4A5568] mt-2 leading-relaxed">
            Drag and drop crops onto the square-foot grid, or tap a crop to stamp your bed. TerraCrop continuously audits companion plant synergies, soil spacing densities, and sunlight shadows.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1C251D] bg-white border border-[#CBD5E1] hover:bg-[#F3F5F1] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Planting Summary</span>
          </button>

          <button
            type="button"
            onClick={handleClearBed}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#991B1B] bg-white border border-[#FECACA] hover:bg-[#FEF2F2] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bed</span>
          </button>
        </div>
      </div>

      {/* Bed Preset Sizing Bar & Starter Layouts */}
      <div className="bg-[#FBFBF9] border border-[#E2E8DE] rounded-xl p-4 sm:p-5 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Bed Size Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#1C251D] flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#2D6A4F]" />
            Bed Size:
          </span>
          {BED_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectBedPreset(preset)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                currentBed.id === preset.id
                  ? 'bg-[#1C251D] text-white shadow-2xs'
                  : 'bg-white text-[#4A5568] border border-[#CBD5E1] hover:border-[#94A3B8]'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Starter Layouts */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#64748B]">Load Preset:</span>
          {LAYOUT_STARTER_PRESETS.map((starter) => (
            <button
              key={starter.name}
              type="button"
              onClick={() => handleLoadStarterPreset(starter)}
              className="px-2.5 py-1 text-xs font-medium bg-[#E8F1EC] hover:bg-[#D1E3D8] text-[#1B4332] rounded-md transition-colors whitespace-nowrap"
            >
              {starter.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Plant Nursery Tray / Stamping Palette */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8DE] rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F4ED]">
            <div>
              <h3 className="font-bold text-[#1C251D] text-sm">Plant Palette & Nursery Tray</h3>
              <p className="text-[11px] text-[#64748B]">Drag to grid or tap to select active planting stamp</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveBrush(activeBrush === 'eraser' ? null : 'eraser')}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeBrush === 'eraser'
                  ? 'bg-[#991B1B] text-white border-[#991B1B]'
                  : 'bg-white text-[#64748B] border-[#CBD5E1] hover:text-[#1C251D]'
              }`}
              title="Eraser tool"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Erase</span>
            </button>
          </div>

          {/* Tray Grid */}
          <div className="grid grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
            {GARDEN_PLANTS.map((plant) => {
              const isSelected = activeBrush === plant.id;
              return (
                <div
                  key={plant.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, plant.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setActiveBrush(isSelected ? null : plant.id)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all select-none ${
                    isSelected
                      ? 'ring-2 ring-[#2D6A4F] border-[#2D6A4F] bg-[#F4F9F5] shadow-xs'
                      : draggedPlantId === plant.id
                      ? 'opacity-50 ring-2 ring-dashed ring-[#2D6A4F] bg-[#F4F9F5] border-[#2D6A4F]'
                      : 'hover:border-[#94A3B8] bg-[#FBFBF9] border-[#E2E8DE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl" role="img" aria-label={plant.name}>
                      {plant.emoji}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-[#E2E8DE]">
                      {plant.sqFtDensity}/sq ft
                    </span>
                  </div>

                  <div className="font-bold text-[#1C251D] text-xs mt-1.5 truncate">
                    {plant.shortName}
                  </div>
                  <div className="text-[10px] text-[#64748B] truncate">
                    {plant.plantHeight} · {plant.category}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Tool Status */}
          <div className="p-3 bg-[#F8FAF7] border border-[#E9F0E6] rounded-xl text-xs flex items-center justify-between text-[#2D5A43]">
            <span>
              Active Stamp:{' '}
              <strong className="text-[#1B4332]">
                {activeBrush === 'eraser'
                  ? 'Eraser Tool'
                  : activeBrush
                  ? plantMap.get(activeBrush)?.name
                  : 'Click a crop to stamp'}
              </strong>
            </span>
            {activeBrush && (
              <button
                type="button"
                onClick={() => setActiveBrush(null)}
                className="text-[11px] underline underline-offset-2 text-[#64748B] hover:text-[#1C251D]"
              >
                Clear Tool
              </button>
            )}
          </div>
        </div>

        {/* Center / Right Column: The Physical Garden Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#E2E8DE] rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
            {/* Grid Header & Compass Orientation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0F4ED]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1C251D]">
                  {currentBed.name} ({currentBed.totalSqFt} Sq. Ft. Total)
                </span>
                <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                <span className="text-xs text-[#64748B] font-mono">
                  {analysis.occupancyRate}% Planted ({analysis.totalPlants} Plants)
                </span>
              </div>

              {/* Compass Indicator */}
              <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium bg-[#FBFBF9] px-2.5 py-1 rounded-lg border border-[#E2E8DE]">
                <Compass className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>North / Back Row (Top) → South / Sun Front (Bottom)</span>
              </div>
            </div>

            {/* The Square-Foot Grid Visualizer */}
            <div className="overflow-x-auto pb-2">
              <div
                className="grid gap-3 mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${currentBed.cols}, minmax(78px, 1fr))`,
                  maxWidth: currentBed.cols <= 4 ? '480px' : '720px',
                }}
              >
                {grid.map((row, r) =>
                  row.map((cropId, c) => {
                    const plant = cropId ? plantMap.get(cropId) : null;
                    const isInspected = inspectedCell?.r === r && inspectedCell?.c === c;

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => handleCellClick(r, c)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, r, c)}
                        className={`aspect-square rounded-xl border-2 transition-all relative flex flex-col items-center justify-center p-1.5 cursor-pointer select-none group ${
                          isInspected
                            ? 'ring-2 ring-[#2D6A4F] ring-offset-2'
                            : ''
                        } ${
                          plant
                            ? 'border-solid shadow-2xs hover:scale-102'
                            : 'border-dashed border-[#CBD5E1] bg-[#FBFBF9] hover:bg-[#F3F6F1] hover:border-[#2D6A4F]'
                        }`}
                        style={{
                          backgroundColor: plant ? plant.bgColor : undefined,
                          borderColor: plant ? plant.borderColor : undefined,
                        }}
                        title={`Row ${r + 1}, Col ${c + 1}: ${plant ? plant.name : 'Empty Square Foot (Click or Drop Crop Here)'}`}
                      >
                        {/* Coordinate tag */}
                        <span className="absolute top-1 left-1.5 text-[9px] font-mono text-[#94A3B8]">
                          {r + 1},{c + 1}
                        </span>

                        {plant ? (
                          <>
                            <span className="text-2xl mt-1" role="img" aria-label={plant.name}>
                              {plant.emoji}
                            </span>
                            <span
                              className="text-[11px] font-bold mt-0.5 truncate max-w-full px-1"
                              style={{ color: plant.textColor }}
                            >
                              {plant.shortName}
                            </span>
                            <span className="text-[9px] font-mono text-[#64748B]">
                              ×{plant.sqFtDensity}
                            </span>
                          </>
                        ) : (
                          <div className="text-center text-[#94A3B8] group-hover:text-[#2D6A4F] transition-colors">
                            <Sprout className="w-4 h-4 mx-auto mb-0.5 opacity-60" />
                            <span className="text-[10px] font-mono">1 sq ft</span>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Quick helper tip */}
            <div className="text-[11px] text-[#64748B] text-center pt-1 border-t border-[#F0F4ED]">
              Tip: Click any square above to inspect crop details, or select another crop from the tray to stamp.
            </div>
          </div>

          {/* Cell Inspection Card */}
          {inspectedPlant && inspectedCell && (
            <div className="p-4 sm:p-5 rounded-xl border border-[#CBD5E1] bg-white shadow-xs space-y-3 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0F4ED]">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{inspectedPlant.emoji}</span>
                  <div>
                    <h4 className="font-bold text-sm text-[#1C251D]">
                      {inspectedPlant.name} (Cell {inspectedCell.r + 1}, {inspectedCell.c + 1})
                    </h4>
                    <p className="text-xs text-[#64748B]">
                      {inspectedPlant.spacingDescription} · Harvest: {inspectedPlant.harvestWindowDays}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePlacePlant(inspectedCell.r, inspectedCell.c, null)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#991B1B] hover:bg-[#FEF2F2] rounded-md transition-colors"
                >
                  Remove from Cell
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#F8FAF7] border border-[#E9F0E6] space-y-1">
                  <div className="font-semibold text-[#2D6A4F] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Recommended Companions
                  </div>
                  <p className="text-[#475569]">
                    Plant near:{' '}
                    <strong>
                      {inspectedPlant.goodCompanions
                        .map((id) => plantMap.get(id)?.shortName)
                        .filter(Boolean)
                        .join(', ')}
                    </strong>
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#FEF2F2]/60 border border-[#FECACA] space-y-1">
                  <div className="font-semibold text-[#991B1B] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Incompatible Neighbors
                  </div>
                  <p className="text-[#7F1D1D]">
                    {inspectedPlant.badCompanions.length > 0 ? (
                      <>
                        Avoid placing next to:{' '}
                        <strong>
                          {inspectedPlant.badCompanions
                            .map((id) => plantMap.get(id)?.shortName)
                            .filter(Boolean)
                            .join(', ')}
                        </strong>
                      </>
                    ) : (
                      'Friendly neighbor to virtually all garden crops.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Companion & Sunlight Diagnostics Panel */}
          <div className="p-5 rounded-2xl bg-[#FBFBF9] border border-[#E2E8DE] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8DE]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                <h4 className="font-bold text-sm text-[#1C251D]">
                  Companion Synergy & Sunlight Diagnostics
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#2D6A4F] font-semibold">
                  +{analysis.positiveCount} Synergies
                </span>
                {analysis.warningCount > 0 && (
                  <span className="text-[#DC2626] font-semibold">
                    · {analysis.warningCount} Warnings
                  </span>
                )}
              </div>
            </div>

            {/* Sunlight Warning Banner */}
            {analysis.heightWarning && (
              <div className="p-3 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex items-start gap-2.5 text-xs text-[#92400E]">
                <Sun className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>{analysis.heightWarning}</span>
              </div>
            )}

            {/* Positive Synergies List */}
            {analysis.synergies.length > 0 ? (
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
                  Active Beneficial Interactions:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {analysis.synergies.map((syn, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white border border-[#E2E8DE] text-xs text-[#334155] flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                      <span>{syn}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#64748B] italic">
                No active companion pairings placed yet. Try planting Basil next to Tomatoes or Beans next to Corn!
              </div>
            )}

            {/* Antagonistic Warnings List */}
            {analysis.warnings.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-[#E2E8DE]">
                <div className="text-xs font-semibold text-[#991B1B] uppercase tracking-wider">
                  Neighbor Conflicts to Resolve:
                </div>
                <div className="space-y-1.5">
                  {analysis.warnings.map((warn, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B] flex items-start gap-2"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                      <span>{warn}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export & Summary Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-[#CBD5E1] shadow-2xl p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#E2E8DE]">
              <div>
                <div className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
                  Garden Bed Blueprint
                </div>
                <h3 className="text-xl font-bold text-[#1C251D]">
                  {currentBed.name} Planting Summary
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1C251D] hover:bg-[#F1F5F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inventory Table */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#1C251D]">
                Required Seedlings / Seeds Needed:
              </div>

              <div className="border border-[#E2E8DE] rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAF7] border-b border-[#E2E8DE] text-[#64748B]">
                    <tr>
                      <th className="p-2.5">Crop</th>
                      <th className="p-2.5">Squares</th>
                      <th className="p-2.5">Density</th>
                      <th className="p-2.5 text-right font-mono">Total Plants</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F4ED]">
                    {seedInventory.map(({ plant, sqFtCount, totalCount }) => (
                      <tr key={plant.id} className="hover:bg-[#FBFBF9]">
                        <td className="p-2.5 font-bold text-[#1C251D] flex items-center gap-1.5">
                          <span>{plant.emoji}</span>
                          <span>{plant.name}</span>
                        </td>
                        <td className="p-2.5 font-mono">{sqFtCount} sq ft</td>
                        <td className="p-2.5 text-[#64748B]">{plant.sqFtDensity} / sq ft</td>
                        <td className="p-2.5 text-right font-mono font-bold text-[#2D6A4F]">
                          {totalCount} plants
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Plan Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#FBFBF9] border border-[#E2E8DE]">
                <div className="text-[#64748B]">Total Space Allocated</div>
                <div className="text-sm font-bold text-[#1C251D] mt-0.5">
                  {currentBed.totalSqFt} Square Feet
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#FBFBF9] border border-[#E2E8DE]">
                <div className="text-[#64748B]">Companion Synergies</div>
                <div className="text-sm font-bold text-[#2D6A4F] mt-0.5">
                  +{analysis.positiveCount} Active Pairs
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E2E8DE]">
              <button
                type="button"
                onClick={handleCopyPlan}
                className="px-4 py-2 text-xs font-semibold text-[#1C251D] bg-[#F1F5F0] hover:bg-[#E2E8DE] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{copiedPlan ? 'Copied Plan to Clipboard!' : 'Copy Plan Text'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#22543D] rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
