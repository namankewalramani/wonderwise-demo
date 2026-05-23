import { Feature, PricingPlan, Testimonial, TimelineStep } from './types';

export const HERO_HEADLINE = "Your AI-Powered Travel Companion";
export const HERO_SUBTEXT = "WanderWise combines direct intelligence with seamless planning to generate bespoke itineraries, track smart travel budgets, and provide live assistant advice through Globi—wherever your wanderlust takes you.";

export const FEATURES_DATA: Feature[] = [
  {
    id: "ai-trip-planner",
    title: "AI Trip Planner",
    description: "Generate bespoke daily itineraries tailored exactly to your pacing, interests, and culinary desires in moments.",
    iconName: "Compass"
  },
  {
    id: "city-explorer",
    title: "City Explorer",
    description: "Unlock hidden local alleys, street food treasures, and rich historical spots unknown to mainstream tour guides.",
    iconName: "MapPin"
  },
  {
    id: "budget-tracker",
    title: "Smart Budget Tracker",
    description: "Optimize flights, set accommodation threshold grids, and log real-time conversions in multi-currencies.",
    iconName: "Coins"
  },
  {
    id: "ai-concierge",
    title: "AI Concierge Globi",
    description: "Meet Globi, your pocket travel expert. Ask for transit assistance, local etiquette tips, or translations, 24/7.",
    iconName: "MessageSquareText"
  },
  {
    id: "travel-insights",
    title: "Travel Insights",
    description: "Stay ahead of seasonal weather patterns, pack smartly, and receive safety signals aligned with foreign locations.",
    iconName: "TrendingUp"
  },
  {
    id: "email-itineraries",
    title: "Email Itineraries",
    description: "Export beautifully formatted PDF or direct email blueprints to share with your travel circle easily.",
    iconName: "Mail"
  }
];

export const TIMELINE_DATA: TimelineStep[] = [
  {
    step: "01",
    title: "Define Your Persona",
    description: "Input your budget thresholds, culinary targets, desired pace, and target destination clusters in seconds."
  },
  {
    step: "02",
    title: "Instantly Assemble",
    description: "WanderWise synthesizes real-world data grids to assemble custom day-by-day itineraries instantly."
  },
  {
    step: "03",
    title: "Personalize Dynamically",
    description: "Fine-tune and reorder travel timelines, insert tailored custom events, and integrate maps into your calendar."
  },
  {
    step: "04",
    title: "Embark with Globi",
    description: "Activate your live AI companion Globi offline or online while exploring to decode landmarks, translate prompts, and stay on track."
  }
];

export const PRICING_DATA: PricingPlan[] = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Essential travel planning parameters to design standard weekend getaways.",
    features: [
      "3 AI Trip Schedules per month",
      "Standard Offline File Exports",
      "Basic City Hotspot Searches",
      "Standard Budget Tracking Ledger"
    ],
    ctaText: "Start for Free"
  },
  {
    name: "Explorer",
    price: "9",
    period: "month",
    description: "Our most popular offering for active couples, backpackers, and digital nomads.",
    features: [
      "Unlimited AI Travel Itineraries",
      "Full Premium Destination Library Access",
      "Multi-Currency Auto-Conversion",
      "Priority Email Planner Exports",
      "Smart Interactive Expense Sync"
    ],
    isPopular: true,
    ctaText: "Begin Exploring"
  },
  {
    name: "Wanderer",
    price: "19",
    period: "month",
    description: "Unrestricted, high-octane travel companion capabilities with continuous personal AI assistance.",
    features: [
      "Everything in Explorer Plan",
      "Direct Priority Chat Access with Globi AI",
      "Live Location-Based Etiquette Guides",
      "Generative Group Collaboration Systems",
      "Concierge Boarding Sync & Alerts"
    ],
    ctaText: "Unlock Wanderer"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Sarah J.",
    role: "Adventure Photographer",
    location: "Tokyo, Japan",
    quote: "Saved me at least 12 hours researching Shibuya sushi stands and Hakone mountain routes. The responsive schedule let me swap spots freely in seconds!",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Michael K.",
    role: "Digital Nomad",
    location: "Barcelona, Spain",
    quote: "The multi-currency tracking kept our team study-trip exactly 20% under budget during three high-season weeks. Insanely practical expense dashboards.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    name: "Elena L.",
    role: "Solo Voyager",
    location: "Prague, Czechia",
    quote: "Getting off a flight with a train strike at 2 AM was terrifying, but Globi pointed me to the night tram schedules instantly. Worth every penny of Explorer!",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80"
  }
];
