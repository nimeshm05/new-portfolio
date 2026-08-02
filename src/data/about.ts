import type { LucideIcon } from "lucide-react";
import { BookOpenText, Briefcase, Sprout } from "lucide-react";

export type AboutTopic = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const aboutTopics: AboutTopic[] = [
  {
    id: "experience",
    title: "Experience",
    description: "roles and work across product design.",
    icon: Briefcase,
  },
  {
    id: "education",
    title: "Education",
    description: "academic path and learning journey.",
    icon: BookOpenText,
  },
  {
    id: "origin-story",
    title: "Origin Story",
    description: "how I got into design.",
    icon: Sprout,
  },
  {
    id: "principles",
    title: "Principles",
    description: "beliefs that guide how I design.",
    icon: Sprout,
  },
];
