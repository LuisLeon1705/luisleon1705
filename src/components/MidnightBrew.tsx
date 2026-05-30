'use client';

import { motion } from 'framer-motion';

export default function MidnightBrew() {
  return (
    <div className="relative w-40 h-40">
      {/* Cup Shadow */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/10 rounded-[100%] blur-md" />
      
      {/* The Cup */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-20 bg-zinc-100 border-b-4 border-zinc-200 rounded-b-3xl">
        <div className="absolute -right-6 top-4 w-8 h-10 border-4 border-zinc-100 rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-200/50 to-transparent rounded-b-3xl" />
      </div>

      {/* Coffee Liquid (Surface) */}
      <div className="absolute bottom-[84px] left-1/2 -translate-x-1/2 w-28 h-6 bg-zinc-100 rounded-[100%] flex items-center justify-center overflow-hidden border-2 border-zinc-200">
         <div className="w-24 h-4 bg-zinc-900 rounded-[100%] opacity-90 shadow-inner" />
      </div>

      {/* Steam */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: -80, 
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.2, 1.5],
              x: [0, (i - 1) * 15, (i - 1) * -10]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            className="w-1 h-12 bg-zinc-300/40 rounded-full blur-md"
          />
        ))}
      </div>
    </div>
  );
}
