import { z } from "zod";

export const StoryBeatSchema = z.object({
  id: z.string(),
  type: z.enum(["WHO", "WHAT", "WHERE", "WHEN", "WHY"]),
  headline: z.string(),
  description: z.string(),
  mediaUrl: z.string().optional(),
});

export type StoryBeat = z.infer<typeof StoryBeatSchema>;

export type MotionStyle = "CLEAN" | "BOLD" | "CINEMATIC";

export interface StoryState {
  beats: StoryBeat[];
  style: MotionStyle;
}

export const INITIAL_STORY: StoryBeat[] = [
  { id: "1", type: "WHO", headline: "The Protagonist", description: "Introduce the main character or subject." },
  { id: "2", type: "WHAT", headline: "The Goal", description: "What are they trying to achieve?" },
  { id: "3", type: "WHERE", headline: "The Setting", description: "Set the scene and environment." },
  { id: "4", type: "WHEN", headline: "The Moment", description: "Establish the timeline or urgency." },
  { id: "5", type: "WHY", headline: "The Motivation", description: "Why does this matter?" },
];
