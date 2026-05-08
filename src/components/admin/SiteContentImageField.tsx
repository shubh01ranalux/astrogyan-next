"use client";

import { useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

type SiteContentImageFieldProps = {
  name: string;
  defaultValue?: string;
};

export default function SiteContentImageField({
  name,
  defaultValue = "",
}: SiteContentImageFieldProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={value} />

      <ImageUpload
        value={value}
        onChange={setValue}
        folder="site-content"
      />
    </div>
  );
}