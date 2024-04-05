import MainNav from "@/components/main-nav";
import SidebarNav from "@/components/sidebar-nav";
import UserProfile from "@/components/user-profile";
import { dashboardConfig } from "@/config/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <SidebarNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col gap-7 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
