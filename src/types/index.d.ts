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

export type CodeSnippetType = {
  // will check later if these two properties are required or not
  code: string;
  explanations: ExpType[];
};

export type EditorPageData = {
  title: string;
  description: string;
  language: string;
  framework: string | null;
  codeSnippets: CodeSnippetType[];
};
