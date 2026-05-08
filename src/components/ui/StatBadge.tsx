type StatBadgeProps = {
  value: string;
  label: string;
};

export default function StatBadge({
  value,
  label,
}: StatBadgeProps) {
  return (
    <div className="rounded-full border border-[#E6C89C]/40 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md">
      <p className="text-sm font-semibold text-[#5C3A57]">
        {value} {label}
      </p>
    </div>
  );
}