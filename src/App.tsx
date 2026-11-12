import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Play, 
  Sparkles, 
  Check, 
  Code2, 
  ExternalLink,
  ChevronRight,
  Shield,
  FileText
} from 'lucide-react';
import { AGENCY_SERVICES, FEATURED_PROJECTS, ServiceItem, ProjectItem } from './data/agencyData';
import { ShowreelModal } from './components/ShowreelModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { ServiceDrawer } from './components/ServiceDrawer';
import { Fluid3DCard } from './components/Fluid3DCard';

export default function App() {
  // Modal states
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryPreselectService, setInquiryPreselectService] = useState<string | undefined>(undefined);
  const [selectedServiceDrawer, setSelectedServiceDrawer] = useState<ServiceItem | null>(null);

  // Section interactive filters
  const [activeServiceCategory, setActiveServiceCategory] = useState<'all' | 'design' | 'dev' | 'marketing' | 'perf'>('design');
  const [highlightedServiceId, setHighlightedServiceId] = useState<string>('high-end-design');
  const [activeWorkFilter, setActiveWorkFilter] = useState<'all' | 'fintech' | 'fashion' | 'web3'>('all');

  // Legal modal state
  const [legalModalContent, setLegalModalContent] = useState<{ title: string; body: string } | null>(null);

  // Filtered lists
  const filteredServices = AGENCY_SERVICES.filter((s) => {
    if (activeServiceCategory === 'all') return true;
    return s.category === activeServiceCategory;
  });

  const filteredProjects = FEATURED_PROJECTS.filter((p) => {
    if (activeWorkFilter === 'all') return true;
    return p.filterCategory === activeWorkFilter;
  });

  const openInquiry = (serviceName?: string) => {
    setInquiryPreselectService(serviceName);
    setIsInquiryOpen(true);
  };

  const currentHighlightedService = AGENCY_SERVICES.find(s => s.id === highlightedServiceId) || AGENCY_SERVICES[2];

  return (
    <div className="min-h-screen bg-[#0d0e11] text-[#f3f4f6] font-sans-clean antialiased selection:bg-[#d8ff06] selection:text-black">
      
      {/* =========================================================================
          SECTION 1: HERO HEADER (Acid Yellow / Neon Green Top Block)
          ========================================================================= */}
      <header className="bg-[#d8ff06] text-black rounded-b-[36px] sm:rounded-b-[48px] px-4 sm:px-8 pt-6 pb-12 sm:pb-16 relative shadow-[0_20px_50px_rgba(216,255,6,0.12)]">
        <div className="max-w-[1360px] mx-auto">
          
          {/* Top Bar: Clean 3-zone Top Bar Contract */}
          <nav className="flex items-center justify-between gap-8 mb-10 sm:mb-14 font-sans-clean" aria-label="Main Navigation">
            {/* Zone 1: Single brand wordmark */}
            <a 
              href="/" 
              className="font-display text-2xl sm:text-3xl font-black tracking-tight uppercase whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
            >
              Nexo Code
            </a>

            {/* Zone 2: 4 single-line nav links */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight">
              <li>
                <a href="#about" className="hover:opacity-60 transition-opacity whitespace-nowrap">About Us</a>
              </li>
              <li>
                <a href="#projects" className="hover:opacity-60 transition-opacity whitespace-nowrap">Projects</a>
              </li>
              <li>
                <a href="#services" className="hover:opacity-60 transition-opacity whitespace-nowrap">Services</a>
              </li>
            </ul>

            {/* Zone 3: Primary Action */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => openInquiry()}
                className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm font-bold transition-transform hover:scale-105 whitespace-nowrap"
              >
                Let&apos;s Talk
              </button>
            </div>
          </nav>

          {/* Headline + Paragraph Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8">
            
            {/* Main Headline */}
            <div className="lg:col-span-8">
              <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-[0.88] uppercase select-none">
                CRAFTING<br />DIGITAL
              </h1>
            </div>

            {/* Right side of headline: descriptive paragraph */}
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-black/85 max-w-md">
                We engineer high-end websites, custom e-commerce storefronts, and interactive web applications for brands that refuse to blend in. One pixel at a time.
              </p>
            </div>

          </div>

          {/* Pill Outline Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-10">
            <div className="px-4 py-1.5 rounded-full border border-black/70 text-xs sm:text-sm font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span>2026 Best Agency</span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-black/70 text-xs sm:text-sm font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span>Premium Web Dev</span>
            </div>
            <div className="px-4 py-1.5 rounded-full border border-black/70 text-xs sm:text-sm font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span>Interactive Experiences</span>
            </div>
          </div>

          {/* Hero Visual Card: Interactive 3D WebGL Fluid Component (Simplex Noise + Custom Shader + GSAP Parallax) */}
          <div className="flex justify-center w-full">
            <Fluid3DCard 
              onCornerClick={() => {
                const proj = FEATURED_PROJECTS[3]; // Aura Spatial OS
                setSelectedCaseStudy(proj);
              }}
            />
          </div>

        </div>
      </header>

      {/* =========================================================================
          SECTION 2: MARQUEE TAPE (Continuous Thin Horizontal Band)
          ========================================================================= */}
      <section className="bg-black py-4 sm:py-5 border-y border-[#24262f] overflow-hidden select-none" aria-hidden="true">
        <div className="flex animate-marquee">
          <div className="flex items-center gap-8 font-display text-xl sm:text-2xl font-black text-[#d8ff06] uppercase tracking-wider whitespace-nowrap pr-8">
            <span>NEXO CODE</span>
            <span className="text-white">+</span>
            <span>INTERACTIVE WEB EXPERIENCES</span>
            <span className="text-white">+</span>
            <span>HIGH-END E-COMMERCE</span>
            <span className="text-white">+</span>
            <span>NEXO CODE</span>
            <span className="text-white">+</span>
            <span>INTERACTIVE WEB EXPERIENCES</span>
            <span className="text-white">+</span>
            <span>HIGH-END E-COMMERCE</span>
            <span className="text-white">+</span>
          </div>
          <div className="flex items-center gap-8 font-display text-xl sm:text-2xl font-black text-[#d8ff06] uppercase tracking-wider whitespace-nowrap pr-8">
            <span>NEXO CODE</span>
            <span className="text-white">+</span>
            <span>INTERACTIVE WEB EXPERIENCES</span>
            <span className="text-white">+</span>
            <span>HIGH-END E-COMMERCE</span>
            <span className="text-white">+</span>
            <span>NEXO CODE</span>
            <span className="text-white">+</span>
            <span>INTERACTIVE WEB EXPERIENCES</span>
            <span className="text-white">+</span>
            <span>HIGH-END E-COMMERCE</span>
            <span className="text-white">+</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SERVICES (OUR EXPERTISE)
          ========================================================================= */}
      <section id="services" className="py-20 sm:py-28 max-w-[1360px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#22242f] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase">
                OUR EXPERTISE
              </h2>
              <span className="w-3.5 h-3.5 rounded-full bg-[#d8ff06] inline-block" />
            </div>
            <p className="text-sm sm:text-base text-[#838799] max-w-xl font-sans-clean mt-2">
              Every brand needs a unique digital architecture. Explore our capabilities and discover how we build scalable solutions tailored to your vision.
            </p>
          </div>

          {/* Category Filter Pills (Functional Buttons) */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Service categories">
            {[
              { id: 'design', label: '● Design' },
              { id: 'dev', label: 'Development' },
              { id: 'marketing', label: 'Digital Marketing' },
              { id: 'perf', label: 'SEO & Perf' }
            ].map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeServiceCategory === cat.id}
                onClick={() => setActiveServiceCategory(cat.id as 'all' | 'design' | 'dev' | 'marketing' | 'perf')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  activeServiceCategory === cat.id
                    ? 'border-[#d8ff06] text-[#d8ff06] bg-[#d8ff06]/10'
                    : 'border-[#24262f] text-[#838799] hover:text-white hover:border-[#383b49]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Vertical List with Highlighted Active State */}
        <div className="flex flex-col divide-y divide-[#22242f] border-b border-[#22242f]">
          {filteredServices.map((service) => {
            const isHighlighted = highlightedServiceId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHighlightedServiceId(service.id)}
                onClick={() => setSelectedServiceDrawer(service)}
                className={`group py-7 sm:py-9 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-all duration-300 rounded-2xl ${
                  isHighlighted 
                    ? 'bg-[#14151b] shadow-2xl scale-[1.008]' 
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Service Name */}
                <div className="flex items-center gap-4">
                  <span className={`font-display font-bold text-2xl sm:text-4xl md:text-5xl transition-colors ${
                    isHighlighted ? 'text-white' : 'text-[#6a6f82] group-hover:text-neutral-300'
                  }`}>
                    {service.name}
                  </span>
                  {isHighlighted && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d8ff06] shrink-0" />
                  )}
                </div>

                {/* Right Group: Thumbnail + Neon button or standard arrow */}
                <div className="flex items-center gap-5 self-end md:self-auto">
                  {isHighlighted ? (
                    <div className="flex items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
                      {/* Square thumbnail preview */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-[#2b2d38] shadow-lg shrink-0">
                        <img 
                          src={service.thumbnail} 
                          alt={service.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Neon Green square button with arrow */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedServiceDrawer(service);
                        }}
                        className="w-14 h-14 rounded-xl bg-[#d8ff06] text-black flex items-center justify-center text-2xl font-black shadow-lg hover:scale-105 transition-transform"
                        aria-label={`View details for ${service.name}`}
                      >
                        <ArrowUpRight size={24} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full border border-[#2b2d38] flex items-center justify-center text-[#55596b] group-hover:text-white group-hover:border-[#d8ff06] transition-colors">
                      <ArrowUpRight size={20} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick helper note */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#838799] px-2 font-mono">
          <span>* Click any service to inspect detailed deliverables & engineering stack</span>
          <span className="hidden sm:inline">Active: {currentHighlightedService.name}</span>
        </div>

      </section>

      {/* =========================================================================
          SECTION 4: IMPACT TEXT BLOCK (Dark Gray Box with Bold Mixed Typography)
          ========================================================================= */}
      <section id="about" className="py-12 sm:py-20 max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="bg-[#15161b] border border-[#24262f] rounded-3xl sm:rounded-[40px] p-8 sm:p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle brutalist grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#24262f_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          <p className="relative font-display font-black text-2xl sm:text-4xl md:text-6xl text-white uppercase tracking-tight leading-[1.25] max-w-5xl mx-auto">
            A PREMIUM DIGITAL
            <span className="inline-flex items-center align-middle mx-2 sm:mx-3 px-3 py-1 rounded-full bg-[#232530] text-[#d8ff06] text-xs sm:text-sm font-mono tracking-widest border border-[#353849]">
              ✦ 2026 ARCHITECTURE
            </span>
            PRESENCE IS THE 
            <span className="inline-flex items-center justify-center align-middle mx-2 sm:mx-3 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-[#d8ff06] text-black">
              <ArrowUpRight size={20} />
            </span>
            DIFFERENCE BETWEEN BEING SEEN AND BEING REMEMBERED
          </p>

          <div className="relative mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-mono text-[#838799]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d8ff06]" />
              SUB-SECOND LATENCY
            </span>
            <span>·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d8ff06]" />
              THREE.JS SHADERS
            </span>
            <span>·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d8ff06]" />
              HIGH-CONVERSION COMMERCE
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FEATURED WORK GRID (Masonry Layout with Monochromatic Renders)
          ========================================================================= */}
      <section id="projects" className="py-20 sm:py-28 max-w-[1360px] mx-auto px-4 sm:px-8">
        
        {/* Header split */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#22242f] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase">
                FEATURED WORK
              </h2>
              <span className="w-3.5 h-3.5 rounded-full bg-[#d8ff06] inline-block" />
            </div>
            <p className="text-sm sm:text-base text-[#838799] max-w-xl font-sans-clean mt-2">
              Creating fluid design & cutting-edge web infrastructure for global innovators.
            </p>
          </div>

          {/* Work Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Work filters">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'fintech', label: 'Fintech' },
              { id: 'fashion', label: 'Luxury Fashion' },
              { id: 'web3', label: 'Web3 & AI' }
            ].map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeWorkFilter === f.id}
                onClick={() => setActiveWorkFilter(f.id as 'all' | 'fintech' | 'fashion' | 'web3')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  activeWorkFilter === f.id
                    ? 'border-[#d8ff06] text-[#d8ff06] bg-[#d8ff06]/10'
                    : 'border-[#24262f] text-[#838799] hover:text-white hover:border-[#383b49]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid of project thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project) => {
            const isHighlight = project.isHighlight;

            return (
              <div
                key={project.id}
                onClick={() => setSelectedCaseStudy(project)}
                className={`${project.colSpan} group relative bg-[#15161b] rounded-3xl overflow-hidden border border-[#24262f] cursor-pointer shadow-lg hover:border-[#3d4152] transition-all duration-300 aspect-[16/11] sm:aspect-auto sm:min-h-[380px] flex flex-col justify-between`}
              >
                {/* Background Image Container */}
                <div className="absolute inset-0 overflow-hidden bg-black">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      isHighlight 
                        ? 'opacity-85 filter contrast-105' 
                        : 'filter grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-90'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="relative p-6 flex justify-between items-start z-10">
                  <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#d8ff06] border border-white/10">
                    {project.year}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative p-6 sm:p-7 flex items-end justify-between gap-4 z-10">
                  <div>
                    <span className="text-xs uppercase font-mono text-neutral-400 block mb-1">
                      {project.client}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-[#d8ff06] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Arrow Button */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 transition-transform group-hover:scale-110 ${
                    isHighlight 
                      ? 'bg-[#d8ff06] text-black shadow-[0_0_20px_rgba(216,255,6,0.4)]' 
                      : 'bg-black/80 text-white border border-white/20 group-hover:bg-[#d8ff06] group-hover:text-black group-hover:border-transparent'
                  }`}>
                    <ArrowUpRight size={22} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 6: CALL TO ACTION & FOOTER
          ========================================================================= */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-[1400px] mx-auto">
        <div className="bg-[#d8ff06] text-black rounded-[36px] sm:rounded-[48px] p-10 sm:p-20 text-center flex flex-col items-center justify-center gap-8 sm:gap-10 shadow-2xl relative overflow-hidden">
          
          {/* Decorative dots */}
          <div className="flex items-center gap-3 opacity-60">
            <span className="w-2.5 h-2.5 rounded-full bg-black" />
            <span className="w-2.5 h-2.5 rounded-full bg-black" />
            <span className="w-2.5 h-2.5 rounded-full bg-black" />
          </div>

          {/* Massive CTA Text */}
          <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.92] max-w-4xl">
            LET&apos;S BUILD SOMETHING EXCEPTIONAL
          </h2>

          <p className="text-sm sm:text-base font-semibold max-w-xl text-black/80 font-sans-clean">
            We are currently accepting flagship projects for Q2 & Q3 2026. Transmit your vision or explore our interactive prototypes.
          </p>

          {/* Two dark pill-shaped buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openInquiry()}
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-black text-white hover:bg-neutral-800 font-display font-bold text-sm tracking-wider uppercase transition-transform hover:scale-105 shadow-xl cursor-pointer"
            >
              [ START A PROJECT ]
            </button>

            <a
              href="#projects"
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-transparent text-black border-2 border-black/80 hover:bg-black/10 font-display font-bold text-sm tracking-wider uppercase transition-transform hover:scale-105 cursor-pointer"
            >
              [ VIEW PROTOTYPES ]
            </a>
          </div>

        </div>
      </section>

      {/* Site Footer */}
      <footer className="py-12 sm:py-16 max-w-[1360px] mx-auto px-4 sm:px-8 border-t border-[#1c1d25]">
        <div className="flex flex-col items-center text-center">
          
          {/* Nexo Code Wordmark in Neon Green */}
          <a 
            href="#" 
            className="font-display text-3xl sm:text-4xl font-black text-[#d8ff06] tracking-tight uppercase mb-8 hover:opacity-80 transition-opacity"
          >
            Nexo Code
          </a>

          {/* Footer Bar Links */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#838799] pt-6 border-t border-[#1c1d25]">
            <button
              onClick={() => setLegalModalContent({
                title: 'Terms & Agreements',
                body: 'All engineering, design assets, and proprietary shaders delivered by Nexo Code are protected under international intellectual property frameworks. Client agreements stipulate custom milestone deliverables, rigorous security auditing, and SLA uptime commitments.'
              })}
              className="hover:text-white transition-colors uppercase tracking-wider"
            >
              TERMS &amp; AGREEMENTS
            </button>

            <span className="text-neutral-500">
              &copy;2026 NEXO CODE. ALL RIGHTS RESERVED
            </span>

            <button
              onClick={() => setLegalModalContent({
                title: 'Privacy Policy',
                body: 'Nexo Code strictly adheres to privacy-by-design principles. We do not sell or monetize client inquiry data. All confidential project briefs and technical specifications submitted via our planner are encrypted and protected by strict non-disclosure obligations.'
              })}
              className="hover:text-white transition-colors uppercase tracking-wider"
            >
              PRIVACY POLICY
            </button>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE MODALS & DRAWERS
          ========================================================================= */}
      <ShowreelModal 
        isOpen={isShowreelOpen} 
        onClose={() => setIsShowreelOpen(false)} 
      />

      <CaseStudyModal 
        project={selectedCaseStudy} 
        onClose={() => setSelectedCaseStudy(null)} 
        onOpenInquiry={(srv) => openInquiry(srv)}
      />

      <ProjectInquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        preselectedService={inquiryPreselectService}
      />

      <ServiceDrawer 
        service={selectedServiceDrawer} 
        onClose={() => setSelectedServiceDrawer(null)} 
        onSelectServiceForInquiry={(srv) => openInquiry(srv)}
      />

      {/* Legal Modal */}
      {legalModalContent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#14151b] border border-[#262835] rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#242633] pb-4">
              <h3 className="font-display font-bold text-lg text-white">{legalModalContent.title}</h3>
              <button 
                onClick={() => setLegalModalContent(null)}
                className="text-[#838799] hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-neutral-300 font-sans-clean leading-relaxed">
              {legalModalContent.body}
            </p>
            <button
              onClick={() => setLegalModalContent(null)}
              className="w-full py-2.5 rounded-xl bg-[#d8ff06] text-black font-bold text-xs uppercase"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
