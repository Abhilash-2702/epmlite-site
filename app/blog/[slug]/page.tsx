import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { POSTS } from "@/lib/posts";
import PostBody from "@/components/PostBody";
import NewsletterSignup from "@/components/NewsletterSignup";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="bg-white pt-8 pb-10 lg:pt-12 lg:pb-14 border-b border-surface-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">
            {post.category}
          </p>
          <h1 className="font-display font-bold text-3xl lg:text-5xl text-slate-900 tracking-tight text-balance leading-[1.1]">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <time className="font-mono tabular-nums">{post.date}</time>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTimeMin} min read
            </span>
          </div>
          <div className="mt-8">
            <PostBody body={post.body} />
          </div>
        </div>
      </article>

      {/* Newsletter */}
      <section className="bg-surface-50 py-10 lg:py-14 border-t border-surface-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <NewsletterSignup variant="card" />
        </div>
      </section>

      {/* Other posts */}
      {others.length > 0 && (
        <section className="bg-white py-10 lg:py-14 border-t border-surface-200">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-2xl text-slate-900 mb-6">
              More like this
            </h2>
            <div className="space-y-4">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/blog/${o.slug}`}
                  className="block rounded-xl bg-surface-50 border border-surface-200 p-5 hover:border-brand-200 hover:shadow-card transition-all group"
                >
                  <h3 className="font-display font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {o.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{o.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-brand-600 text-sm font-semibold">
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
