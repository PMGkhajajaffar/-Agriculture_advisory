import { GuideResource } from '../types/agriculture';

export const GUIDES_DATA: GuideResource[] = [
  {
    id: 'guide-compost-basics',
    title: 'Soil Health 101: The Simple Science of Living Compost',
    category: 'Soil & Compost',
    readingTimeMinutes: 5,
    summary: 'Turn kitchen scraps and dry leaves into dark, crumbly organic gold that boosts water retention and feeds vital soil microbiology.',
    audience: 'All Growers',
    steps: [
      {
        heading: '1. Master the 3-to-1 Brown vs Green Ratio',
        description: 'For every 1 bucket of wet "greens" (vegetable peels, coffee grounds, fresh grass cuttings), layer 3 buckets of dry "browns" (fallen leaves, unbleached cardboard shreds, clean straw). This balances nitrogen and carbon naturally.'
      },
      {
        heading: '2. Keep It as Moist as a Damp Sponge',
        description: 'Microbes need moisture to thrive. If your pile is too dry, decomposition stops; if dripping wet, it smells sour. Add water lightly during dry months.'
      },
      {
        heading: '3. Turn Every 2 to 3 Weeks for Oxygen',
        description: 'Use a garden fork to flip the outer cool material into the warm interior center. Oxygen speeds breakdown and keeps temperatures between 45°C–65°C.'
      },
      {
        heading: '4. Know When It Is Ready',
        description: 'Finished compost looks like rich, dark, crumbly forest soil with a sweet earthy smell. Original food scraps will no longer be visible.'
      }
    ],
    practicalTip: 'Never add dog/cat feces, meat, dairy, or diseased diseased tomato foliage to domestic cold compost piles.',
    sourceCitation: 'USDA Natural Resources Conservation Service (NRCS) Soil Quality Institute'
  },
  {
    id: 'guide-drip-irrigation',
    title: 'Smart Watering: Cutting Evaporation Loss by Up to 60%',
    category: 'Irrigation & Water',
    readingTimeMinutes: 4,
    summary: 'Delivering water directly to root level preserves water resources, reduces weed germination, and prevents foliar fungal infections.',
    audience: 'All Growers',
    steps: [
      {
        heading: '1. The Golden Morning Rule',
        description: 'Water between 5:00 AM and 8:30 AM. Morning watering allows moisture to soak deep before midday heat evaporation, and leaves dry before cool evening fungus hours.'
      },
      {
        heading: '2. Set Up Low-Pressure Drip Lines or Soaker Hoses',
        description: 'Overhead sprinklers lose 30-50% of water to wind drift and midday evaporation. Drip emitters put slow drops directly where feeder roots drink.'
      },
      {
        heading: '3. Test Soil Moisture with the 5-Centimeter Finger Test',
        description: 'Push your index finger 5 cm into the soil. If the tip feels moist and cool, skip watering today. If dry, run your drip cycle.'
      },
      {
        heading: '4. Seal the Surface with 5 cm of Organic Mulch',
        description: 'A blanket of straw, woodchips, or dried leaves keeps soil temperatures 5°C cooler and slows moisture evaporation dramatically.'
      }
    ],
    practicalTip: 'Infrequent deep soakings (twice weekly) train crop roots to delve deep underground, making plants far more resilient to summer drought.',
    sourceCitation: 'FAO Water Management & Irrigation Efficiency Guidelines & UC Davis Agricultural Extension'
  },
  {
    id: 'guide-crop-rotation',
    title: '4-Bed Crop Rotation for Natural Pest & Soil Balance',
    category: 'Sowing & Calendars',
    readingTimeMinutes: 6,
    summary: 'Break pest cycles and prevent soil nutrient depletion by rotating plant families through a structured annual cycle.',
    audience: 'All Growers',
    steps: [
      {
        heading: 'Bed 1: Heavy Feeders (Solanaceae & Brassicas)',
        description: 'Tomatoes, peppers, cabbage, and broccoli require substantial compost and minerals to build heavy fruit and heads.'
      },
      {
        heading: 'Bed 2: Soil Builders & Restorers (Legumes)',
        description: 'Plant peas, green beans, or cover-crop clover the next season. Their symbiotic root nodules pull nitrogen from the atmosphere and fix it into the soil.'
      },
      {
        heading: 'Bed 3: Light Feeders & Root Crops (Alliums & Umbellifers)',
        description: 'Carrots, onions, garlic, and beets follow legumes. They appreciate loose, stone-free ground without fresh heavy fertilizer (which causes carrot forking).'
      },
      {
        heading: 'Bed 4: Green Cover Crops or Curcubits',
        description: 'Squash, cucumbers, or a winter cover crop (rye or vetch) blanket the soil, prevent erosion, and suppress weeds before the cycle restarts.'
      }
    ],
    practicalTip: 'Never plant tomatoes, potatoes, eggplants, or peppers in the exact same bed two seasons in a row to starve soil-borne fungal spores.',
    sourceCitation: 'Rodale Institute Organic Crop Rotation Field Guide & Cornell Agronomy'
  },
  {
    id: 'guide-ipm-basics',
    title: 'The IPM Pyramid: How to Protect Crops with Minimal Chemicals',
    category: 'Pest Management',
    readingTimeMinutes: 5,
    summary: 'A step-by-step decision framework that prioritizes prevention, physical barriers, and beneficial insects before ever reaching for a spray bottle.',
    audience: 'All Growers',
    steps: [
      {
        heading: 'Tier 1: Cultural Prevention (Foundation)',
        description: 'Select disease-resistant seed varieties, ensure generous row spacing for gentle airflow, and maintain immaculate garden sanitation.'
      },
      {
        heading: 'Tier 2: Physical & Mechanical Barriers',
        description: 'Install floating row covers to block egg-laying moths, erect copper tape rings against snails, and hand-pick large caterpillars at twilight.'
      },
      {
        heading: 'Tier 3: Biological Allies',
        description: 'Welcome predatory insects by planting nectar corridors (alyssum, dill, fennel). Ladybugs consume up to 50 aphids daily.'
      },
      {
        heading: 'Tier 4: Responsible Targeted Intervention',
        description: 'When pest damage threatens economic loss or plant death, use selective, low-toxicity controls (horticultural soap, Bt, or neem) with proper PPE.'
      }
    ],
    practicalTip: 'Always spray the underside of leaves at twilight or early dawn to protect foraging honeybees and prevent leaf sun-scorch.',
    sourceCitation: 'FAO International Code of Conduct on Pesticide Management & EPA IPM Principles'
  }
];
