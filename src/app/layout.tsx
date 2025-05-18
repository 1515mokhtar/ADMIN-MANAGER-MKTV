import "@/css/satoshi.css";
import "@/css/login.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import ClientLayout from "./client-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MKTV Admin Dashboard",
  description: "Admin dashboard for managing movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ClientLayout>
              {children}
            </ClientLayout>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
