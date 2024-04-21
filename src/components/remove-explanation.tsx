"use client";
import { useState } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function RemoveExplanation({
  removeExplanation,
  lineNumber,
}: {
  lineNumber: number;
  removeExplanation: (line: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState(1);
  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild>
          <Button size="sm" onClick={() => setOpen(true)}>
            <Icons.cross className="mr-2" />
            Remove Info
          </Button>
        </TooltipTrigger>
        <TooltipContent
          // className="w-[500px]"
          onPointerDownOutside={() => setOpen(false)}
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Label>Select Line: </Label>
              <Input
                className="w-20 border border-white"
                type="number"
                value={line}
                onChange={(e) => setLine(+e.target.value)}
                min={1}
                max={lineNumber}
                step={1}
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  removeExplanation(line);
                  setOpen(false);
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
