import MainNav from "@/components/main-nav";
import SidebarNav from "@/components/sidebar-nav";
import UserProfile from "@/components/user-profile";
import { dashboardConfig } from "@/config/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // these are put in a container layout (inspect the containter class in the outer layout of this layout)
    <>
      <aside className="hidden w-[200px] flex-col md:flex">
        <SidebarNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col gap-7 overflow-hidden">
        {children}
      </main>
    </>
  );
}
