import { supabase } from "@/lib/supabase";
import { SubmissionForm } from "@/components/submission-form";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const { data } = await supabase
    .from("fan_submissions")
    .select("id,name,category,message,created_at")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return (
    <main className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Community</h1>
      <SubmissionForm />
      <h2 className="text-xl font-semibold">Fan wall</h2>
      <div className="grid gap-3">
        {data?.length ? data.map((s) => (
          <div key={s.id} className="card-hover rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs text-red-500">{s.category}</p>
            <p>{s.message}</p>
            <p className="text-sm text-muted-foreground mt-1">by {s.name}</p>
          </div>
        )) : <p className="text-muted-foreground">No approved posts yet.</p>}
      </div>
    </main>
  );
}
