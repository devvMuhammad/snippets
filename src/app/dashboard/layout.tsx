import DashboardNav from "@/components/dashboard-nav";
import MainNav from "@/components/main-nav";
import UserAccountNav from "@/components/user-account-nav";
import { dashboardConfig } from "@/config/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-2">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              email: "muhammadaljoufi@gmail.com",
              name: "Muhammad Amjad",
              image: "",
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
