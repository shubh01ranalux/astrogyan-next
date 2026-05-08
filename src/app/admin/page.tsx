import AdminLayout from "@/components/admin/AdminLayout";
import AdminStatCard from "@/components/admin/AdminStatCard";
import { adminStats } from "@/data/admin";

export default function AdminPage() {
  return (
    <AdminLayout
      title="Dashboard"
      description="Manage Astrogyan services, bookings, blogs, testimonials, and site content."
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <AdminStatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/60 p-6 shadow-sm backdrop-blur-md">
          <h2 className="font-display text-3xl text-[#5C3A57]">
            Recent Bookings
          </h2>
          <p className="mt-3 text-[#6F5B69]">
            Booking requests will appear here after Supabase integration.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/60 p-6 shadow-sm backdrop-blur-md">
          <h2 className="font-display text-3xl text-[#5C3A57]">
            CMS Status
          </h2>
          <p className="mt-3 text-[#6F5B69]">
            Services, blogs, testimonials, and site settings will become
            editable from this console.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}