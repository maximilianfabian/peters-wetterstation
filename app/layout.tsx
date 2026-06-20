import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biscuit — your patient companion",
  description:
    "A warm, patient companion that helps with everyday things. Big text, simple steps, always kind.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Let people zoom in if they want to — never block that.
  maximumScale: 5,
  themeColor: "#FAF6EF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
