import PlaceSearchInput from "@/components/forms/PlaceSearchInput";

export type AstrologyLeadData = {
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
  birthLatitude: number | null;
  birthLongitude: number | null;
  birthTimezone: number;
};

export default function AstrologyLeadFields() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <input
        name="full_name"
        className="field w-full"
        placeholder="Full Name"
        required
      />

      <input
        name="phone"
        className="field w-full"
        placeholder="Phone Number"
        required
      />

      <input
        name="email"
        type="email"
        className="field w-full"
        placeholder="Email Address"
        required
      />

      <select name="gender" className="field w-full" required>
        <option value="">Gender</option>
        <option>Female</option>
        <option>Male</option>
        <option>Other</option>
      </select>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
          Date of Birth
        </span>
        <input
          name="date_of_birth"
          type="date"
          className="field w-full"
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
          Birth Time
        </span>
        <input
          name="birth_time"
          type="time"
          className="field w-full"
          required
        />
      </label>

      <div className="sm:col-span-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#5C3A57]">
            Birth Place / City
          </span>
          <PlaceSearchInput />
        </label>
      </div>
    </div>
  );
}

export function getAstrologyLeadData(formData: FormData): AstrologyLeadData {
  const latitude = String(formData.get("birth_latitude") || "");
  const longitude = String(formData.get("birth_longitude") || "");
  const timezone = String(formData.get("birth_timezone") || "5.5");

  return {
    fullName: String(formData.get("full_name") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    gender: String(formData.get("gender") || ""),
    dateOfBirth: String(formData.get("date_of_birth") || ""),
    birthTime: String(formData.get("birth_time") || ""),
    birthPlace: String(formData.get("birth_place") || ""),
    birthLatitude: latitude ? Number(latitude) : null,
    birthLongitude: longitude ? Number(longitude) : null,
    birthTimezone: timezone ? Number(timezone) : 5.5,
  };
}