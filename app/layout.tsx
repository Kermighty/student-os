import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppSessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
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
  title: {
    default: "Student OS — Premium Student Productivity Platform",
    template: "%s | Student OS",
  },
  description: "Student OS is a premium productivity platform for college students to manage courses, assignments, notes, schedules, expenses, and progress.",
  applicationName: "Student OS",
  generator: "Next.js",
  keywords: ["student productivity", "college planner", "assignments", "notes", "schedule", "student finance"],
  authors: [{ name: "Kermighty" }],
  openGraph: {
    type: "website",
    title: "Student OS — Premium Student Productivity Platform",
    description: "A premium productivity platform for college students.",
    siteName: "Student OS",
  },
  twitter: {
    card: "summary",
    title: "Student OS — Premium Student Productivity Platform",
    description: "A premium productivity platform for college students.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <AppSessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppSessionProvider>
      </body>
    </html>
  );
}
