import type { SupabaseClient } from "@supabase/supabase-js";

type SaveCalculatorLeadArgs = {
  supabase: SupabaseClient;
  sourceSlug: string;
  sourceTitle: string;
  sourceUrl: string;
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  dateOfBirth?: string | null;
  leadIntent?: string;
  inputData?: Record<string, unknown>;
  resultData?: Record<string, unknown>;
};

export async function saveCalculatorLead({
  supabase,
  sourceSlug,
  sourceTitle,
  sourceUrl,
  fullName,
  phone,
  email,
  gender,
  dateOfBirth = null,
  leadIntent = "Used calculator",
  inputData = {},
  resultData = {},
}: SaveCalculatorLeadArgs) {
  const { error } = await supabase.from("leads").insert({
    source_type: "calculator",
    source_slug: sourceSlug,
    source_title: sourceTitle,
    source_url: sourceUrl,

    full_name: fullName,
    phone,
    email,
    date_of_birth: dateOfBirth,
    gender,

    lead_intent: leadIntent,
    input_data: inputData,
    result_data: resultData,
  });

  if (error) {
    console.error("Calculator lead save failed:", error);
  }
}