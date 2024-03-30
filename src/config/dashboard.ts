import { DashboardNavMainItem, DashboardNavSidebarItem } from "@/types";

export const dashboardConfig = {
  mainNav: [
    {
      title: "Explore",
      href: "/",
    },
    {
      title: "Support",
      href: "#",
    },
    {
      title: "Contact",
      href: "https://github.com/devvMuhammad",
    },
  ],
  sidebarNav: [
    {
      title: "Snippets",
      href: "/dashboard",
      icon: "code",
    },
    {
      title: "Impressions",
      href: "/dashboard/impressions",
      icon: "rocket",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
} satisfies {
  mainNav: DashboardNavMainItem[];
  sidebarNav: DashboardNavSidebarItem[];
};
