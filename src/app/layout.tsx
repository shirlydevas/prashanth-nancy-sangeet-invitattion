import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://prashanth-nancy-sangeet-invitation.netlify.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prashanth & Nancy's Sangeet Night",
  description: "Join us for an evening of music, dance, and love.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Prashanth & Nancy's Sangeet Night",
    description: "Join us for an evening of music, dance, and love.",
    url: siteUrl,
    images: [
      {
        url: "/images/screen-image.png",
        width: 1600,
        height: 900,
        alt: "Prashanth & Nancy Sangeet Night Celebration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashanth & Nancy's Sangeet Night",
    description: "Join us for an evening of music, dance, and love.",
    images: ["/images/screen-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
