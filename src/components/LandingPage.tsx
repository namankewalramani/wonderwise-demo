import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { FEATURES_DATA, TIMELINE_DATA, PRICING_DATA, TESTIMONIALS_DATA, HERO_HEADLINE, HERO_SUBTEXT } from '../data';
import { Feature, PricingPlan, Testimonial, TimelineStep } from '../types';

interface LandingPageProps {
  onStartApp: () => void;
}

// Bulletproof dynamic icon renderer
const DynamicIcon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.Compass className={className} />;
  }
  return <IconComponent className={className} />;
};

export default function LandingPage({ onStartApp }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Helper handling for seamless anchor target scrolls
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-teal-primary selection:text-navy-dark">
      
      {/* Dynamic Starry Sky Overlay for visual premium aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-light/10 via-navy-dark/50 to-navy-dark pointer-events-none z-0" />

      {/* Sticky Header Navbar */}
      <header id="navbar-sticky" className="sticky top-0 z-50 backdrop-blur-md bg-navy-dark/80 border-b border-navy-light/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button 
            id="nav-logo" 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center space-x-3 cursor-pointer group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-primary via-teal-light to-coral-accent p-0.5 shadow-md shadow-teal-primary/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-navy-dark rounded-[10px] flex items-center justify-center">
                <Icons.Sparkles className="w-5 h-5 text-teal-primary animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-white block">
                Wander<span className="text-teal-primary">Wise</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 block uppercase">AI TRAVEL ASSISTANT</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              id="lnk-features" 
              onClick={() => scrollToSection('features')} 
              className="font-medium text-sm text-slate-300 hover:text-teal-primary transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              id="lnk-howitworks" 
              onClick={() => scrollToSection('how-it-works')} 
              className="font-medium text-sm text-slate-300 hover:text-teal-primary transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              id="lnk-pricing" 
              onClick={() => scrollToSection('pricing')} 
              className="font-medium text-sm text-slate-300 hover:text-teal-primary transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button 
              id="lnk-testimonials" 
              onClick={() => scrollToSection('testimonials')} 
              className="font-medium text-sm text-slate-300 hover:text-teal-primary transition-colors cursor-pointer"
            >
              Stories
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <button
              id="btn-nav-cta"
              onClick={onStartApp}
              className="relative px-5 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-teal-primary to-teal-light text-navy-dark hover:shadow-lg hover:shadow-teal-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer flex items-center gap-1.5"
            >
              Get Started
              <Icons.ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile responsive toggle */}
          <div className="md:hidden">
            <button
              id="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-teal-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <Icons.X className="w-6 h-6" />
              ) : (
                <Icons.Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-navy-dark/95 border-b border-navy-light/50 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3"
            >
              <button
                id="btn-mob-features"
                onClick={() => scrollToSection('features')}
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-navy-light/50 hover:text-teal-primary transition-all font-medium"
              >
                Features
              </button>
              <button
                id="btn-mob-how"
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-navy-light/50 hover:text-teal-primary transition-all font-medium"
              >
                How It Works
              </button>
              <button
                id="btn-mob-price"
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-navy-light/50 hover:text-teal-primary transition-all font-medium"
              >
                Pricing
              </button>
              <button
                id="btn-mob-test"
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:bg-navy-light/50 hover:text-teal-primary transition-all font-medium"
              >
                Stories
              </button>
              <div className="pt-2">
                <button
                  id="btn-mob-cta"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStartApp();
                  }}
                  className="block w-full py-3 text-center font-semibold rounded-lg bg-teal-primary text-navy-dark shadow-md"
                >
                  Launch App
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section Container */}
      <section id="hero" className="relative z-10 flex-grow flex items-center justify-center py-16 lg:py-24 overflow-hidden border-b border-navy-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-primary/10 border border-teal-primary/30 text-teal-light text-xs font-semibold tracking-wider uppercase animate-fade-in">
              <Icons.Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Travel Engine</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {HERO_HEADLINE.split('—').map((term, i) => (
                <span key={i} className={i === 1 ? "text-teal-primary" : ""}>
                  {term}
                </span>
              ))}
              Your <span className="bg-gradient-to-r from-teal-primary via-teal-light to-coral-accent bg-clip-text text-transparent">AI-Powered</span> Travel Companion
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
              {HERO_SUBTEXT}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                id="btn-hero-planner"
                onClick={onStartApp}
                className="px-8 py-4 rounded-xl font-bold text-center bg-gradient-to-r from-teal-primary to-teal-light text-navy-dark hover:shadow-xl hover:shadow-teal-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Plan Your Trip Free</span>
                <Icons.ArrowRight className="w-5 h-5" />
              </button>
              <button
                id="btn-hero-demo"
                onClick={() => scrollToSection('features')}
                className="px-8 py-4 rounded-xl font-semibold text-center bg-navy-light text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700 flex items-center justify-center gap-2"
              >
                Explore Features
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-navy-light/40 w-full max-w-lg">
              <div>
                <span className="block text-2xl lg:text-3xl font-bold font-display text-teal-primary">12k+</span>
                <span className="text-xs text-slate-400 font-medium">Smart Trips Generated</span>
              </div>
              <div>
                <span className="block text-2xl lg:text-3xl font-bold font-display text-coral-accent">4.9★</span>
                <span className="text-xs text-slate-400 font-medium">Traveler Rating</span>
              </div>
              <div>
                <span className="block text-2xl lg:text-3xl font-bold font-display text-teal-light">140+</span>
                <span className="text-xs text-slate-400 font-medium">Countries Mapped</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Column: Pure CSS Mountains/Cities Gradient Illustration */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-navy-light/40 group">
              
              {/* Complex Layered Pure CSS Scenic Mountain & Sky Landscape Web Artwork */}
              {/* Sky Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#111126] via-[#1C1C44] to-[#25255C]" />
              
              {/* Giant Glowing Neon Moon Background Element */}
              <div className="absolute top-12 right-12 w-28 h-28 rounded-full bg-gradient-to-tr from-coral-accent/80 to-pink-500/10 blur-sm mix-blend-screen animate-pulse" />
              <div className="absolute top-12 right-12 w-28 h-28 rounded-full bg-gradient-to-tr from-[#FF8E72]/10 to-transparent" />
              
              {/* Distant Stars */}
              <div className="absolute top-8 left-16 w-1 h-1 bg-white rounded-full opacity-60" />
              <div className="absolute top-24 left-24 w-1.5 h-1.5 bg-teal-light rounded-full opacity-80" />
              <div className="absolute top-14 left-44 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse" />
              <div className="absolute top-36 left-12 w-1.5 h-1.5 bg-coral-accent rounded-full opacity-70" />
              <div className="absolute top-28 right-32 w-1 h-1 bg-teal-primary rounded-full opacity-90 animate-ping duration-1000" />
              <div className="absolute top-48 right-16 w-1.5 h-1.5 bg-teal-light rounded-full opacity-50" />

              {/* Constellation lines */}
              <div className="absolute top-14 left-44 w-10 h-0.5 bg-teal-primary/20 rotate-45" />
              <div className="absolute top-16 left-52 w-12 h-0.5 bg-teal-primary/20 -rotate-12" />

              {/* Distant Mountain Peaks Silhouette - Built using clipping & CSS transforms */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[450px] h-60 bg-gradient-to-t from-[#0e0e1a] to-[#1d1d40] rotate-45 transform origin-bottom-left rounded-[32px] overflow-hidden" 
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              
              {/* Secondary Overlapping Deep Teal Mountain CLIFF (Cliffs Grid) */}
              <div className="absolute -bottom-12 -left-16 w-[340px] h-52 bg-gradient-to-t from-[#0d343f] to-[#14B8A6] opacity-90"
                   style={{ clipPath: 'polygon(40% 0%, 0% 100%, 100% 100%)' }} />

              {/* Mid-ground Mountain with Soft Coral Accent Highlight */}
              <div className="absolute -bottom-16 -right-20 w-[410px] h-44 bg-gradient-to-t from-[#15152a] via-[#331d27] to-[#FF8E72] opacity-80"
                   style={{ clipPath: 'polygon(60% 0%, 0% 100%, 100% 100%)' }} />

              {/* Clean minimalist Foreground Hills */}
              <div className="absolute bottom-0 right-0 left-0 h-20 bg-gradient-to-t from-navy-deep to-navy-dark/95 flex items-end justify-center rounded-b-3xl">
                {/* Coastal beach gradient line */}
                <div className="absolute top-0 w-full h-1 bg-[#14B8A6] opacity-60 blur-xs" />
              </div>

              {/* Dynamic Flight Jet Path Line and AI sparkles representing Globi Travel Compass */}
              <div className="absolute bottom-20 left-12 p-3 bg-navy-dark/80 backdrop-blur-md rounded-2xl border border-navy-light/60 shadow-lg flex items-center space-x-3 hover:scale-105 transition-all">
                <div className="w-8 h-8 rounded-lg bg-teal-primary/20 flex items-center justify-center">
                  <Icons.Compass className="w-5 h-5 text-teal-primary animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-white leading-none">AI Smart Route</span>
                  <span className="text-[9px] text-teal-light font-mono leading-none">Ready &middot; Live</span>
                </div>
              </div>

              {/* Floating Concierge Chat Bubble Simulation */}
              <div className="absolute top-24 left-10 p-2.5 bg-navy-dark/90 backdrop-blur-md rounded-xl border border-teal-primary/35 shadow-xl text-[10px] sm:text-xs flex items-center space-x-2 animate-bounce" style={{ animationDuration: '4s' }}>
                <span className="text-white">Need a diner in Kyoto?</span>
                <span className="p-1 rounded-md bg-teal-primary text-[#1A1A2E]"><Icons.Send className="w-2.5 h-2.5" /></span>
              </div>

              {/* Gradient lighting halo overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-primary/5 via-transparent to-coral-accent/5 pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section id="features" className="py-20 lg:py-28 relative z-10 border-b border-navy-light/25 bg-navy-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-wide uppercase text-teal-primary">High Fidelity Capability Suite</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Supercharge your next itinerary with tailored AI intelligence
            </h2>
            <p className="text-slate-400 mt-3 text-lg">
              No generic lists. WanderWise optimizes timeslots, currency trends, and local secret events mapped custom to who you are.
            </p>
          </div>

          <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_DATA.map((feature, idx) => (
              <motion.div
                key={feature.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-gradient-to-b from-navy-light/40 to-navy-dark p-8 rounded-2xl border border-navy-light/60 hover:border-teal-primary/40 relative group overflow-hidden"
              >
                {/* Micro glow radial behind */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-12 h-12 rounded-xl bg-teal-primary/10 border border-teal-primary/20 flex items-center justify-center mb-6 group-hover:bg-teal-primary text-teal-light group-hover:text-navy-dark transition-all duration-300">
                  <DynamicIcon name={feature.iconName} className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-teal-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle bottom accent boarder */}
                <div className="absolute bottom-0 left-0 hover:right-0 w-0 group-hover:w-full h-[3px] bg-gradient-to-r from-teal-primary via-teal-light to-coral-accent transition-all duration-300" />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* How It Works Timeline Section */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-[#111122] border-b border-navy-light/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sm font-semibold tracking-wide uppercase text-coral-accent">Interactive Timeline</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Four steps from dreaming to departure
            </h2>
            <p className="text-slate-400 mt-3 text-lg leading-relaxed">
              Our automated models aggregate dynamic aviation databases, local weather structures, and custom parameters. Here is the architecture.
            </p>
          </div>

          {/* Desktop Timeline Step Line */}
          <div className="relative">
            {/* Thread Line linking items on large screens */}
            <div className="hidden lg:block absolute top-[5.25rem] left-12 right-12 h-0.5 bg-slate-800" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {TIMELINE_DATA.map((stepItem) => (
                <div key={stepItem.step} className="flex flex-col items-start text-left group">
                  
                  {/* Step bubble */}
                  <div className="relative w-16 h-16 rounded-2xl bg-navy-light border-2 border-slate-700 flex items-center justify-center font-display text-xl font-bold text-slate-300 group-hover:border-teal-primary group-hover:text-teal-primary transition-all duration-300 mb-6 group-hover:scale-105">
                    {stepItem.step}
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-coral-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-teal-light transition-colors">
                    {stepItem.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {stepItem.description}
                  </p>

                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button
              id="btn-timel-start"
              onClick={onStartApp}
              className="px-8 py-3.5 rounded-xl font-bold bg-navy-light text-teal-primary border border-teal-primary/30 hover:bg-teal-primary/10 transition-colors"
            >
              Start Generating Your Journey
            </button>
          </div>

        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section id="pricing" className="py-20 lg:py-28 relative z-10 border-b border-navy-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold tracking-wide uppercase text-teal-primary">Simple Transparent Rates</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Select the magnitude of your companion
            </h2>
            <p className="text-slate-400 mt-3 text-lg">
              Unlock offline maps, unlimited itineraries, and Globi voice translations mapped directly to your travel circles.
            </p>

            {/* Toggle Switch Monthly / Annually */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-teal-primary' : 'text-slate-400'}`}>Monthly</span>
              <button
                id="btn-pricing-toggle"
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 rounded-full bg-slate-800 p-1 flex items-center transition-colors border border-slate-700 cursor-pointer"
              >
                <div className={`w-4 h-4 rounded-full bg-teal-primary transition-transform duration-200 ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm font-medium flex items-center space-x-1.5 ${billingCycle === 'yearly' ? 'text-teal-primary' : 'text-slate-400'}`}>
                <span>Yearly</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-coral-accent/20 text-coral-accent">SAVE 20%</span>
              </span>
            </div>

          </div>

          {/* Pricing cards grid */}
          <div id="pricing-tiers-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
            {PRICING_DATA.map((plan) => {
              const basePriceNum = parseInt(plan.price);
              const priceDisplay = billingCycle === 'yearly' 
                ? Math.floor(basePriceNum * 12 * 0.8) 
                : basePriceNum;
              
              return (
                <div
                  key={plan.name}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                    plan.isPopular 
                      ? 'bg-gradient-to-b from-navy-light/60 to-navy-dark border-teal-primary shadow-xl shadow-teal-primary/5 md:-translate-y-4' 
                      : 'bg-navy-dark/90 border-navy-light/70 hover:border-slate-700'
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-teal-primary text-navy-dark text-xs font-bold tracking-wider uppercase shadow-md">
                      BEST SELLER
                    </span>
                  )}

                  {/* Header info */}
                  <div>
                    <h3 className="text-xl font-bold font-display text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-xs min-h-12 leading-relaxed">{plan.description}</p>
                    
                    {/* Price structure */}
                    <div className="my-6">
                      <span className="text-4xl font-extrabold font-display text-white">$</span>
                      <span className="text-5xl font-extrabold font-display text-white leading-none tracking-tight">
                        {priceDisplay}
                      </span>
                      <span className="text-slate-400 font-medium text-sm ml-2">
                        / {billingCycle === 'yearly' ? 'year' : plan.period}
                      </span>
                    </div>

                    {/* Feature items */}
                    <ul className="space-y-4 py-6 border-t border-navy-light/40">
                      {plan.features.map((featureItem) => (
                        <li key={featureItem} className="flex items-start text-xs text-slate-300">
                          <Icons.CheckCircle className="w-4.5 h-4.5 text-teal-primary shrink-0 mr-3 mt-0.5" />
                          <span>{featureItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <div className="pt-6 border-t border-navy-light/10 mt-6">
                    <button
                      id={`btn-pricing-${plan.name.toLowerCase()}`}
                      onClick={onStartApp}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-teal-primary to-teal-light text-navy-dark hover:shadow-lg shadow-teal-primary/10'
                          : 'bg-navy-light hover:bg-slate-800 text-teal-light hover:text-white border border-slate-700'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <Icons.ChevronRight className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Testimonials Review Slider Section */}
      <section id="testimonials" className="py-20 lg:py-28 bg-[#111122] border-b border-navy-light/25 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-wide uppercase text-coral-accent">Voyager Experiences</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Endorsed by global global wanderers
            </h2>
            <p className="text-slate-400 mt-3 text-lg">
              Check out these real logs from smart wanderers navigating striking cities using Globi support.
            </p>
          </div>

          <div id="testimonials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((testimonial, idx) => (
              <div
                key={testimonial.name}
                className="bg-navy-dark border border-navy-light/60 rounded-3xl p-8 flex flex-col justify-between relative group hover:border-[#FF8E72]/40 transition-colors"
              >
                <div>
                  {/* Star Rating Icons Row */}
                  <div className="flex items-center space-x-1.5 mb-6 text-coral-accent">
                    {[...Array(5)].map((_, i) => (
                      <Icons.Star key={i} className="w-4 h-4 fill-coral-accent" />
                    ))}
                  </div>

                  <p className="text-slate-200 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-navy-light/30">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-primary/40"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-display leading-none">{testimonial.name}</h4>
                    <span className="text-[11px] text-slate-400 mt-1 block">{testimonial.role}</span>
                    <span className="inline-flex items-center text-[10px] text-teal-light font-mono mt-1 px-1.5 py-0.5 rounded bg-teal-primary/10">
                      <Icons.MapPin className="w-2.5 h-2.5 mr-1" />
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer-Adjacen CTA Section Banner */}
      <section id="footer-cta" className="relative py-20 bg-gradient-to-r from-navy-dark via-[#1a122e] to-navy-dark border-b border-navy-light/30 overflow-hidden relative z-10 text-center">
        <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,_var(--tw-gradient-stops)) from-[#FF8E72]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Ready to wander <span className="text-teal-primary">wiser</span>?
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Create an account within WanderWise and unlock live assistant guidance, interactive route plans, and bulletproof foreign budget ledgers inside one sleek panel.
          </p>
          <div className="pt-4 flex justify-center">
            <button
              id="btn-bottom-cta"
              onClick={onStartApp}
              className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-teal-primary via-teal-light to-coral-accent text-navy-dark hover:shadow-xl hover:shadow-teal-primary/30 transition-transform hover:-translate-y-0.5 duration-200"
            >
              Start Your Free Itinerary
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section Container */}
      <footer id="main-footer" className="bg-navy-deep py-16 border-t border-navy-light/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-primary/10 rounded-lg border border-teal-primary/20">
                <Icons.Sparkles className="w-5 h-5 text-teal-primary" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Wander<span className="text-teal-primary">Wise</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Deploying artificial travel models to generate personalized routing tables, local highlights tracking, and expense optimization parameters for global explorers.
            </p>
            <span className="text-[10px] font-mono text-slate-500">
              © {new Date().getFullYear()} WanderWise. All rights reserved.
            </span>
          </div>

          {/* Nav Lists Col 1: Product */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs font-bold text-white tracking-wider uppercase">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => scrollToSection('features')} className="text-slate-400 hover:text-teal-primary transition-colors cursor-pointer">Planner Engines</button></li>
              <li><button onClick={() => scrollToSection('features')} className="text-slate-400 hover:text-teal-primary transition-colors cursor-pointer">Globi AI Concierge</button></li>
              <li><button onClick={() => scrollToSection('pricing')} className="text-slate-400 hover:text-teal-primary transition-colors cursor-pointer">Explorer Rates</button></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-primary transition-colors">Integrations</a></li>
            </ul>
          </div>

          {/* Nav Lists Col 2: Resources */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs font-bold text-white tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-slate-400 hover:text-teal-primary transition-colors">Security Rules</a></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-primary transition-colors">Traveler Logs</a></li>
              <li><button onClick={() => scrollToSection('how-it-works')} className="text-slate-400 hover:text-teal-primary transition-colors cursor-pointer">System Diagrams</button></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-primary transition-colors">Support Center</a></li>
            </ul>
          </div>

          {/* Nav Lists Col 3: Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-xs font-bold text-white tracking-wider uppercase">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="text-slate-400 hover:text-teal-primary transition-colors">Privacy Charter</a></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-primary transition-colors">Cookie Policies</a></li>
              <li><a href="#" className="text-slate-400 hover:text-teal-primary transition-colors">API Agreement</a></li>
            </ul>
          </div>

          {/* Social connections column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold text-white tracking-wider uppercase">Connect</h4>
            <div className="flex items-center space-x-3">
              <span className="p-2 bg-navy-light rounded-lg hover:bg-teal-primary hover:text-navy-dark transition-colors cursor-pointer"><Icons.Compass className="w-4 h-4" /></span>
              <span className="p-2 bg-navy-light rounded-lg hover:bg-teal-primary hover:text-navy-dark transition-colors cursor-pointer"><Icons.Globe className="w-4 h-4" /></span>
              <span className="p-2 bg-navy-light rounded-lg hover:bg-teal-primary hover:text-navy-dark transition-colors cursor-pointer"><Icons.Mail className="w-4 h-4" /></span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              Based internationally. Providing companion systems from Kyoto to Munich.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
