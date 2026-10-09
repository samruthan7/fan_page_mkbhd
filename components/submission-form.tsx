"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SubmissionForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setLoading(true);
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Thanks! Your post will appear once approved.");
      form.reset();
    } else {
      const j = await res.json();
      toast.error(j.error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-md">
      <Input name="name" placeholder="Your name" required />
      <Input name="email" type="email" placeholder="you@example.com" required />
      <select name="category" className="w-full rounded-md border bg-background p-2 text-sm">
        <option>Video idea</option>
        <option>Setup photo</option>
        <option>Question</option>
      </select>
      <Textarea name="message" placeholder="Your message (10+ characters)" required />
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <Button disabled={loading}>{loading ? "Sending..." : "Submit"}</Button>
    </form>
  );
}