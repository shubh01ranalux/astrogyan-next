export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F6EEE8]">
      <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-[#D8A7B1]/30 blur-3xl" />
      <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-[#7FB8B4]/25 blur-3xl" />
      <div className="absolute bottom-[-15%] left-[25%] h-96 w-96 rounded-full bg-[#E6C89C]/35 blur-3xl" />

      <div className="absolute inset-0 opacity-[0.08]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,#5C3A57_1px,transparent_0)] [background-size:34px_34px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)]" />
    </div>
  );
}