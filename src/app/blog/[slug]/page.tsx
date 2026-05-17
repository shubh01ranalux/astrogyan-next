import { createMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { getBlogBySlug } from "@/lib/blogs";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getBlogExcerpt(blog: any) {
  return (
    blog.short_excerpt ||
    blog.excerpt ||
    blog.description ||
    "Read this AstroGyan astrology insight."
  );
}

function renderInlineText(text: string) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);

  return parts.map((part, index) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);

    if (match) {
      return (
        <a
          key={index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#B784A7] underline underline-offset-4 hover:text-[#5C3A57]"
        >
          {match[1]}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function renderBlogContent(content: string) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line, index) => {
    if (line === "___" || line === "---" || line.includes("_____")) {
      return (
        <div
          key={index}
          className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[#E6C89C] to-transparent"
        />
      );
    }

    if (line.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-12 rounded-2xl border border-[#E6C89C]/40 bg-[#FFF9F4]/80 px-6 py-4 font-display text-3xl text-[#5C3A57]"
        >
          {line.replace("## ", "")}
        </h2>
      );
    }

    if (line.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-8 font-display text-2xl text-[#5C3A57]"
        >
          {line.replace("### ", "")}
        </h3>
      );
    }

    if (line.startsWith("> ")) {
      return (
        <blockquote
          key={index}
          className="my-6 rounded-2xl border-l-4 border-[#B784A7] bg-[#FFF9F4]/80 p-5 font-medium leading-8 text-[#5C3A57]"
        >
          {renderInlineText(line.replace("> ", ""))}
        </blockquote>
      );
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <div
          key={index}
          className="flex gap-3 rounded-2xl bg-white/70 px-5 py-3 text-[#6F5B69]"
        >
          <span className="mt-1 text-[#B784A7]">✦</span>
          <p className="leading-8">{renderInlineText(line.replace(/^[-*]\s/, ""))}</p>
        </div>
      );
    }

    if (/^\d+\.\s/.test(line)) {
      const number = line.match(/^(\d+)\./)?.[1];

      return (
        <div
          key={index}
          className="flex gap-4 rounded-2xl border border-[#E6C89C]/40 bg-[#FFF9F4]/70 p-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5C3A57] text-sm font-bold text-white">
            {number}
          </span>

          <p className="leading-8 text-[#6F5B69]">
            {renderInlineText(line.replace(/^\d+\.\s/, ""))}
          </p>
        </div>
      );
    }

    if (
      line.toLowerCase().startsWith("important note") ||
      line.toLowerCase().startsWith("note:")
    ) {
      return (
        <div
          key={index}
          className="my-8 rounded-[1.5rem] border border-[#E6C89C]/50 bg-[#FFF9F4] p-6 shadow-sm"
        >
          <p className="font-display text-2xl text-[#5C3A57]">
            {renderInlineText(line)}
          </p>
        </div>
      );
    }

    return (
      <p key={index} className="text-lg leading-9 text-[#6F5B69]">
        {renderInlineText(line)}
      </p>
    );
  });
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return createMetadata({
      title: "Blog Not Found",
      description: "This AstroGyan blog could not be found.",
      path: `/blog/${slug}`,
    });
  }

  return createMetadata({
    title: blog.meta_title || blog.title,
    description: getBlogExcerpt(blog),
    path: `/blog/${blog.slug}`,
    image: blog.cover_image || undefined,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const excerpt = getBlogExcerpt(blog);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow={blog.category || "AstroGyan Blog"}
        title={blog.title}
        description={excerpt}
      />

      <article className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#E6C89C]/40 bg-white/65 p-6 shadow-xl backdrop-blur-md sm:p-10">
          {blog.cover_image && (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="mb-10 h-auto w-full rounded-[1.5rem] border border-[#E6C89C]/40 object-cover shadow-sm"
            />
          )}

          <div className="space-y-5">
            {renderBlogContent(blog.content || "")}
          </div>

          <div className="mt-12 rounded-[2rem] border border-[#E6C89C]/40 bg-[#5C3A57] p-7 text-center text-white">
            <h3 className="font-display text-3xl">
              Want to check this in your own Kundli?
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#F6EEE8]">
              You can generate your Kundli for free on AstroGyan and explore
              your planetary placements before booking a detailed consultation.
            </p>

            <p className="mt-4 break-words text-sm text-[#E6C89C]">
              https://www.astrogyanbynamansharma.com/free-tools/kundali-report
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}