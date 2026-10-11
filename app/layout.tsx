import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MKBHD Fan Hub",
  description: "A fan project for MKBHD",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="font-bold tracking-tight">
              MKBHD <span className="text-red-500">Fan Hub</span>
            </Link>
            <div className="flex gap-5 overflow-x-auto text-sm text-muted-foreground">
              <Link href="/videos" className="hover:text-white transition-colors">Videos</Link>
              <Link href="/gear" className="hover:text-white transition-colors">Gear</Link>
              <Link href="/community" className="hover:text-white transition-colors">Community</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
            </div>
          </div>
        </nav>

        {children}

        <footer className="p-6 text-sm text-muted-foreground">
          Fan project, not affiliated with MKBHD.
        </footer>
        <Toaster />
      </body>
    </html>
  );
}