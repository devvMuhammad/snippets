import { Icons } from "@/components/icons";
import SnippetOverview from "@/components/snippet-overview";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Dashboard",
};

export default function Page() {
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
        <Button>
          <Icons.add className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>
      <SnippetOverview />
    </>
  );
}
