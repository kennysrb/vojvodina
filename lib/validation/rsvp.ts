import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(4).max(40).optional().or(z.literal("")),
  role: z.enum(["player", "parent"]),
  age: z.string().max(3).optional().or(z.literal("")),
  experience: z.enum(["none", "beginner", "intermediate", "advanced"]).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
  locale: z.enum(["sr", "en"]),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
