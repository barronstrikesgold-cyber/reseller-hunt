import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reseller Hunt",
  description:
    "Aisle-speed buy/pass list for Hot Wheels, Matchbox, Pokémon, and Goodwill. Checks stay on this phone.",
  applicationName: "Reseller Hunt",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Reseller Hunt",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0c0d10",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0c0d10] font-sans text-zinc-50">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
