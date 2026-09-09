import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reseller Hunt",
  description:
    "Aisle buy/pass. Shelf vs stored sold, cash left after fees and ship. Checks stay on this phone.",
  applicationName: "Hunt",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hunt",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#F2F2F7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#F2F2F7] text-black">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
