import {
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/data/case-studies";
import "./CaseStudyContent.css";

type CaseStudyContentProps = {
  markdown: string;
};

type MetaField = {
  label: string;
  value: string;
};

function childrenToText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }
  return "";
}

function isMediaOnlyParagraph(children: ReactNode): boolean {
  const nodes = Children.toArray(children).filter((child) => {
    if (typeof child === "string") return child.trim().length > 0;
    return true;
  });

  if (nodes.length !== 1) return false;

  const only = nodes[0];
  return (
    isValidElement(only) &&
    only.type === "figure" &&
    (only.props as { className?: string }).className === "case-study-media"
  );
}

/** Prefer design order for the 2×2 meta grid when labels match. */
const META_ORDER = ["Company", "Timeline", "Client", "Role"];

function parseCaseStudyMarkdown(markdown: string): {
  meta: MetaField[];
  body: string;
} {
  const lines = markdown.replace(/^\uFEFF/, "").split(/\r?\n/);
  const meta: MetaField[] = [];
  let index = 0;

  // Skip optional H1 title line
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

    meta.push({ label: match[1].trim(), value: match[2].trim() });
    index += 1;
  }

  while (lines[index] !== undefined && lines[index].trim() === "") {
    index += 1;
  }

  const orderedMeta = [...meta].sort((a, b) => {
    const ai = META_ORDER.indexOf(a.label);
    const bi = META_ORDER.indexOf(b.label);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return {
    meta: orderedMeta,
    body: lines.slice(index).join("\n").trim(),
  };
}

export function CaseStudyContent({ markdown }: CaseStudyContentProps) {
  const { meta, body } = parseCaseStudyMarkdown(markdown);

  return (
    <article className="case-study-content">
      {meta.length > 0 ? (
        <>
          <dl className="case-study-meta">
            {meta.map((field) => (
              <div key={field.label} className="case-study-meta-item">
                <dt className="case-study-meta-label">{field.label}</dt>
                <dd className="case-study-meta-value">{field.value}</dd>
              </div>
            ))}
          </dl>
          <hr className="case-study-meta-divider" />
        </>
      ) : null}

      <div className="case-study-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: () => null,
            h2: ({ children }) => {
              const id = slugifyHeading(childrenToText(children));
              return <h2 id={id}>{children}</h2>;
            },
            blockquote: ({ children }) => (
              <blockquote className="case-study-callout">{children}</blockquote>
            ),
            img: ({ src, alt }) => {
              if (!src) return null;
              return (
                <figure className="case-study-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={alt ?? ""} />
                  {alt ? (
                    <figcaption className="case-study-media-caption">
                      {alt}
                    </figcaption>
                  ) : null}
                </figure>
              );
            },
            p: ({ children }) => {
              if (isMediaOnlyParagraph(children)) {
                return <>{children}</>;
              }
              return <p>{children}</p>;
            },
          }}
        >
          {body}
        </ReactMarkdown>
      </div>
    </article>
  );
}
