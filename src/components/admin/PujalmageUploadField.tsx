"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PujaImageUploadField({ value, onChange }: Props) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

  async function handleUpload(file: File) {
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const filePath = `puja-services/${fileName}`;

    const { error } = await supabase.storage
      .from("puja-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error);
      alert("Image upload failed.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("puja-images")
      .getPublicUrl(filePath);

    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="space-y-3">
      {value && (
        <img
          src={value}
          alt="Puja preview"
          className="h-40 w-full rounded-xl object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        className="field w-full"
      />

      {uploading && (
        <p className="text-sm text-[#B784A7]">Uploading image...</p>
      )}
    </div>
  );
}