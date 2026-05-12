import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/page-sections";
import { POSTS, CATEGORY_LABEL } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [{ title: "Post — NashOS Blog" }],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = POSTS.find((p) => p.slug === slug);
  const others = post ? POSTS.filter((p) => p.slug !== slug).slice(0, 2) : [];

  if (!post) {
    const pretty = slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
    return (
      <PageShell>
        <Section>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold mb-6 transition-colors mt-32"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
          <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight">{pretty}</h1>
          <p className="mt-6 text-muted-foreground">
            This post is being rebuilt under the new site. The full archive lands soon — drop
            us your email at{" "}
            <a href="mailto:admin@nashos.ai" className="text-gold hover:underline">
              admin@nashos.ai
            </a>{" "}
            if you want it sent over when it does.
          </p>
        </Section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <article className="relative mx-auto max-w-3xl px-6 lg:px-10 pt-32 pb-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>
        <p className="text-xs uppercase tracking-[0.2em] text-gold mb-3 font-semibold">
          {CATEGORY_LABEL[post.category] ?? post.category}
        </p>
        <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
          {post.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time className="font-mono tabular-nums">{post.date}</time>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTimeMin} min read
          </span>
        </div>
        <div className="prose prose-invert mt-8 max-w-none text-foreground/85 leading-relaxed space-y-5">
          {post.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      {others.length > 0 && (
        <Section>
          <h2 className="text-2xl font-semibold mb-6">More like this</h2>
          <div className="space-y-4 max-w-3xl">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/blog/$slug"
                params={{ slug: o.slug }}
                className="block surface-card p-5 hover:border-gold/40 transition-colors group"
              >
                <h3 className="font-semibold group-hover:text-gold transition-colors">
                  {o.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {o.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-gold text-sm font-semibold">
                  Read
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </PageShell>
  );
}
