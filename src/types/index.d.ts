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

type ExpType = {
  lineNumber: number;
  text: string;
};

export type ActualCodeSnippet = {
  // will check later if these two properties are required or not
  language?: string;
  framework?: string | null;
  code: string;
  explanations: ExpType[];
};
