import React, { useEffect, useState } from "react";
import { StoryBeat, MotionStyle } from "@/lib/story-types";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Repeat } from "lucide-react";

interface PreviewCanvasProps {
  beats: StoryBeat[];
  style: MotionStyle;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ beats, style }) => {
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentBeatIndex((prev) => (prev + 1) % beats.length);
      }, 3000); // 3 seconds per beat
    }
    return () => clearInterval(interval);
  }, [isPlaying, beats.length]);

  const currentBeat = beats[currentBeatIndex];

  // Animation variants based on style
  const variants = {
    CLEAN: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
      textInitial: { y: 20, opacity: 0 },
      textAnimate: { y: 0, opacity: 1 },
    },
    BOLD: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      textInitial: { x: -50, opacity: 0, skewX: -10 },
      textAnimate: { x: 0, opacity: 1, skewX: 0 },
    },
    CINEMATIC: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      textInitial: { scale: 1.2, opacity: 0, filter: "blur(10px)" },
      textAnimate: { scale: 1, opacity: 1, filter: "blur(0px)" },
    },
  };

  const activeVariant = variants[style];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-black/20 backdrop-blur-sm">
      {/* Phone Frame */}
      <div className="relative w-[320px] h-[568px] bg-background border-8 border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentBeat.id}-${style}`}
            className="absolute inset-0 w-full h-full bg-slate-900"
            initial={activeVariant.initial}
            animate={activeVariant.animate}
            exit={activeVariant.exit}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Background Media */}
            {currentBeat.mediaUrl ? (
              <img
                src={currentBeat.mediaUrl}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-center items-start z-10">
              <motion.span
                className="text-xs font-bold text-primary tracking-widest uppercase mb-2 bg-black/50 px-2 py-1 rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentBeat.type}
              </motion.span>
              
              <motion.h2
                className={`text-3xl font-bold text-white mb-4 leading-tight ${style === 'BOLD' ? 'uppercase font-black' : ''} ${style === 'CINEMATIC' ? 'font-serif' : ''}`}
                initial={activeVariant.textInitial}
                animate={activeVariant.textAnimate}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {currentBeat.headline || "Headline"}
              </motion.h2>
              
              <motion.p
                className="text-white/80 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {currentBeat.description || "Description goes here..."}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Playback Controls Overlay */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute top-0 left-0 right-0 flex p-2 gap-1 z-20">
          {beats.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                idx === currentBeatIndex ? "bg-white" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        Previewing: {style} Style
      </div>
    </div>
  );
};
