import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import {
  CROP_TIMELINES,
  CropTimelineData,
  GrowthStage,
  TIMELINE_PRESET_PACKS,
} from '../data/growthTimelineData';
import {
  Calendar,
  Layers,
  Droplets,
  Thermometer,
  ShieldAlert,
  Sprout,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const CropGrowthTimeline: React.FC = () => {
  // Selected crops (2 to 4 crops)
  const [selectedCropIds, setSelectedCropIds] = useState<string[]>([
    'crop-tomato',
    'crop-bush-bean',
    'crop-spinach',
  ]);

  // Active inspected stage (clicked or hovered)
  const [activeStage, setActiveStage] = useState<{
    crop: CropTimelineData;
    stage: GrowthStage;
  } | null>(null);

  // Mouse scrub position (in days)
  const [scrubDay, setScrubDay] = useState<number | null>(null);

  // Container ref for responsive D3 rendering
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(800);

  // Filter selected crop data
  const selectedCrops = useMemo(() => {
    return CROP_TIMELINES.filter((c) => selectedCropIds.includes(c.cropId));
  }, [selectedCropIds]);

  // Maximum days across selected crops
  const maxDays = useMemo(() => {
    if (selectedCrops.length === 0) return 100;
    return Math.max(...selectedCrops.map((c) => c.totalDays), 60);
  }, [selectedCrops]);

  // Default active stage to tomato flowering on initial load
  useEffect(() => {
    if (!activeStage && selectedCrops.length > 0) {
      const first = selectedCrops[0];
      const defaultStage = first.stages.find((s) => s.stageCategory === 'flowering') || first.stages[1];
      setActiveStage({ crop: first, stage: defaultStage });
    }
  }, [selectedCrops, activeStage]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setChartWidth(Math.max(width, 340));
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Crop toggle logic (2 to 4 crops)
  const toggleCrop = (cropId: string) => {
    if (selectedCropIds.includes(cropId)) {
      if (selectedCropIds.length <= 1) return; // Maintain at least 1
      setSelectedCropIds(selectedCropIds.filter((id) => id !== cropId));
    } else {
      if (selectedCropIds.length >= 4) {
        // Replace the oldest
        setSelectedCropIds([...selectedCropIds.slice(1), cropId]);
      } else {
        setSelectedCropIds([...selectedCropIds, cropId]);
      }
    }
  };

  const applyPreset = (cropIds: string[]) => {
    setSelectedCropIds(cropIds);
    const targetCrop = CROP_TIMELINES.find((c) => c.cropId === cropIds[0]);
    if (targetCrop && targetCrop.stages.length > 1) {
      setActiveStage({ crop: targetCrop, stage: targetCrop.stages[1] });
    }
  };

  // D3 Rendering Effect
  useEffect(() => {
    if (!svgRef.current || selectedCrops.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const isMobile = chartWidth < 500;
    const margin = { top: 30, right: isMobile ? 16 : 28, bottom: 44, left: isMobile ? 96 : 140 };
    const width = Math.max(120, chartWidth - margin.left - margin.right);
    const trackHeight = isMobile ? 38 : 44;
    const trackGap = isMobile ? 18 : 24;
    const height = selectedCrops.length * (trackHeight + trackGap) + margin.top + margin.bottom;

    svg.attr('viewBox', `0 0 ${chartWidth} ${height}`).attr('width', chartWidth).attr('height', height);

    // Main Chart Group
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale: Days (0 to maxDays)
    const xScale = d3.scaleLinear().domain([0, maxDays]).range([0, width]);

    // Grid Lines (Vertical day lines)
    const tickCount = chartWidth < 500 ? 5 : 10;
    const xTicks = xScale.ticks(tickCount);

    g.append('g')
      .attr('class', 'grid-lines')
      .selectAll('line')
      .data(xTicks)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d))
      .attr('x2', (d) => xScale(d))
      .attr('y1', 0)
      .attr('y2', height - margin.top - margin.bottom)
      .attr('stroke', '#E2E8DE')
      .attr('stroke-dasharray', '3 3')
      .attr('stroke-width', 1);

    // X Axis at the bottom
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(tickCount)
      .tickFormat((d) => `Day ${d}`);

    const xAxisGroup = g
      .append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(xAxis);

    xAxisGroup.select('.domain').attr('stroke', '#CBD5E1');
    xAxisGroup.selectAll('.tick line').attr('stroke', '#CBD5E1');
    xAxisGroup
      .selectAll('.tick text')
      .attr('fill', '#475569')
      .attr('font-size', '11px')
      .attr('font-family', 'Space Mono, monospace');

    // Background Overlay for Scrubbing Mousemove
    g.append('rect')
      .attr('class', 'chart-bg-overlay')
      .attr('width', width)
      .attr('height', height - margin.top - margin.bottom)
      .attr('fill', 'transparent')
      .attr('pointer-events', 'all');

    // Render Each Crop Track
    selectedCrops.forEach((crop, cropIndex) => {
      const trackY = cropIndex * (trackHeight + trackGap);

      // Crop Label (Left of the track)
      const labelGroup = svg
        .append('g')
        .attr('transform', `translate(${margin.left - 12}, ${margin.top + trackY + trackHeight / 2})`)
        .attr('text-anchor', 'end')
        .style('cursor', 'pointer')
        .on('click', () => {
          setActiveStage({ crop, stage: crop.stages[0] });
        });

      labelGroup
        .append('text')
        .attr('y', -3)
        .attr('fill', '#1C251D')
        .attr('font-weight', '700')
        .attr('font-size', '12px')
        .attr('font-family', 'Plus Jakarta Sans, sans-serif')
        .text(crop.cropName);

      labelGroup
        .append('text')
        .attr('y', 12)
        .attr('fill', '#64748B')
        .attr('font-size', '10px')
        .attr('font-family', 'Space Mono, monospace')
        .text(`${crop.totalDays} Days Total`);

      // Track Background Capsule
      g.append('rect')
        .attr('x', 0)
        .attr('y', trackY)
        .attr('width', xScale(crop.totalDays))
        .attr('height', trackHeight)
        .attr('rx', 6)
        .attr('fill', '#F4F7F2')
        .attr('stroke', '#E2E8DE')
        .attr('stroke-width', 1);

      // Stage Bars
      crop.stages.forEach((stage) => {
        const xStart = xScale(stage.startDay);
        const xEnd = xScale(stage.endDay);
        const barWidth = Math.max(xEnd - xStart, 2);

        const isCurrentActive =
          activeStage?.crop.cropId === crop.cropId && activeStage?.stage.id === stage.id;

        const stageGroup = g
          .append('g')
          .attr('class', 'stage-bar-group')
          .style('cursor', 'pointer')
          .on('click', (event) => {
            event.stopPropagation();
            setActiveStage({ crop, stage });
            setScrubDay(stage.startDay);
          })
          .on('mouseenter', () => {
            setActiveStage({ crop, stage });
          });

        // Stage Rectangle
        stageGroup
          .append('rect')
          .attr('x', xStart)
          .attr('y', trackY + 3)
          .attr('width', barWidth)
          .attr('height', trackHeight - 6)
          .attr('rx', 4)
          .attr('fill', stage.stageColor)
          .attr('opacity', isCurrentActive ? 1 : 0.88)
          .attr('stroke', isCurrentActive ? '#1C251D' : '#FFFFFF')
          .attr('stroke-width', isCurrentActive ? 2 : 1)
          .attr('filter', isCurrentActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))' : null)
          .transition()
          .duration(150);

        // Stage Text Label (if segment is wide enough)
        if (barWidth > 38) {
          stageGroup
            .append('text')
            .attr('x', xStart + barWidth / 2)
            .attr('y', trackY + trackHeight / 2 + 3)
            .attr('text-anchor', 'middle')
            .attr('fill', '#FFFFFF')
            .attr('font-size', barWidth > 70 ? '11px' : '9px')
            .attr('font-weight', '600')
            .attr('font-family', 'DM Sans, sans-serif')
            .style('pointer-events', 'none')
            .text(barWidth > 65 ? `${stage.shortName} (${stage.endDay - stage.startDay}d)` : stage.shortName);
        }
      });
    });

    // Scrubber Line
    const scrubberLine = g
      .append('line')
      .attr('class', 'scrubber-line')
      .attr('y1', 0)
      .attr('y2', height - margin.top - margin.bottom)
      .attr('stroke', '#1C251D')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4 3')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // Scrubber Tag
    const scrubberTag = g
      .append('g')
      .attr('class', 'scrubber-tag')
      .style('opacity', 0)
      .style('pointer-events', 'none');

    scrubberTag
      .append('rect')
      .attr('x', -26)
      .attr('y', -24)
      .attr('width', 52)
      .attr('height', 20)
      .attr('rx', 4)
      .attr('fill', '#1C251D');

    const scrubberText = scrubberTag
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', -10)
      .attr('fill', '#FFFFFF')
      .attr('font-size', '10px')
      .attr('font-family', 'Space Mono, monospace')
      .attr('font-weight', '700');

    const handleScrub = (event: any) => {
      const coords = d3.pointer(event, g.node());
      if (!coords || isNaN(coords[0])) return;
      const mouseX = coords[0];
      const day = Math.round(xScale.invert(mouseX));
      if (!isNaN(day) && day >= 0 && day <= maxDays) {
        setScrubDay(day);
        scrubberLine.attr('x1', mouseX).attr('x2', mouseX).style('opacity', 1);
        scrubberTag.attr('transform', `translate(${mouseX}, 0)`).style('opacity', 1);
        scrubberText.text(`Day ${day}`);
      }
    };

    const handleClearScrub = () => {
      setScrubDay(null);
      scrubberLine.style('opacity', 0);
      scrubberTag.style('opacity', 0);
    };

    g
      .on('pointermove', handleScrub)
      .on('touchmove', handleScrub)
      .on('pointerleave', handleClearScrub)
      .on('touchend', handleClearScrub);
  }, [selectedCrops, maxDays, chartWidth, activeStage]);

  return (
    <div className="bg-white border border-[#E2E8DE] rounded-2xl p-6 sm:p-7 shadow-xs mb-10 space-y-6">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#F0F4ED]">
        <div>
          <div className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Interactive D3 Phenology Visualization</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1C251D] mt-0.5">
            Crop Growth Cycle & Succession Timeline
          </h3>
          <p className="text-xs sm:text-sm text-[#4A5568] mt-1 leading-relaxed">
            Compare overlapping development stages day-by-day. Hover or click any stage bar to inspect critical care tasks, watering volume shifts, and pest vulnerability windows.
          </p>
        </div>

        {/* Preset Packs */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-[#64748B]">Presets:</span>
          {TIMELINE_PRESET_PACKS.map((pack) => (
            <button
              key={pack.name}
              type="button"
              onClick={() => applyPreset(pack.cropIds)}
              className="px-2.5 py-1 text-xs font-medium bg-[#F1F5F0] hover:bg-[#E2F0D9] text-[#1B4332] rounded-md transition-colors whitespace-nowrap"
              title={pack.tagline}
            >
              {pack.name}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Selector Chips (2 to 4 crops) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#1C251D] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#2D6A4F]" />
            Select Crops to Compare (2 to 4 recommended):
          </span>
          <span className="text-[#64748B] font-mono">
            {selectedCropIds.length} of 4 selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CROP_TIMELINES.map((crop) => {
            const isSelected = selectedCropIds.includes(crop.cropId);
            return (
              <button
                key={crop.cropId}
                type="button"
                onClick={() => toggleCrop(crop.cropId)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#1C251D] text-white border-[#1C251D] shadow-2xs'
                    : 'bg-[#FBFBF9] text-[#4A5568] border-[#CBD5E1] hover:border-[#94A3B8]'
                }`}
              >
                <span>{crop.cropName}</span>
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  ({crop.totalDays}d)
                </span>
                {isSelected && <CheckCircle2 className="w-3 h-3 text-[#A3E635]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Legend Strip */}
      <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-[#F0F4ED]">
        <span className="text-[11px] font-semibold text-[#64748B] uppercase">Growth Stages:</span>
        <div className="flex items-center gap-1.5 text-[#475569]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
          <span>Germination</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#475569]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" />
          <span>Vegetative</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#475569]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
          <span>Flowering / Silk</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#475569]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
          <span>Fruit / Ear Expansion</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#475569]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B45309]" />
          <span>Harvest Readiness</span>
        </div>
      </div>

      {/* D3 Chart Canvas Container */}
      <div
        ref={containerRef}
        className="w-full bg-[#FAFBF8] border border-[#E2E8DE] rounded-xl p-3 sm:p-4 overflow-x-auto relative"
      >
        <svg ref={svgRef} className="block overflow-visible" />
      </div>

      {/* Scrub Day Real-Time Cross-Crop Status */}
      {scrubDay !== null && (
        <div className="p-3 bg-[#F1F5F0] border border-[#D9E6D5] rounded-xl text-xs flex flex-wrap items-center justify-between gap-3 animate-in fade-in-50">
          <div className="flex items-center gap-2 text-[#1B4332]">
            <Clock className="w-4 h-4 text-[#2D6A4F]" />
            <span>
              <strong>Scrubbing Day {scrubDay}: </strong>
              {selectedCrops.map((c) => {
                const stage = c.stages.find((s) => scrubDay >= s.startDay && scrubDay <= s.endDay);
                return (
                  <span key={c.cropId} className="mr-3">
                    {c.cropName}: <strong className="text-[#2D6A4F]">{stage ? stage.shortName : scrubDay > c.totalDays ? 'Harvested' : 'Pre-sowing'}</strong>
                  </span>
                );
              })}
            </span>
          </div>
          <span className="text-[11px] text-[#64748B]">Click any stage bar below for details</span>
        </div>
      )}

      {/* Rich Active Stage Inspector Card */}
      {activeStage && (
        <div className="p-5 sm:p-6 rounded-xl border border-[#CBD5E1] bg-[#FBFBF9] shadow-xs space-y-4 animate-in fade-in-50">
          {/* Header of Inspector */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#E2E8DE]">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeStage.stage.stageColor }}
                />
                <span className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
                  {activeStage.crop.cropName} ({activeStage.crop.scientificName})
                </span>
                <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                <span className="text-xs font-mono font-bold text-[#1C251D]">
                  Days {activeStage.stage.startDay} – {activeStage.stage.endDay} ({activeStage.stage.endDay - activeStage.stage.startDay} Days Duration)
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-[#1C251D] mt-1">
                Stage: {activeStage.stage.name}
              </h4>
            </div>

            <div className="text-xs text-[#64748B] flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-[#D97706]" />
                Soil: <strong className="text-[#1C251D]">{activeStage.stage.soilTempRequirement}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-[#0284C7]" />
                Water: <strong className="text-[#1C251D]">{activeStage.stage.wateringNeed}</strong>
              </span>
            </div>
          </div>

          {/* Biological Milestone Description */}
          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
            {activeStage.stage.description}
          </p>

          {/* 2-Column Care & Pest Inspection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Practical Care Advice */}
            <div className="p-3.5 rounded-lg bg-white border border-[#E2E8DE] space-y-1">
              <div className="text-xs font-bold text-[#1B4332] flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-[#2D6A4F]" />
                Crucial Cultivation Care
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                {activeStage.stage.careAdvice}
              </p>
            </div>

            {/* Pest Vulnerability Watch (IPM Link) */}
            <div className="p-3.5 rounded-lg bg-[#FEF2F2]/60 border border-[#FECACA] space-y-1">
              <div className="text-xs font-bold text-[#991B1B] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />
                Pest & Disease Vulnerability Watch
              </div>
              <div className="text-xs text-[#7F1D1D] leading-relaxed">
                Scout this stage for:{' '}
                <strong>{activeStage.stage.pestVulnerabilities.join(', ')}</strong>. Refer to the Pest & Remedies database above for gentle biological treatments.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
