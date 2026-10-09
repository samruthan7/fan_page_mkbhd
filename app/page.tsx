import { SubscribeForm } from "@/components/subscribe-form";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold text-red-500">MKBHD Fan Hub</h1>
      <p className="text-muted-foreground">Quality tech, explained.</p>
      <div className="w-full max-w-sm">
        <SubscribeForm />
      </div>
    </main>
  );
}