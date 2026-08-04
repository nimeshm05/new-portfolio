import conversationInsights from "./conversation-insights.md";

export type CaseStudySection = {
  /** Anchor id derived from the markdown H2 */
  id: string;
  /** Sidebar label (may differ from the markdown heading) */
  title: string;
  /** Exact markdown H2 text */
  heading: string;
};

export const caseStudies: Record<string, string> = {
  "conversation-insights": conversationInsights,
};

/**
 * Optional sidebar labels keyed by section id (slug of the markdown H2).
 * When omitted, the sidebar uses the heading text as-is.
 */
const sectionLabelOverrides: Record<string, Record<string, string>> = {
  "conversation-insights": {
    "learnings-from-user-test-sessions": "Learnings",
  },
};

export function getCaseStudyMarkdown(id: string): string | undefined {
  return caseStudies[id];
}

/**
 * Quick Read: Problem through Discovery & Insights (matches Figma case-study frame).
 * Falls back to content before the first non-Overview H2 when Problem is missing.
 */
export function getCaseStudyQuickRead(markdown: string): string {
  const problemStart = markdown.search(/^## Problem\s*$/m);
  if (problemStart === -1) {
    const match = markdown.match(/^([\s\S]*?)(?=\n## (?!Overview\b))/);
    return (match?.[1] ?? markdown).trim();
  }

  const fromProblem = markdown.slice(problemStart);
  const nextSection = fromProblem.search(
    /\n## (?!Problem\b|Discovery\b)/,
  );
  const content =
    nextSection === -1 ? fromProblem : fromProblem.slice(0, nextSection);

  return content.trim();
}

export function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCaseStudySections(
  markdown: string,
  projectId?: string,
): CaseStudySection[] {
  const overrides = projectId ? (sectionLabelOverrides[projectId] ?? {}) : {};
  const headings = [...markdown.matchAll(/^## (.+)$/gm)];

  return headings.map((match) => {
    const heading = match[1].trim();
    const id = slugifyHeading(heading);
    return {
      id,
      heading,
      title: overrides[id] ?? heading,
    };
  });
}

export function getProjectSections(projectId: string): CaseStudySection[] {
  const markdown = getCaseStudyMarkdown(projectId);
  if (!markdown) return [];
  return getCaseStudySections(markdown, projectId);
}
