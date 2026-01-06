import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "왁자 - 자유롭게 떠들어보세요",
  description: "왁자지껄, 자유로운 커뮤니티",
  icons: {
    icon: "/wakja.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col pt-4">{children}</main>
      </body>
    </html>
  );
}
