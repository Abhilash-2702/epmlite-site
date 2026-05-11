import { createFileRoute, useParams } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/page-placeholder";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({ meta: [{ title: "Post — NashOS Blog" }] }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const pretty = slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  return (
    <PagePlaceholder
      eyebrow="Blog post"
      title={pretty}
      lede="This post is being rebuilt under the new site. The full archive lands soon — drop us your email if you want it sent over when it does."
    />
  );
}
