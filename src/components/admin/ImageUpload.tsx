"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
};

export default function ImageUpload({
  value,
  onChange,
  folder = "uploads",
}: ImageUploadProps) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file: File) {
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("astrogyan-media")
      .upload(fileName, file);

    if (!error) {
      const { data } = supabase.storage
        .from("astrogyan-media")
        .getPublicUrl(fileName);

      onChange(data.publicUrl);
    }

    setUploading(false);
  }

  return (
    <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/45 p-4">
      {value && (
        <img
          src={value}
          alt="Uploaded preview"
          className="mb-4 h-40 w-full rounded-[1rem] object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadImage(file);
        }}
        className="w-full text-sm text-[#5C3A57]"
      />

      {uploading && (
        <p className="mt-3 text-sm text-[#B784A7]">Uploading image...</p>
      )}

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mt-3 rounded-full bg-red-100 px-4 py-2 text-sm text-red-700"
        >
          Remove Image
        </button>
      )}
    </div>
  );
}