const gear = [
  { name: "Flagship Phone", desc: "Your pick and why." },
  { name: "Desk Setup", desc: "Monitor, keyboard, lighting." },
  { name: "Camera", desc: "Cameras used for video work." },
];

export default function GearPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Gear</h1>
      <div className="card-hover rounded-xl border border-white/10 bg-white/5 p-5">
        {gear.map((g) => (
          <div key={g.name} className="rounded-lg border p-4">
            <h2 className="font-semibold text-red-500">{g.name}</h2>
            <p className="text-sm text-muted-foreground">{g.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
