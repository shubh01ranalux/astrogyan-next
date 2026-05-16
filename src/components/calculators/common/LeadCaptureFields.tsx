export type CalculatorLeadData = {
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth: string;
};

type LeadCaptureFieldsProps = {
  showDateOfBirth?: boolean;
};

export default function LeadCaptureFields({
  showDateOfBirth = false,
}: LeadCaptureFieldsProps) {
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

      {showDateOfBirth && (
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
      )}

      <select name="gender" className="field w-full" required>
        <option value="">Gender</option>
        <option>Female</option>
        <option>Male</option>
        <option>Other</option>
      </select>
    </div>
  );
}

export function getCalculatorLeadData(formData: FormData): CalculatorLeadData {
  return {
    fullName: String(formData.get("full_name") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    gender: String(formData.get("gender") || ""),
    dateOfBirth: String(formData.get("date_of_birth") || ""),
  };
}