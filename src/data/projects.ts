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
  /** Path under /public for hover preview video */
  previewVideo?: string;
};

export const projects: Project[] = [
  {
    id: "discovery-responses",
    title: "Discovery Responses",
    description: "reimagining how lawyers respond to discovery questions.",
    category: "industry",
    icon: MessageCircleMore,
  },
  {
    id: "conversation-insights",
    title: "Conversation Insights",
    description:
      "self-serve analytics platform for Air Canada contact centre teams.",
    category: "industry",
    icon: ChartPie,
    previewVideo: "/assets/preview-videos/conversation-insights-banner.mp4",
  },
  {
    id: "architecture-agent",
    title: "Architecture Agent",
    description:
      "usability studies on architecture agent feature with actual ai.",
    category: "industry",
    icon: Bot,
    previewVideo: "/assets/preview-videos/actual-ai-banner.mp4",
  },
  {
    id: "kar-no-key",
    title: "Kar-No-Key",
    description:
      "multiplayer type racer game built using supabase, cursor, and figma.",
    category: "personal",
    icon: Music2,
    tagline: "race your frens, one lyric at a time :)",
    previewVideo: "/assets/preview-videos/kar-no-key.mp4",
  },
  {
    id: "gzlang",
    title: "GZ-Lang",
    description: "transpiler the decodes genz language into javascript.",
    category: "personal",
    icon: CodeXml,
    previewVideo: "/assets/preview-videos/gzlang-banner.mp4",
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
