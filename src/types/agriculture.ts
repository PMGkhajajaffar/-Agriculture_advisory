export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  category: 'Vegetables' | 'Grains' | 'Legumes' | 'Fruits' | 'Root Crops';
  climateSuitability: ('Temperate' | 'Subtropical' | 'Arid / Semi-arid' | 'Tropical' | 'Continental')[];
  minRainfallMm: number;
  maxRainfallMm: number;
  preferredSoil: ('Loamy' | 'Sandy' | 'Clay' | 'Silty' | 'Peaty')[];
  minPh: number;
  maxPh: number;
  sunlightHours: number; // minimum recommended
  growthDurationDays: number;
  plantingSeason: string;
  waterNeed: 'Low' | 'Moderate' | 'High';
  difficulty: 'Beginner-Friendly' | 'Moderate' | 'Experienced';
  companionPlants: string[];
  yieldEstimate: string;
  soilPrepTip: string;
  overview: string;
  citation: string;
}

export interface PestTreatment {
  id: string;
  cropId: string;
  cropName: string;
  conditionName: string;
  category: 'Fungal' | 'Insect / Pest' | 'Bacterial' | 'Nutrient Deficiency';
  visualSymptoms: string;
  preventionStep: string;
  biologicalRemedy: string;
  targetedTreatment: string;
  preHarvestInterval: string; // e.g., "1-3 days before harvest" or "0 days"
  safetyCaution: string;
  sourceCitation: string;
}

export interface GuideResource {
  id: string;
  title: string;
  category: 'Soil & Compost' | 'Irrigation & Water' | 'Pest Management' | 'Sowing & Calendars';
  readingTimeMinutes: number;
  summary: string;
  audience: 'All Growers' | 'Beginner Gardeners' | 'Smallholder Farmers';
  steps: {
    heading: string;
    description: string;
  }[];
  practicalTip: string;
  sourceCitation: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string; // e.g. "Community Grower", "Smallholder Farmer (3 Acres)", "Urban Backyard Gardener"
  location: string;
  title: string;
  content: string;
  categoryTag: 'Beginner Advice' | 'Pest Emergency' | 'Soil & Water' | 'Harvest & Storing' | 'Climate Shifts';
  cropMentioned: string;
  likes: number;
  replies: {
    id: string;
    authorName: string;
    authorRole: string;
    text: string;
    timestamp: string;
  }[];
  timestamp: string;
}

export interface FarmerTestimonial {
  id: string;
  name: string;
  role: string;
  farmScale: string;
  location: string;
  quote: string;
  impactMetric: string;
  impactContext: string;
  establishedPractice: string;
}
