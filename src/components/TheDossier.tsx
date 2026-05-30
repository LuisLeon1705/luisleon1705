'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import portrait from '../../public/Photograph/Curriculum.jpg';

const Tooltip = ({ content, children }: { content: string, children: React.ReactNode }) => {
  return (
    <div className="relative group/tooltip inline-block w-full">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[220px] p-3 bg-zinc-900 text-zinc-100 text-[10px] font-inter rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-50 text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-zinc-700 leading-relaxed backdrop-blur-sm">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-900"></div>
      </div>
    </div>
  );
};

export default function TheDossier() {
  const { t, language } = useLanguage();
  const [currentSpread, setCurrentSpread] = useState(0);

  const totalSpreads = t.menu.spreads.length;
  const spread = t.menu.spreads[currentSpread];

  const nextSpread = () => setCurrentSpread((prev) => Math.min(prev + 1, totalSpreads - 1));
  const prevSpread = () => setCurrentSpread((prev) => Math.max(prev - 1, 0));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-[#1a1a1a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] rounded-lg relative">
      
      {/* The Dossier Internal Structure */}
      <div className="relative flex flex-col md:flex-row bg-[#fafafa] border border-zinc-200 min-h-[75vh] font-playfair overflow-hidden rounded-sm shadow-inner">
        
        {/* Central Spine Shadow */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-300 z-10 hidden md:block" />
        <div className="absolute left-1/2 top-0 bottom-0 w-12 bg-gradient-to-r from-black/5 to-transparent -translate-x-full z-0 hidden md:block" />
        <div className="absolute left-1/2 top-0 bottom-0 w-12 bg-gradient-to-l from-black/5 to-transparent z-0 hidden md:block" />

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSpread}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row w-full h-full flex-1"
          >
            {/* Left Page */}
            <div className="flex-1 p-8 md:p-14 border-b md:border-b-0 md:border-r border-zinc-100 relative z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)]">
              <header className="text-center mb-10 relative">
                {currentSpread === 0 && (
                  <div className="absolute -top-12 -left-10 rotate-[-3deg] w-28 h-36 md:w-36 md:h-44 bg-white p-2 shadow-[5px_10px_20px_rgba(0,0,0,0.2)] border border-zinc-200 z-20 group">
                    <div className="w-full h-full relative overflow-hidden bg-zinc-100 grayscale contrast-[1.1] sepia-[0.15] group-hover:sepia-0 group-hover:grayscale-0 transition-all duration-700">
                      <Image 
                        src={portrait} 
                        alt="Chef's Portrait" 
                        fill 
                        className="object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm border border-white/20 rotate-[2deg] shadow-sm" />
                  </div>
                )}

                <div className={currentSpread === 0 ? "pt-20 md:pt-0" : ""}>
                  <h1 className="text-3xl uppercase tracking-[0.25em] mb-2 font-bold text-zinc-800">
                    {currentSpread === 0 ? t.menu.title : spread.leftPage.title}
                  </h1>
                  {currentSpread === 0 && <p className="italic text-zinc-500 text-sm tracking-wide">{t.menu.subtitle}</p>}
                  <div className="w-20 h-[1.5px] bg-zinc-900 mx-auto mt-6" />
                </div>
              </header>

              <section className="space-y-6 mt-4">
                {currentSpread !== 0 && (
                   <h2 className="text-xl uppercase tracking-[0.15em] border-b border-zinc-200 pb-3 text-zinc-900">
                    {spread.leftPage.title}
                  </h2>
                )}
                
                {spread.leftPage.bio && (
                  <p className="font-inter text-sm text-zinc-700 leading-relaxed italic border-l-2 border-zinc-200 pl-4 py-1">
                    {spread.leftPage.bio}
                  </p>
                )}

                {spread.leftPage.highlights && (
                  <ul className="space-y-3 font-inter text-xs text-zinc-600">
                    {spread.leftPage.highlights.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full mt-1 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {spread.leftPage.sections?.mainCourses && (
                  <div className="space-y-6">
                    {spread.leftPage.sections.mainCourses.projects.map((project: any, i: number) => (
                      <Tooltip key={i} content={project.tooltip}>
                        <div className="group/proj cursor-help">
                          <h4 className="text-sm uppercase tracking-[0.2em] text-zinc-900 mb-2 font-bold group-hover/proj:text-zinc-500 transition-colors">
                            {project.name}
                          </h4>
                          <p className="font-inter text-[11px] text-zinc-600 leading-relaxed pl-3 border-l border-zinc-100 group-hover/proj:border-zinc-300 transition-colors">
                            {project.desc}
                          </p>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                )}

                {spread.leftPage.contactTitle && (
                  <div className="pt-6 border-t border-zinc-100">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] mb-3 text-zinc-400 font-black">
                      {spread.leftPage.contactTitle}
                    </h3>
                    <p className="font-mono text-sm text-zinc-900">
                      {spread.leftPage.email}
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Right Page */}
            <div className="flex-1 p-8 md:p-14 relative z-10 flex flex-col bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1)_0%,rgba(252,252,252,1)_100%)]">
              <section className="flex-1 space-y-10">
                <h2 className="text-xl uppercase tracking-[0.15em] border-b border-zinc-200 pb-3 mb-8 text-zinc-900">
                  {spread.rightPage.title}
                </h2>

                {spread.rightPage.sections?.ingredients && (
                  <div className="space-y-5">
                    {spread.rightPage.sections.ingredients.categories.map((cat: any, i: number) => (
                      <Tooltip key={i} content={cat.tooltip}>
                        <div className="flex justify-between items-baseline gap-4 group/item cursor-help">
                          <span className="text-sm uppercase tracking-widest text-zinc-900 font-bold group-hover/item:translate-x-1 transition-transform">{cat.name}</span>
                          <div className="flex-1 border-b border-dotted border-zinc-300 mb-1" />
                          <span className="font-inter text-[10px] text-zinc-500 text-right italic">{cat.items}</span>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                )}

                {spread.rightPage.sections?.mainCourses && (
                  <div className="space-y-8">
                    {spread.rightPage.sections.mainCourses.projects.map((project: any, i: number) => (
                      <Tooltip key={i} content={project.tooltip}>
                        <div className="group/proj cursor-help">
                          <h4 className="text-sm uppercase tracking-[0.2em] text-zinc-900 mb-2 font-bold group-hover/proj:text-zinc-500 transition-colors">
                            {project.name}
                          </h4>
                          <p className="font-inter text-[11px] text-zinc-600 leading-relaxed pl-3 border-l border-zinc-100 group-hover/proj:border-zinc-300 transition-colors">
                            {project.desc}
                          </p>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                )}

                {spread.rightPage.bio && (
                  <p className="font-inter text-sm text-zinc-700 leading-relaxed italic border-l-2 border-zinc-200 pl-4 py-1">
                    {spread.rightPage.bio}
                  </p>
                )}

                {spread.rightPage.highlights && (
                  <ul className="space-y-3 font-inter text-xs text-zinc-600">
                    {spread.rightPage.highlights.map((item: string, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full mt-1 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {spread.rightPage.contactTitle && (
                  <div className="pt-6 border-t border-zinc-100">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] mb-3 text-zinc-400 font-black">
                      {spread.rightPage.contactTitle}
                    </h3>
                    <p className="font-mono text-sm text-zinc-900">
                      {spread.rightPage.email}
                    </p>
                  </div>
                )}
              </section>

              <footer className="mt-16 text-[10px] uppercase tracking-[0.4em] text-zinc-300 text-center font-black">
                {language === 'en' ? 'Authentic Experience' : 'Experiencia Auténtica'} — {currentSpread + 1} / {totalSpreads}
              </footer>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 z-50">
          <button 
            onClick={prevSpread}
            disabled={currentSpread === 0}
            className={`flex items-center gap-1 text-[10px] uppercase tracking-widest transition-opacity ${currentSpread === 0 ? "opacity-0 pointer-events-none" : "opacity-50 hover:opacity-100"}`}
          >
            <ChevronLeft size={14} /> {t.menu.navigation.prev}
          </button>
          <button 
            onClick={nextSpread}
            disabled={currentSpread === totalSpreads - 1}
            className={`flex items-center gap-1 text-[10px] uppercase tracking-widest transition-opacity ${currentSpread === totalSpreads - 1 ? "opacity-0 pointer-events-none" : "opacity-50 hover:opacity-100"}`}
          >
            {t.menu.navigation.next} <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
