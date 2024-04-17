"use client";
import { useEffect, useRef, useState } from "react";
import { Editor as MonacoEditor, loader } from "@monaco-editor/react";
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
import AddExplanationForm from "./add-explanation";

export default function CodeEditor({
  code,
  initialExplanations,
  language,
  theme,
  fontSize,
  number,
  // addExplanation,
  removeSnippet,
}: {
  code: string;
  initialExplanations: ExpType[];
  language: string;
  theme: string;
  fontSize: number;
  number: number;
  // addExplanation: (exp: ExpType) => void;
  removeSnippet: () => void;
}) {
  const [explanations, setExplanations] =
    useState<ExpType[]>(initialExplanations);
  const addExplanation = (exp: ExpType) => {
    setExplanations((prev) => [...prev, exp]);
  };
  const removeExplanation = (index: number) => {
    setExplanations((prev) => prev.filter((_, i) => i !== index));
  };
  const editorRef = useRef<any>(null);
  console.log(explanations);
  // const
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [lineNumber, setLineNumber] = useState<number | null>();
  // this is the explanation among all explanations that is currently being active
  const [activeExplanationNumber, setActiveExplanationNumber] = useState<
    number | null
  >(null);
  // console.log(activeExplanationNumber);
  // onCLick of left click does not work, so we have to attach an event listener to the whole editor ourself
  useEffect(() => {
    console.log("use effect call");
    const eventHandler = (e: Event) => {
      console.log("click inside editor", e.target);
      // attach event to the whole editor and then check if the glyph margin is clicked
      const target = e.target as HTMLElement;
      const targetClassListArr = [...(target.classList as unknown as string[])];
      if (
        targetClassListArr.find((elm) => elm.match(/number-\d/))
        // targetClassListArr.includes(`editor-${number}`)
      ) {
        // console.log("clicked on the glyph margin");
        const selectedExplanationNumber = targetClassListArr
          .find((elm) => elm.match(/number-\d/))
          ?.split("-")[1] as string;
        setActiveExplanationNumber(+selectedExplanationNumber);

        setTooltipOpen(true);
      }
    };

    document
      .querySelector(`.editor-${number}`)
      ?.addEventListener("click", eventHandler);

    return () => {
      document
        .querySelector(`.editor-${number}`)
        ?.removeEventListener("click", eventHandler);
    };
  }, [explanations]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span>Snippet: {number}</span>
        <div className="self-end flex gap-2">
          <AddExplanationForm
            editorRef={editorRef}
            lineNumber={lineNumber ?? 1}
            setLineNumber={setLineNumber}
            addExplanation={addExplanation}
          />
          <DeleteSingleSnippet removeSnippet={removeSnippet} />
        </div>
      </div>
      <div className="relative">
        {explanations.length > 0 &&
          activeExplanationNumber?.toLocaleString() &&
          tooltipOpen && (
            <ExplanationTooltip
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
              text={explanations[activeExplanationNumber].text}
              // text={}
            />
          )}
        <MonacoEditor
          // key={tooltipOpen}
          key={explanations.length}
          className={`editor-${number}`}
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
          // onChange={(val,e) => {
          // }}
          onMount={(editor, monaco) => {
            // set the ref to the editor object
            editorRef.current = editor;
            // setLineNumber(editor.getModel()?.getLineCount());
            // console.log("does this get triggered upon a state change???");
            monaco.editor.defineTheme("github-dark", githubDarkTheme as any);
            // adds all the explanations
            explanations.forEach((_, i) => {
              editor.createDecorationsCollection([
                {
                  range: new monaco.Range(3 + i, 1, 3 + i, 1),
                  options: {
                    isWholeLine: true,
                    // className: "myContentClass",
                    // glyphMarginClassName: "myGlyphMarginClass number-" + i,
                    glyphMarginClassName: `myGlyphMarginClass editor-${number} number-${i}`,
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

function ExplanationTooltip({
  tooltipOpen,
  setTooltipOpen,
  text,
}: {
  tooltipOpen: boolean;
  setTooltipOpen: (val: boolean) => void;
  text: string;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={tooltipOpen}>
        <TooltipTrigger style={{ position: "absolute", top: `${5 * 3}%` }}>
          {}
        </TooltipTrigger>
        <TooltipContent
          className="border border-white"
          onPointerDownOutside={() => setTooltipOpen(false)}
          // {/* Date */}
        >
          <span className="text-white">
            {/* 2 days ago */}
            {text}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
