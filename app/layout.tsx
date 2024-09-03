import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Hanuman } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const hanuman = Hanuman({
  subsets: ["latin"],
  weight: "400", // Specify the weight you need, e.g., 400 for normal
});

export const metadata: Metadata = {
  title: "Science Olympiad",
  description: "By UGA DAWG's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={hanuman.className}>{children}</body>
    </html>
  );
}
