"use client";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function CreateButton({
  addSnippet,
}: {
  addSnippet: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          // onClick={addSnippet}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Create
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={addSnippet}>
          Write Yourself
        </DropdownMenuItem>
        {/* will be implemeted later */}
        <DropdownMenuItem>Upload File</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
