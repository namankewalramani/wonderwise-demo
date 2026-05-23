export type ViewType = 'landing' | 'auth' | 'onboarding' | 'app';

export type AppTabType = 'dashboard' | 'trips' | 'explore' | 'concierge' | 'profile';

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Map to Lucide icon
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  avatarUrl: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
}
