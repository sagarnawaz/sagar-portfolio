import "./globals.css";
import { Inter, Space_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300", "500", "800"], variable: '--font-inter' });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], style: ['normal', 'italic'], variable: '--font-mono' });

export const metadata = {
  title: "AETHER | Creative Developer",
  description: "Creative Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} font-sans`}>{children}</body>
    </html>
  );
}
