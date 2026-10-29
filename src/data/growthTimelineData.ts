export interface GrowthStage {
  id: string;
  name: string;
  shortName: string;
  startDay: number;
  endDay: number;
  stageCategory: 'germination' | 'vegetative' | 'flowering' | 'fruiting' | 'harvest';
  stageColor: string; // Tailwind-compatible hex
  stageBg: string;
  description: string;
  careAdvice: string;
  wateringNeed: 'Minimal' | 'Moderate' | 'Heavy / Deep' | 'Tapering off';
  soilTempRequirement: string;
  pestVulnerabilities: string[];
}

export interface CropTimelineData {
  cropId: string;
  cropName: string;
  scientificName: string;
  category: string;
  totalDays: number;
  stages: GrowthStage[];
}

export const CROP_TIMELINES: CropTimelineData[] = [
  {
    cropId: 'crop-tomato',
    cropName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetables',
    totalDays: 78,
    stages: [
      {
        id: 'tom-germ',
        name: 'Seed Germination & Emergence',
        shortName: 'Germination',
        startDay: 0,
        endDay: 8,
        stageCategory: 'germination',
        stageColor: '#D97706',
        stageBg: '#FEF3C7',
        description: 'Seed coat softens and primary taproot anchors down. Cotyledon seed-leaves unfurl above soil.',
        careAdvice: 'Keep soil evenly damp with fine mist. Provide gentle bottom warmth (21°C–25°C) to accelerate sprout.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '21°C – 26°C (70°F – 79°F)',
        pestVulnerabilities: ['Damping-off fungal rot (Pythium)']
      },
      {
        id: 'tom-veg',
        name: 'Vegetative Growth & Branching',
        shortName: 'Vegetative',
        startDay: 8,
        endDay: 32,
        stageCategory: 'vegetative',
        stageColor: '#059669',
        stageBg: '#D1FAE5',
        description: 'Stems thicken, true leaves expand, and deep fibrous lateral root networks develop.',
        careAdvice: 'Install sturdy stakes or tomato cages early. Prune lower sucker shoots and bottom leaves for airflow.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '18°C – 24°C',
        pestVulnerabilities: ['Green peach aphids', 'Flea beetles', 'Early blight splash']
      },
      {
        id: 'tom-bloom',
        name: 'Flower Cluster Bloom & Pollination',
        shortName: 'Flowering',
        startDay: 32,
        endDay: 50,
        stageCategory: 'flowering',
        stageColor: '#0284C7',
        stageBg: '#E0F2FE',
        description: 'Yellow blossom clusters open. Bumblebee buzz-pollination or gentle wind vibration triggers fertilization.',
        careAdvice: 'Avoid high-nitrogen fertilizer which produces excessive leaves instead of flowers. Maintain regular deep watering.',
        wateringNeed: 'Heavy / Deep',
        soilTempRequirement: '18°C – 25°C (Avoid >32°C which causes blossom drop)',
        pestVulnerabilities: ['Thrips', 'Spider mites', 'Blossom drop stress']
      },
      {
        id: 'tom-fruit',
        name: 'Green Fruit Expansion & Sizing',
        shortName: 'Fruit Set',
        startDay: 50,
        endDay: 68,
        stageCategory: 'fruiting',
        stageColor: '#0D9488',
        stageBg: '#CCFBF1',
        description: 'Green tomatoes swell rapidly. Calcium is drawn continuously from soil into fruit cell walls.',
        careAdvice: 'Mulch heavily with straw. Inconsistent moisture during this stage triggers blossom-end rot.',
        wateringNeed: 'Heavy / Deep',
        soilTempRequirement: '18°C – 26°C',
        pestVulnerabilities: ['Tomato hornworm', 'Fruitworm / Helicoverpa', 'Blossom-end rot']
      },
      {
        id: 'tom-harvest',
        name: 'Color Break & Ripening Harvest',
        shortName: 'Harvest',
        startDay: 68,
        endDay: 80,
        stageCategory: 'harvest',
        stageColor: '#B45309',
        stageBg: '#FDE68A',
        description: 'Lycopene pigment builds, transforming fruit to brilliant red, sweetening natural sugars.',
        careAdvice: 'Taper off watering slightly to concentrate rich fruit flavor and prevent skin splitting after rains.',
        wateringNeed: 'Tapering off',
        soilTempRequirement: '18°C – 27°C',
        pestVulnerabilities: ['Fruit splitting / cracking', 'Stink bugs']
      }
    ]
  },
  {
    cropId: 'crop-bush-bean',
    cropName: 'Bush Green Beans',
    scientificName: 'Phaseolus vulgaris',
    category: 'Legumes',
    totalDays: 55,
    stages: [
      {
        id: 'bean-germ',
        name: 'Direct Seed Emergence',
        shortName: 'Germination',
        startDay: 0,
        endDay: 7,
        stageCategory: 'germination',
        stageColor: '#D97706',
        stageBg: '#FEF3C7',
        description: 'Bean seeds swell and push large fleshy cotyledons up through loose topsoil.',
        careAdvice: 'Direct sow only after soil warms to at least 16°C. Do not pre-soak seeds in cold water (causes seed cracking).',
        wateringNeed: 'Minimal',
        soilTempRequirement: '16°C – 24°C',
        pestVulnerabilities: ['Seedcorn maggot', 'Damping-off']
      },
      {
        id: 'bean-veg',
        name: 'Trifoliate Leaf & Root Nodulation',
        shortName: 'Vegetative',
        startDay: 7,
        endDay: 25,
        stageCategory: 'vegetative',
        stageColor: '#059669',
        stageBg: '#D1FAE5',
        description: 'Compact bush forms 3-parted leaves. Symbiotic Rhizobia bacteria begin pulling nitrogen from air.',
        careAdvice: 'Weed carefully around shallow roots. No supplemental nitrogen needed; beans self-fertilize naturally.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '18°C – 24°C',
        pestVulnerabilities: ['Bean leaf beetle', 'Cutworms']
      },
      {
        id: 'bean-bloom',
        name: 'White & Violet Flowering',
        shortName: 'Flowering',
        startDay: 25,
        endDay: 38,
        stageCategory: 'flowering',
        stageColor: '#0284C7',
        stageBg: '#E0F2FE',
        description: 'Self-pollinating blossoms open along leaf axils. Critical window for steady moisture.',
        careAdvice: 'Water at root level in early morning. Water stress during bloom causes flowers to abort before pod setting.',
        wateringNeed: 'Heavy / Deep',
        soilTempRequirement: '18°C – 26°C',
        pestVulnerabilities: ['Aphids', 'Japanese beetles']
      },
      {
        id: 'bean-harvest',
        name: 'Tender Pod Fill & Continuous Harvest',
        shortName: 'Harvest',
        startDay: 38,
        endDay: 58,
        stageCategory: 'harvest',
        stageColor: '#B45309',
        stageBg: '#FDE68A',
        description: 'Crisp green pods fill out. Continuous picking every 2–3 days stimulates fresh flower flushes.',
        careAdvice: 'Pick pods when pencil-thick before internal seeds bulge. Avoid harvesting wet foliage to prevent rust spread.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '18°C – 25°C',
        pestVulnerabilities: ['Rust fungus', 'Bacterial blight']
      }
    ]
  },
  {
    cropId: 'crop-maize',
    cropName: 'Sweet Corn',
    scientificName: 'Zea mays',
    category: 'Grains',
    totalDays: 88,
    stages: [
      {
        id: 'corn-germ',
        name: 'Sprout & Coleoptile Emergence',
        shortName: 'Germination',
        startDay: 0,
        endDay: 8,
        stageCategory: 'germination',
        stageColor: '#D97706',
        stageBg: '#FEF3C7',
        description: 'Primary spike punches up through soil surface followed by first rounded leaf.',
        careAdvice: 'Plant in dense blocks (minimum 4 rows by 4 rows) rather than one single long row for wind pollination.',
        wateringNeed: 'Minimal',
        soilTempRequirement: '16°C – 27°C',
        pestVulnerabilities: ['Cutworms', 'Wireworms']
      },
      {
        id: 'corn-veg',
        name: 'Whorl Expansion & Rapid Stalk Growth',
        shortName: 'Vegetative',
        startDay: 8,
        endDay: 45,
        stageCategory: 'vegetative',
        stageColor: '#059669',
        stageBg: '#D1FAE5',
        description: 'Leaves emerge in a circular whorl; brace roots shoot from lower stalk to anchor tall plants.',
        careAdvice: 'Side-dress with composted nitrogen when plants reach knee-high (Day 30). Scout center whorls closely.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '20°C – 28°C',
        pestVulnerabilities: ['Fall armyworm whorl chewing', 'Corn flea beetle']
      },
      {
        id: 'corn-tassel',
        name: 'Tasseling & Silk Emergence',
        shortName: 'Pollination',
        startDay: 45,
        endDay: 62,
        stageCategory: 'flowering',
        stageColor: '#0284C7',
        stageBg: '#E0F2FE',
        description: 'Tassels shed pollen from the top, falling onto sticky silks growing from immature ear shoots.',
        careAdvice: 'Peak water demand of the entire lifecycle. Drought during silking leads to barren ears with missing kernels.',
        wateringNeed: 'Heavy / Deep',
        soilTempRequirement: '20°C – 29°C',
        pestVulnerabilities: ['Corn earworm (moths lay eggs on silks)']
      },
      {
        id: 'corn-fill',
        name: 'Milk Stage & Kernel Plumping',
        shortName: 'Ear Fill',
        startDay: 62,
        endDay: 78,
        stageCategory: 'fruiting',
        stageColor: '#0D9488',
        stageBg: '#CCFBF1',
        description: 'Silks turn dark brown. Kernels swell with rich, milky sweet fluid.',
        careAdvice: 'Maintain steady moisture so ears fill out all the way to the tip.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '18°C – 27°C',
        pestVulnerabilities: ['Raccoons & birds', 'Smut fungus']
      },
      {
        id: 'corn-harvest',
        name: 'Peak Sweet Milk Harvest',
        shortName: 'Harvest',
        startDay: 78,
        endDay: 90,
        stageCategory: 'harvest',
        stageColor: '#B45309',
        stageBg: '#FDE68A',
        description: 'Puncture a test kernel with fingernail: milky white sap indicates optimal sugar-sweet readiness.',
        careAdvice: 'Harvest in cool early morning. Chill ears immediately to prevent sweet sugars turning to starch.',
        wateringNeed: 'Tapering off',
        soilTempRequirement: '18°C – 26°C',
        pestVulnerabilities: ['Kernel hardening if left on stalk past prime']
      }
    ]
  },
  {
    cropId: 'crop-spinach',
    cropName: 'Spinach',
    scientificName: 'Spinacia oleracea',
    category: 'Vegetables',
    totalDays: 42,
    stages: [
      {
        id: 'spin-germ',
        name: 'Cool-Soil Sprout',
        shortName: 'Germination',
        startDay: 0,
        endDay: 6,
        stageCategory: 'germination',
        stageColor: '#D97706',
        stageBg: '#FEF3C7',
        description: 'Seeds germinate readily in cool soils, sending up narrow initial leaves.',
        careAdvice: 'Can germinate in cold soil down to 5°C. Keep surface damp; cover lightly with sieved compost.',
        wateringNeed: 'Minimal',
        soilTempRequirement: '7°C – 20°C (fails above 27°C)',
        pestVulnerabilities: ['Slugs & snails in damp spring ground']
      },
      {
        id: 'spin-veg',
        name: 'Rosette & Leaf Canopy Spread',
        shortName: 'Vegetative',
        startDay: 6,
        endDay: 24,
        stageCategory: 'vegetative',
        stageColor: '#059669',
        stageBg: '#D1FAE5',
        description: 'Forms a low, spreading rosette of tender, emerald crinkled foliage.',
        careAdvice: 'Thin seedlings to 10 cm apart. Water consistently in mornings to keep leaf temperatures cool and tender.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '10°C – 18°C',
        pestVulnerabilities: ['Spinach leafminers (white winding trails)', 'Aphids']
      },
      {
        id: 'spin-harvest',
        name: 'Cut-and-Come-Again Harvest',
        shortName: 'Harvest',
        startDay: 24,
        endDay: 44,
        stageCategory: 'harvest',
        stageColor: '#B45309',
        stageBg: '#FDE68A',
        description: 'Leaves reach full nutritional density. Harvesting outer leaves extends growth window for weeks.',
        careAdvice: 'Pick outside leaves first, leaving crown intact. Harvest completely before lengthening days trigger flower bolting.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '10°C – 18°C',
        pestVulnerabilities: ['Downy mildew', 'Heat-induced flower bolting']
      }
    ]
  },
  {
    cropId: 'crop-carrot',
    cropName: 'Carrot',
    scientificName: 'Daucus carota',
    category: 'Root Crops',
    totalDays: 70,
    stages: [
      {
        id: 'car-germ',
        name: 'Slow Embryo Emergence',
        shortName: 'Germination',
        startDay: 0,
        endDay: 14,
        stageCategory: 'germination',
        stageColor: '#D97706',
        stageBg: '#FEF3C7',
        description: 'Tiny seeds germinate slowly. Delicate needle-like cotyledons pierce the soil crust.',
        careAdvice: 'Keep top 2 cm of soil continuously moist for two weeks. Laying a wet burlap sack helps prevent crusting.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '12°C – 22°C',
        pestVulnerabilities: ['Soil crusting trapping seedlings', 'Flea beetles']
      },
      {
        id: 'car-veg',
        name: 'Feathery Tops & Primary Taproot',
        shortName: 'Vegetative',
        startDay: 14,
        endDay: 35,
        stageCategory: 'vegetative',
        stageColor: '#059669',
        stageBg: '#D1FAE5',
        description: 'Delicate fern-like foliage grows. Taproot plunges straight down, establishing root length before thickening.',
        careAdvice: 'Thin aggressively to 5 cm spacing. Thinning late forces roots to intertwine and deform.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '15°C – 21°C',
        pestVulnerabilities: ['Carrot rust fly (thin at dusk to avoid scent plumes)']
      },
      {
        id: 'car-thick',
        name: 'Cortex Bulking & Sugar Accumulation',
        shortName: 'Root Expansion',
        startDay: 35,
        endDay: 58,
        stageCategory: 'fruiting',
        stageColor: '#0D9488',
        stageBg: '#CCFBF1',
        description: 'The underground taproot widens into a sweet, crisp orange root packed with beta-carotene.',
        careAdvice: 'Keep root shoulders covered with soil or mulch to prevent green bitter tops caused by direct sunlight.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '15°C – 20°C',
        pestVulnerabilities: ['Root knot nematodes', 'Wireworms']
      },
      {
        id: 'car-harvest',
        name: 'Crisp Root Harvest Window',
        shortName: 'Harvest',
        startDay: 58,
        endDay: 75,
        stageCategory: 'harvest',
        stageColor: '#B45309',
        stageBg: '#FDE68A',
        description: 'Roots reach optimal 2–3 cm diameter. Flavor sweetens noticeably after light autumn frosts.',
        careAdvice: 'Loosen soil gently with a garden fork before pulling tops to avoid snapping crisp roots.',
        wateringNeed: 'Minimal',
        soilTempRequirement: '12°C – 18°C',
        pestVulnerabilities: ['Cavity spot fungus in wet compacted ground']
      }
    ]
  },
  {
    cropId: 'crop-bell-pepper',
    cropName: 'Bell Pepper',
    scientificName: 'Capsicum annuum',
    category: 'Vegetables',
    totalDays: 80,
    stages: [
      {
        id: 'pep-germ',
        name: 'Warm Sprout & Taproot',
        shortName: 'Germination',
        startDay: 0,
        endDay: 10,
        stageCategory: 'germination',
        stageColor: '#D97706',
        stageBg: '#FEF3C7',
        description: 'Seeds require sustained warmth to crack their hard seed coats and establish a sturdy seedling stem.',
        careAdvice: 'Maintain seedling heat mats at 24°C–28°C. Cold soil (<18°C) delays germination by several weeks.',
        wateringNeed: 'Minimal',
        soilTempRequirement: '22°C – 28°C',
        pestVulnerabilities: ['Damping-off', 'Seed rot']
      },
      {
        id: 'pep-veg',
        name: 'Sturdy Bush & Canopy Structuring',
        shortName: 'Vegetative',
        startDay: 10,
        endDay: 38,
        stageCategory: 'vegetative',
        stageColor: '#059669',
        stageBg: '#D1FAE5',
        description: 'Dark green leaves form a dense umbrella that naturally shields developing peppers from sunscald.',
        careAdvice: 'Support with short stakes. Pinch early central flower bud if plant is under 25 cm to encourage wider bush branching.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '18°C – 24°C',
        pestVulnerabilities: ['Aphids on tender shoot tips', 'Broad mites']
      },
      {
        id: 'pep-bloom',
        name: 'White Star Blossoming',
        shortName: 'Flowering',
        startDay: 38,
        endDay: 54,
        stageCategory: 'flowering',
        stageColor: '#0284C7',
        stageBg: '#E0F2FE',
        description: 'Small white downward-facing blossoms open. Night temperatures between 16°C–21°C optimize set rate.',
        careAdvice: 'Ensure magnesium and calcium availability in root zone. Keep irrigation steady.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '18°C – 25°C',
        pestVulnerabilities: ['Blossom drop if night temp drops below 13°C or above 29°C']
      },
      {
        id: 'pep-fruiting',
        name: 'Green Fruit Sizing & Thick Walls',
        shortName: 'Fruit Set',
        startDay: 54,
        endDay: 70,
        stageCategory: 'fruiting',
        stageColor: '#0D9488',
        stageBg: '#CCFBF1',
        description: 'Peppers swell into firm, heavy, crisp green fruit with 3 to 4 distinct lobes.',
        careAdvice: 'Maintain heavy organic mulch to stabilize soil temperature and moisture.',
        wateringNeed: 'Heavy / Deep',
        soilTempRequirement: '18°C – 26°C',
        pestVulnerabilities: ['Blossom-end rot', 'Sunscald if foliage is sparse']
      },
      {
        id: 'pep-harvest',
        name: 'Color Ripening or Green Picking',
        shortName: 'Harvest',
        startDay: 70,
        endDay: 85,
        stageCategory: 'harvest',
        stageColor: '#B45309',
        stageBg: '#FDE68A',
        description: 'Harvest as tangy green peppers, or leave on plant 2 extra weeks to sweeten into bright red or yellow.',
        careAdvice: 'Cut fruit with clean hand pruners leaving 2 cm of stem. Do not yank fruit, which tears brittle branches.',
        wateringNeed: 'Tapering off',
        soilTempRequirement: '18°C – 25°C',
        pestVulnerabilities: ['Anthracnose fruit spot in humid weather']
      }
    ]
  },
  {
    cropId: 'crop-potato',
    cropName: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Root Crops',
    totalDays: 100,
    stages: [
      {
        id: 'pot-sprout',
        name: 'Chitting Sprout & Root Emergence',
        shortName: 'Emergence',
        startDay: 0,
        endDay: 15,
        stageCategory: 'germination',
        stageColor: '#D97706',
        stageBg: '#FEF3C7',
        description: 'Eyes on seed tubers sprout underground, sending shoots up and fibrous stolon roots into damp soil.',
        careAdvice: 'Plant seed tubers 10 cm deep. Hill soil or straw over emerging green tips as they grow.',
        wateringNeed: 'Minimal',
        soilTempRequirement: '8°C – 15°C',
        pestVulnerabilities: ['Wireworms', 'Seed rot in soggy soil']
      },
      {
        id: 'pot-veg',
        name: 'Heavy Leaf Canopy & Lateral Stolons',
        shortName: 'Vegetative',
        startDay: 15,
        endDay: 40,
        stageCategory: 'vegetative',
        stageColor: '#059669',
        stageBg: '#D1FAE5',
        description: 'Vigorous bushy stems expand. Underground stolons branch out, forming the base for daughter tubers.',
        careAdvice: 'Hill soil up another 15 cm around stems to ensure developing tubers never touch sunlight.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '15°C – 20°C',
        pestVulnerabilities: ['Colorado potato beetle', 'Potato aphids']
      },
      {
        id: 'pot-tuber',
        name: 'Tuber Initiation & Flowering',
        shortName: 'Tuber Initiation',
        startDay: 40,
        endDay: 68,
        stageCategory: 'flowering',
        stageColor: '#0284C7',
        stageBg: '#E0F2FE',
        description: 'Small star flowers bloom above ground while underground stolon tips swell into marble-sized baby tubers.',
        careAdvice: 'Critical watering window. Tubers require steady moisture now to prevent internal hollow-heart cavities.',
        wateringNeed: 'Heavy / Deep',
        soilTempRequirement: '15°C – 20°C',
        pestVulnerabilities: ['Early blight', 'Late blight spores after humid rains']
      },
      {
        id: 'pot-bulk',
        name: 'Tuber Bulking & Starch Loading',
        shortName: 'Tuber Bulking',
        startDay: 68,
        endDay: 88,
        stageCategory: 'fruiting',
        stageColor: '#0D9488',
        stageBg: '#CCFBF1',
        description: 'Tubers swell to full mature size, accumulating complex starches and dense vitamins.',
        careAdvice: 'Maintain consistent deep watering until foliage begins to naturally yellow.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '14°C – 19°C (growth slows if soil >24°C)',
        pestVulnerabilities: ['Common scab (avoid high soil pH >6.5)']
      },
      {
        id: 'pot-harvest',
        name: 'Foliage Die-Back & Skin Curing',
        shortName: 'Harvest',
        startDay: 88,
        endDay: 105,
        stageCategory: 'harvest',
        stageColor: '#B45309',
        stageBg: '#FDE68A',
        description: 'Vines naturally die back. Tuber skins cure and toughen in the ground for long storage stability.',
        careAdvice: 'Cut dead vines 10 days before digging so skins thicken. Cure harvested spuds in dark, ventilated area.',
        wateringNeed: 'Tapering off',
        soilTempRequirement: '10°C – 16°C',
        pestVulnerabilities: ['Tuber rot if soil remains soggy after vine death']
      }
    ]
  },
  {
    cropId: 'crop-strawberry',
    cropName: 'Strawberry',
    scientificName: 'Fragaria × ananassa',
    category: 'Fruits',
    totalDays: 60,
    stages: [
      {
        id: 'straw-awake',
        name: 'Spring Crown Awakening',
        shortName: 'Awakening',
        startDay: 0,
        endDay: 12,
        stageCategory: 'germination',
        stageColor: '#D97706',
        stageBg: '#FEF3C7',
        description: 'Perennial crowns break winter dormancy as soil warms, pushing fresh trifoliate leaves from center rosette.',
        careAdvice: 'Clear away old dead winter leaves to allow air and sun into crown. Side-dress with balanced compost.',
        wateringNeed: 'Minimal',
        soilTempRequirement: '10°C – 18°C',
        pestVulnerabilities: ['Crown rot if soil drainage is poor']
      },
      {
        id: 'straw-veg',
        name: 'Leaf Expansion & Flower Truss Push',
        shortName: 'Vegetative',
        startDay: 12,
        endDay: 26,
        stageCategory: 'vegetative',
        stageColor: '#059669',
        stageBg: '#D1FAE5',
        description: 'Lush leaf canopy expands and flower bud trusses emerge from the crown base.',
        careAdvice: 'Snip early vegetative runner stolons so the plant directs all energy into spring fruit production.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '14°C – 20°C',
        pestVulnerabilities: ['Spider mites on leaf undersides', 'Tarnished plant bug']
      },
      {
        id: 'straw-bloom',
        name: 'White Blossom & Bee Pollination',
        shortName: 'Flowering',
        startDay: 26,
        endDay: 40,
        stageCategory: 'flowering',
        stageColor: '#0284C7',
        stageBg: '#E0F2FE',
        description: 'Five-petaled white flowers open with golden centers. Pollination by bees ensures evenly shaped berries.',
        careAdvice: 'Protect blossoms from late spring frost with light row covers. Slip clean straw beneath crowns.',
        wateringNeed: 'Moderate',
        soilTempRequirement: '15°C – 22°C',
        pestVulnerabilities: ['Frost damage turning blossom centers black', 'Thrips']
      },
      {
        id: 'straw-swell',
        name: 'Green Berry Swelling',
        shortName: 'Fruit Set',
        startDay: 40,
        endDay: 50,
        stageCategory: 'fruiting',
        stageColor: '#0D9488',
        stageBg: '#CCFBF1',
        description: 'Fertilized flower receptacles swell into hard green berries covered in external achene seeds.',
        careAdvice: 'Keep berries elevated on dry straw mulch to prevent soil-contact grey mold (Botrytis).',
        wateringNeed: 'Moderate',
        soilTempRequirement: '16°C – 22°C',
        pestVulnerabilities: ['Slugs', 'Grey mold / Botrytis']
      },
      {
        id: 'straw-harvest',
        name: 'Sweet Scarlet Berry Harvest',
        shortName: 'Harvest',
        startDay: 50,
        endDay: 65,
        stageCategory: 'harvest',
        stageColor: '#B45309',
        stageBg: '#FDE68A',
        description: 'Berries ripen from white to full crimson red, achieving peak sweetness and fragrant aroma.',
        careAdvice: 'Pick berries with 1 cm of stem attached every other day. Never harvest when foliage is wet from morning dew.',
        wateringNeed: 'Tapering off',
        soilTempRequirement: '16°C – 24°C',
        pestVulnerabilities: ['Birds & rodents (use lightweight bird netting)', 'Fruit rot']
      }
    ]
  }
];

export const TIMELINE_PRESET_PACKS = [
  {
    name: 'Spring Salad Bed',
    cropIds: ['crop-spinach', 'crop-carrot', 'crop-bush-bean'],
    tagline: 'Fast succession & fresh leafy root turnover'
  },
  {
    name: 'Summer Heavy Feeders',
    cropIds: ['crop-tomato', 'crop-bell-pepper', 'crop-bush-bean'],
    tagline: 'Warm-season garden & nitrogen restoration pairing'
  },
  {
    name: 'Staple Field Guild',
    cropIds: ['crop-maize', 'crop-bush-bean', 'crop-potato'],
    tagline: 'High-calorie staple rotation with legume enrichment'
  }
];
