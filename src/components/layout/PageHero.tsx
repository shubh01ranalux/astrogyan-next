type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="px-6 pt-36 pb-20 sm:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-[#B784A7]">
          {eyebrow}
        </p>

        <h1 className="mt-5 font-display text-5xl leading-tight text-[#5C3A57] sm:text-7xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#6F5B69]">
          {description}
        </p>
      </div>
    </section>
  );
}