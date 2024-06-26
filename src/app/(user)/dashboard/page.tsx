import { Icons } from "@/components/icons";
import SnippetOverview from "@/components/snippet-overview";
import { Button, buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { checkServerSession } from "@/lib/supabase/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  // const data = await checkServerSession();
  // console.log("data inside the server component", data);
  // if (data.error) redirect("/login");
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-semibold text-2xl md:text-3xl">Snippets</h1>
          <p className="text-base text-muted-foreground">
            View, Create, Delete & Edit your Snippets here
          </p>
        </div>
        {/* {children} */}
        <Link href="/editor" className={buttonVariants({ size: "sm" })}>
          {/* <Button size="sm"> */}
          <Icons.add className="mr-2 h-4 w-4" />
          New
          {/* </Button> */}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <SnippetOverview />
        <SnippetOverview />
        <SnippetOverview />
        <SnippetOverview />
        <SnippetOverview />
        <SnippetOverview />
        <SnippetOverview />
        <SnippetOverview />
      </div>
      {/* <SnippetOverview /> */}
    </>
  );
}
