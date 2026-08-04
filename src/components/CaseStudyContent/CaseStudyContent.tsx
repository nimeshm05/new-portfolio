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

function childrenToText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }
  return "";
}

type HastNode = {
  type?: string;
  tagName?: string;
  value?: string;
  children?: HastNode[];
};

function isMediaOnlyParagraph(
  children: ReactNode,
  node?: HastNode,
): boolean {
  if (node?.children) {
    const elements = node.children.filter((child) => child.type === "element");
    const hasText = node.children.some(
      (child) => child.type === "text" && Boolean(child.value?.trim()),
    );

    if (!hasText && elements.length === 1 && elements[0]?.tagName === "img") {
      return true;
    }
  }

  const nodes = Children.toArray(children).filter((child) => {
    if (typeof child === "string") return child.trim().length > 0;
    return true;
  });

  if (nodes.length !== 1) return false;

  const only = nodes[0];
  if (!isValidElement(only)) return false;

  const props = only.props as { className?: string; src?: string };

  // react-markdown passes the custom `img` element here (with `src`),
  // not the rendered <figure> — detect either form.
  return (
    props.className === "case-study-media" || typeof props.src === "string"
  );
}

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

export function CaseStudyContent({ markdown }: CaseStudyContentProps) {
  const body = getCaseStudyBody(markdown);

  return (
    <article className="case-study-content">
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
            p: ({ children, node }) => {
              if (isMediaOnlyParagraph(children, node as HastNode | undefined)) {
                return <>{children}</>;
              }
              return <p>{children}</p>;
            },
            hr: () => <hr className="case-study-divider" />,
          }}
        >
          {body}
        </ReactMarkdown>
      </div>
    </article>
  );
}
