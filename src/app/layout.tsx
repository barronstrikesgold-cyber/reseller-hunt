import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finds",
  description:
    "If it is not on this list, leave it. Categories: Cars, Sports, Sneakers, Tech, Streetwear.",
  applicationName: "Finds",
  appleWebApp: {
    capable: true,
    title: "Finds",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#F2F2F7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <p className="sr-only">
          If it is not on this list, leave it. Cars, Sports, Sneakers, Tech,
          Streetwear.
        </p>
        {children}
      </body>
    </html>
  );
}
