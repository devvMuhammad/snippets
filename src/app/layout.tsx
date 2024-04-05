import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProfile from "@/components/user-profile";
import MainNav from "@/components/main-nav";
import { dashboardConfig } from "@/config/dashboard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Snippets",
    template: "%s | Snippets",
  },
  description:
    "Platform for Sharing Concise, Insightful and Effective Code Snippets across Multiple Languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col space-y-6`}
      >
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-2">
            <MainNav items={dashboardConfig.mainNav} />
            <UserProfile
              user={{
                email: "muhammadaljoufi@gmail.com",
                name: "Muhammad Amjad",
                image: "",
              }}
            />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
