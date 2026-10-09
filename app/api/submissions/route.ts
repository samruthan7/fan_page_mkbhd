import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  name: z.string().min(1).max(60),
  email: z.string().email().max(254),
  category: z.enum(["Video idea", "Setup photo", "Question"]),
  message: z.string().min(10).max(500),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check your details (message needs 10+ characters)" }, { status: 400 });
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { website, ...row } = parsed.data;
  const { error } = await supabase.from("fan_submissions").insert({ ...row, status: "pending" });
  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error, try again" }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}