'use client';

import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';
import NeonAlleyWindow from '@/components/NeonAlleyWindow';
import MidnightBrew from '@/components/MidnightBrew';
import TheDossier from '@/components/TheDossier';
import { useLanguage } from '@/lib/LanguageContext';
import { Languages } from 'lucide-react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toggleLanguage, language } = useLanguage();
  const [activeSpread, setActiveSpread] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll to update dossier pages - Starts after landing (0.3)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 0.0 - 0.3: Landing animation
    // 0.3 - 0.5: Page 1 (index 0)
    // 0.55 - 0.75: Page 2 (index 1)
    // 0.8 - 1.0: Page 3 (index 2)
    if (latest < 0.5) setActiveSpread(0);
    else if (latest < 0.78) setActiveSpread(1);
    else setActiveSpread(2);
  });

  // Layer 1: Window (Background)
  const windowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const windowScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 0.9]);
  const windowZ = useTransform(scrollYProgress, [0, 0.4], [-200, -300]);
  const windowY = useTransform(scrollYProgress, [0, 0.25], [0, -600]);

  // Layer 1.5: Background Ambiance (Diner Interior Architecture)
  const ambianceOpacity = useTransform(scrollYProgress, [0, 0.3], [0.2, 0]);
  const ambianceScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1.1]);
  const ambianceY = useTransform(scrollYProgress, [0, 0.4], [50, -100]);

  // Layer 2: The Main Table Surface & Dossier (Midground)
  // Landing animation compressed to 0.3
  const menuScale = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const menuY = useTransform(scrollYProgress, [0, 0.3], [600, 0]);
  const menuRotateX = useTransform(scrollYProgress, [0, 0.3], [90, 0]);
  
  // Table Surface animation
  const tableScale = useTransform(scrollYProgress, [0, 0.3], [0.6, 1.3]);
  const tableOpacity = useTransform(scrollYProgress, [0, 0.35], [0.5, 1]);

  // Layer 3: Coffee (Foreground)
  const coffeeX = useTransform(scrollYProgress, [0, 0.2], [0, 300]);
  const coffeeY = useTransform(scrollYProgress, [0, 0.2], [0, 400]);
  const coffeeOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <main ref={containerRef} className="relative h-[600vh] bg-zinc-950">
      {/* Sticky Scene Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1500px]">
        
        {/* Layer 1: The Window (Neon Alley Window) */}
        <motion.div 
          style={{ 
            opacity: windowOpacity, 
            scale: windowScale, 
            zIndex: 0, 
            translateZ: windowZ,
            y: windowY
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[60%] h-[85%] border-[32px] border-zinc-700 shadow-[inset_0_0_100px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.5)] overflow-hidden bg-[#1e1e1e] relative">
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
              <div className="w-6 h-full bg-zinc-700 shadow-xl" />
              <div className="absolute w-full h-6 bg-zinc-700 shadow-xl" />
              <div className="absolute top-1/4 w-full h-3 bg-zinc-700/50" />
              <div className="absolute bottom-1/4 w-full h-3 bg-zinc-700/50" />
            </div>
            <NeonAlleyWindow />
          </div>
        </motion.div>

        {/* Layer 1.5: Background Ambiance */}
        <motion.div
          style={{ 
            opacity: ambianceOpacity, 
            scale: ambianceScale,
            y: ambianceY
          }}
          className="absolute inset-0 z-[5] pointer-events-none"
        >
          <div className="absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-zinc-900 to-transparent opacity-50" />
          <div className="absolute bottom-[20%] w-full h-1 bg-zinc-800" />
          <div className="absolute bottom-0 w-full h-[20%] bg-zinc-900/30" />
          <div className="absolute left-[5%] bottom-[15%] w-32 h-64 bg-zinc-800/40 blur-[1px] rounded-t-lg border-x border-zinc-700/30" />
          <div className="absolute left-[2%] bottom-[10%] w-48 h-12 bg-zinc-700/20 blur-[2px] rounded-md" />
          <div className="absolute right-[5%] bottom-[15%] w-32 h-64 bg-zinc-800/40 blur-[1px] rounded-t-lg border-x border-zinc-700/30" />
          <div className="absolute right-[2%] bottom-[10%] w-48 h-12 bg-zinc-700/20 blur-[2px] rounded-md" />
          <div className="absolute top-0 left-[20%] w-[2px] h-32 bg-zinc-700/50" />
          <div className="absolute top-32 left-[20%] -translate-x-1/2 w-16 h-8 bg-zinc-800/60 blur-[1px] rounded-b-full border-b border-zinc-700/30" />
          <div className="absolute top-0 right-[20%] w-[2px] h-48 bg-zinc-700/50" />
          <div className="absolute top-48 right-[20%] -translate-x-1/2 w-20 h-10 bg-zinc-800/60 blur-[1px] rounded-b-full border-b border-zinc-700/30" />
        </motion.div>

        {/* Layer 2: The Main Table Surface (Distinct from Menu Border) */}
        <motion.div
          style={{ 
            scale: tableScale,
            y: menuY,
            rotateX: menuRotateX,
            opacity: tableOpacity
          }}
          className="absolute z-10 w-full max-w-[1800px] h-[1200px] bg-zinc-800 shadow-[0_40px_100px_rgba(0,0,0,0.8)] border-t-4 border-zinc-700 rounded-t-[10rem]"
        >
          {/* Table Texture Overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        </motion.div>

        {/* Layer 2: The Dossier */}
        <motion.div
          style={{ 
            scale: menuScale, 
            y: menuY, 
            rotateX: menuRotateX,
          }}
          className="relative z-20 w-full max-w-5xl px-4"
        >
          <TheDossier activeSpread={activeSpread} />
        </motion.div>

        {/* Layer 3: The Midnight Brew */}
        <motion.div
          style={{ 
            x: coffeeX,
            y: coffeeY,
            opacity: coffeeOpacity,
          }}
          className="absolute bottom-10 right-10 z-30 pointer-events-none"
        >
          <MidnightBrew />
        </motion.div>

        {/* UI Overlays */}
        <div className="absolute top-10 right-10 z-50">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-6 py-2 border-2 border-zinc-600 rounded-none bg-zinc-900 text-zinc-100 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-[0.2em] text-[11px] font-black"
          >
            <Languages size={14} />
            {language === 'en' ? 'Español' : 'English'}
          </button>
        </div>

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.5em] text-zinc-400 font-black animate-pulse bg-black/30 backdrop-blur-md px-6 py-2 border border-zinc-800">
            {language === 'en' ? 'Scroll to inspect' : 'Desliza para inspeccionar'}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
