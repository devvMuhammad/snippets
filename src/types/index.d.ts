import { Icons } from "@/components/icons";
import { dashboardConfig } from "@/config/dashboard";

export type DashboardNavMainItem = {
  title: string;
  href: string;
};

export type DashboardNavSidebarItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
};
