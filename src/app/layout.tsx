import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Top 100 Game"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
