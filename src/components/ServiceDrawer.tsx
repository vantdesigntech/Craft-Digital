import React from 'react';
import { X, Check, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { ServiceItem } from '../data/agencyData';

interface ServiceDrawerProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectServiceForInquiry: (serviceName: string) => void;
}

export const ServiceDrawer: React.FC<ServiceDrawerProps> = ({
  service,
  onClose,
  onSelectServiceForInquiry
}) => {
  if (!service) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-service-title"
    >
      <div 
        className="w-full max-w-xl bg-[#121319] border-l border-[#292c3a] h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-10 shadow-2xl animate-in slide-in-from-right duration-300"
      >
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#232530]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d8ff06] uppercase tracking-wider">
              <Sparkles size={14} />
              <span>CAPABILITY SPECIFICATION</span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1c1e27] hover:bg-[#d8ff06] hover:text-black text-white flex items-center justify-center transition-colors"
              aria-label="Close Specification Drawer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Service Title & Visual */}
          <div className="my-8">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
              {service.tagline}
            </span>
            <h2 id="drawer-service-title" className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              {service.name}
            </h2>

            <div className="mt-6 aspect-video rounded-2xl overflow-hidden border border-[#2b2e3c] bg-black">
              <img 
                src={service.thumbnail} 
                alt={service.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="mt-6 text-sm sm:text-base text-neutral-300 font-sans-clean leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Key Deliverables */}
          <div className="space-y-3 mb-8">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#d8ff06] flex items-center gap-1.5">
              <Terminal size={14} /> STANDARD DELIVERABLES
            </h3>
            <div className="space-y-2">
              {service.deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#171922] border border-[#242633]">
                  <Check size={16} className="text-[#d8ff06] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-200">{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Timeline */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#171922] border border-[#242633]">
              <span className="text-[11px] font-mono text-[#838799] block mb-1">STANDARD TIMELINE</span>
              <span className="font-display font-bold text-white text-base">{service.timeline}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#171922] border border-[#242633]">
              <span className="text-[11px] font-mono text-[#838799] block mb-1">ENGINEERING STACK</span>
              <span className="text-xs text-neutral-200">{service.techStack.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-[#232530]">
          <button
            onClick={() => {
              onClose();
              onSelectServiceForInquiry(service.name);
            }}
            className="w-full py-3.5 px-6 rounded-full bg-[#d8ff06] text-black font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#b8db00] transition-colors"
          >
            <span>START A PROJECT WITH THIS CAPABILITY</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
