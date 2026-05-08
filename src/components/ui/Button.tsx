type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button className="rounded-full border border-[#E6C89C] bg-[#5C3A57] px-6 py-3 text-sm font-medium text-[#F6EEE8] transition-all duration-300 hover:scale-105 hover:bg-[#B784A7]">
      {children}
    </button>
  );
}