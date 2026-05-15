import Image from "next/image";

type AboutAstrologerSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
};

export default function AboutAstrologerSection({
  eyebrow,
  title,
  description,
  image,
}: AboutAstrologerSectionProps) {
  return (
    <section className="px-6 py-24 sm:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2.5rem] border border-[#E6C89C]/40 bg-white/60 p-6 shadow-sm backdrop-blur-md md:grid-cols-[0.9fr_1.1fr] md:p-10">
        <div className="overflow-hidden rounded-[2rem] border border-[#E6C89C]/40 bg-[#F6EEE8]">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={700}
              height={850}
              className="h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center text-6xl">
              ✦
            </div>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#B784A7]">
            {eyebrow}
          </p>

          <h2 className="mt-4 font-display text-4xl text-[#5C3A57] sm:text-5xl">
            {title}
          </h2>

          <p className="mt-6 whitespace-pre-line text-lg leading-9 text-[#6F5B69]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}