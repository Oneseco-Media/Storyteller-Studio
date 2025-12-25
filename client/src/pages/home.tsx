import React, { useState } from "react";
import { StoryBeat, MotionStyle, INITIAL_STORY } from "@/lib/story-types";
import { StoryInput } from "@/components/story-input";
import { PreviewCanvas } from "@/components/preview-canvas";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wand2, LayoutTemplate, PlayCircle, Download } from "lucide-react";
import { motion } from "framer-motion";

// Import generated assets
import cleanStyleImg from "@assets/generated_images/minimalist_geometric_design_for_clean_style.png";
import boldStyleImg from "@assets/generated_images/vibrant_neon_abstract_for_bold_style.png";
import cinematicStyleImg from "@assets/generated_images/cinematic_moody_abstract_texture.png";

const STYLES: { id: MotionStyle; label: string; img: string }[] = [
  { id: "CLEAN", label: "Clean", img: cleanStyleImg },
  { id: "BOLD", label: "Bold", img: boldStyleImg },
  { id: "CINEMATIC", label: "Cinematic", img: cinematicStyleImg },
];

export default function Home() {
  const [beats, setBeats] = useState<StoryBeat[]>(INITIAL_STORY);
  const [selectedStyle, setSelectedStyle] = useState<MotionStyle>("CLEAN");
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBeatChange = (index: number, updatedBeat: StoryBeat) => {
    const newBeats = [...beats];
    newBeats[index] = updatedBeat;
    setBeats(newBeats);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* LEFT PANEL - EDITOR */}
      <div className="w-[440px] flex flex-col border-r border-border bg-card/50 relative z-10">
        <div className="p-6 border-b border-border bg-card/80 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1">
            <LayoutTemplate className="w-5 h-5 text-primary" />
            <h1 className="font-display font-bold text-xl tracking-tight">5W Storyteller</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Create viral short-form videos using the classic 5W framework.
          </p>
        </div>

        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-8">
            {/* Story Blocks */}
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Story Beats
              </h3>
              <div className="space-y-4 pl-2 border-l border-border/50 ml-1">
                {beats.map((beat, index) => (
                  <StoryInput
                    key={beat.id}
                    beat={beat}
                    isActive={activeBeatIndex === index}
                    onFocus={() => setActiveBeatIndex(index)}
                    onChange={(updated) => handleBeatChange(index, updated)}
                  />
                ))}
              </div>
            </section>

            {/* Style Selector */}
            <section>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Visual Style
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all group ${
                      selectedStyle === style.id
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={style.img}
                      alt={style.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-xs font-medium text-white shadow-sm">
                        {style.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>

        {/* Action Bar */}
        <div className="p-6 border-t border-border bg-card/80 backdrop-blur-md space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity h-12 text-md font-semibold shadow-lg shadow-primary/20"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Wand2 className="w-4 h-4" />
                </motion.div>
                Generating Design...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" /> Generate Video
              </span>
            )}
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 text-xs h-9 bg-transparent border-border hover:bg-white/5">
              <PlayCircle className="w-3.5 h-3.5 mr-2" />
              Preview Full
            </Button>
            <Button variant="ghost" className="flex-1 text-xs h-9 hover:bg-white/5">
               Reset
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - CANVAS */}
      <div className="flex-1 bg-gradient-to-br from-background via-background to-secondary/30 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-14 border-b border-white/5 flex items-center justify-between px-6 bg-background/50 backdrop-blur-sm z-10">
           <div className="flex items-center gap-4">
             <span className="text-sm font-medium text-muted-foreground">Untitled Design - 9:16</span>
             <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">SAVED</span>
           </div>
           <Button size="sm" variant="secondary" className="h-8 gap-2">
             <Download className="w-3.5 h-3.5" /> Export
           </Button>
        </div>

        {/* Canvas Area */}
        <PreviewCanvas beats={beats} style={selectedStyle} />
      </div>
    </div>
  );
}
