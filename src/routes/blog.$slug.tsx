import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/page-sections";
import { POSTS, CATEGORY_LABEL } from "@/lib/posts";
import { StickyCta } from "@/components/sticky-cta";
import { absoluteUrl, DEFAULT_OG_IMAGE, seo } from "@/lib/seo";
import { TEAM_BY_ID, personId } from "@/lib/team";

export const Route = createFileRoute("/blog/$slug")({
  // Every post used to emit the same title, "Post — NashOS Blog", with no
  // description and no canonical — so the whole archive looked to a crawler
  // like one duplicated page. Derive both from the post itself.
  head: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) {
      return seo({
        title: "Post not found — NashOS Blog",
        description: "This post has moved or is being rebuilt under the new site.",
        path: `/blog/${params.slug}`,
        breadcrumbs: [{ name: "Blog", path: "/blog" }],
        noindex: true,
      });
    }
    const base = seo({
      title: `${post.title} | NashOS`,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: "article",
      breadcrumbs: [
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ],
    });
    // BlogPosting with a named Person author — the E-E-A-T signal the 2026-09
    // audit asked for. The author @id is the same one /about's Person graph
    // uses, so both resolve to one entity.
    const author = TEAM_BY_ID[post.author];
    const url = absoluteUrl(`/blog/${post.slug}`);
    const article = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: url,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      articleSection: CATEGORY_LABEL[post.category] ?? post.category,
      wordCount: post.body.split(/\s+/).length,
      image: DEFAULT_OG_IMAGE,
      author: {
        "@type": "Person",
        "@id": personId(author.id),
        name: author.name,
        jobTitle: author.role,
        url: personId(author.id),
      },
      publisher: { "@id": "https://nashos.ai/#organization" },
    };
    return {
      ...base,
      scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(article) }],
    };
  },
  // Unknown slugs used to render a friendly "being rebuilt" page with HTTP 200
  // - a soft 404. Any /blog/<anything> looked like a real page to a crawler,
  // so junk URLs could be indexed and the archive looked larger than it is.
  // notFound() returns a genuine 404 status and the branded not-found page.
  loader: ({ params }) => {
    if (!POSTS.some((p) => p.slug === params.slug)) throw notFound();
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = POSTS.find((p) => p.slug === slug);
  const others = post ? POSTS.filter((p) => p.slug !== slug).slice(0, 2) : [];

  // Unknown slugs never reach here — the loader throws notFound(). Type guard.
  if (!post) return null;
  const author = TEAM_BY_ID[post.author];

  return (
    // Same trail the head() passes to seo({ breadcrumbs }) — Google requires the
    // markup to reflect something the page actually shows.
    <PageShell
      crumbs={[
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]}
    >
      <article className="relative mx-auto max-w-3xl px-6 lg:px-10 pt-8 pb-12">
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
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{post.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>
            By{" "}
            <Link
              to="/about"
              hash="team"
              className="font-medium text-foreground/90 hover:text-gold transition-colors"
            >
              {author.name}
            </Link>
            , {author.role}
          </span>
          <span>·</span>
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
      <StickyCta label="Try with your data" to="/try" />
    </PageShell>
  );
}
