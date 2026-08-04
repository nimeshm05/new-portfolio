import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/data/case-studies";
import "./CaseStudyContent.css";

type CaseStudyContentProps = {
  markdown: string;
};

type SectionBlock =
  | { type: "paragraph"; text: string }
  | { type: "subsection"; title: string; body: string }
  | { type: "image"; src: string; alt: string }
  | { type: "callout"; text: string }
  | { type: "markdown"; text: string };

type ParsedSection = {
  heading: string;
  isOverview: boolean;
  headline: string | null;
  blocks: SectionBlock[];
};

/** Strip leading H1 + **Label:** value meta block; body only. */
function getCaseStudyBody(markdown: string): string {
  const lines = markdown.replace(/^\uFEFF/, "").split(/\r?\n/);
  let index = 0;

  if (lines[index]?.startsWith("# ")) {
    index += 1;
    while (lines[index] !== undefined && lines[index].trim() === "") {
      index += 1;
    }
  }

  while (index < lines.length) {
    const line = lines[index].trim();
    if (line === "") {
      index += 1;
      continue;
    }

    const match = line.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    if (!match) break;
    index += 1;
  }

  while (lines[index] !== undefined && lines[index].trim() === "") {
    index += 1;
  }

  return lines.slice(index).join("\n").trim();
}

function splitMarkdownSections(
  body: string,
): { heading: string; content: string }[] {
  const parts = body.split(/^## /m).filter((part) => part.trim().length > 0);

  return parts.map((part) => {
    const newline = part.indexOf("\n");
    if (newline === -1) {
      return { heading: part.trim(), content: "" };
    }
    return {
      heading: part.slice(0, newline).trim(),
      content: part.slice(newline + 1).trim(),
    };
  });
}

function isTopBlockStart(line: string): boolean {
  const trimmed = line.trim();
  return (
    trimmed.startsWith("### ") ||
    trimmed.startsWith("![") ||
    trimmed.startsWith("> ") ||
    trimmed === "---" ||
    trimmed.startsWith("|")
  );
}

function parseSection(heading: string, content: string): ParsedSection {
  const isOverview = /^overview$/i.test(heading);
  const lines = content.split("\n");
  let index = 0;
  let headline: string | null = null;
  const blocks: SectionBlock[] = [];

  function skipBlank() {
    while (index < lines.length && lines[index].trim() === "") {
      index += 1;
    }
  }

  function readParagraph(): string {
    const parts: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() !== "" &&
      !isTopBlockStart(lines[index])
    ) {
      parts.push(lines[index]);
      index += 1;
    }
    return parts.join("\n").trim();
  }

  function readUntilNextTopBlock(): string {
    const start = index;
    while (index < lines.length) {
      if (index > start && lines[index].trim() === "") {
        let peek = index + 1;
        while (peek < lines.length && lines[peek].trim() === "") {
          peek += 1;
        }
        if (peek >= lines.length || isTopBlockStart(lines[peek])) {
          break;
        }
      }
      if (index > start && isTopBlockStart(lines[index])) {
        break;
      }
      index += 1;
    }
    return lines.slice(start, index).join("\n").trim();
  }

  skipBlank();

  if (!isOverview && index < lines.length && !isTopBlockStart(lines[index])) {
    const first = readParagraph();
    if (first) {
      headline = first;
    }
    skipBlank();
  }

  while (index < lines.length) {
    skipBlank();
    if (index >= lines.length) break;

    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed === "---") {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      const title = trimmed.slice(4).trim();
      index += 1;
      skipBlank();
      const body = readUntilNextTopBlock();
      blocks.push({ type: "subsection", title, body });
      continue;
    }

    if (trimmed.startsWith("![")) {
      const match = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (match) {
        blocks.push({ type: "image", alt: match[1], src: match[2] });
        index += 1;
        continue;
      }
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "callout", text: quoteLines.join("\n").trim() });
      continue;
    }

    if (trimmed.startsWith("|")) {
      const table = readUntilNextTopBlock();
      if (table) {
        blocks.push({ type: "markdown", text: table });
      }
      continue;
    }

    if (/^\d+\.\s/.test(trimmed) || /^[-*]\s/.test(trimmed)) {
      const list = readUntilNextTopBlock();
      if (list) {
        blocks.push({ type: "markdown", text: list });
      }
      continue;
    }

    const paragraph = readParagraph();
    if (paragraph) {
      blocks.push({ type: "paragraph", text: paragraph });
    }
  }

  return { heading, isOverview, headline, blocks };
}

const proseComponents = {
  h1: () => null,
  h2: () => null,
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="case-study-subsection-title">{children}</h3>
  ),
  h4: ({ children }: { children?: ReactNode }) => (
    <h4 className="case-study-h4">{children}</h4>
  ),
  p: ({ children }: { children?: ReactNode }) => <p>{children}</p>,
  ul: ({ children }: { children?: ReactNode }) => <ul>{children}</ul>,
  ol: ({ children }: { children?: ReactNode }) => <ol>{children}</ol>,
  li: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong>{children}</strong>
  ),
  table: ({ children }: { children?: ReactNode }) => <table>{children}</table>,
  thead: ({ children }: { children?: ReactNode }) => <thead>{children}</thead>,
  tbody: ({ children }: { children?: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children?: ReactNode }) => <tr>{children}</tr>,
  th: ({ children }: { children?: ReactNode }) => <th>{children}</th>,
  td: ({ children }: { children?: ReactNode }) => <td>{children}</td>,
  hr: () => null,
};

function MarkdownFragment({ text }: { text: string }) {
  if (!text.trim()) return null;
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={proseComponents}>
      {text}
    </ReactMarkdown>
  );
}

function CaseStudySectionView({ section }: { section: ParsedSection }) {
  const id = slugifyHeading(section.heading);

  return (
    <section
      className={`case-study-section${section.isOverview ? " is-overview" : ""}`}
      id={id}
      aria-labelledby={`${id}-label`}
    >
      <header className="case-study-section-header">
        {section.isOverview ? (
          <h2 id={`${id}-label`} className="case-study-section-title">
            {section.heading}
          </h2>
        ) : (
          <>
            <h2 id={`${id}-label`} className="case-study-section-label">
              {section.heading}
            </h2>
            {section.headline ? (
              <p className="case-study-section-headline">{section.headline}</p>
            ) : null}
          </>
        )}
      </header>

      {section.blocks.map((block, index) => {
        const key = `${id}-${block.type}-${index}`;

        if (block.type === "paragraph") {
          return (
            <div key={key} className="case-study-block">
              <MarkdownFragment text={block.text} />
            </div>
          );
        }

        if (block.type === "subsection") {
          return (
            <div key={key} className="case-study-subsection">
              <h3 className="case-study-subsection-title">{block.title}</h3>
              {block.body ? (
                <div className="case-study-prose">
                  <MarkdownFragment text={block.body} />
                </div>
              ) : null}
            </div>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={key} className="case-study-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.src} alt={block.alt} />
              {block.alt ? (
                <figcaption className="case-study-media-caption">
                  {block.alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "callout") {
          return (
            <blockquote key={key} className="case-study-callout">
              <p>{block.text}</p>
            </blockquote>
          );
        }

        return (
          <div key={key} className="case-study-prose">
            <MarkdownFragment text={block.text} />
          </div>
        );
      })}
    </section>
  );
}

export function CaseStudyContent({ markdown }: CaseStudyContentProps) {
  const body = getCaseStudyBody(markdown);
  const sections = splitMarkdownSections(body).map(({ heading, content }) =>
    parseSection(heading, content),
  );

  return (
    <article className="case-study-content">
      <div className="case-study-body">
        {sections.map((section) => (
          <CaseStudySectionView
            key={slugifyHeading(section.heading)}
            section={section}
          />
        ))}
      </div>
    </article>
  );
}
