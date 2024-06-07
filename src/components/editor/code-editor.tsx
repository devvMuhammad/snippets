"use client";
import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { githubDarkTheme } from "@/config/themes/github-dark";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
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
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { ExpType } from "@/types";
import AddExplanationForm from "./add-explanation";
import RemoveExplanation from "./remove-explanation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const CodeEditor = memo(function ({
  index,
  initialCode,
  initialExplanations,
  language,
  theme,
  fontSize,
  number,
  // addExplanation,
  removeSnippet,
  updateAllEditorsRef,
  setCodeChangesMade,
}: {
  index: number;
  initialCode: string;
  initialExplanations: ExpType[];
  language: string;
  theme: string;
  fontSize: number;
  number: number;
  removeSnippet: () => void;
  updateAllEditorsRef: (
    index: number,
    code: string,
    explanations: ExpType[]
  ) => void;
  setCodeChangesMade: Dispatch<SetStateAction<boolean>>;
}) {
  const [code, setCode] = useState(initialCode);
  const [mode, setMode] = useState<"edit" | "explain">("edit");
  const [explanations, setExplanations] =
    useState<ExpType[]>(initialExplanations);
  console.log(explanations);
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
  const [sheetOpen, setSheetOpen] = useState(false);
  const [lineNumber, setLineNumber] = useState<number | null>();
  // this is the explanation among all explanations that is currently being active
  const [activeExplanationNumber, setActiveExplanationNumber] = useState<
    number | null
  >(null);
  // onClick of left click does not work, so we have to attach an event listener to the whole editor ourself
  useEffect(() => {
    console.log("use effect call");
    const eventHandler = (e: Event) => {
      console.log("click inside editor", e.target);
      // attach event to the whole editor and then check if the glyph margin is clicked
      const target = e.target as HTMLElement;
      const targetClassListArr = [...(target.classList as unknown as string[])];
      if (targetClassListArr.find((elm) => elm.match(/number-\d/))) {
        const selectedExplanationNumber = targetClassListArr
          .find((elm) => elm.match(/number-\d/))
          ?.split("-")[1] as string;
        setActiveExplanationNumber(+selectedExplanationNumber);

        setSheetOpen(true);
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
  }, [explanations, number]);

  useEffect(() => {
    updateAllEditorsRef(index, code, explanations);
    console.log(
      "initial code",
      JSON.stringify({
        code: initialCode,
      })
    );
    console.log("current code", JSON.stringify({ code }));

    if (
      JSON.stringify({ code, explanations }) !==
      JSON.stringify({ code: initialCode, explanations: initialExplanations })
    ) {
      setCodeChangesMade(true);
    } else {
      setCodeChangesMade(false);
    }
  }, [code, explanations, index, initialCode, initialExplanations, setCodeChangesMade, updateAllEditorsRef]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span>Snippet: {number}</span>
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
          activeExplanationNumber?.toLocaleString() && (
            <ExplanationSidebar
              sheetOpen={sheetOpen}
              setSheetOpen={setSheetOpen}
              text={
                explanations[activeExplanationNumber - 1]?.text || "default"
              }
              lineNumber={activeExplanationNumber}
              // text={}
            />
          )}
        <MonacoEditor
          // key={sheetOpen}
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
          onMount={(editor, monaco) => {
            // set the ref to the editor object
            editorRef.current = editor;
            monaco.editor.defineTheme("github-dark", githubDarkTheme as any);

            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
              { noSemanticValidation: true, noSyntaxValidation: true }
            );
            // adds all the explanations
            explanations.forEach((elm, i) => {
              editor.createDecorationsCollection([
                {
                  range: new monaco.Range(elm.lineNumber, 1, elm.lineNumber, 1),

                  options: {
                    isWholeLine: true,
                    glyphMarginClassName: `myGlyphMarginClass editor-${elm.lineNumber} number-${elm.lineNumber}`,
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

function ExplanationSidebar({
  sheetOpen,
  setSheetOpen,
  text,
  lineNumber,
}: {
  sheetOpen: boolean;
  setSheetOpen: (val: boolean) => void;
  text: string;
  lineNumber: number;
}) {
  console.log("inside the explanation tooltip", lineNumber);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Line Explanation</SheetTitle>
          <SheetDescription>
            Detailed Elaboration for Line Number {lineNumber}
          </SheetDescription>
          <hr />
        </SheetHeader>
        <div className="grid gap-4 py-4">{text}</div>
      </SheetContent>
    </Sheet>
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

CodeEditor.displayName = "CodeEditor";
export default CodeEditor;
