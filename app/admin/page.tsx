import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function setStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!["approved", "rejected"].includes(status)) return;
  await supabase.from("fan_submissions").update({ status }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/community");
}

export default async function AdminPage() {
  const { data: subs } = await supabase.from("subscribers").select("email,created_at").order("created_at", { ascending: false });
  const { data: pending } = await supabase.from("fan_submissions").select("*").eq("status", "pending").order("created_at");

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Admin</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Subscribers ({subs?.length ?? 0})</h2>
        <ul className="text-sm space-y-1">{subs?.map((s) => <li key={s.email}>{s.email}</li>)}</ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Pending submissions ({pending?.length ?? 0})</h2>
        <div className="space-y-3">
          {pending?.map((p) => (
            <div key={p.id} className="rounded-lg border p-4">
              <p className="text-xs text-red-500">{p.category} · {p.name} · {p.email}</p>
              <p className="my-2">{p.message}</p>
              <form action={setStatus} className="flex gap-2">
                <input type="hidden" name="id" value={p.id} />
                <Button name="status" value="approved">Approve</Button>
                <Button name="status" value="rejected" variant="outline">Reject</Button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}