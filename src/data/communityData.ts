import { CommunityPost, FarmerTestimonial } from '../types/agriculture';

export const COMMUNITY_POSTS_INITIAL: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Sarah Jenkins',
    authorRole: 'Community Garden Coordinator',
    location: 'Willamette Valley, OR',
    title: 'How we naturally beat tomato hornworms with marigolds and paper wasp perches',
    content: 'Last season we lost nearly a third of our heirloom tomatoes to hornworms. Instead of chemical synthetics, this year we planted french marigolds around every border and left small wooden perches for native paper wasps. We spotted three hornworms all season and the wasps quickly took care of them. The easiest natural defense we have ever tried!',
    categoryTag: 'Beginner Advice',
    cropMentioned: 'Tomato',
    likes: 38,
    timestamp: '2 days ago',
    replies: [
      {
        id: 'reply-1',
        authorName: 'David Chen',
        authorRole: 'Market Gardener (1.5 Acres)',
        text: 'Can confirm! Also planting borage right next to the tomatoes confuses the adult sphinx moths when they try to lay eggs.',
        timestamp: '1 day ago'
      },
      {
        id: 'reply-2',
        authorName: 'Maria Santos',
        authorRole: 'Backyard Grower',
        text: 'Did the marigolds help with soil nematodes too? We are testing that in our raised beds this month.',
        timestamp: '18 hours ago'
      }
    ]
  },
  {
    id: 'post-2',
    authorName: 'Harriet Omondi',
    authorRole: 'Smallholder Maize Grower',
    location: 'Rift Valley Region',
    title: 'Simple push-pull intercropping saved our corn plot from fall armyworm',
    content: 'We combined desmodium between our maize rows with Napier grass around the outer boundary. The desmodium emits a scent that drives armyworms away, while the Napier grass lures them into harmless outer traps. Yield went up by almost 35% without buying imported chemical sprays.',
    categoryTag: 'Pest Emergency',
    cropMentioned: 'Sweet Corn / Maize',
    likes: 54,
    timestamp: '4 days ago',
    replies: [
      {
        id: 'reply-3',
        authorName: 'Thomas Becker',
        authorRole: 'Agronomy Student',
        text: 'This is the classic ICIPE push-pull technique! Incredible to see it working so effectively on small acreage.',
        timestamp: '3 days ago'
      }
    ]
  },
  {
    id: 'post-3',
    authorName: 'Miguel Alvarez',
    authorRole: 'Urban Micro-Farm Owner',
    location: 'Sonoran Basin, AZ',
    title: 'Testing soil pH with simple red cabbage indicator before ordering sulfur',
    content: 'Our tap water here has high bicarbonate and was driving bed pH up to 7.8, causing iron chlorosis in our peppers. Used a simple boiled red cabbage indicator solution to quickly verify alkalinity, then mulched heavily with composted pine bark. Within three weeks the new foliage came in deep emerald green.',
    categoryTag: 'Soil & Water',
    cropMentioned: 'Bell Pepper',
    likes: 29,
    timestamp: '5 days ago',
    replies: [
      {
        id: 'reply-4',
        authorName: 'Chloe Bennett',
        authorRole: 'Hobby Gardener',
        text: 'The cabbage liquid method is such a neat kitchen trick for schools and beginners! Thanks for sharing the recipe.',
        timestamp: '4 days ago'
      }
    ]
  },
  {
    id: 'post-4',
    authorName: 'Hannah Lindqvist',
    authorRole: 'Nordic High-Tunnel Grower',
    location: 'Uppsala, Sweden',
    title: 'Autumn spinach survival in unheated polytunnels down to -8°C',
    content: 'Sowed Winter Giant spinach in late September. Even when the outer leaves frosted hard at night, a double layer of agricultural fleece thawed them out without cell rupture by midday. Harvested fresh greens right through early January!',
    categoryTag: 'Climate Shifts',
    cropMentioned: 'Spinach',
    likes: 42,
    timestamp: '1 week ago',
    replies: []
  }
];

export const FARMER_TESTIMONIALS: FarmerTestimonial[] = [
  {
    id: 'test-1',
    name: 'Elena Rostova',
    role: 'Organic Market Farmer',
    farmScale: '3-Acre Diversified Vegetable Farm',
    location: 'Hudson Valley, NY',
    quote: 'The interactive crop selector prevented me from sowing brassicas too late in our high-humidity pocket. Following the IPM guidelines helped us cut synthetic fungicide reliance by 65% in a single season while improving our Grade-A tomato yields.',
    impactMetric: '-65%',
    impactContext: 'Synthetic spray reduction in Year 1',
    establishedPractice: 'UC Davis & Cornell Integrated Pest Management'
  },
  {
    id: 'test-2',
    name: 'Marcus Thorne',
    role: 'Urban Community Garden Director',
    farmScale: '12 Raised Community Beds & Youth Program',
    location: 'Chicago, IL',
    quote: 'Our community garden volunteers have zero formal farming background. TerraCrop gave them plain-English guides on compost moisture and drip timers that they could understand in five minutes. Our carrot harvest was the sweetest we have ever logged.',
    impactMetric: '+28%',
    impactContext: 'Root crop yield increase across 12 neighborhood beds',
    establishedPractice: 'USDA NRCS Soil Quality Assessment'
  },
  {
    id: 'test-3',
    name: 'Amara Diallo',
    role: 'Cooperative Grower',
    farmScale: 'Family Agroforestry Plot',
    location: 'Dakar Region',
    quote: 'Accessing rainfall-specific crop matching made a profound difference when early season precipitation was erratic. Selecting drought-tolerant sorghum and cowpea varieties secured our family harvest during dry spells.',
    impactMetric: '100%',
    impactContext: 'Harvest security maintained through unexpected drought',
    establishedPractice: 'FAO Dryland Crop Suitability Framework'
  }
];
