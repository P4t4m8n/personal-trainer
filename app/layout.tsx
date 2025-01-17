import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/providers/App.provider";

export const metadata: Metadata = {
  title: "Personal Trainer",
  description: "Personal Trainer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-screen h-screen antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
