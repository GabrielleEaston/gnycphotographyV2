import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Wix_Madefor_Text, Newsreader } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";

import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";

/* --- metadata function unchanged --- */

const wix = Wix_Madefor_Text({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-wix",
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-news",
  weight: ["400", "500", "700"], // include 500 for your Medium titles
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${wix.variable} ${newsreader.variable} bg-white text-black h-full`}
    >
      <body className="min-h-[100svh] md:min-h-[100dvh] flex flex-col bg-white">
        {/* global helpers */}
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleError} />

        <Header />

        {/* grows to fill space so Footer sits at bottom */}
        <main className="flex-1">{children}</main>

        <Footer />

        <SpeedInsights />
      </body>
    </html>
  );
}
