import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(28);
  const [currentChapter, setCurrentChapter] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const chapters = [
    { title: '01. Intro: The Nexo Philosophy', timestamp: '0:00' },
    { title: '02. 3D Fluid Art & Kinetic Motion', timestamp: '0:45' },
    { title: '03. Headless Luxury Storefronts', timestamp: '1:15' },
    { title: '04. Next-Gen Enterprise Platforms', timestamp: '1:50' }
  ];

  // Simulated ambient synth sound generator when unmuted
  useEffect(() => {
    if (!isMuted && isOpen) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // Low A ambient drone
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        audioCtxRef.current = ctx;
        oscRef.current = osc;
      } catch (e) {
        console.error('Audio init error', e);
      }
    } else {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {}
        oscRef.current = null;
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
        audioCtxRef.current = null;
      }
    }

    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, [isMuted, isOpen]);

  // Animated visualizer canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      step += isPlaying ? 0.04 : 0.005;
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#0a0b0d';
      ctx.fillRect(0, 0, width, height);

      // Draw dynamic visualizer waves
      const lines = 7;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = i === 3 ? 3 : 1.5;
        ctx.strokeStyle = i === 3 ? '#d8ff06' : `rgba(216, 255, 6, ${0.15 + (i / lines) * 0.4})`;

        const amplitude = (height * 0.18) * (isPlaying ? 1 : 0.2);
        const yOffset = height * 0.5 + Math.sin(step + i) * 20;

        for (let x = 0; x <= width; x += 15) {
          const y = yOffset + Math.sin(x * 0.008 + step * 1.5 + i * 0.6) * amplitude * Math.cos(x * 0.003 + step * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw subtle brutalist grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, isPlaying]);

  // Progress timer loop
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 150);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Nexo Code Agency Showreel"
    >
      <div className="relative w-full max-w-5xl bg-[#111216] border border-[#2b2d38] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top bar of video player */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#24262f] bg-[#16171d]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d8ff06] animate-pulse" />
            <span className="font-display font-bold text-sm tracking-wide text-white uppercase">
              NEXO CODE // AGENCY SHOWREEL 2026
            </span>
            <span className="hidden sm:inline-block text-xs text-[#838799] font-mono border border-[#2e313d] px-2 py-0.5 rounded">
              4K UHD 60FPS
            </span>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#20222a] hover:bg-[#d8ff06] hover:text-black text-white flex items-center justify-center transition-colors"
            aria-label="Close Showreel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video simulation stage */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={1280} 
            height={720} 
            className="w-full h-full object-cover"
          />

          {/* Center Title overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/35 pointer-events-none">
            <span className="text-xs uppercase font-mono tracking-widest text-[#d8ff06] mb-2 flex items-center gap-2">
              <Sparkles size={14} /> REEL HIGHLIGHTS
            </span>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase max-w-xl leading-none">
              PUSHING DIGITAL BOUNDARIES
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-3 font-sans-clean max-w-md">
              Custom interactive storefronts, dynamic Three.js canvas shaders, and scalable architecture.
            </p>
          </div>

          {/* Timecode and live watermark */}
          <div className="absolute top-4 left-4 font-mono text-xs text-[#d8ff06] bg-black/70 px-2.5 py-1 rounded border border-[#2b2d38]">
            TC: 00:01:{(progress * 0.01 * 134).toFixed(0).padStart(2, '0')} / 00:02:14
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-xs text-white/70 bg-black/70 px-2.5 py-1 rounded border border-[#2b2d38]">
            CHAPTER: {chapters[currentChapter].title}
          </div>
        </div>

        {/* Custom video controls bar */}
        <div className="p-4 sm:p-5 bg-[#14151b] border-t border-[#24262f] flex flex-col gap-3">
          
          {/* Scrubber bar */}
          <div 
            className="relative h-2 bg-[#252833] rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              setProgress(Math.round(clickPos * 100));
            }}
          >
            <div 
              className="absolute left-0 top-0 bottom-0 bg-[#d8ff06] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#d8ff06] text-black font-bold flex items-center justify-center hover:scale-105 transition-transform"
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
              </button>

              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${
                  isMuted 
                    ? 'border-[#2d303d] text-white hover:border-[#d8ff06]' 
                    : 'bg-[#20222a] border-[#d8ff06] text-[#d8ff06]'
                }`}
                aria-label={isMuted ? "Unmute Ambient Audio" : "Mute Audio"}
                title={isMuted ? "Turn on ambient synth sound" : "Mute sound"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <span className="text-xs font-mono text-[#838799] ml-2">
                {isMuted ? 'Audio: Muted' : 'Audio: Synth Ambient Active'}
              </span>
            </div>

            {/* Chapters quick select */}
            <div className="hidden md:flex items-center gap-2">
              {chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentChapter(idx);
                    setProgress(idx * 25);
                  }}
                  className={`text-xs px-2.5 py-1 rounded transition-colors ${
                    currentChapter === idx 
                      ? 'bg-[#d8ff06] text-black font-semibold' 
                      : 'text-[#838799] hover:text-white bg-[#1a1b22]'
                  }`}
                >
                  {ch.timestamp}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen().catch(() => {});
                } else {
                  document.documentElement.requestFullscreen().catch(() => {});
                }
              }}
              className="p-2 text-[#838799] hover:text-white rounded transition-colors"
              aria-label="Toggle Fullscreen"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
