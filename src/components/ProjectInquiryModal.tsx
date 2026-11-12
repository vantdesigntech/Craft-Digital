import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Send, Sparkles, Building2, Mail, User, ShieldCheck } from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : ['High-End Web Design']
  );
  const [budget, setBudget] = useState<string>('$30k - $75k');
  const [timeline, setTimeline] = useState<string>('2 - 3 Months');
  const [companyName, setCompanyName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [brief, setBrief] = useState<string>('');
  const [refId, setRefId] = useState<string>('');

  const servicesList = [
    'Interactive Web Apps',
    'Custom E-Commerce',
    'High-End Web Design',
    'UI/UX Architecture',
    'WebGL & 3D Shaders',
    'Design System & Branding'
  ];

  const budgetTiers = [
    { label: '$15k - $30k', sub: 'Targeted single-surface sprint' },
    { label: '$30k - $75k', sub: 'Complete flagship & custom build' },
    { label: '$75k - $150k', sub: 'Full platform & 3D WebGL experiences' },
    { label: '$150k+', sub: 'Enterprise ongoing retainer' }
  ];

  const timelineOptions = ['Within 1 Month', '2 - 3 Months', '3 - 6 Months', 'Flexible / R&D'];

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleNext = () => {
    if (step === 3) {
      if (!email.trim() || !companyName.trim()) return;
      setRefId(`NX-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(4);
    } else {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handlePrev = () => {
    setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedServices(['High-End Web Design']);
    setBudget('$30k - $75k');
    setTimeline('2 - 3 Months');
    setCompanyName('');
    setClientName('');
    setEmail('');
    setBrief('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      <div className="relative w-full max-w-2xl bg-[#121319] border border-[#2b2e3b] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#242633] bg-[#161720]">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#d8ff06] flex items-center gap-1.5">
              <Sparkles size={12} /> NEXO CODE // PROJECT PLANNER
            </span>
            <h2 id="inquiry-title" className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {step === 4 ? 'Brief Received' : "Let's Build Something Exceptional"}
            </h2>
          </div>

          <button 
            onClick={resetForm}
            className="w-9 h-9 rounded-full bg-[#1f212a] hover:bg-[#d8ff06] hover:text-black text-white flex items-center justify-center transition-colors"
            aria-label="Close Project Planner"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step indicator */}
        {step < 4 && (
          <div className="grid grid-cols-3 border-b border-[#242633] bg-[#14151c]">
            {[
              { num: 1, title: 'Services' },
              { num: 2, title: 'Scope & Budget' },
              { num: 3, title: 'Brand Details' }
            ].map((s) => (
              <div 
                key={s.num}
                className={`py-2.5 px-4 text-center border-b-2 text-xs font-mono transition-colors ${
                  step === s.num 
                    ? 'border-[#d8ff06] text-[#d8ff06] font-bold bg-[#d8ff06]/5' 
                    : step > s.num 
                    ? 'border-neutral-500 text-white font-semibold' 
                    : 'border-transparent text-neutral-500'
                }`}
              >
                <span>0{s.num}. {s.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Services */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-display font-bold text-lg text-white">What capabilities are required?</h3>
                <p className="text-xs sm:text-sm text-[#838799] mt-1 font-sans-clean">
                  Select all disciplines that apply to your product vision.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {servicesList.map((srv) => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                        isChecked 
                          ? 'border-[#d8ff06] bg-[#d8ff06]/10 text-white shadow-[0_0_15px_rgba(216,255,6,0.1)]' 
                          : 'border-[#262936] bg-[#171821] text-neutral-300 hover:border-[#3d4255]'
                      }`}
                    >
                      <span>{srv}</span>
                      <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-[#d8ff06] border-[#d8ff06] text-black' : 'border-[#3d4255]'
                      }`}>
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Scope & Budget */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Target Investment Bracket</h3>
                <p className="text-xs sm:text-sm text-[#838799] mt-1 font-sans-clean">
                  Realistic budgets allow us to calibrate technical architecture and timeline.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {budgetTiers.map((b) => {
                  const isCurrent = budget === b.label;
                  return (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => setBudget(b.label)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isCurrent 
                          ? 'border-[#d8ff06] bg-[#d8ff06]/10 text-white shadow-[0_0_15px_rgba(216,255,6,0.1)]' 
                          : 'border-[#262936] bg-[#171821] text-neutral-300 hover:border-[#3d4255]'
                      }`}
                    >
                      <div className="font-display font-black text-lg text-white">{b.label}</div>
                      <div className="text-xs text-[#838799] mt-0.5">{b.sub}</div>
                    </button>
                  );
                })}
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-white mb-2.5">Desired Launch Horizon</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTimeline(t)}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors ${
                        timeline === t 
                          ? 'border-[#d8ff06] bg-[#d8ff06] text-black font-bold' 
                          : 'border-[#262936] bg-[#171821] text-neutral-300 hover:border-[#3d4255]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Brand Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Brand & Contact Info</h3>
                <p className="text-xs sm:text-sm text-[#838799] mt-1 font-sans-clean">
                  Where should our lead architect transmit the proposal?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Company / Brand *</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Atelier Kroma"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-[#171821] border border-[#2b2e3b] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#d8ff06]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Your Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="text" 
                      placeholder="e.g. Marc Jacobs"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#171821] border border-[#2b2e3b] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#d8ff06]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Work Email *</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="email" 
                    required
                    placeholder="architect@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#171821] border border-[#2b2e3b] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#d8ff06]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">Project Objective / Scope Notes</label>
                <textarea 
                  rows={3}
                  placeholder="Outline your ambition, timeline constraints, or existing codebase..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full bg-[#171821] border border-[#2b2e3b] rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#d8ff06]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck size={14} className="text-[#d8ff06]" />
                <span>NDA protected. We reply within 12 business hours.</span>
              </div>
            </div>
          )}

          {/* STEP 4: Success / Confirmation */}
          {step === 4 && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#d8ff06] text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(216,255,6,0.3)]">
                <Check size={32} strokeWidth={3} />
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl text-white">PROJECT DOSSIER GENERATED</h3>
                <p className="text-sm text-neutral-300 mt-2 font-sans-clean max-w-md mx-auto">
                  Thank you, <span className="text-white font-semibold">{clientName || 'Partner'}</span>. Our technical director has queued your brief for immediate architectural review.
                </p>
              </div>

              <div className="p-4 bg-[#181a24] border border-[#2c2f3d] rounded-2xl max-w-md mx-auto text-left font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-[#262836] pb-2">
                  <span className="text-[#838799]">Reference Code:</span>
                  <span className="text-[#d8ff06] font-bold">{refId}</span>
                </div>
                <div className="flex justify-between border-b border-[#262836] pb-2">
                  <span className="text-[#838799]">Brand:</span>
                  <span className="text-white">{companyName}</span>
                </div>
                <div className="flex justify-between border-b border-[#262836] pb-2">
                  <span className="text-[#838799]">Target Investment:</span>
                  <span className="text-[#d8ff06]">{budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#838799]">Turnaround SLA:</span>
                  <span className="text-white">Under 12h via {email}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3 rounded-full bg-[#d8ff06] text-black font-display font-bold text-sm hover:bg-[#b8db00] transition-colors"
              >
                RETURN TO NEXO CODE
              </button>
            </div>
          )}

        </div>

        {/* Modal footer navigation */}
        {step < 4 && (
          <div className="px-6 py-4 border-t border-[#242633] bg-[#161720] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} /> Previous
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              disabled={step === 3 && (!email.trim() || !companyName.trim())}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all ${
                step === 3 && (!email.trim() || !companyName.trim())
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-[#d8ff06] text-black hover:bg-[#b8db00] hover:scale-105'
              }`}
            >
              <span>{step === 3 ? 'Transmit Brief' : 'Continue'}</span>
              {step === 3 ? <Send size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
