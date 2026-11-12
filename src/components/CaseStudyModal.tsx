import React, { useState } from 'react';
import { X, ArrowUpRight, Check, Monitor, Smartphone, Layers, TrendingUp, Cpu } from 'lucide-react';
import { ProjectItem } from '../data/agencyData';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenInquiry: (initialService?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onOpenInquiry }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'metrics'>('overview');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="relative w-full max-w-4xl bg-[#13141a] border border-[#2b2e3b] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#232530] bg-[#161820]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d8ff06] uppercase tracking-wider mb-1">
              <span>{project.year}</span>
              <span>·</span>
              <span className="text-white/70">{project.client}</span>
            </div>
            <h2 id="case-study-title" className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {project.title}
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#20222c] hover:bg-[#d8ff06] hover:text-black text-white flex items-center justify-center transition-colors shrink-0 ml-4"
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero image showcase with responsive preview switcher */}
        <div className="relative bg-[#0c0d10] p-4 sm:p-8 border-b border-[#232530] flex flex-col items-center">
          
          {/* Viewport switch controls */}
          <div className="flex items-center justify-between w-full mb-4">
            <span className="text-xs text-[#838799] font-sans-clean font-medium">
              Interactive Prototype Viewport
            </span>

            <div className="flex items-center gap-1 bg-[#1a1c24] p-1 rounded-xl border border-[#2e313f]">
              <button
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  viewMode === 'desktop' 
                    ? 'bg-[#d8ff06] text-black font-bold' 
                    : 'text-[#838799] hover:text-white'
                }`}
              >
                <Monitor size={14} /> Desktop
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  viewMode === 'mobile' 
                    ? 'bg-[#d8ff06] text-black font-bold' 
                    : 'text-[#838799] hover:text-white'
                }`}
              >
                <Smartphone size={14} /> Mobile
              </button>
            </div>
          </div>

          {/* Browser / Device Mockup Frame */}
          <div 
            className={`transition-all duration-300 border border-[#2f3240] rounded-2xl overflow-hidden bg-black shadow-2xl ${
              viewMode === 'desktop' ? 'w-full aspect-video' : 'w-[280px] sm:w-[320px] aspect-[9/16]'
            }`}
          >
            {/* Top Mock Window chrome */}
            <div className="bg-[#1b1c24] px-4 py-2 border-b border-[#2a2d3b] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono text-neutral-400 truncate max-w-[200px]">
                https://{project.id}.nexocode.studio
              </span>
              <div className="w-12 text-right">
                <span className="text-[10px] text-[#d8ff06] font-mono">LIVE</span>
              </div>
            </div>

            {/* Simulated Live Viewport */}
            <div className="relative w-full h-[calc(100%-34px)] overflow-hidden bg-neutral-900 group">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                <div>
                  <span className="text-xs uppercase font-mono text-[#d8ff06] font-semibold tracking-wider">
                    Client: {project.client}
                  </span>
                  <p className="text-white font-display text-lg sm:text-xl font-bold leading-tight">
                    {project.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed details area */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-[#232530] pb-3">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-[#d8ff06] text-[#d8ff06]'
                  : 'border-transparent text-[#838799] hover:text-white'
              }`}
            >
              <Layers size={16} /> Strategy & Overview
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === 'tech'
                  ? 'border-[#d8ff06] text-[#d8ff06]'
                  : 'border-transparent text-[#838799] hover:text-white'
              }`}
            >
              <Cpu size={16} /> Tech Architecture
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === 'metrics'
                  ? 'border-[#d8ff06] text-[#d8ff06]'
                  : 'border-transparent text-[#838799] hover:text-white'
              }`}
            >
              <TrendingUp size={16} /> Verified Outcomes
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans-clean">
                {project.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#181a22] border border-[#282a36] rounded-xl">
                  <h4 className="text-xs font-mono text-[#d8ff06] uppercase tracking-wider mb-2">The Challenge</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans-clean">
                    {project.challenge}
                  </p>
                </div>
                <div className="p-4 bg-[#181a22] border border-[#282a36] rounded-xl">
                  <h4 className="text-xs font-mono text-[#d8ff06] uppercase tracking-wider mb-2">The Nexo Solution</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 font-sans-clean">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#181a22] border border-[#282a36] rounded-xl">
                <h4 className="text-xs font-mono text-[#d8ff06] uppercase tracking-wider mb-3">Core Stack & Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-[#222530] text-xs font-medium text-white border border-[#2e3240]">
                      {tag}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-lg bg-[#222530] text-xs font-medium text-[#d8ff06] border border-[#2e3240]">
                    TypeScript Strict
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#222530] text-xs font-medium text-[#d8ff06] border border-[#2e3240]">
                    Sub-second TTFB
                  </span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-neutral-400 space-y-2">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-[#d8ff06]" />
                  <span>Optimized for 99+ Google Lighthouse mobile performance score.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-[#d8ff06]" />
                  <span>Fully accessible ARIA landmarks and WCAG 2.1 AA keyboard navigation.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-[#d8ff06]" />
                  <span>Global edge distribution with atomic instant deployments.</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-5 bg-[#181a22] border border-[#292c3a] rounded-2xl flex flex-col justify-center">
                  <span className="text-xs uppercase font-mono text-[#838799] mb-1">{m.label}</span>
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#d8ff06]">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#232530] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#838799]">
              Ready to engineer an experience of this calibre?
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenInquiry(project.title);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#d8ff06] text-black font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#b8db00] transition-colors"
              >
                <span>ENGINEER SIMILAR PROJECT</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
