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
import { Button } from "./ui/button";

export default function CodeEditor({
  language,
  theme,
  fontSize,
}: {
  language: string;
  theme: string;
  fontSize: number;
}) {
  // const editorRef = useRef<any>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltips, setTooltips] = useState<number[]>([1]);
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
  }, [tooltips]);

  return (
    <div className="relative">
      <Button onClick={() => setTooltips((prev) => [...prev, 1])}>
        Add (test)
      </Button>
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
        key={tooltips.length}
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
          tooltips.forEach((_, i) => {
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
          // editor.createDecorationsCollection([
          //   {
          //     range: new monaco.Range(3, 1, 3, 1),
          //     options: {
          //       isWholeLine: true,
          //       // className: "myContentClass",
          //       glyphMarginClassName: "myGlyphMarginClass",
          //     },
          //   },
          // ]);
        }}
      />
    </div>
  );
}
