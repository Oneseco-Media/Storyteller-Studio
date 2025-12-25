import React, { useState } from "react";
import { StoryBeat, MotionStyle } from "@/lib/story-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Video, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StoryInputProps {
  beat: StoryBeat;
  onChange: (updatedBeat: StoryBeat) => void;
  isActive: boolean;
  onFocus: () => void;
}

export const StoryInput: React.FC<StoryInputProps> = ({
  beat,
  onChange,
  isActive,
  onFocus,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...beat, mediaUrl: url });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative border-l-4 pl-4 transition-all duration-300",
        isActive ? "border-primary" : "border-muted-foreground/30",
        isActive ? "bg-accent/5" : "bg-transparent"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onFocus}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={cn(
            "text-xs font-bold tracking-widest uppercase",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          {beat.type}
        </span>
        {beat.mediaUrl && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-green-400 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" /> Media Added
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange({ ...beat, mediaUrl: undefined });
              }}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Input
          value={beat.headline}
          onChange={(e) => onChange({ ...beat, headline: e.target.value })}
          placeholder={`Enter ${beat.type.toLowerCase()} headline...`}
          className={cn(
            "font-display font-semibold text-lg bg-transparent border-none px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50",
            isActive ? "text-foreground" : "text-muted-foreground"
          )}
        />
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-3"
            >
              <Textarea
                value={beat.description}
                onChange={(e) => onChange({ ...beat, description: e.target.value })}
                placeholder="Add a short description or script..."
                className="bg-secondary/50 border-transparent text-sm resize-none focus-visible:ring-1 focus-visible:ring-primary/50"
                rows={3}
              />
              
              <div className="relative group cursor-pointer border-2 border-dashed border-muted hover:border-primary/50 rounded-lg p-4 transition-colors text-center">
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleMediaUpload}
                />
                <div className="flex flex-col items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
                  <Upload className="w-4 h-4 mb-1" />
                  <span className="text-xs font-medium">Upload Media</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
