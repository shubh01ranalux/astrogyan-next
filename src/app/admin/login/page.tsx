"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-8 shadow-xl backdrop-blur-md"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-[#B784A7]">
          Admin Console
        </p>

        <h1 className="mt-4 font-display text-5xl text-[#5C3A57]">
          Login
        </h1>

        <p className="mt-3 text-[#6F5B69]">
          Access Astrogyan content management securely.
        </p>

        <div className="mt-8 space-y-4">
          <input
            className="field"
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full rounded-full bg-[#5C3A57] px-6 py-3 font-medium text-[#F6EEE8] transition hover:bg-[#B784A7] disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}