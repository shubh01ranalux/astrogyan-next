import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { getFreeToolBySlug } from "@/lib/free-tools";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getFreeToolBySlug(slug);

  if (!tool) {
    return {
      title: "Free Tool Not Found | AstroGyan",
    };
  }

  return {
    title: `${tool.title} | Free Astrology Tool | AstroGyan`,
    description: tool.description,
  };
}

export default async function FreeToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getFreeToolBySlug(slug);

  if (!tool) notFound();

  const isLive = tool.status === "Live";
  const isBeta = tool.status === "Beta";

  return (
    <>
      <Navbar />

      <main>
        <PageHero
          eyebrow={tool.category}
          title={tool.title}
          description={tool.description}
        />

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-8 text-center shadow-sm backdrop-blur-md md:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E6C89C]/25 text-5xl">
              {tool.icon || "✦"}
            </div>

            <span className="inline-flex rounded-full bg-[#D8A7B1]/25 px-4 py-2 text-sm font-medium text-[#5C3A57]">
              {tool.status}
            </span>

            {isLive && tool.link ? (
              <>
                <h2 className="mt-8 font-display text-3xl text-[#5C3A57]">
                  This tool is live
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6F5B69]">
                  You can open this AstroGyan free tool and start using it now.
                </p>

                <Link
                  href={tool.link}
                  className="mt-8 inline-flex rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7]"
                >
                  {tool.button_text || "Open Tool"}
                </Link>
              </>
            ) : isBeta ? (
              <>
                <h2 className="mt-8 font-display text-3xl text-[#5C3A57]">
                  Beta access is opening soon
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6F5B69]">
                  This tool is being tested and improved before public release.
                  You can still explore the tool from the Free Tools page.
                </p>

                <Link
                  href="/free-tools"
                  className="mt-8 inline-flex rounded-full border border-[#5C3A57]/20 px-8 py-3 text-sm font-medium text-[#5C3A57] transition hover:bg-[#5C3A57] hover:text-[#F6EEE8]"
                >
                  Back to Free Tools
                </Link>
              </>
            ) : (
              <>
                <h2 className="mt-8 font-display text-3xl text-[#5C3A57]">
                  Coming Soon
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#6F5B69]">
                  This AstroGyan tool is currently being prepared. It will be
                  available soon.
                </p>

                <Link
                  href="/book"
                  className="mt-8 inline-flex rounded-full bg-[#5C3A57] px-8 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#B784A7]"
                >
                  Book Consultation Instead
                </Link>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}