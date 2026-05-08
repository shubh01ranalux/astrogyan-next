import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { getPublishedBlogs } from "@/lib/blogs";

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Astrogyan Blog"
        title="Astrology Insights & Guidance"
        description="Read practical Vedic astrology insights, Panchang guidance, gemstone education, festival notes, and spiritual wisdom."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length === 0 && (
            <p className="text-[#6F5B69]">No blogs published yet.</p>
          )}

          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group rounded-[2rem] border border-[#E6C89C]/40 bg-white/55 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/75"
            >
              {blog.cover_image && (
                <div className="mb-5 h-48 overflow-hidden rounded-[1.5rem] bg-[#F6EEE8]">
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                {blog.category || "Astrology"}
              </p>

              <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
                {blog.title}
              </h2>

              <p className="mt-4 leading-7 text-[#6F5B69]">
                {blog.excerpt || "Read this Astrogyan insight."}
              </p>

              <p className="mt-6 text-sm font-medium text-[#5C3A57]">
                Read More →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}