"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { FreeTool } from "@/lib/free-tools";

export default function FreeToolsGrid({ tools }: { tools: FreeTool[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(tools.map((tool) => tool.category)))],
    [tools]
  );

  const filteredTools = useMemo(() => {
    if (activeCategory === "All") return tools;
    return tools.filter((tool) => tool.category === activeCategory);
  }, [tools, activeCategory]);

  if (tools.length === 0) {
    return <p className="text-center text-[#6F5B69]">No tools added yet.</p>;
  }

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-[#5C3A57] bg-[#5C3A57] text-white"
                  : "border-[#5C3A57]/15 bg-white text-[#5C3A57] hover:bg-[#5C3A57] hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/55 p-7 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/75"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E6C89C]/50 bg-[#F6EEE8] text-2xl text-[#5C3A57]">
              {tool.icon || "✦"}
            </div>

            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-[#B784A7]">
              {tool.category}
            </p>

            <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
              {tool.title}
            </h2>

            <p className="mt-4 leading-7 text-[#6F5B69]">
              {tool.description}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-[#E6C89C]/40 pt-5">
              <span
                className={`rounded-full px-4 py-2 text-xs font-medium ${
                  tool.status === "Live"
                    ? "bg-emerald-100 text-emerald-700"
                    : tool.status === "Beta"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-[#EADDE5] text-[#5C3A57]"
                }`}
              >
                {tool.status}
              </span>

              <Link
                href={tool.link || `/free-tools/${tool.slug}`}
                className="rounded-full bg-[#5C3A57] px-5 py-3 text-sm text-[#F6EEE8] transition hover:bg-[#B784A7]"
              >
                {tool.button_text || "View Tool"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}