type AdminStatCardProps = {
  label: string;
  value: string;
};

export default function AdminStatCard({ label, value }: AdminStatCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/60 p-6 shadow-sm backdrop-blur-md">
      <p className="text-sm text-[#B784A7]">{label}</p>
      <h3 className="mt-3 font-display text-4xl text-[#5C3A57]">{value}</h3>
    </div>
  );
}