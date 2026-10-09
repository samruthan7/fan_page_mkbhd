import { NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  name: z.string().trim().max(80).optional(),
  interests: z.array(z.string()).max(10).optional(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { email, name, interests, website } = parsed.data;

  // Bots fill hidden fields. Pretend success, save nothing.
  if (website) return NextResponse.json({ ok: true });

  const { error } = await supabase
    .from("subscribers")
    .insert({ email, name: name || null, interests: interests ?? [] });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "You're already subscribed" },
        { status: 409 }
      );
    }
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}