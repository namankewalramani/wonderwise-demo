import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { AppTabType } from '../types';

interface AppShellProps {
  onLogOut: () => void;
}

export default function AppShell({ onLogOut }: AppShellProps) {
  const [activeTab, setActiveTab] = useState<AppTabType>('dashboard');
  
  // App-wide interactive states
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Renew passport (6 months valid)', done: true },
    { id: 2, text: 'Secure Kyoto machiya booking', done: true },
    { id: 3, text: 'Download offline maps & Japanese pack', done: false },
    { id: 4, text: 'Pre-book JR Shinkansen ticket', done: false },
    { id: 5, text: 'Pack heavy-duty transit adapters', done: false },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, desc: 'Kyoto Airbnb Lodging', amount: 480, category: 'Accommodation', date: 'May 20' },
    { id: 2, desc: 'Sushi lunch Shimbashi', amount: 45, category: 'Food & Dining', date: 'May 21' },
    { id: 3, desc: 'E-Sim Data Package 10GB', amount: 28, category: 'Transit & Data', date: 'May 21' },
    { id: 4, desc: 'JR East Bullet Train Pass', amount: 210, category: 'Transit & Data', date: 'May 22' },
  ]);

  const [newExpenseDesc, setNewExpenseDesc] = useState('');
  const [newExpenseAmt, setNewExpenseAmt] = useState('');
  const [newExpenseCat, setNewExpenseCat] = useState('Food & Dining');

  // AI interactive planner state
  const [selectedDest, setSelectedDest] = useState('Kyoto, Japan');
  const [generatedItinerary, setGeneratedItinerary] = useState<null | {
    dest: string;
    day1: string[];
    day2: string[];
  }>(null);
  const [generationPace, setGenerationPace] = useState('Balanced Explorer');

  // Explore keyword filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const exploreHotspots = [
    { name: 'Fushimi Inari-taisha Shrine', tag: 'Culture / Shrine', bestTime: '6 AM - Early Morning', crowdCode: 'Moderate' },
    { name: 'Gion District Alleys', tag: 'Architecture / Historic', bestTime: '5 PM - Evening Lanterns', crowdCode: 'Dense' },
    { name: 'Kiyomizu-dera Temple', tag: 'Buddhist Temple', bestTime: '4 PM - Sunset', crowdCode: 'Dense' },
    { name: 'Nishiki Market Culinary Tour', tag: 'Street Food / Shopping', bestTime: '12 PM - Lunch Hour', crowdCode: 'Very Dense' },
    { name: 'Arashiyama Bamboo Grove Walk', tag: 'Nature / Scenic', bestTime: '7 AM - Peaceful', crowdCode: 'Moderate' },
    { name: 'Kinkaku-ji (Golden Pavilion)', tag: 'Zen Temple', bestTime: '9 AM - Opening', crowdCode: 'Dense' },
  ];

  // AI Globi Chatbot conversational log state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'globi', text: "Hello! I am Globi, your pocket AI Concierge. Ask me about transit regulations, translation snippets, currency questions, or local dining spots anywhere!" },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Profile editable parameters
  const [username, setUsername] = useState(() => {
    try {
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.name || 'Alexander Mercer';
      }
    } catch {}
    return 'Alexander Mercer';
  });
  const [travelPersona, setTravelPersona] = useState(() => {
    try {
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.travelPersona || 'Scenic Backpacker';
      }
    } catch {}
    return 'Scenic Backpacker';
  });
  const [avatarIndex, setAvatarIndex] = useState(0);
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80'
  ];

  // Checklist toggler
  const toggleCheck = (id: number) => {
    setChecklist(checklist.map(itm => itm.id === id ? { ...itm, done: !itm.done } : itm));
  };

  // Add customized expense item
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseDesc || !newExpenseAmt) return;
    const item = {
      id: Date.now(),
      desc: newExpenseDesc,
      amount: parseFloat(newExpenseAmt) || 0,
      category: newExpenseCat,
      date: 'Today'
    };
    setExpenses([item, ...expenses]);
    setNewExpenseDesc('');
    setNewExpenseAmt('');
  };

  // Trigger simulated AI scheduler
  const triggerSimulatorPlan = () => {
    setGeneratedItinerary(null);
    setTimeout(() => {
      if (selectedDest === 'Kyoto, Japan') {
        setGeneratedItinerary({
          dest: 'Kyoto, Japan',
          day1: [
            '07:30 AM — Bullet Train arriving to Kyoto Central Station',
            '09:00 AM — Arashiyama Bamboo Grove early walk to dodge crowds',
            '12:30 PM — Tofu and Macha set lunch alongside Gion canal roots',
            '03:00 PM — Golden Pavilion (Kinkaku-ji) scenic capture',
            '06:30 PM — Pontocho Alley secret Izakaya reservations'
          ],
          day2: [
            '06:00 AM — Fushimi Inari mountain crawl under orange Torii Gates',
            '10:30 AM — Calligraphy workshop in old machiya district',
            '01:30 PM — Nishiki Street Food Market (try sweet soy glazed dango!)',
            '04:00 PM — Kiyomizu-dera sunset wood terrace lookout',
            '08:00 PM — Live traditional tea master ceremony overview'
          ]
        });
      } else if (selectedDest === 'Rome, Italy') {
        setGeneratedItinerary({
          dest: 'Rome, Italy',
          day1: [
            '08:30 AM — Skip-The-Line entry to Roman Colosseum',
            '11:00 AM — Walking tour through Forum ruins with localized audio guide',
            '01:30 PM — Hand-stretched thin-crust pizza in Trastevere',
            '04:00 PM — Pantheon historic dome and coins in Trevi Fountain',
            '08:00 PM — Cacio e Pepe master dinner at a family-run Osteria'
          ],
          day2: [
            '08:00 AM — Vatican Museums & Michelangelo’s Sistine Chapel',
            '11:30 AM — Gelato break near beautiful Piazza Navona fountains',
            '02:30 PM — Borghese Gallery private gardens exploration',
            '05:30 PM — Spanish Steps sunset view & luxury district stroll',
            '08:30 PM — Local Roman red wine tasting along Tiber River banks'
          ]
        });
      } else {
        setGeneratedItinerary({
          dest: 'Paris, France',
          day1: [
            '09:00 AM — Louvre Museum highlights entry (Mona Lisa focus)',
            '12:00 PM — Croissants and cafe creme walk in Tuileries Garden',
            '02:30 PM — Musee d’Orsay impressionist gallery tours',
            '05:30 PM — Arc de Triomphe rooftop view climb',
            '08:30 PM — French Bistro dinner in Saint-Germain-des-Pres'
          ],
          day2: [
            '08:30 AM — Eiffel Tower summit ticket access',
            '11:30 AM — Seine River riverboat cruise with history audio guides',
            '01:30 PM — Montmartre artist stroll & Sacre-Coeur Basilica views',
            '04:30 PM — Macaron baking workshop near Marais Boutique quarters',
            '08:00 PM — Candlelit dinner along quiet canal locks'
          ]
        });
      }
    }, 400);
  };

  // Chat message submitter
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    // Simulate smart context answers from Globi AI pocket companion
    setTimeout(() => {
      let globiText = "That is a great travel question! In my memory grids, I recommend checking local transit timetables or looking for certified cash machines. Let me know if you need translation codes!";
      const query = textToSend.toLowerCase();

      if (query.includes('japanese') || query.includes('translate')) {
        globiText = "🇯🇵 Japanese translation: 'Sumimasen, eki wa doko desu ka?' translates directly to: 'Excuse me, where is the station?'. You can tap with any mobile card in all major train lanes here!";
      } else if (query.includes('prague') || query.includes('weather')) {
        globiText = "⛅ Prague weather update: Tomorrow is forecasted to be 18°C (64°F) with light overcast in the afternoon. Perfect for walking around the Charles Bridge! Pack a light denim jacket.";
      } else if (query.includes('london') || query.includes('transit')) {
        globiText = "🇬🇧 London Transit Guide: Yes, all London Tube channels support contactless cards. Just tap your mobile phone or card directly at the yellow turnstiles. Weekly cap is automatic!";
      } else if (query.includes('restaurant') || query.includes('food') || query.includes('kyoto')) {
        globiText = "🍣 Kyoto Culinary Insight: In Kyoto, try Gyoza Hohei in Gion for incredible dumplings, or Men-ya Inoichi for premium white-soy ramen. Be sure to arrive 15 minutes before opening!";
      } else if (query.includes('budget') || query.includes('currency')) {
        globiText = "💱 Cash vs Card Signal: Many old-school noodle bars require yen cash coins. Make sure to withdraw 10,000 yen at a local Seven-Bank terminal inside any convenience store for zero fees!";
      }

      const replyMsg = { id: Date.now() + 1, sender: 'globi', text: globiText };
      setChatMessages(prev => [...prev, replyMsg]);
      setChatLoading(false);
    }, 600);
  };

  // Filter explore hotspots based on user search
  const filteredHotspots = exploreHotspots.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    h.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="app-shell-root" className="min-h-screen bg-[#F8F9FA] text-slate-800 flex flex-col md:flex-row font-sans selection:bg-teal-primary/30 antialiased">
      
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-navy-dark text-slate-200 shrink-0 border-r border-slate-200">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-navy-light/60 flex items-center space-x-3 bg-navy-deep">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-primary to-teal-light p-0.5 shadow-md">
            <div className="w-full h-full bg-navy-dark rounded-md flex items-center justify-center">
              <Icons.Sparkles className="w-4.5 h-4.5 text-teal-primary" />
            </div>
          </div>
          <div>
            <span className="font-display text-sm font-bold tracking-tight text-white block">
              Wander<span className="text-teal-primary">Wise</span>
            </span>
            <span className="text-[8px] font-mono tracking-widest text-[#FF8E72] block uppercase font-semibold">Active Session</span>
          </div>
        </div>

        {/* User Card inside Sidebar */}
        <div className="p-5 border-b border-navy-light/40 bg-navy-dark/40 flex items-center space-x-3.5">
          <img
            src={avatars[avatarIndex]}
            alt="User avatar"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border-2 border-teal-primary/40"
          />
          <div className="truncate flex-grow">
            <div className="font-display text-xs font-bold text-white truncate">{username}</div>
            <span className="inline-flex items-center text-[9px] text-[#FF8E72] font-semibold bg-orange-400/10 px-1.5 py-0.5 rounded mt-0.5">
              {travelPersona}
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-grow p-4 space-y-1.5">
          <button
            id="tab-btn-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-teal-primary/15 to-teal-primary/5 text-teal-light border-l-4 border-teal-primary'
                : 'text-slate-400 hover:bg-navy-light/40 hover:text-white'
            }`}
          >
            <Icons.LayoutDashboard id="icon-dash" className="w-4.5 h-4.5" />
            <span>Dashboard</span>
          </button>

          <button
            id="tab-btn-trips"
            onClick={() => setActiveTab('trips')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'trips'
                ? 'bg-gradient-to-r from-teal-primary/15 to-teal-primary/5 text-teal-light border-l-4 border-teal-primary'
                : 'text-slate-400 hover:bg-navy-light/40 hover:text-white'
            }`}
          >
            <Icons.Compass id="icon-trips" className="w-4.5 h-4.5" />
            <span>Trips Planner</span>
          </button>

          <button
            id="tab-btn-explore"
            onClick={() => setActiveTab('explore')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'explore'
                ? 'bg-gradient-to-r from-teal-primary/15 to-teal-primary/5 text-teal-light border-l-4 border-teal-primary'
                : 'text-slate-400 hover:bg-navy-light/40 hover:text-white'
            }`}
          >
            <Icons.Map id="icon-explore" className="w-4.5 h-4.5" />
            <span>Explore Spots</span>
          </button>

          <button
            id="tab-btn-concierge"
            onClick={() => setActiveTab('concierge')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'concierge'
                ? 'bg-gradient-to-r from-teal-primary/15 to-teal-primary/5 text-teal-light border-l-4 border-teal-primary'
                : 'text-slate-400 hover:bg-navy-light/40 hover:text-white'
            }`}
          >
            <Icons.MessageSquareText id="icon-concierge" className="w-4.5 h-4.5" />
            <span>AI Concierge</span>
          </button>

          <button
            id="tab-btn-profile"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-teal-primary/15 to-teal-primary/5 text-teal-light border-l-4 border-teal-primary'
                : 'text-slate-400 hover:bg-navy-light/40 hover:text-white'
            }`}
          >
            <Icons.User id="icon-profile" className="w-4.5 h-4.5" />
            <span>User Profile</span>
          </button>
        </nav>

        {/* Sidebar Log Out Button */}
        <div className="p-4 border-t border-navy-light/30">
          <button
            id="btn-sidebar-logout"
            onClick={onLogOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-[#FF8E72]/10 hover:bg-[#FF8E72]/20 text-[#FF8E72] transition-colors border border-[#FF8E72]/20 cursor-pointer"
          >
            <Icons.LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* FIXED BOTTOM NAVIGATION BAR (Mobile layouts only) */}
      <nav id="mobile-tabbar" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#16162a] border-t border-navy-light/30 px-3 py-1 flex justify-around items-center h-16 shadow-2xl">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center flex-1 h-full px-1 ${
            activeTab === 'dashboard' ? 'text-teal-primary' : 'text-slate-400'
          }`}
        >
          <Icons.LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Dash</span>
        </button>

        <button
          onClick={() => setActiveTab('trips')}
          className={`flex flex-col items-center justify-center flex-1 h-full px-1 ${
            activeTab === 'trips' ? 'text-teal-primary' : 'text-slate-400'
          }`}
        >
          <Icons.Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Trips</span>
        </button>

        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center justify-center flex-1 h-full px-1 ${
            activeTab === 'explore' ? 'text-teal-primary' : 'text-slate-400'
          }`}
        >
          <Icons.Map className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Explore</span>
        </button>

        <button
          onClick={() => setActiveTab('concierge')}
          className={`flex flex-col items-center justify-center flex-1 h-full px-1 ${
            activeTab === 'concierge' ? 'text-teal-primary' : 'text-slate-400'
          }`}
        >
          <Icons.MessageSquareText className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Globi</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center flex-1 h-full px-1 ${
            activeTab === 'profile' ? 'text-teal-primary' : 'text-slate-400'
          }`}
        >
          <Icons.User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">Profile</span>
        </button>
      </nav>

      {/* CORE DISPLAY WORKSPACE WINDOW */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto mb-16 md:mb-0 max-w-7xl mx-auto w-full">
        
        {/* Workspace Upper Header Bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-200 gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 uppercase">
              {activeTab === 'dashboard' && "Voyager Dashboard"}
              {activeTab === 'trips' && "Interactive Trips Planner"}
              {activeTab === 'explore' && "Local Hotspots Finder"}
              {activeTab === 'concierge' && "Globi AI Pocket Concierge"}
              {activeTab === 'profile' && "Explorer Passport & Custom Preferences"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {activeTab === 'dashboard' && "Real-time updates for your upcoming pilgrimage to Japan."}
              {activeTab === 'trips' && "Automated route-compilers to design pristine travel matrices."}
              {activeTab === 'explore' && "Filter through secret hotspots, crowd signals, and culinary shrines."}
              {activeTab === 'concierge' && "Query live localized etiquette, translations, transit codes, or dining spots."}
              {activeTab === 'profile' && "Fine-tune your travel personality, adjust alerts, and export credentials."}
            </p>
          </div>

          {/* Quick utility date display badge */}
          <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200">
            <Icons.Calendar className="w-4.5 h-4.5 text-teal-primary" />
            <span className="text-xs font-mono font-medium text-slate-600">May 23, 2026</span>
          </div>
        </header>

        {/* TAB WORKSPACE LOGIC */}
        <div>

          {/* 1. DASHBOARD NAVIGATION VIEW */}
          {activeTab === 'dashboard' && (
            <div id="tab-dashboard" className="space-y-6">
              
              {/* Top Banner Alert (Simulated countdown) */}
              <div className="p-4 rounded-2xl bg-teal-primary/10 border border-teal-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <span className="p-2.5 rounded-xl bg-teal-primary text-navy-dark"><Icons.Calendar className="w-5 h-5" /></span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase leading-tight">Kyoto Autumn Pilgrimage</h4>
                    <span className="text-3xl font-extrabold font-display text-teal-primary block -mt-1">In 14 Days</span>
                  </div>
                </div>
                <div className="text-xs text-slate-600 leading-normal max-w-sm">
                  Smart weather models suggest heavy Kyoto maple blooms during your visit. Best transit grid: JR West Rail Pass plus local ICOCA tap-card.
                </div>
              </div>

              {/* Grid block */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Side (Large Widgets Grid: 8-cols) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Widget: Upcoming Trip Card (with interactive items) */}
                  <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-teal-primary/45 hover:border-teal-primary transition-colors">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-teal-primary uppercase tracking-wider block">UPCOMING TRIP CARD PLACEHOLDER</span>
                        <h2 className="text-lg font-bold text-slate-900 mt-0.5">Kyoto-Osaka-Nara Expedition</h2>
                        <span className="text-xs text-slate-500 mt-1 block">Oct 24 - Nov 1 (8 days) &middot; Double occupancy lodging</span>
                      </div>
                      <Icons.MapPin className="w-6 h-6 text-teal-primary" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">HOTEL COORD</span>
                        <span className="text-xs text-slate-700 font-semibold block mt-0.5">Machiya Res, Gion</span>
                      </div>
                      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">TRANSIT FLIGHT</span>
                        <span className="text-xs text-slate-700 font-semibold block mt-0.5">ANA-113 Paris to KIX</span>
                      </div>
                      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">POCKET WIFI</span>
                        <span className="text-xs text-[#14B8A6] font-semibold block mt-0.5">eSIM Registered</span>
                      </div>
                    </div>

                    {/* Interactive packing listing */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase mb-3 flex items-center gap-1.5">
                        <Icons.CheckCircle className="w-4 h-4 text-teal-primary" />
                        <span>Interactive Checklist</span>
                      </h4>
                      <div className="space-y-2.5">
                        {checklist.map((itm) => (
                          <label key={itm.id} className="flex items-center space-x-3 text-xs text-slate-600 hover:text-slate-800 transition-colors bg-slate-50 p-2.5 rounded-lg border border-slate-100 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={itm.done}
                              onChange={() => toggleCheck(itm.id)}
                              className="rounded border-slate-300 text-teal-primary focus:ring-teal-primary w-4.5 h-4.5 cursor-pointer"
                            />
                            <span className={itm.done ? 'line-through text-slate-400' : ''}>{itm.text}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Widget: Visited Places Pin Board */}
                  <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-slate-300">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">VISITED PLACES MAP PLACEHOLDER</span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">Your Explorer footprint log</h3>
                      </div>
                      <Icons.Globe className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="bg-[#1A1A2E]/5 rounded-xl border border-slate-200 relative overflow-hidden min-h-48 flex items-center justify-center p-6 text-center">
                      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,_var(--tw-gradient-stops)) from-teal-primary/10 to-transparent pointer-events-none" />
                      
                      {/* Fake stylized ASCII world pins overlay */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-teal-primary">
                          <Icons.MapPin className="w-5 h-5 animate-bounce" />
                          <span className="font-display font-black text-xl text-slate-800">12 countries pinned</span>
                        </div>
                        <p className="text-xs text-slate-500 max-w-sm">
                          Interactive GPS coordinates sync to this map when uploading passport photo blueprints or flight emails to Globi.
                        </p>
                        <div className="flex justify-center space-x-2 pt-2">
                          <span className="px-2 py-1 rounded bg-white text-[10px] font-semibold border border-slate-200">🇯🇵 Kyoto, Japan</span>
                          <span className="px-2 py-1 rounded bg-white text-[10px] font-semibold border border-slate-200">🇫🇷 Paris, France</span>
                          <span className="px-2 py-1 rounded bg-white text-[10px] font-semibold border border-slate-200">🇨🇿 Prague, Czechia</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Side (Small side columns: 4-cols) */}
                <div className="lg:col-span-4 space-y-6">

                  {/* Widget: Budget Ledger Snapshot */}
                  <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-pink-300/60 hover:border-pink-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">BUDGET SNAPSHOT PLACEHOLDER</span>
                      <Icons.Coins className="w-5 h-5 text-pink-400" />
                    </div>
                    
                    <h3 className="text-sm font-bold text-slate-900">Kyoto Pocket Budget Ring</h3>
                    
                    <div className="my-5">
                      <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                        <span>Spent ($763)</span>
                        <span>Allowance ($2,000)</span>
                      </div>
                      {/* Micro visual indicator */}
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-gradient-to-r from-teal-primary to-pink-500 h-2 rounded-full" style={{ width: '38%' }} />
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">38% allowance spent &middot; 12 expenses logged</span>
                    </div>

                    {/* Quick Add Expense inside Placeholder */}
                    <form onSubmit={handleAddExpense} className="pt-4 border-t border-slate-100 space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-600 uppercase">ADD LOCAL EXPENSE</h4>
                      <input
                        type="text"
                        placeholder="e.g., Matcha Tea Gion"
                        value={newExpenseDesc}
                        onChange={(e) => setNewExpenseDesc(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-teal-primary placeholder-slate-400 bg-slate-50"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Amt USD ($)"
                          value={newExpenseAmt}
                          onChange={(e) => setNewExpenseAmt(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-teal-primary placeholder-slate-400 bg-slate-50"
                        />
                        <select
                          value={newExpenseCat}
                          onChange={(e) => setNewExpenseCat(e.target.value)}
                          className="w-full text-xs px-1.5 py-2 rounded-lg border border-slate-200 focus:outline-hidden bg-slate-50"
                        >
                          <option>Food & Dining</option>
                          <option>Lodging</option>
                          <option>Transit</option>
                          <option>Tickets</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-[#FF8E72] hover:bg-[#FF8E72]/95 text-white font-bold text-[11px] rounded-lg tracking-wider uppercase"
                      >
                        Log instant expense
                      </button>
                    </form>

                    {/* Compact log of past expenses */}
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 max-h-40 overflow-y-auto">
                      {expenses.map((exp) => (
                        <div key={exp.id} className="flex justify-between items-center text-xs bg-slate-5/50 p-2 rounded-lg border border-slate-100">
                          <div>
                            <span className="font-semibold text-slate-800 block leading-tight">{exp.desc}</span>
                            <span className="text-[9px] text-slate-400 block">{exp.category} &middot; {exp.date}</span>
                          </div>
                          <span className="font-mono font-bold text-slate-900">${exp.amount}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Widget: Travel Persona Summary */}
                  <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-orange-300">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-2">TRAVEL PERSONA PLACEHOLDER</span>
                    <h3 className="text-sm font-bold text-slate-900">Your Current Persona Profile</h3>
                    
                    <div className="mt-4 flex items-center space-x-3 bg-orange-400/5 p-4 rounded-xl border border-orange-400/20">
                      <div className="p-2 bg-[#FF8E72]/20 rounded-lg text-[#FF8E72]"><Icons.Layers className="w-5 h-5" /></div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block leading-tight">ACTIVE TRAITS STYLE</span>
                        <span className="text-xs font-bold text-slate-700 block mt-0.5">{travelPersona}</span>
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-slate-500 mt-3 leading-normal">
                      Based on search logs, you prioritize quiet photography viewpoints, street foods, and budget-friendly train routes over crowded tourist packages. Perfect match: Kyoto/Osaka!
                    </p>
                  </div>

                  {/* Widget: Quick Action triggers */}
                  <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-slate-300">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">QUICK ACTIONS PLACEHOLDER</span>
                    <div className="grid grid-cols-1 gap-2">
                      <button onClick={() => { setActiveTab('trips'); }} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-teal-primary/5 text-xs font-semibold text-slate-700 hover:text-teal-primary border border-slate-200 hover:border-teal-primary/30 flex items-center justify-between">
                        <span>Compile New AI Itinerary</span>
                        <Icons.Compass className="w-4 h-4 text-teal-primary" />
                      </button>
                      
                      <button onClick={() => { setActiveTab('concierge'); handleSendMessage("Japanese translation station"); }} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-teal-primary/5 text-xs font-semibold text-slate-700 hover:text-teal-primary border border-slate-200 hover:border-teal-primary/30 flex items-center justify-between">
                        <span>Ask Globi for translation help</span>
                        <Icons.MessageSquareText className="w-4 h-4 text-teal-primary" />
                      </button>

                      <button onClick={() => { setActiveTab('explore'); }} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-teal-primary/5 text-xs font-semibold text-slate-700 hover:text-teal-primary border border-slate-200 hover:border-teal-primary/30 flex items-center justify-between">
                        <span>Browse Kiyomizu crowds</span>
                        <Icons.MapPin className="w-4 h-4 text-teal-primary" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* 2. TRIPS PLANNER VIEW */}
          {activeTab === 'trips' && (
            <div id="tab-trips" className="space-y-6">
              
              {/* Interactive AI Suggestion Generator module */}
              <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-dashed border-teal-primary/45">
                <span className="text-[10px] font-bold text-teal-primary uppercase tracking-wider block mb-2">AI SUGGESTED TRIP GENERATOR</span>
                
                <h3 className="text-lg font-bold text-slate-900">Assemble customized daily timetables instantly</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  Select your target cultural hotspot cluster, preferred travel speed, and click the compiler button. WanderWise processes real-time attraction ratings and transit vectors on your behalf.
                </p>

                {/* Grid Inputs selector */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">TARGET DESTINATION</label>
                    <select
                      value={selectedDest}
                      onChange={(e) => setSelectedDest(e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-teal-primary bg-slate-50 text-xs font-medium text-slate-700"
                    >
                      <option>Kyoto, Japan</option>
                      <option>Rome, Italy</option>
                      <option>Paris, France</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">COMPANION PACE</label>
                    <select
                      value={generationPace}
                      onChange={(e) => setGenerationPace(e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-teal-primary bg-slate-50 text-xs font-medium text-slate-700"
                    >
                      <option>Balanced Explorer</option>
                      <option>Slow Travel Immersive</option>
                      <option>High-Octane Blitz</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      id="btn-trigger-trip-compile"
                      onClick={triggerSimulatorPlan}
                      className="w-full py-3.5 bg-[#14B8A6] hover:bg-[#14B8A6]/95 text-white font-bold text-xs tracking-wider uppercase rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Icons.Compass className="w-4 h-4 animate-spin-slow" />
                      <span>Compile AI Itinerary Blueprint</span>
                    </button>
                  </div>
                </div>

                {/* Show simulation results */}
                <AnimatePresence mode="wait">
                  {generatedItinerary ? (
                    <motion.div
                      id="itinerary-output-box"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-6"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div>
                          <span className="text-[10px] font-extrabold text-teal-primary tracking-widest block font-mono uppercase">SYNTHESIZED ACTIVE BLUEPRINT</span>
                          <h2 className="text-lg font-bold text-slate-900 mt-1">{generatedItinerary.dest} Custom Itinerary</h2>
                        </div>
                        <span className="px-3 py-1 bg-teal-primary/10 rounded-full text-xs font-mono font-bold text-teal-light">
                          {generationPace} Style Enabled
                        </span>
                      </div>

                      {/* Days Slots */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Day 1 */}
                        <div className="space-y-3">
                          <h4 className="font-display text-sm font-black text-slate-900 border-l-4 border-[#FF8E72] pl-2 uppercase">DAY 1: EXPLORER KICKOFF</h4>
                          <div className="space-y-2">
                            {generatedItinerary.day1.map((slot, i) => (
                              <div key={i} className="p-3 bg-white border border-slate-100 rounded-lg text-xs leading-relaxed text-slate-700 flex items-start">
                                <span className="w-5 h-5 rounded bg-teal-primary/10 text-teal-light flex items-center justify-center font-bold text-[10px] shrink-0 mr-2.5 mt-0.5">
                                  {i+1}
                                </span>
                                <div>{slot}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Day 2 */}
                        <div className="space-y-3">
                          <h4 className="font-display text-sm font-black text-slate-900 border-l-4 border-teal-primary pl-2 uppercase">DAY 2: HIDDEN DECOY SITES</h4>
                          <div className="space-y-2">
                            {generatedItinerary.day2.map((slot, i) => (
                              <div key={i} className="p-3 bg-white border border-slate-100 rounded-lg text-xs leading-relaxed text-slate-700 flex items-start">
                                <span className="w-5 h-5 rounded bg-teal-primary/10 text-teal-light flex items-center justify-center font-bold text-[10px] shrink-0 mr-2.5 mt-0.5">
                                  {i+1}
                                </span>
                                <div>{slot}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs gap-3">
                        <span className="text-slate-500 font-medium">✨ Export to calendar or print PDF as required.</span>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button onClick={() => alert('WanderWise Export Simulated: PDF saved to local cache.')} className="px-3.5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1.5 flex-1 sm:flex-none">
                            <Icons.Mail className="w-4 h-4" />
                            <span>Email PDF</span>
                          </button>
                          <button onClick={() => alert('Simulated GPS Track Sync: Synchronized with Apple Maps.')} className="px-3.5 py-2.5 bg-navy-dark text-white font-bold rounded-lg hover:bg-slate-800 flex items-center justify-center gap-1.5 flex-1 sm:flex-none">
                            <Icons.Compass className="w-4 h-4" />
                            <span>Sync to GPS</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-2xl">
                      <Icons.Compass className="w-10 h-10 text-slate-400 mx-auto mb-3 animate-bounce" />
                      <h4 className="text-sm font-bold text-slate-700">Ready to synthesize</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Click compile above to watch the AI aggregate weather, culinary alerts, and transit coordinates into a high-density travel matrix.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sub features row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Destination Library Placeholder */}
                <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-orange-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#FF8E72] uppercase tracking-wider block">DESTINATION LIBRARY PLACEHOLDER</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">Custom saved guide clusters</h3>
                    </div>
                    <Icons.Layers className="w-5 h-5 text-orange-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <span className="font-bold text-slate-800 block">Kansai Region guide</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">14 places &middot; Active</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <span className="font-bold text-slate-800 block">Lazio Rome hot-sheets</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">8 places &middot; Cached</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <span className="font-bold text-slate-800 block">Parisian Patisserie maps</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">11 places &middot; Offline</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-150 text-dashed border-slate-300 flex items-center justify-center text-[11px] font-bold text-slate-500 hover:bg-slate-50 cursor-pointer">
                      + Add guide
                    </div>
                  </div>
                </div>

                {/* Trip History Placeholder */}
                <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-slate-350">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TRIP HISTORY PLACEHOLDER</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">Your past historic catalogs</h3>
                    </div>
                    <Icons.Compass className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span>🇨🇿</span>
                        <div>
                          <span className="font-semibold text-slate-800 block leading-tight">Bohemian Odyssey</span>
                          <span className="text-[9px] text-slate-400 block">Prague & Checkia &middot; April 2025</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-100">6 Days</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span>🇹🇭</span>
                        <div>
                          <span className="font-semibold text-slate-800 block leading-tight">Bangkok-Chiang Mai Expedition</span>
                          <span className="text-[9px] text-slate-400 block">Thailand &middot; Nov 2024</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-100">12 Days</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 3. EXPLORE TAB VIEW */}
          {activeTab === 'explore' && (
            <div id="tab-explore" className="space-y-6">
              
              {/* Dynamic searchable guide lists */}
              <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-teal-primary/45">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-[#14B8A6] uppercase block">TODAY'S EXPLORE PANELS PLACEHOLDER</span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">Curate popular Japanese hot-hotspots</h3>
                  </div>
                  
                  {/* Local fast inline filtering */}
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Filter spots (e.g. 'shrine')"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-teal-primary text-slate-700 placeholder-slate-400 pl-9 bg-slate-50"
                    />
                    <Icons.Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredHotspots.map((spot, i) => (
                    <motion.div
                      key={spot.name}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-xs transition-all relative group"
                    >
                      <span className="inline-block px-1.5 py-0.5 rounded bg-teal-primary/10 text-teal-light text-[9px] font-mono uppercase tracking-wider font-bold mb-2">
                        {spot.tag}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight group-hover:text-teal-primary transition-colors">{spot.name}</h4>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <span className="block text-slate-400 font-bold block uppercase">BEST TIMELINE WINDOW</span>
                          <span className="block text-slate-700 font-semibold mt-0.5">{spot.bestTime}</span>
                        </div>
                        <div>
                          <span className="block text-slate-400 font-bold block uppercase">LIVE CROWDS</span>
                          <span className="block text-slate-700 font-semibold mt-0.5">{spot.crowdCode}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {filteredHotspots.length === 0 && (
                    <div className="p-8 text-center bg-slate-100 rounded-lg col-span-3 text-xs text-slate-500">
                      No matching Kyoto hotspots found. Try searching 'Temple' or 'market'.
                    </div>
                  )}
                </div>
              </div>

              {/* Grid block for details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Budget Ring progress details */}
                <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-red-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">BUDGET RING VISUAL PLACEHOLDER</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">Itinerary Limit rings</h3>
                    </div>
                    <Icons.Coins className="w-5 h-5 text-red-400" />
                  </div>

                  {/* SVG circular bar representation */}
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#FF8E72]"
                          strokeDasharray="68, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="block text-lg font-extrabold font-display leading-none text-slate-800">$1,360</span>
                        <span className="text-[8px] text-slate-400 font-bold uppercase leading-none block mt-1">OF $2,000 CAP</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 text-center mt-3 leading-normal max-w-xs">
                      Accommodation ($480) consumes 35% of total budget slots. Transport counts as 15%. Dining counts as 18%.
                    </p>
                  </div>
                </div>

                {/* Today's Itinerary Slots Placeholder */}
                <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-orange-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block">TODAY'S ITINERARY SLOTS PLACEHOLDER</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">May 23 Schedule slots</h3>
                    </div>
                    <Icons.Calendar className="w-5 h-5 text-orange-400" />
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <span className="font-mono text-[9px] text-[#14B8A6] font-bold block">09:00 AM — LOCAL SHUTTLE TIME</span>
                      <span className="font-semibold text-slate-800">JR Express Osaka line</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                      <span className="font-mono text-[9px] text-[#FF8E72] font-bold block">12:30 PM — DINING TIME SLOT</span>
                      <span className="font-semibold text-slate-800">Nishiki Bento sampling tour</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-105 text-dashed border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-500 py-3 block hover:bg-slate-50 cursor-pointer">
                      + Insert new daily slot
                    </div>
                  </div>
                </div>

                {/* Quick Facts Panel Placeholder */}
                <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-slate-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">QUICK FACTS PANEL PLACEHOLDER</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">Kyoto General Guidelines</h3>
                    </div>
                    <Icons.Info className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="space-y-3 text-xs leading-normal text-slate-600">
                    <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-lg">🚭</span>
                      <div>
                        <span className="font-bold text-slate-800 block leading-tight">No Smoking on Streets</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">Kyoto municipal penalties apply inside Gion of 2,000 Yen. Use designated bars.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-lg">💡</span>
                      <div>
                        <span className="font-bold text-slate-800 block leading-tight">Cash ATM Zero-fees</span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">7-Eleven machines have zero debit fees. Make sure to tap 'Yen checkout' when using card.</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 4. AI CONCIERGE CHAT TAB */}
          {activeTab === 'concierge' && (
            <div id="tab-concierge" className="space-y-6">
              
              {/* Pocket simulation showing Globi assistant bot interactions */}
              <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-teal-primary/45 overflow-hidden flex flex-col min-h-[480px]">
                
                {/* Concierge Header banner info */}
                <div className="bg-navy-dark text-slate-100 p-5 flex items-center justify-between border-b border-navy-light/45">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-teal-primary/20 flex items-center justify-center border border-teal-primary/50 relative">
                      <Icons.MessageSquareText className="w-5 h-5 text-teal-primary" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-teal-light border-2 border-navy-dark animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold font-display leading-tight text-white">Globi Pocket Travel Concierge</h3>
                      <span className="text-[10px] font-mono tracking-widest text-[#FF8E72] block uppercase font-semibold">GLOBI CHAT SIMULATOR ACTIVE</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">Avg AI reply speed: &lt; 1s</span>
                </div>

                {/* Conversation Body Logs scroll area */}
                <div className="flex-grow p-4 sm:p-5 bg-slate-50/50 space-y-4 overflow-y-auto max-h-96">
                  {chatMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start max-w-lg space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                          msg.sender === 'user' 
                            ? 'bg-slate-200 text-slate-700 border-slate-300' 
                            : 'bg-teal-primary/10 text-teal-light border-teal-primary/30'
                        }`}>
                          {msg.sender === 'user' ? <Icons.User className="w-4 h-4" /> : <Icons.Sparkles className="w-4.5 h-4.5" />}
                        </div>

                        {/* Speech Bubble */}
                        <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-navy-dark text-slate-100 rounded-tr-none'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>

                      </div>
                    </motion.div>
                  ))}

                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start max-w-lg space-x-3">
                        <div className="w-8 h-8 rounded-full bg-teal-primary/10 text-teal-light border border-teal-primary/30 flex items-center justify-center animate-spin">
                          <Icons.Sparkles className="w-4.5 h-4.5" />
                        </div>
                        <div className="p-3 bg-white text-slate-400 border border-slate-200 rounded-2xl rounded-tl-none text-xs italic flex items-center space-x-1.5 shadow-xs">
                          <span>Globi is reading coordinates...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Pre filled prompt suggestions helper shortcuts */}
                <div className="bg-slate-100/50 px-5 py-3 border-t border-slate-200 flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mr-1">Tap a quick prompt snippet:</span>
                  <button onClick={() => handleSendMessage("Japanese translation for station")} className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-teal-primary/10 border border-slate-200 text-[10px] font-medium text-slate-700 hover:text-teal-primary transition-all">
                    🇯🇵 Translate station in Tokyo
                  </button>
                  <button onClick={() => handleSendMessage("Prague weather warning tomorrow")} className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-teal-primary/10 border border-slate-200 text-[10px] font-medium text-slate-700 hover:text-teal-primary transition-all">
                    ⛅ Prague weather details
                  </button>
                  <button onClick={() => handleSendMessage("London underground card tapping regulations")} className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-teal-primary/10 border border-slate-200 text-[10px] font-medium text-slate-700 hover:text-teal-primary transition-all">
                    🇬🇧 London tube card pay tips
                  </button>
                  <button onClick={() => handleSendMessage("Authentic local restaurants suggestions in Kyoto")} className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-teal-primary/10 border border-slate-200 text-[10px] font-medium text-slate-700 hover:text-teal-primary transition-all">
                    🍣 Local Kyoto Izakaya food spots
                  </button>
                </div>

                {/* Active Chat Input Bar container */}
                <div className="p-4 border-t border-slate-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Ask Globi about transit rules, translations, ATMs..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(chatInput); }}
                      className="flex-grow text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-teal-primary placeholder-slate-400 text-slate-800 bg-slate-50"
                    />
                    <button
                      id="btn-chat-send"
                      onClick={() => handleSendMessage(chatInput)}
                      className="p-3 rounded-xl bg-teal-primary text-[#1A1A2E] hover:bg-teal-light hover:shadow-md transition-all cursor-pointer shrink-0"
                    >
                      <Icons.Send className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">💡 Real natural-language responses return localized details. Type something!</span>
                </div>

              </div>

            </div>
          )}

          {/* 5. USER PROFILE TAB VIEW */}
          {activeTab === 'profile' && (
            <div id="tab-profile" className="space-y-6">
              
              <div className="bg-white rounded-xl shadow-xs p-6 border-2 border-dashed border-teal-primary/45">
                <span className="text-[10px] font-bold text-teal-primary uppercase tracking-wider block mb-3">WORKSPACE PROFILE PASSPORT</span>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Visual Passport Image */}
                  <div className="md:col-span-4 bg-navy-dark text-slate-100 rounded-2xl p-6 border border-slate-700 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-[#FF8E72]/15 blur-2xl" />
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal-primary/10 blur-2xl" />

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <img
                        src={avatars[avatarIndex]}
                        alt="Profile zoom size"
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 rounded-full object-cover border-4 border-teal-primary/60 shadow-lg mb-4"
                      />

                      {/* Avatar Cycler */}
                      <div className="flex space-x-2 mb-4">
                        {avatars.map((av, index) => (
                          <button
                            key={index}
                            onClick={() => setAvatarIndex(index)}
                            className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${
                              avatarIndex === index ? 'border-teal-primary scale-110 shadow-md' : 'border-slate-600 opacity-60'
                            }`}
                          >
                            <img src={av} alt="mini" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>

                      <h3 className="text-base font-bold font-display text-white leading-tight uppercase tracking-wide">{username}</h3>
                      <span className="inline-flex mt-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-bold bg-teal-primary/25 border border-teal-primary/45 text-teal-light uppercase mb-6 shadow-sm">
                        {travelPersona}
                      </span>

                      {/* Fake stylized stamps */}
                      <div className="border-t border-navy-light/40 pt-4 w-full text-left space-y-2">
                        <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">VIRTUAL STAMPS RECORDED:</span>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-[10px] font-bold border border-slate-700 text-slate-300">🇯🇵 KIX-IN</span>
                          <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-[10px] font-bold border border-slate-700 text-slate-300">🇫🇷 ORY-OUT</span>
                          <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-[10px] font-bold border border-slate-700 text-slate-400">🏁 NOMAD-1</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Edit forms */}
                  <div className="md:col-span-8 space-y-6 text-left">
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">FULL NAME / NOM DE VOYAGER</label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-teal-primary bg-slate-50 text-slate-800 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">TRAVEL STYLE PERSONA SELECTOR</label>
                        <select
                          value={travelPersona}
                          onChange={(e) => setTravelPersona(e.target.value)}
                          className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-teal-primary bg-slate-50 text-slate-800 font-semibold"
                        >
                          <option>Scenic Backpacker</option>
                          <option>Gastronomy Hunter</option>
                          <option>Slow Travel Immersive</option>
                          <option>Luxury Resort Collector</option>
                        </select>
                        <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
                          Adjusting your travel style dynamically changes Globi's recommended meal points, transit thresholds, and checkpoint highlights.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            try {
                              const stored = localStorage.getItem('userProfile');
                              const profileObj = stored ? JSON.parse(stored) : {};
                              profileObj.name = username;
                              profileObj.travelPersona = travelPersona;
                              localStorage.setItem('userProfile', JSON.stringify(profileObj));
                              alert('Preferences Saved! Your AI models have rebuilt parameters.');
                            } catch (e) {
                              console.error(e);
                              alert('Could not persist edits to browser database.');
                            }
                          }}
                          className="px-5 py-3 rounded-lg bg-teal-primary text-[#1A1A2E] font-bold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 hover:shadow-md transition-all cursor-pointer"
                        >
                          <Icons.CheckCircle className="w-4 h-4" />
                          <span>Commit Preferences</span>
                        </button>
                      </div>
                    </form>

                    {/* Quick alert notifications simulation info */}
                    <div className="p-4 rounded-xl border border-orange-400/20 bg-orange-400/5 text-xs text-slate-600 leading-normal">
                      <h4 className="font-bold text-[#FF8E72] flex items-center gap-1 mb-1 font-display">
                        <Icons.Bell className="w-4.5 h-4.5" />
                        <span>Active Safety Signal (Kyoto Area)</span>
                      </h4>
                      Aviation networks suggest increased winds on Kansai Coastal rails tomorrow evening. Allow extra 35 minutes for bullet shifts.
                    </div>

                  </div>

                </div>
              </div>

              {/* Log out backup button */}
              <div className="flex justify-end pt-4">
                <button
                  id="btn-footer-logout"
                  onClick={onLogOut}
                  className="px-6 py-3 bg-red-100 hover:bg-red-200 hover:text-red-800 text-red-700 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border border-red-200 cursor-pointer"
                >
                  <Icons.LogOut className="w-4.5 h-4.5" />
                  <span>Exit Session & Back to Landing</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}
