import type { LucideIcon } from "lucide-react";
import {
  MessageCircleMore,
  ChartPie,
  Bot,
  Music2,
  CodeXml,
  Sparkles,
} from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  category: "industry" | "personal";
  icon: LucideIcon;
  /** Reserved for future thumbnail assets */
  thumbnail?: string;
  tagline?: string;
};

export const projects: Project[] = [
  {
    id: "discovery-responses",
    title: "discovery responses",
    description: "reimagining how lawyers respond to discovery questions.",
    category: "industry",
    icon: MessageCircleMore,
  },
  {
    id: "conversation-insights",
    title: "conversation insights",
    description:
      "self-serve analytics platform for Air Canada contact centre teams.",
    category: "industry",
    icon: ChartPie,
  },
  {
    id: "architecture-agent",
    title: "architecture agent",
    description:
      "usability studies on architecture agent feature with actual ai.",
    category: "industry",
    icon: Bot,
  },
  {
    id: "kar-no-key",
    title: "kar-no-key",
    description:
      "multiplayer type racer game built using supabase, cursor, and figma.",
    category: "personal",
    icon: Music2,
    tagline: "race your frens, one lyric at a time :)",
  },
  {
    id: "gzlang",
    title: "gz-lang",
    description: "transpiler the decodes genz language into javascript.",
    category: "personal",
    icon: CodeXml,
  },
  // {
  //   id: "curio",
  //   title: "curio",
  //   description:
  //     "usability studies on architecture agent feature with actual ai.",
  //   category: "personal",
  //   icon: Sparkles,
  // },
];

export const industryProjects = projects.filter(
  (project) => project.category === "industry",
);

export const personalProjects = projects.filter(
  (project) => project.category === "personal",
);
