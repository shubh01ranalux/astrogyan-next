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

export async function generateMetadata({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return createMetadata({
      title: "Blog Not Found",
      description: "This Astrogyan blog could not be found.",
      path: `/blog/${slug}`,
    });
  }

  return createMetadata({
    title: blog.title,
    description:
      blog.excerpt || "Read this Astrogyan astrology insight.",
    path: `/blog/${blog.slug}`,
    image: blog.cover_image || undefined,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow={blog.category || "Astrogyan Blog"}
        title={blog.title}
        description={blog.excerpt || "Astrogyan astrology insight."}
      />

      <article className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#E6C89C]/40 bg-white/60 p-7 shadow-sm backdrop-blur-md sm:p-10">
          {blog.cover_image && (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="mb-8 h-auto w-full rounded-[1.5rem] object-cover"
            />
          )}

          <div className="space-y-6 text-lg leading-9 text-[#6F5B69]">
            {blog.content.split("\n").map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}