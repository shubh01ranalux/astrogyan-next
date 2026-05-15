import AdminLayout from "@/components/admin/AdminLayout";
import { requireAdminAccess } from "@/lib/admin-permissions";
import { createClient } from "@/lib/supabase/server";
import { encryptSecret, hashOtp } from "@/lib/secret-crypto";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

async function getApiKeys() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("admin_api_keys")
    .select("id,key_name,label,last_four,group_name,is_active,updated_at")
    .order("group_name", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

async function sendOtp() {
  "use server";

  const admin = await requireAdminAccess("api-keys");
  const supabase = await createClient();

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const codeHash = hashOtp(code);

  await supabase.from("admin_2fa_challenges").insert({
    user_id: admin.user_id,
    code_hash: codeHash,
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  });

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to: admin.email,
    subject: "Astrogyan API Keys 2FA Code",
    html: `
      <h2>Your Astrogyan 2FA Code</h2>
      <p>Use this code to unlock API Keys:</p>
      <h1>${code}</h1>
      <p>This code expires in 10 minutes.</p>
    `,
  });

  revalidatePath("/admin/api-keys");
}

async function verifyOtp(formData: FormData) {
  "use server";

  const admin = await requireAdminAccess("api-keys");
  const code = String(formData.get("otp") || "");
  const supabase = await createClient();

  const { data } = await supabase
    .from("admin_2fa_challenges")
    .select("*")
    .eq("user_id", admin.user_id)
    .eq("code_hash", hashOtp(code))
    .eq("used", false)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) return;

  await supabase
    .from("admin_2fa_challenges")
    .update({ used: true })
    .eq("id", data.id);

  const cookieStore = await cookies();

  cookieStore.set("astrogyan_api_keys_2fa", "verified", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60,
    path: "/admin/api-keys",
  });

  revalidatePath("/admin/api-keys");
}

async function updateApiKey(formData: FormData) {
  "use server";

  await requireAdminAccess("api-keys");

  const cookieStore = await cookies();
  const verified = cookieStore.get("astrogyan_api_keys_2fa")?.value;

  if (verified !== "verified") return;

  const id = String(formData.get("id") || "");
  const value = String(formData.get("value") || "");
  const isActive = formData.get("is_active") === "on";

  const supabase = await createClient();

  const updatePayload: Record<string, string | boolean> = {
    is_active: isActive,
  };

  if (value.trim()) {
    updatePayload.encrypted_value = encryptSecret(value.trim());
    updatePayload.last_four = value.trim().slice(-4);
  }

  await supabase
    .from("admin_api_keys")
    .update({
      ...updatePayload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/admin/api-keys");
}

export default async function ApiKeysPage() {
  await requireAdminAccess("api-keys");

  const cookieStore = await cookies();
  const verified =
    cookieStore.get("astrogyan_api_keys_2fa")?.value === "verified";

  const keys = verified ? await getApiKeys() : [];

  return (
    <AdminLayout
      title="API Keys"
      description="Super admin only. Manage encrypted API keys after 2FA verification."
    >
      {!verified ? (
        <div className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm">
          <h2 className="font-display text-2xl text-[#5C3A57]">
            2FA Verification Required
          </h2>

          <p className="mt-2 text-sm text-[#6F5B69]">
            To access API keys, send a one-time code to your super admin email.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <form action={sendOtp}>
              <button className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-white">
                Send 2FA Code
              </button>
            </form>

            <form action={verifyOtp} className="flex gap-3">
              <input
                name="otp"
                placeholder="Enter 6-digit code"
                className="rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              />

              <button className="rounded-full border border-[#5C3A57]/20 px-6 py-3 text-sm font-medium text-[#5C3A57]">
                Verify
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {keys.map((item) => (
            <form
              key={item.id}
              action={updateApiKey}
              className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/70 p-6 shadow-sm"
            >
              <input type="hidden" name="id" value={item.id} />

              <div className="mb-4">
                <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                  {item.group_name}
                </p>

                <h2 className="mt-2 font-display text-2xl text-[#5C3A57]">
                  {item.label}
                </h2>

                <p className="mt-1 text-sm text-[#6F5B69]">
                  Key: {item.key_name} · Saved:{" "}
                  {item.last_four ? `••••${item.last_four}` : "Not added"}
                </p>
              </div>

              <input
                name="value"
                type="password"
                placeholder="Paste new key to replace existing"
                className="w-full rounded-xl border border-[#E6C89C]/50 bg-white px-4 py-3 text-sm text-[#5C3A57] outline-none"
              />

              <div className="mt-4 flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-[#5C3A57]">
                  <input
                    name="is_active"
                    type="checkbox"
                    defaultChecked={item.is_active}
                    className="h-4 w-4 accent-[#5C3A57]"
                  />
                  Active
                </label>

                <button className="rounded-full bg-[#5C3A57] px-6 py-3 text-sm font-medium text-white">
                  Save Key
                </button>
              </div>
            </form>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}