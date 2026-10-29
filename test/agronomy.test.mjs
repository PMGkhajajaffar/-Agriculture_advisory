import test from 'node:test';
import assert from 'node:assert/strict';

// 1. Weather Advisory & Code Translations
function getWeatherDescription(code) {
  switch (code) {
    case 0: return 'Clear sunny skies';
    case 1: return 'Mainly clear';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45: case 48: return 'Morning fog or mist';
    case 51: case 53: case 55: return 'Gentle drizzle';
    case 61: case 63: case 65: return 'Rain showers';
    case 71: case 73: case 75: return 'Snowfall';
    case 80: case 81: case 82: return 'Passing heavy rain showers';
    case 95: case 96: case 99: return 'Thunderstorms';
    default: return 'Fair conditions';
  }
}

function computeAgroAdvisory(current, forecast, lat) {
  const isFrostRisk = current.temperatureC <= 2 || forecast.some(f => f.minTempC <= 2);
  const next3DaysRain = forecast.slice(0, 3).reduce((sum, f) => sum + f.precipitationSumMm, 0);

  let sprayCondition = 'Optimal';
  let sprayReason = 'Calm winds and dry foliage make conditions suitable for organic and IPM treatments.';

  if (current.windSpeedKmH > 18) {
    sprayCondition = 'Poor';
    sprayReason = `High wind (${current.windSpeedKmH} km/h) creates spray drift hazard for pollinators and neighboring beds.`;
  } else if (current.precipitationMm > 0 || next3DaysRain > 12) {
    sprayCondition = 'Caution';
    sprayReason = 'Rain in forecast will wash away foliar sprays and biological controls.';
  } else if (current.temperatureC > 30) {
    sprayCondition = 'Caution';
    sprayReason = 'High heat (>30°C) increases risk of foliar oil scorch. Spray early morning or dusk.';
  }

  let fungalRisk = 'Low';
  let fungalReason = 'Moderate humidity and airflow keep fungal spore pressure low.';

  if (current.relativeHumidity > 78 && current.temperatureC >= 18 && current.temperatureC <= 32) {
    fungalRisk = 'High';
    fungalReason = 'Warm temperatures combined with humidity >75% create optimal spore germination for blight and powdery mildew.';
  } else if (current.relativeHumidity > 65 || next3DaysRain > 5) {
    fungalRisk = 'Moderate';
    fungalReason = 'Elevated moisture levels. Monitor lower foliage and ensure proper morning airflow.';
  }

  let irrigationAdvice = 'Irrigate deeply';
  let irrigationReason = 'Maintain consistent soil moisture at root level for active vegetative and fruiting phases.';

  if (current.precipitationMm > 5 || next3DaysRain > 15) {
    irrigationAdvice = 'Hold irrigation (Rain forecast)';
    irrigationReason = 'Sufficient precipitation anticipated. Delay automated watering to prevent root hypoxia.';
  } else if (current.temperatureC > 28) {
    irrigationAdvice = 'Irrigate deeply';
    irrigationReason = 'High transpiration rates under warm sun. Irrigate deeply in early morning to minimize evaporation.';
  }

  let climateZone = 'Temperate';
  const absLat = Math.abs(lat);
  if (absLat < 18) {
    climateZone = current.relativeHumidity > 65 ? 'Tropical' : 'Arid / Semi-arid';
  } else if (absLat < 34) {
    climateZone = current.relativeHumidity < 45 ? 'Arid / Semi-arid' : 'Subtropical';
  } else if (absLat < 55) {
    climateZone = 'Temperate';
  } else {
    climateZone = 'Continental';
  }

  return {
    sprayCondition,
    sprayReason,
    fungalRisk,
    fungalReason,
    irrigationAdvice,
    irrigationReason,
    frostRisk: isFrostRisk,
    climateZone,
  };
}

// 2. Companion Planting Grid Evaluator
function evaluateGrid(grid, plants) {
  const plantMap = new Map(plants.map(p => [p.id, p]));
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  const synergies = new Set();
  const warnings = new Set();
  const rowHeights = [];

  for (let r = 0; r < rows; r++) {
    let maxHeight = 'Short';
    for (let c = 0; c < cols; c++) {
      const plantId = grid[r][c];
      if (!plantId) continue;
      const plant = plantMap.get(plantId);
      if (!plant) continue;

      if (plant.plantHeight === 'Tall') maxHeight = 'Tall';
      else if (plant.plantHeight === 'Medium' && maxHeight !== 'Tall') maxHeight = 'Medium';

      const neighbors = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1],
      ];

      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          const neighborId = grid[nr][nc];
          if (!neighborId) continue;
          const neighbor = plantMap.get(neighborId);
          if (!neighbor) continue;

          if (plant.goodCompanions.includes(neighborId)) {
            const pairKey = [plant.shortName, neighbor.shortName].sort().join(' + ');
            synergies.add(pairKey);
          }
          if (plant.badCompanions.includes(neighborId)) {
            const pairKey = [plant.shortName, neighbor.shortName].sort().join(' vs ');
            warnings.add(pairKey);
          }
        }
      }
    }
    rowHeights.push(maxHeight);
  }

  const backRowHasShort = rowHeights[0] === 'Short';
  const frontRowHasTall = rowHeights[rows - 1] === 'Tall';
  const hasShadingConflict = backRowHasShort && frontRowHasTall;

  return {
    synergies: Array.from(synergies),
    warnings: Array.from(warnings),
    hasShadingConflict,
  };
}

const mockPlants = [
  {
    id: 'tomato',
    shortName: 'Tomato',
    plantHeight: 'Tall',
    goodCompanions: ['basil', 'marigold'],
    badCompanions: ['corn'],
  },
  {
    id: 'basil',
    shortName: 'Basil',
    plantHeight: 'Medium',
    goodCompanions: ['tomato'],
    badCompanions: [],
  },
  {
    id: 'corn',
    shortName: 'Corn',
    plantHeight: 'Tall',
    goodCompanions: ['bean'],
    badCompanions: ['tomato'],
  },
  {
    id: 'spinach',
    shortName: 'Spinach',
    plantHeight: 'Short',
    goodCompanions: [],
    badCompanions: [],
  },
];

// 3. Test Cases
test('Weather description mapping', () => {
  assert.equal(getWeatherDescription(0), 'Clear sunny skies');
  assert.equal(getWeatherDescription(95), 'Thunderstorms');
  assert.equal(getWeatherDescription(51), 'Gentle drizzle');
  assert.equal(getWeatherDescription(999), 'Fair conditions');
});

test('AgroAdvisory: Wind speed creates spray drift hazard', () => {
  const current = {
    temperatureC: 22,
    windSpeedKmH: 24,
    precipitationMm: 0,
    relativeHumidity: 50,
  };
  const forecast = [
    { minTempC: 15, precipitationSumMm: 0 },
    { minTempC: 14, precipitationSumMm: 0 },
    { minTempC: 16, precipitationSumMm: 0 },
  ];
  const advisory = computeAgroAdvisory(current, forecast, 38.0);
  assert.equal(advisory.sprayCondition, 'Poor');
  assert.match(advisory.sprayReason, /spray drift hazard/i);
});

test('AgroAdvisory: Warm temperature and high humidity triggers fungal risk', () => {
  const current = {
    temperatureC: 24,
    windSpeedKmH: 8,
    precipitationMm: 0,
    relativeHumidity: 84,
  };
  const forecast = [
    { minTempC: 18, precipitationSumMm: 0 },
    { minTempC: 17, precipitationSumMm: 0 },
    { minTempC: 19, precipitationSumMm: 0 },
  ];
  const advisory = computeAgroAdvisory(current, forecast, 38.0);
  assert.equal(advisory.fungalRisk, 'High');
  assert.match(advisory.fungalReason, /powdery mildew/i);
});

test('AgroAdvisory: Frost risk detected on sub-3C temperatures', () => {
  const current = {
    temperatureC: 1,
    windSpeedKmH: 5,
    precipitationMm: 0,
    relativeHumidity: 70,
  };
  const forecast = [
    { minTempC: 0, precipitationSumMm: 0 },
    { minTempC: 3, precipitationSumMm: 0 },
  ];
  const advisory = computeAgroAdvisory(current, forecast, 45.0);
  assert.equal(advisory.frostRisk, true);
});

test('Companion evaluation: detects synergies and incompatibilities', () => {
  const grid = [
    ['tomato', 'basil'],
    ['corn', null],
  ];
  const result = evaluateGrid(grid, mockPlants);
  assert.ok(result.synergies.includes('Basil + Tomato'));
  assert.ok(result.warnings.includes('Corn vs Tomato'));
});

test('Companion evaluation: detects sunlight shading when tall front shades short back', () => {
  const shadedGrid = [
    ['spinach', 'spinach'], // Short in back (North)
    ['tomato', 'corn'],     // Tall in front (South)
  ];
  const result = evaluateGrid(shadedGrid, mockPlants);
  assert.equal(result.hasShadingConflict, true);

  const properGrid = [
    ['tomato', 'corn'],     // Tall in back (North)
    ['spinach', 'spinach'], // Short in front (South)
  ];
  const resultProper = evaluateGrid(properGrid, mockPlants);
  assert.equal(resultProper.hasShadingConflict, false);
});

test('Input Sanitization: strips harmful HTML and script tags', () => {
  const sanitize = (val) => val.replace(/<[^>]*>?/gm, '').trim();
  const raw = '<script>alert("xss")</script>How to handle aphids <img src=x onerror=alert(1)>';
  const clean = sanitize(raw);
  assert.equal(clean, 'alert("xss")How to handle aphids');
  assert.ok(!clean.includes('<script>'));
  assert.ok(!clean.includes('onerror'));
});
