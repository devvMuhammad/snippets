import { FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptySnippet() {
  return (
    <div className="bg-gray-900 rounded-lg py-6 w-full flex flex-col gap-1 items-center justify-center">
      <FileIcon className="h-10 w-10 text-gray-600" />
      <p className="font-bold">No snippets found </p>
      <p className="text-xs md:text-sm text-balance text-center">
        Upload a code file or use the '+' button to make one yourself
      </p>
      <Button size="sm" className="mt-2">
        Upload
      </Button>
    </div>
  );
}
