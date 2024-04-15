"use client";
import { useEffect, useState } from "react";
import { Editor, loader } from "@monaco-editor/react";
import { githubDarkTheme } from "@/config/themes/github-dark";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { ActualCodeSnippet, ExpType } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CodeEditor({
  code,
  explanations,
  language,
  theme,
  fontSize,
  number,
  addExplanation,
  removeSnippet,
}: {
  code: string;
  explanations: ExpType[];
  language: string;
  theme: string;
  fontSize: number;
  number: number;
  addExplanation: (exp: ExpType) => void;
  removeSnippet: () => void;
}) {
  // const editorRef = useRef<any>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => {
    // console.log(document.querySelector(".editor"));
    const eventHandler = (e: Event) => {
      // if (e?.target === document.querySelector(".myGlyphMarginClass number-0")) { {
      console.log(e.target);
      if (e?.target === document.querySelector(".myGlyphMarginClass")) {
        {
          console.log("clicked");
          // then further check for the first one
          if (
            document
              .querySelector(".myGlyphMarginClass")
              ?.classList.contains("number-0")
          ) {
            setTooltipOpen((prev) => !prev);
          }
        }
      }
    };
    document.querySelector(".editor")?.addEventListener("click", eventHandler);

    return () => {
      document
        .querySelector(".editor")
        ?.removeEventListener("click", eventHandler);
    };
  }, [explanations]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span>Snippet: {number}</span>
        <div className="self-end flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8">
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
                    defaultValue="Pedro Duarte"
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
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DeleteSingleSnippet removeSnippet={removeSnippet} />
        </div>
      </div>
      <div className="relative">
        <TooltipProvider delayDuration={0}>
          <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
            <TooltipTrigger style={{ position: "absolute", top: `${5 * 3}%` }}>
              {}
            </TooltipTrigger>
            <TooltipContent className="border border-white">
              {/* Date */}
              <span className="text-white">
                {/* 2 days ago */}
                roksha mara
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Editor
          // key={tooltipOpen}
          key={explanations.length}
          className="editor"
          height="30vh"
          theme={theme}
          defaultLanguage={language}
          defaultValue="// start writing code here ..."
          options={{
            fontFamily: "Fira Code, monospace",
            fontLigatures: true,
            fontSize: fontSize,
            padding: { top: 15 },
            glyphMargin: true,
            // readOnly:
          }}
          value={[
            '"use strict";',
            "function Person(age) {",
            "	if (age) {",
            "		this.age = age;",
            "	}",
            "}",
            "Person.prototype.getAge = function () {",
            "	return this.age;",
            "};",
          ].join("\n")}
          onMount={(editor, monaco) => {
            // editorRef.current = editor;
            console.log("does this get triggered upon a state change???");
            monaco.editor.defineTheme("github-dark", githubDarkTheme as any);
            explanations.forEach((_, i) => {
              editor.createDecorationsCollection([
                {
                  range: new monaco.Range(3 + i, 1, 3 + i, 1),
                  options: {
                    isWholeLine: true,
                    // className: "myContentClass",
                    glyphMarginClassName: "myGlyphMarginClass number-" + i,
                  },
                },
              ]);
            });
          }}
        />
      </div>
    </div>
  );
}

function DeleteSingleSnippet({ removeSnippet }: { removeSnippet: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        size="icon"
        className="h-8"
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        <Icons.trash />
        {/* Delete */}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this snippet?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={removeSnippet}
              className="bg-red-600 focus:ring-red-600"
            >
              {/* {isDeleteLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : ( */}
              <Icons.trash className="mr-2 h-4 w-4" />
              {/* )} */}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
