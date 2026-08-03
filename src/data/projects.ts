import type { LucideIcon } from "lucide-react";
import {
  MessageCircleMore,
  ChartPie,
  Bot,
  Music2,
  CodeXml,
} from "lucide-react";
import type { MediaTone, ProjectMeta } from "@/data/details";

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
  /** Optional color grade for details media */
  mediaTone?: MediaTone;
  /** Metadata shown in hover preview and project details */
  meta?: ProjectMeta;
};

export const projects: Project[] = [
  {
    id: "discovery-responses",
    title: "Discovery Responses",
    description: "reimagining how lawyers respond to discovery questions.",
    category: "industry",
    icon: MessageCircleMore,
    meta: {
      type: "Product",
      role: "Product Designer",
    },
  },
  {
    id: "conversation-insights",
    title: "Conversation Insights",
    description:
      "self-serve analytics platform for Air Canada contact centre teams.",
    category: "industry",
    icon: ChartPie,
    previewVideo: "/assets/preview-videos/conversation-insights-banner.mp4",
    mediaTone: "blue",
    meta: {
      company: "RozieAI",
      timeline: "Q3 2024 - Q3 2025",
      type: "Intern Tool",
      client: "Air Canada",
      role: "Product Designer",
    },
  },
  {
    id: "architecture-agent",
    title: "Architecture Agent",
    description:
      "usability studies on architecture agent feature with actual ai.",
    category: "industry",
    icon: Bot,
    previewVideo: "/assets/preview-videos/actual-ai-banner.mp4",
    meta: {
      type: "Research",
      role: "Product Designer",
    },
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
    meta: {
      type: "Personal",
      role: "Designer / Engineer",
    },
  },
  {
    id: "gzlang",
    title: "GZ-Lang",
    description: "transpiler the decodes genz language into javascript.",
    category: "personal",
    icon: CodeXml,
    previewVideo: "/assets/preview-videos/gzlang-banner.mp4",
    mediaTone: "lime",
    meta: {
      type: "Personal",
      role: "Designer / Engineer",
    },
  },
];

export const industryProjects = projects.filter(
  (project) => project.category === "industry",
);

export const personalProjects = projects.filter(
  (project) => project.category === "personal",
);
