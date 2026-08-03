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

export function CaseStudyContent({ markdown }: CaseStudyContentProps) {
  return (
    <article className="case-study-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null,
          h2: ({ children }) => {
            const id = slugifyHeading(childrenToText(children));
            return <h2 id={id}>{children}</h2>;
          },
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <figure className="case-study-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt ?? ""} />
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
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
