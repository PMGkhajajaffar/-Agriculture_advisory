export interface GardenPlant {
  id: string;
  name: string;
  shortName: string;
  category: 'Vegetables' | 'Grains' | 'Legumes' | 'Roots' | 'Fruits' | 'Companions';
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  sqFtDensity: number; // Plants per 1 square foot (1, 4, 9, or 16)
  plantHeight: 'Tall' | 'Medium' | 'Short';
  spacingDescription: string;
  goodCompanions: string[];
  badCompanions: string[];
  synergyTip: string;
  harvestWindowDays: string;
}

export const GARDEN_PLANTS: GardenPlant[] = [
  {
    id: 'tomato',
    name: 'Heirloom Tomato',
    shortName: 'Tomato',
    category: 'Vegetables',
    emoji: '🍅',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
    textColor: '#991B1B',
    sqFtDensity: 1,
    plantHeight: 'Tall',
    spacingDescription: '1 plant per sq ft (requires stake or cage)',
    goodCompanions: ['basil', 'marigold', 'carrot', 'spinach'],
    badCompanions: ['potato', 'corn', 'cabbage'],
    synergyTip: 'Basil improves flavor and repels thrips; marigolds repel root-knot nematodes.',
    harvestWindowDays: '75 – 80 days'
  },
  {
    id: 'corn',
    name: 'Sweet Corn',
    shortName: 'Corn',
    category: 'Grains',
    emoji: '🌽',
    color: '#D97706',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
    textColor: '#92400E',
    sqFtDensity: 1,
    plantHeight: 'Tall',
    spacingDescription: '1 plant per sq ft (plant in grid blocks for pollination)',
    goodCompanions: ['bean', 'squash', 'sunflower'],
    badCompanions: ['tomato'],
    synergyTip: 'Part of the ancient Three Sisters: tall stalks provide live trellising for climbing beans.',
    harvestWindowDays: '85 – 90 days'
  },
  {
    id: 'bean',
    name: 'Bush Green Beans',
    shortName: 'Beans',
    category: 'Legumes',
    emoji: '🫘',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    textColor: '#065F46',
    sqFtDensity: 4,
    plantHeight: 'Medium',
    spacingDescription: '4 plants per sq ft (2x2 grid spacing)',
    goodCompanions: ['corn', 'carrot', 'cabbage', 'strawberry'],
    badCompanions: ['garlic', 'onion'],
    synergyTip: 'Fixes atmospheric nitrogen into root nodules, enriching soil for neighboring heavy feeders.',
    harvestWindowDays: '50 – 55 days'
  },
  {
    id: 'spinach',
    name: 'Tender Spinach',
    shortName: 'Spinach',
    category: 'Vegetables',
    emoji: '🥬',
    color: '#16A34A',
    bgColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    textColor: '#166534',
    sqFtDensity: 9,
    plantHeight: 'Short',
    spacingDescription: '9 plants per sq ft (3x3 grid spacing)',
    goodCompanions: ['strawberry', 'bean', 'tomato', 'cabbage'],
    badCompanions: ['potato'],
    synergyTip: 'Provides living groundcover that shades soil roots and reduces weed germination.',
    harvestWindowDays: '40 – 45 days'
  },
  {
    id: 'carrot',
    name: 'Crisp Carrot',
    shortName: 'Carrot',
    category: 'Roots',
    emoji: '🥕',
    color: '#EA580C',
    bgColor: '#FFF7ED',
    borderColor: '#FED7AA',
    textColor: '#9A3412',
    sqFtDensity: 16,
    plantHeight: 'Short',
    spacingDescription: '16 plants per sq ft (4x4 dense grid spacing)',
    goodCompanions: ['tomato', 'garlic', 'bean', 'basil'],
    badCompanions: ['parsnip', 'dill'],
    synergyTip: 'Roots delve deep without competing with shallow-rooted tomatoes; garlic masks carrot fly scent.',
    harvestWindowDays: '65 – 70 days'
  },
  {
    id: 'pepper',
    name: 'Bell Pepper',
    shortName: 'Pepper',
    category: 'Vegetables',
    emoji: '🫑',
    color: '#0D9488',
    bgColor: '#F0FDFA',
    borderColor: '#99F6E4',
    textColor: '#115E59',
    sqFtDensity: 1,
    plantHeight: 'Medium',
    spacingDescription: '1 plant per sq ft (sturdy bush)',
    goodCompanions: ['basil', 'garlic', 'spinach', 'carrot'],
    badCompanions: ['bean', 'cabbage'],
    synergyTip: 'Basil enhances moisture retention and wards off aphids and hornworms.',
    harvestWindowDays: '75 – 85 days'
  },
  {
    id: 'potato',
    name: 'Yukon Gold Potato',
    shortName: 'Potato',
    category: 'Roots',
    emoji: '🥔',
    color: '#854D0E',
    bgColor: '#FEFCE8',
    borderColor: '#FEF08A',
    textColor: '#713F12',
    sqFtDensity: 1,
    plantHeight: 'Medium',
    spacingDescription: '1 seed tuber per sq ft (mounded)',
    goodCompanions: ['bean', 'marigold', 'cabbage'],
    badCompanions: ['tomato', 'pepper'],
    synergyTip: 'Bush beans deter Colorado potato beetle; keep away from tomatoes to avoid early/late blight transmission.',
    harvestWindowDays: '95 – 100 days'
  },
  {
    id: 'strawberry',
    name: 'Garden Strawberry',
    shortName: 'Berry',
    category: 'Fruits',
    emoji: '🍓',
    color: '#E11D48',
    bgColor: '#FFF1F2',
    borderColor: '#FECDD3',
    textColor: '#9F1239',
    sqFtDensity: 4,
    plantHeight: 'Short',
    spacingDescription: '4 crowns per sq ft (perennial mounds)',
    goodCompanions: ['spinach', 'bean', 'borage', 'garlic'],
    badCompanions: ['cabbage'],
    synergyTip: 'Spinach and strawberries stimulate each other in cool weather; garlic keeps slugs away.',
    harvestWindowDays: '55 – 60 days'
  },
  {
    id: 'cabbage',
    name: 'Savoy Cabbage',
    shortName: 'Cabbage',
    category: 'Vegetables',
    emoji: '🥗',
    color: '#15803D',
    bgColor: '#F0FDF4',
    borderColor: '#DCFCE7',
    textColor: '#14532D',
    sqFtDensity: 1,
    plantHeight: 'Medium',
    spacingDescription: '1 large head per sq ft',
    goodCompanions: ['bean', 'spinach', 'marigold', 'garlic'],
    badCompanions: ['tomato', 'strawberry'],
    synergyTip: 'Marigolds draw cabbage moths away; garlic suppresses fungal clubroot.',
    harvestWindowDays: '80 – 85 days'
  },
  {
    id: 'marigold',
    name: 'French Marigold',
    shortName: 'Marigold',
    category: 'Companions',
    emoji: '🌼',
    color: '#CA8A04',
    bgColor: '#FEFCE8',
    borderColor: '#FEF08A',
    textColor: '#854D0E',
    sqFtDensity: 4,
    plantHeight: 'Short',
    spacingDescription: '4 flowers per sq ft (pest-defense border)',
    goodCompanions: ['tomato', 'potato', 'cabbage', 'bean'],
    badCompanions: [],
    synergyTip: 'Roots secrete alpha-terthienyl, an organic compound that repels subterranean root-knot nematodes.',
    harvestWindowDays: 'All Season'
  },
  {
    id: 'basil',
    name: 'Sweet Genovese Basil',
    shortName: 'Basil',
    category: 'Companions',
    emoji: '🌿',
    color: '#16A34A',
    bgColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    textColor: '#166534',
    sqFtDensity: 4,
    plantHeight: 'Short',
    spacingDescription: '4 herbs per sq ft',
    goodCompanions: ['tomato', 'pepper', 'carrot'],
    badCompanions: ['bean'],
    synergyTip: 'Strong aromatic oils mask host plants from hornworms, whiteflies, and aphids.',
    harvestWindowDays: '35 – 50 days'
  },
  {
    id: 'garlic',
    name: 'Hardneck Garlic',
    shortName: 'Garlic',
    category: 'Companions',
    emoji: '🧄',
    color: '#475569',
    bgColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    textColor: '#334155',
    sqFtDensity: 9,
    plantHeight: 'Short',
    spacingDescription: '9 cloves per sq ft (fall planted)',
    goodCompanions: ['carrot', 'tomato', 'strawberry', 'cabbage'],
    badCompanions: ['bean'],
    synergyTip: 'Sulfur compounds repel aphids and confuse carrot rust flies; acts as natural bio-fungicide.',
    harvestWindowDays: '120 – 150 days'
  }
];

export interface BedDimensions {
  id: string;
  name: string;
  rows: number;
  cols: number;
  totalSqFt: number;
  description: string;
}

export const BED_PRESETS: BedDimensions[] = [
  {
    id: 'bed-4x4',
    name: '4 × 4 Raised Bed',
    rows: 4,
    cols: 4,
    totalSqFt: 16,
    description: 'The standard square-foot gardening size. Easy to reach from all sides without stepping on soil.'
  },
  {
    id: 'bed-3x6',
    name: '3 × 6 Extended Garden',
    rows: 3,
    cols: 6,
    totalSqFt: 18,
    description: 'Longer layout ideal for crop rows and back-row trellising.'
  },
  {
    id: 'bed-4x8',
    name: '4 × 8 Farmstead Bed',
    rows: 4,
    cols: 8,
    totalSqFt: 32,
    description: 'Maximum capacity bed for high-volume kitchen self-sufficiency.'
  },
  {
    id: 'bed-2x4',
    name: '2 × 4 Patio / Balcony Bed',
    rows: 2,
    cols: 4,
    totalSqFt: 8,
    description: 'Compact container footprint tailored for urban patios and beginner gardeners.'
  }
];

export interface CompanionAnalysis {
  positiveCount: number;
  warningCount: number;
  synergies: string[];
  warnings: string[];
  heightWarning: string | null;
  totalPlants: number;
  occupancyRate: number;
}

// Evaluate grid layout for companion synergies and height shading
export function analyzeGridLayout(
  grid: (string | null)[][],
  plants: GardenPlant[]
): CompanionAnalysis {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const plantMap = new Map<string, GardenPlant>(plants.map(p => [p.id, p]));

  const synergiesSet = new Set<string>();
  const warningsSet = new Set<string>();

  let occupiedCount = 0;
  let totalPlantCount = 0;

  // Track height per row (Row 0 is considered North / Back, Last row is South / Front)
  const rowHeights: ('Tall' | 'Medium' | 'Short' | 'Empty')[] = [];

  for (let r = 0; r < rows; r++) {
    let maxHeight: 'Tall' | 'Medium' | 'Short' | 'Empty' = 'Empty';

    for (let c = 0; c < cols; c++) {
      const cropId = grid[r][c];
      if (!cropId) continue;

      occupiedCount++;
      const plant = plantMap.get(cropId);
      if (!plant) continue;

      totalPlantCount += plant.sqFtDensity;

      if (plant.plantHeight === 'Tall') maxHeight = 'Tall';
      else if (plant.plantHeight === 'Medium' && maxHeight !== 'Tall') maxHeight = 'Medium';
      else if (plant.plantHeight === 'Short' && maxHeight === 'Empty') maxHeight = 'Short';

      // Check orthogonal and diagonal neighbors (up, down, left, right, diagonals)
      const neighborOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
      ];

      for (const [dr, dc] of neighborOffsets) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          const neighborId = grid[nr][nc];
          if (!neighborId) continue;
          const neighbor = plantMap.get(neighborId);
          if (!neighbor) continue;

          // Check positive companion
          if (plant.goodCompanions.includes(neighborId)) {
            const pairKey = [plant.shortName, neighbor.shortName].sort().join(' + ');
            synergiesSet.add(`${pairKey}: ${plant.synergyTip || neighbor.synergyTip}`);
          }

          // Check negative companion
          if (plant.badCompanions.includes(neighborId)) {
            const pairKey = [plant.shortName, neighbor.shortName].sort().join(' ⚡ ');
            warningsSet.add(`${pairKey}: Incompatible neighbors! Keep separated to avoid shared pests or root competition.`);
          }
        }
      }
    }
    rowHeights.push(maxHeight);
  }

  // Check sunlight shading: If tall plants are in front rows (southern rows) and short plants in back rows (northern rows)
  let heightWarning: string | null = null;
  for (let south = 1; south < rows; south++) {
    if (rowHeights[south] === 'Tall') {
      for (let north = 0; north < south; north++) {
        if (rowHeights[north] === 'Short') {
          heightWarning = 'Sunlight Alert: Tall plants in southern rows may cast shade over short plants to their north. Place tall crops (Corn, Trellised Tomatoes) in the back (North) row.';
          break;
        }
      }
    }
    if (heightWarning) break;
  }

  const totalCells = rows * cols;
  const occupancyRate = totalCells > 0 ? Math.round((occupiedCount / totalCells) * 100) : 0;

  return {
    positiveCount: synergiesSet.size,
    warningCount: warningsSet.size,
    synergies: Array.from(synergiesSet),
    warnings: Array.from(warningsSet),
    heightWarning,
    totalPlants: totalPlantCount,
    occupancyRate
  };
}

// Built-in layout starter presets
export const LAYOUT_STARTER_PRESETS: {
  name: string;
  description: string;
  presetId: string;
  grid: (string | null)[][];
}[] = [
  {
    name: 'Heirloom Kitchen Garden',
    description: 'Tomatoes and peppers in back, balanced with basil, marigolds, beans, and sweet carrots.',
    presetId: 'bed-4x4',
    grid: [
      ['tomato', 'tomato', 'pepper', 'pepper'],
      ['basil', 'marigold', 'marigold', 'basil'],
      ['carrot', 'carrot', 'spinach', 'spinach'],
      ['strawberry', 'strawberry', 'bean', 'bean']
    ]
  },
  {
    name: 'Three Sisters & Companions',
    description: 'Traditional guild pairing sweet corn, climbing green beans, and pest-repelling marigolds.',
    presetId: 'bed-4x4',
    grid: [
      ['corn', 'corn', 'corn', 'corn'],
      ['bean', 'bean', 'bean', 'bean'],
      ['marigold', 'marigold', 'marigold', 'marigold'],
      ['strawberry', 'strawberry', 'spinach', 'spinach']
    ]
  },
  {
    name: 'Cool-Season Salad & Roots',
    description: 'Spring and autumn bed packed with crisp carrots, vitamin-rich spinach, strawberries, and garlic.',
    presetId: 'bed-4x4',
    grid: [
      ['spinach', 'spinach', 'spinach', 'spinach'],
      ['carrot', 'carrot', 'carrot', 'carrot'],
      ['strawberry', 'strawberry', 'strawberry', 'strawberry'],
      ['garlic', 'garlic', 'marigold', 'marigold']
    ]
  }
];
