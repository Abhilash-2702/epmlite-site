import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Tiny markdown-ish renderer for blog post bodies. We avoid pulling in MDX
 * just for three posts — supports paragraphs, ## h2, > blockquote, - bullets,
 * and inline [text](url) links.
 */
export default function PostBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="prose prose-slate max-w-none">
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}

function renderBlock(b: string, i: number) {
  if (b.startsWith("## ")) {
    return (
      <h2
        key={i}
        className="font-display font-bold text-2xl lg:text-3xl text-slate-900 tracking-tight mt-10 mb-3"
      >
        {renderInline(b.replace(/^## /, ""))}
      </h2>
    );
  }
  if (b.startsWith("> ")) {
    return (
      <blockquote
        key={i}
        className="border-l-4 border-brand-500 bg-brand-50 pl-5 pr-4 py-3 my-6 rounded-r-lg text-slate-700 italic"
      >
        {renderInline(b.replace(/^> /, ""))}
      </blockquote>
    );
  }
  if (b.split("\n").every((line) => line.trim().startsWith("- ") || line.trim().startsWith("* "))) {
    return (
      <ul key={i} className="list-disc pl-6 space-y-2 my-5 text-slate-700 leading-relaxed">
        {b.split("\n").map((line, j) => (
          <li key={j}>{renderInline(line.replace(/^[-*] /, ""))}</li>
        ))}
      </ul>
    );
  }
  if (/^\d+\.\s/.test(b.split("\n")[0] ?? "")) {
    return (
      <ol key={i} className="list-decimal pl-6 space-y-2 my-5 text-slate-700 leading-relaxed">
        {b.split("\n").map((line, j) => (
          <li key={j}>{renderInline(line.replace(/^\d+\.\s/, ""))}</li>
        ))}
      </ol>
    );
  }
  return (
    <p key={i} className="text-base lg:text-lg text-slate-700 leading-relaxed my-4">
      {renderInline(b)}
    </p>
  );
}

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) out.push(text.slice(lastIndex, match.index));
    const tok = match[0];
    if (tok.startsWith("**")) {
      out.push(
        <strong key={`b${key++}`} className="font-semibold text-slate-900">
          {tok.replace(/\*\*/g, "")}
        </strong>
      );
    } else if (tok.startsWith("[")) {
      const m = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        const [, label, href] = m;
        const isInternal = href.startsWith("/");
        if (isInternal) {
          out.push(
            <Link key={`l${key++}`} href={href} className="text-brand-600 hover:text-brand-700 underline underline-offset-2">
              {label}
            </Link>
          );
        } else {
          out.push(
            <a
              key={`l${key++}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 underline underline-offset-2"
            >
              {label}
            </a>
          );
        }
      }
    } else if (tok.startsWith("`")) {
      out.push(
        <code key={`c${key++}`} className="font-mono text-sm bg-surface-100 text-slate-800 px-1.5 py-0.5 rounded">
          {tok.replace(/`/g, "")}
        </code>
      );
    }
    lastIndex = match.index + tok.length;
  }
  if (lastIndex < text.length) out.push(text.slice(lastIndex));
  return out;
}
