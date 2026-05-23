import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';

interface OnboardingWizardProps {
  initialName: string;
  onOnboardingComplete: (profile: any) => void;
}

export default function OnboardingWizard({ initialName, onOnboardingComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);

  // Form states
  const [name, setName] = useState(initialName || '');
  const [dob, setDob] = useState('');
  const [homeCity, setHomeCity] = useState('');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('USD');

  const [travelStyle, setTravelStyle] = useState<string>('Adventure');
  const [tripDuration, setTripDuration] = useState<string>('1 week');

  const [budgetTier, setBudgetTier] = useState<'Budget' | 'Mid-range' | 'Luxury'>('Mid-range');
  const [accommodation, setAccommodation] = useState<string[]>(['Hotel', 'Airbnb']);
  const [companions, setCompanions] = useState<string>('Solo');

  const [foodPrefs, setFoodPrefs] = useState<string[]>(['No Preference']);
  const [interests, setInterests] = useState<string[]>(['Mountains', 'History', 'Food']);
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [mobility, setMobility] = useState<number>(2); // 1 = Low, 2 = Moderate, 3 = High

  // Helpful states
  const [validationError, setValidationError] = useState<string | null>(null);

  const citySuggestions = ["Mumbai", "Delhi", "Bengaluru", "New York", "London", "Tokyo", "Paris", "Berlin"];

  const travelStyleOptions = [
    { key: 'Adventure', emoji: '🧭', title: 'Adventure', desc: 'Thrill-seeking treks, extreme sport climbs, and off-grid wildlife safaris.' },
    { key: 'Relaxation', emoji: '🏖️', title: 'Relaxation', desc: 'Sunny sands, gentle breeze, serene resorts, and mindful spa sessions.' },
    { key: 'Cultural', emoji: '🏛️', title: 'Cultural', desc: 'Ancient histories, regional art museums, old heritage ruins, and shrines.' },
    { key: 'Foodie', emoji: '🍜', title: 'Foodie', desc: 'Sizzling local fast snacks, street food alleys, and premium dining rooms.' },
    { key: 'Backpacker', emoji: '🎒', title: 'Backpacker', desc: 'Frugal hostels, localized scenic rails, social cafes, and self-guided paths.' },
    { key: 'Luxury', emoji: '💎', title: 'Luxury', desc: 'Opulent boutique stays, private transfers, premium lounges, and elite comfort.' }
  ];

  const durationOptions = ['Weekend', '1 week', '2 weeks', '1 month+'];
  const companionOptions = ['Solo', 'Couple', 'Family', 'Friends'];
  const foodPrefOptions = ['No Preference', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free'];
  const interestOptions = ['Beaches', 'Mountains', 'History', 'Nightlife', 'Food', 'Shopping', 'Wildlife', 'Adventure Sports'];
  const languageOptions = ['English', 'Hindi', 'Spanish', 'French', 'Japanese', 'German', 'Italian', 'Mandarin'];

  // Currency utility helper
  const currencySymbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };

  // Budget Tier per-day cost mappings
  const budgetRates: Record<typeof currency, Record<typeof budgetTier, string>> = {
    INR: { Budget: '₹1,500', 'Mid-range': '₹4,500', Luxury: '₹15,000' },
    USD: { Budget: '$40', 'Mid-range': '$120', Luxury: '$450' },
    EUR: { Budget: '€35', 'Mid-range': '€110', Luxury: '€400' },
    GBP: { Budget: '£30', 'Mid-range': '£95', Luxury: '£350' }
  };

  const cleanMobilityLabel = (lvl: number) => {
    if (lvl === 1) return 'Low (Relaxed pacing, easy walking flatlands)';
    if (lvl === 2) return 'Moderate (Able to hike hills and walk 10k+ daily steps)';
    return 'High (Intense mountaineering, high-cardio pacing)';
  };

  // Switch lists multi-select logic
  const handleTogglePreference = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleToggleFoodPref = (item: string) => {
    if (item === 'No Preference') {
      setFoodPrefs(['No Preference']);
    } else {
      let filtered = foodPrefs.filter(p => p !== 'No Preference');
      if (filtered.includes(item)) {
        filtered = filtered.filter(p => p !== item);
        if (filtered.length === 0) filtered = ['No Preference'];
      } else {
        filtered.push(item);
      }
      setFoodPrefs(filtered);
    }
  };

  const handleNext = () => {
    setValidationError(null);
    if (step === 1) {
      if (!name.trim()) {
        setValidationError('Your full name parameters are required.');
        return;
      }
      if (!dob) {
        setValidationError('Please populate your date of birth.');
        return;
      }
      if (!homeCity.trim()) {
        setValidationError('Please identify your home city of origin.');
        return;
      }
    }
    if (step === 3) {
      if (accommodation.length === 0) {
        setValidationError('Please select at least one lodging style.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setValidationError(null);
    setStep(step - 1);
  };

  // Compile calculations and save user profile model
  const handleFinalFinish = () => {
    // Generate specialized Persona badge
    // travelPersona: e.g. "Cultural Mid-range Explorer"
    const parsedTierLabel = budgetTier === 'Mid-range' ? 'Mid-range' : budgetTier;
    const persona = `${travelStyle} ${parsedTierLabel} Explorer`;

    // Map numeric numeric raw budget digits for state calculators
    const numericalRates: Record<typeof currency, Record<typeof budgetTier, number>> = {
      INR: { Budget: 1500, 'Mid-range': 4500, Luxury: 15000 },
      USD: { Budget: 40, 'Mid-range': 120, Luxury: 450 },
      EUR: { Budget: 35, 'Mid-range': 110, Luxury: 400 },
      GBP: { Budget: 30, 'Mid-range': 95, Luxury: 350 }
    };

    const calculatedDaily = numericalRates[currency][budgetTier];
    const dummyBudgetSplit = { stay: 40, food: 25, transport: 15, activities: 15, shopping: 5 };

    const completeProfile = {
      name: name.trim(),
      dob,
      homeCity: homeCity.trim(),
      currency,
      travelStyle,
      tripDuration,
      budgetTier,
      accommodation,
      companions,
      foodPrefs,
      interests,
      languages,
      mobility: mobility === 1 ? 'Low' : mobility === 2 ? 'Moderate' : 'High',
      travelPersona: persona,
      dailyBudget: calculatedDaily,
      budgetSplit: dummyBudgetSplit
    };

    onOnboardingComplete(completeProfile);
  };

  return (
    <div className="min-h-screen bg-[#121225] text-slate-100 flex flex-col justify-center items-center py-12 px-4 relative overflow-hidden font-sans selection:bg-teal-primary selection:text-navy-dark">
      {/* Immersive starry backdrop */}
      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_top,_var(--tw-gradient-stops)) from-[#164e63]/25 via-[#121225]/80 to-[#121225] pointer-events-none z-0" />
      <div className="absolute top-24 left-1/3 w-80 h-80 bg-teal-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 right-10 w-96 h-96 bg-coral-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Onboarding Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold text-teal-light font-mono tracking-widest uppercase">VOYAGER REGISTRATION BOARD</span>
          <h1 className="text-2xl font-bold font-display text-white mt-1">Configure Your Traveling Identity</h1>
          <p className="text-xs text-slate-400 mt-1">Our AI engines will build specialized travel matrices aligned to this profile.</p>
        </div>

        {/* Wizard Main Container Card */}
        <div className="bg-[#1D1D35]/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
          
          {/* Progress Tracking Bar element */}
          {step <= 4 && (
            <div className="mb-8">
              <div className="flex md:items-center justify-between text-xs font-semibold tracking-wide text-slate-400 uppercase mb-2.5">
                <span>Configure Steps</span>
                <span className="text-teal-primary font-mono select-none">STEP {step} OF 4</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-teal-primary via-teal-light to-[#FF8E72] h-2 transition-all duration-300 rounded-full" 
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-4 gap-1 text-[9px] font-medium text-center text-slate-500 font-mono mt-1.5 uppercase">
                <span className={step >= 1 ? 'text-teal-light font-bold' : ''}>Basics</span>
                <span className={step >= 2 ? 'text-teal-light font-bold' : ''}>Style</span>
                <span className={step >= 3 ? 'text-teal-light font-bold' : ''}>Budget</span>
                <span className={step >= 4 ? 'text-teal-light font-bold' : ''}>Configs</span>
              </div>
            </div>
          )}

          {/* Inline Validation Warnings Dialog */}
          <AnimatePresence>
            {validationError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-rose-500/10 border border-rose-500/35 rounded-xl p-3 text-xs text-rose-300 font-semibold mb-6 flex items-center space-x-2.5"
              >
                <Icons.AlertCircle className="w-4.5 h-4.5 text-rose-400 shrink-0" />
                <span>{validationError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STEP CONTENT SWITCH PANEL */}
          <div className="min-h-96">
            
            {/* STEP 1: BASICS */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <h3 className="text-lg font-bold font-display text-white border-l-3 border-teal-primary pl-2.5 uppercase tracking-wide">
                  Step 1: Your Voyager Coordinates
                </h3>
                <p className="text-xs text-slate-400">Tell us where you are based and identify your currency preferences.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">FULL VOYAGER NAME</label>
                    <input
                      type="text"
                      placeholder="e.g. Richard Feynman"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-slate-900/40 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">DATE OF BIRTH</label>
                      <input
                        type="date"
                        value={dob}
                        max="2016-01-01"
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-slate-900/40 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">PREFERRED CURRENCY</label>
                      <div className="grid grid-cols-4 p-1 bg-slate-950 rounded-xl border border-slate-800">
                        {Object.entries(currencySymbols).map(([curCode, sym]) => (
                          <button
                            key={curCode}
                            type="button"
                            onClick={() => setCurrency(curCode as any)}
                            className={`py-2 px-1 text-center font-bold text-xs rounded-lg transition-all ${
                              currency === curCode
                                ? 'bg-teal-primary text-navy-dark font-extrabold shadow-sm'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {curCode} ({sym})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">HOME CITY OF ORIGIN</label>
                      <span className="text-[9px] text-[#FF8E72] font-semibold italic">Tap popular suggestions</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, India"
                      value={homeCity}
                      onChange={(e) => setHomeCity(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-700 bg-slate-900/40 text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-primary focus:ring-1 focus:ring-teal-primary transition-colors mb-2.5"
                    />
                    
                    {/* Compact suggestions panel */}
                    <div className="flex flex-wrap gap-1.5">
                      {citySuggestions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setHomeCity(c)}
                          className="px-2.5 py-1 text-[10px] font-semibold font-mono bg-slate-900 hover:bg-slate-800/80 text-teal-light rounded-md border border-slate-850 hover:border-teal-primary/40 transition-colors"
                        >
                          📍 {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: TRAVEL STYLE & TEMPO */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-display text-white border-l-3 border-teal-primary pl-2.5 uppercase tracking-wide">
                    Step 2: Traveling Intent & Style
                  </h3>
                </div>
                <p className="text-xs text-slate-400">Choose the signature profile vibes and approximate durations for your travel model.</p>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">SELECT MAIN TRAVEL TRAIT (PICK ONE CARD)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-76 overflow-y-auto pr-1">
                    {travelStyleOptions.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setTravelStyle(opt.key)}
                        className={`text-left p-4 rounded-xl border transition-all flex items-start space-x-3 cursor-pointer ${
                          travelStyle === opt.key
                            ? 'bg-gradient-to-br from-teal-primary/15 to-[#1a2e36] border-teal-primary shadow-lg shadow-teal-primary/5 scale-[1.01]'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-3xl select-none">{opt.emoji}</span>
                        <div>
                          <strong className="text-xs font-bold text-white block mb-0.5">{opt.title}</strong>
                          <p className="text-[10px] text-slate-400 leading-relaxed font-normal">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">PREFERRED AVERAGE TRIP SPAN</label>
                  <div className="grid grid-cols-4 gap-2">
                    {durationOptions.map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setTripDuration(dur)}
                        className={`py-3 px-1 text-center font-bold text-xs rounded-xl border transition-colors cursor-pointer ${
                          tripDuration === dur
                            ? 'bg-[#FF8E72] border-[#FF8E72] text-white font-extrabold'
                            : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BUDGET & STAY CHOICES */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <h3 className="text-lg font-bold font-display text-white border-l-3 border-teal-primary pl-2.5 uppercase tracking-wide">
                  Step 3: Financial Sizing & Living
                </h3>
                <p className="text-xs text-slate-400">Calibrate default daily financial thresholds and living formats.</p>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">BUDGET TIER (ROUGH DAILY ALLOWANCES)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Budget', 'Mid-range', 'Luxury'] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setBudgetTier(tier)}
                        className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${
                          budgetTier === tier
                            ? 'bg-[#1D2B3D] border-teal-primary text-teal-light'
                            : 'bg-slate-900/40 border-slate-850 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="block text-sm font-bold text-white mb-1.5">{tier}</span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono font-bold text-teal-primary">
                          {budgetRates[currency][tier]} / day
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">ACCOMODATION STYLES (MULTI-SELECT)</label>
                    <span className="text-[9px] text-[#FF8E72] font-semibold tracking-wide">Pick at least one</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Hostel', 'Hotel', 'Airbnb', 'Resort', 'Homestay'].map((style) => {
                      const selected = accommodation.includes(style);
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => handleTogglePreference(accommodation, setAccommodation, style)}
                          className={`py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                            selected
                              ? 'bg-gradient-to-r from-teal-primary to-teal-light border-teal-light text-navy-dark shadow-xs'
                              : 'bg-slate-900/50 border-slate-800 text-slate-450 hover:border-slate-700'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {style}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">TRAVEL COMPANIONS FORMAT</label>
                  <div className="grid grid-cols-4 gap-2">
                    {companionOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setCompanions(opt)}
                        className={`py-2.5 px-1 text-center font-bold text-xs rounded-xl border transition-colors cursor-pointer ${
                          companions === opt
                            ? 'bg-[#FF8E72] border-[#FF8E72] text-white font-extrabold'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: PREFERENCES & LAUNCH */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold font-display text-white border-l-3 border-teal-primary pl-2.5 uppercase tracking-wide">
                  Step 4: Cultural Tags & Mobility
                </h3>
                <p className="text-xs text-slate-400">Refine food preference targets, spoken dialets, and physical pacing limits.</p>

                <div>
                  <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-2">DIETARY TARGETS (MULTI-SELECT)</label>
                  <div className="flex flex-wrap gap-1.5">
                    {foodPrefOptions.map((food) => {
                      const selected = foodPrefs.includes(food);
                      return (
                        <button
                          key={food}
                          type="button"
                          onClick={() => handleToggleFoodPref(food)}
                          className={`py-1.5 px-2.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                            selected
                              ? 'bg-[#FF8E72] border-[#FF8E72] text-white'
                              : 'bg-slate-900/50 border-slate-800 text-slate-400'
                          }`}
                        >
                          {food}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-2">TRAVEL INTERESTS & HOBBIES</label>
                  <div className="flex flex-wrap gap-1.5">
                    {interestOptions.map((i) => {
                      const selected = interests.includes(i);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleTogglePreference(interests, setInterests, i)}
                          className={`py-1.5 px-2.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                            selected
                              ? 'bg-teal-primary/20 border-teal-primary text-teal-light'
                              : 'bg-slate-900/50 border-slate-800 text-slate-450'
                          }`}
                        >
                          {selected ? '✓ ' : ''}
                          {i}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-2">LANGUAGES SPOKEN</label>
                  <div className="flex flex-wrap gap-1.5">
                    {languageOptions.map((lang) => {
                      const selected = languages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => handleTogglePreference(languages, setLanguages, lang)}
                          className={`py-1.5 px-2.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                            selected
                              ? 'bg-teal-primary/25 border-teal-light text-white'
                              : 'bg-slate-900/50 border-slate-850 text-slate-450'
                          }`}
                        >
                          {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[9px] font-bold text-slate-450 uppercase tracking-widest mb-1.5">
                    <span>PHYSICAL MOBILITY VELOCITY</span>
                    <span className="text-[#FF8E72] font-semibold font-mono">Pace selected</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={mobility}
                    onChange={(e) => setMobility(parseInt(e.target.value))}
                    className="w-full accent-[#FF8E72] bg-slate-900 rounded-lg cursor-pointer h-2.5"
                  />
                  <span className="text-[10px] text-slate-300 font-medium block mt-1.5">
                    {cleanMobilityLabel(mobility)}
                  </span>
                </div>
              </motion.div>
            )}

            {/* SUMMARY REVIEW SCREEN */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                <div className="text-center pb-4 border-b border-slate-800 select-none">
                  <span className="inline-flex p-2 bg-emerald-500/10 rounded-full text-emerald-400 mb-1">
                    <Icons.ShieldCheck className="w-6 h-6 animate-pulse" />
                  </span>
                  <h3 className="text-lg font-bold font-display text-white">Your Travel Identity is Formulated!</h3>
                  <p className="text-xs text-slate-450">Review the verified configuration compiled by WanderWise smart models.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Basic Persona summary Card */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-bold text-teal-primary uppercase block mb-1">CALCULATED PERSONA</span>
                    <strong className="text-sm font-black text-white font-display block select-text">
                      {travelStyle} {budgetTier} Explorer
                    </strong>
                    <span className="text-[10px] text-slate-400 block mt-1 leading-normal">
                      High affinity for {interests.slice(0, 3).join(', ')} highlights.
                    </span>
                  </div>

                  {/* Financial Allowances Card */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-[9px] font-bold text-teal-primary uppercase block mb-1">DAILY SPEND BUDGET TARGET</span>
                    <strong className="text-sm font-black text-emerald-400 block font-mono">
                      {budgetRates[currency][budgetTier]} / Per day
                    </strong>
                    <span className="text-[10px] text-slate-400 block mt-1 leading-normal">
                      Allowance converted from origin currency {currencySymbols[currency]}.
                    </span>
                  </div>

                  {/* Settings overview */}
                  <div className="sm:col-span-2 bg-[#121226] p-4 rounded-xl border border-slate-800/80 space-y-2.5">
                    <h4 className="text-[10px] font-bold text-[#FF8E72] uppercase tracking-wider">MAPPED SPECIFICATIONS</h4>
                    
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] text-slate-300">
                      <div>
                        <span className="text-slate-500 font-medium mr-1.5">Home Basis:</span>
                        <span className="font-semibold text-slate-200">{homeCity}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium mr-1.5">Trip Span:</span>
                        <span className="font-semibold text-slate-200">{tripDuration} average</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium mr-1.5">Mobility Level:</span>
                        <span className="font-semibold text-slate-200">
                          {mobility === 1 ? 'Low' : mobility === 2 ? 'Moderate' : 'High'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-medium mr-1.5">Dietaries:</span>
                        <span className="font-semibold text-slate-200 truncate inline-block max-w-[130px]" title={foodPrefs.join(', ')}>
                          {foodPrefs.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1 leading-none">
                      <span className="text-[9px] text-slate-400 uppercase font-bold mr-1.5 select-none self-center">Stays Preferred:</span>
                      {accommodation.map((acc) => (
                        <span key={acc} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] text-slate-300">{acc}</span>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="p-3 bg-[#FFAE72]/5 rounded-xl border border-[#FFAE72]/15 text-[10px] text-slate-400 leading-relaxed text-center">
                  🛠️ Note: These settings will dynamically customize all Dashboard matrices, multi-currency budget grids, and prompt structures passed to Globi AI.
                </div>
              </motion.div>
            )}

          </div>

          {/* ACTIONS AND NAVIGATION FOOTER BAR */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-800 mt-6 md:gap-4 select-none">
            {step > 1 && step < 5 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                &larr; Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-gradient-to-r from-teal-primary to-teal-light text-[#1A1A2E] font-bold text-xs tracking-wider uppercase rounded-xl hover:shadow-lg hover:shadow-teal-primary/10 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Continue</span>
                <Icons.ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalFinish}
                className="w-full py-4 bg-gradient-to-r from-teal-primary via-teal-light to-coral-accent text-[#1A1A2E] font-black text-sm tracking-wide uppercase rounded-xl transition-all hover:shadow-xl hover:shadow-teal-primary/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                ✈ Start Exploring the world &rarr;
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
