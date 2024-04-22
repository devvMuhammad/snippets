"use client";
import { memo, useEffect, useRef, useState } from "react";
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
import { ExpType } from "@/types";
import AddExplanationForm from "./add-explanation";
import RemoveExplanation from "./remove-explanation";
import { useTestContext } from "./test-context";

export const CodeEditor = memo(function ({
  initialCode,
  initialExplanations,
  language,
  theme,
  fontSize,
  number,
  // addExplanation,
  removeSnippet,
}: {
  initialCode: string;
  initialExplanations: ExpType[];
  language: string;
  theme: string;
  fontSize: number;
  number: number;
  // addExplanation: (exp: ExpType) => void;
  removeSnippet: () => void;
}) {
  // const allEditorsRef = useRef<>
  const { increment } = useTestContext();
  // states
  const [code, setCode] = useState(initialCode);
  const [mode, setMode] = useState<"edit" | "explain">("edit");
  // explanations
  const [explanations, setExplanations] =
    useState<ExpType[]>(initialExplanations);

  // functions for adding and removing explanations
  const addExplanation = (exp: ExpType) => {
    // setExplanations((prev) => [...prev, exp]);
    setExplanations((prev) => {
      const copy = [...prev];
      const existingExpIndex = prev.findIndex(
        (elm) => elm.lineNumber === exp.lineNumber
      );
      if (existingExpIndex !== -1) {
        copy[existingExpIndex].text = exp.text;
      } else {
        copy.push(exp);
      }
      return copy;
    });
  };
  const removeExplanation = (lineNumber: number) => {
    setExplanations((prev) =>
      prev.filter((elm) => elm.lineNumber !== lineNumber)
    );
  };
  const editorRef = useRef<unknown>(null);
  // console.log(explanations);
  // const
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [lineNumber, setLineNumber] = useState<number | null>();
  // this is the explanation among all explanations that is currently being active
  const [activeExplanationNumber, setActiveExplanationNumber] = useState<
    number | null
  >(null);
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
        <Button onClick={increment}>Test</Button>
        <div className="self-end flex gap-2">
          {mode === "edit" && (
            <Button size="sm" onClick={() => setMode("explain")}>
              <Icons.tick className="mr-2 text-green-600" /> Confirm Edit
            </Button>
          )}
          {mode === "explain" && (
            <>
              <Button onClick={() => setMode("edit")} size="sm">
                Move Back
              </Button>
              <AddExplanationForm
                editorRef={editorRef}
                lineNumber={lineNumber ?? 1}
                setLineNumber={setLineNumber}
                addExplanation={addExplanation}
              />
              {explanations.length > 0 && (
                <RemoveExplanation
                  removeExplanation={removeExplanation}
                  lineNumber={lineNumber ?? 1}
                />
              )}
            </>
          )}
          <DeleteSingleSnippet removeSnippet={removeSnippet} />
        </div>
      </div>
      <div className="relative">
        {/* responsible for rendering the explanations for a particular code snippet */}
        {explanations.length > 0 &&
          activeExplanationNumber?.toLocaleString() &&
          tooltipOpen && (
            <ExplanationTooltip
              tooltipOpen={tooltipOpen}
              setTooltipOpen={setTooltipOpen}
              text={explanations[activeExplanationNumber].text}
              lineNumber={activeExplanationNumber}
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
            readOnly: mode === "explain",
            // readOnly:
          }}
          value={code}
          onChange={(val, e) => {
            setCode(val || "");
          }}
          // value={[
          //   '"use strict";',
          //   "function Person(age) {",
          //   "	if (age) {",
          //   "		this.age = age;",
          //   "	}",
          //   "}",
          //   "Person.prototype.getAge = function () {",
          //   "	return this.age;",
          //   "};",
          // ].join("\n")}
          // onChange={(val,e) => {
          // }}

          onMount={(editor, monaco) => {
            // set the ref to the editor object
            editorRef.current = editor;
            // setLineNumber(editor.getModel()?.getLineCount());
            // console.log("does this get triggered upon a state change???");
            monaco.editor.defineTheme("github-dark", githubDarkTheme as any);

            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
              { noSemanticValidation: true, noSyntaxValidation: true }
            );
            // adds all the explanations
            explanations.forEach((_, i) => {
              editor.createDecorationsCollection([
                {
                  range: new monaco.Range(1 + i, 1, 1 + i, 1),

                  options: {
                    isWholeLine: true,
                    // className: "myContentClass",
                    // glyphMarginClassName: "myGlyphMarginClass number-" + i,
                    glyphMarginClassName: `myGlyphMarginClass editor-${number} number-${i}`,
                    glyphMargin: {
                      position: 1,
                    },
                    stickiness: 1,
                  },
                },
              ]);
            });
          }}
        />
      </div>
    </div>
  );
});

function ExplanationTooltip({
  tooltipOpen,
  setTooltipOpen,
  text,
  lineNumber,
}: {
  tooltipOpen: boolean;
  setTooltipOpen: (val: boolean) => void;
  text: string;
  lineNumber: number;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={tooltipOpen}>
        <TooltipTrigger
          style={{ position: "absolute", top: `${5 * lineNumber}%` }}
        >
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

export default CodeEditor;
