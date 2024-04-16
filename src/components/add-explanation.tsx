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

export default function AddExplanationForm({
  editorRef,
  setLineNumber,
  lineNumber,
}: {
  lineNumber: number;
  setLineNumber: (num: number) => void;
  editorRef: any;
}) {
  return (
    // <div className="self-end flex gap-2">
    <Dialog>
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
              defaultValue={1}
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() =>
              console.log(editorRef.current.getModel().getLineCount())
            }
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    // </div>
  );
}
