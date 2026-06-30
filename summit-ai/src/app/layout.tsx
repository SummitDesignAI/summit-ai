import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ClickSound from "@/components/ClickSound";
import IntroScreen from "@/components/IntroScreen";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Summit AI — AI Tools for Local Businesses",
  description: "Generate Google review replies, social media posts, quotes, proposals and more. One subscription, unlimited AI power for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bebasNeue.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <IntroScreen />
        <CustomCursor />
        <ClickSound />
        {children}
      </body>
    </html>
  );
}
