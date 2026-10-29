import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WeatherWidget } from './components/WeatherWidget';
import { CropSelector } from './components/CropSelector';
import { GardenLayout } from './components/GardenLayout';
import { PestMedicationDb } from './components/PestMedicationDb';
import { ResourceGuides } from './components/ResourceGuides';
import { CommunityForum } from './components/CommunityForum';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { AppOutlineModal } from './components/AppOutlineModal';

export default function App() {
  const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false);
  const [weatherSync, setWeatherSync] = useState<{
    climateZone: string;
    rainfallMm: number;
    timestamp: number;
  } | null>(null);

  const handleSyncFromWeather = (climateZone: string, estimatedRainfallMm: number) => {
    setWeatherSync({
      climateZone,
      rainfallMm: estimatedRainfallMm,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#222B21]">
      {/* 3-zone Top Bar Contract */}
      <Navbar onOpenOutline={() => setIsOutlineModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenOutline={() => setIsOutlineModalOpen(true)} />

        {/* Real-time Weather & Agro-Advisory Widget */}
        <WeatherWidget onSyncWithCropSelector={handleSyncFromWeather} />

        {/* Interactive Climate & Soil Crop Matcher */}
        <CropSelector weatherSync={weatherSync} />

        {/* Interactive Garden Bed Layout & Companion Planner */}
        <GardenLayout />

        {/* Safe Pest & Remedy Database */}
        <PestMedicationDb />

        {/* Field Guides & D3 Phenology Timeline */}
        <ResourceGuides />

        {/* Community Forum & Advice Exchange */}
        <CommunityForum />

        {/* Verified Grower Testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer onOpenOutline={() => setIsOutlineModalOpen(true)} />

      {/* Concept Outline & UX Blueprint Modal */}
      <AppOutlineModal
        isOpen={isOutlineModalOpen}
        onClose={() => setIsOutlineModalOpen(false)}
      />
    </div>
  );
}
