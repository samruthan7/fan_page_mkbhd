import Link from "next/link";
import { SubscribeForm } from "@/components/subscribe-form";

const features = [
  { href: "/videos", title: "Videos", desc: "Watch the latest uploads." },
  { href: "/gear", title: "Gear", desc: "Phones, desk setups and cameras." },
  { href: "/community", title: "Community", desc: "Share ideas on the fan wall." },
];

export default function Home() {
  return (
    <main>
      <section className="bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.25),transparent_60%)] px-6 py-24 text-center">
        <p className="mb-3 text-sm uppercase tracking-widest text-red-500">Fan-made hub</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Quality tech, <span className="text-red-500">explained.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Videos, gear and a community for fans of MKBHD. Join the newsletter to stay in the loop.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <SubscribeForm />
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-20 sm:grid-cols-3">
        {features.map((f) => (
          <Link key={f.href} href={f.href} className="card-hover rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-red-500">{f.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}