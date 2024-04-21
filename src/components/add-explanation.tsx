import { ExpType } from "@/types";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export default function AddExplanationForm({
  lineNumber,
  setLineNumber,
  editorRef,
  addExplanation,
}: {
  lineNumber: number;
  setLineNumber: (num: number) => void;
  editorRef: any;
  addExplanation: (exp: ExpType) => void;
}) {
  const [explanation, setExplanation] = useState("");
  const [inputLineNumber, setInputLineNumber] = useState<number>(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-8"
          onClick={() =>
            setLineNumber(editorRef.current.getModel().getLineCount())
          }
        >
          <Icons.info className="mr-2" />
          Add Info
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add an Explanation</DialogTitle>
          <DialogDescription>
            Enter the explanation for a particular line of code.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Line Number
            </Label>
            <Input
              type="number"
              id="name"
              min={1}
              max={lineNumber ?? 1}
              // defaultValue={1}
              value={inputLineNumber}
              onChange={(e) => setInputLineNumber(Number(e.target.value))}
              className="w-[100px]"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="explanation" className="inline">
              Explanation
            </Label>
            <Textarea
              id="explanation"
              placeholder="explanation for the line goes here ..."
              onChange={(e) => setExplanation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              addExplanation({
                lineNumber: inputLineNumber,
                text: explanation,
              });
              setDialogOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
