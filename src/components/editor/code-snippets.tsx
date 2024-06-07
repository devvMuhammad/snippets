"use client";
import CodeEditor from "./code-editor";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import EmptySnippet from "./empty-snippet";
import { CodeSnippetType, ExpType } from "@/types";
import CreateButton from "./create-button";
import { Button } from "../ui/button";
// import exp from "constants";

export const CodeSnippets = memo(function ({
  language,
  framework,
  initialCodeSnippets,
}: // setConfigChangesMade,
{
  language: string;
  framework: string;
  initialCodeSnippets?: CodeSnippetType[];
  // setConfigChangesMade: (val: boolean) => void;
}) {
  // we make a shallow becuase if we pass this directly, the intialCodeSnippets is also changed because we change the initalEditorsRef mutably which will change the intialCodeSnippets array as well
  const initialCodeSnippetsCopy = [
    ...(initialCodeSnippets as CodeSnippetType[]),
  ];
  const allEditorsRef = useRef<CodeSnippetType[]>(
    initialCodeSnippetsCopy || []
  );
  // functions for updating refs
  const updateAllEditorsRef = useCallback(
    (index: number, code: string, explanations: ExpType[]) => {
      console.log(allEditorsRef.current);
      allEditorsRef.current[index] = { code, explanations };
    },
    []
  );

  //! when kaafi kaam hochuka hai, then issue warning before changing the language or framework
  // array of snippets (just for initial data and keeping track of separate code blocks)
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippetType[]>(
    initialCodeSnippets || [{ code: "tiz", explanations: [] }]
  );
  // for unsaved changes in the code
  const [codeChangesMade, setCodeChangesMade] = useState(false);
  // for theme and fontSize
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(17);
  // function to add a snippet
  const addSnippet = () => {
    //! set this later
    // if (!language || !framework) return;
    setCodeSnippets((prev) => [
      ...prev,
      {
        code: "//start writing code here",
        explanations: [],
      },
    ]);
  };
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "instant",
    });
  }, [codeSnippets.length]);
  console.log(codeSnippets);
  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-lg">Snippets</Label>
          <CreateButton addSnippet={addSnippet} />
        </div>
        {codeSnippets.length <= 0 ? (
          <EmptySnippet />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <ThemeAndFontSelects
                theme={theme}
                setTheme={setTheme}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-balance">
                First, write your code snippets. Then, you can add line-by-line
                explanations
              </span>
              {codeChangesMade && (
                <span className="text-sm">
                  Unsaved Changes{" "}
                  <Button size="sm" className="ml-2">
                    Save
                  </Button>
                </span>
              )}
            </div>

            <div className="space-y-8">
              {initialCodeSnippets &&
                codeSnippets &&
                codeSnippets.map((snippet, index) => (
                  <CodeEditor
                    key={index}
                    index={index}
                    language={language}
                    theme={theme}
                    fontSize={fontSize}
                    number={index + 1}
                    removeSnippet={() => {
                      // replace this with db logic later, no state will be involved here
                      setCodeSnippets((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                    initialCode={snippet.code} //later
                    initialExplanations={snippet.explanations} //later
                    updateAllEditorsRef={updateAllEditorsRef}
                    setCodeChangesMade={setCodeChangesMade}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
});

function ThemeAndFontSelects({
  theme,
  setTheme,
  fontSize,
  setFontSize,
}: {
  theme: string;
  setTheme: (val: string) => void;
  fontSize: number;
  setFontSize: (val: number) => void;
}) {
  return (
    <>
      <p className="font-bold text-sm">Options</p>
      <div className="flex items-center gap-2">
        <Label className="text-sm">Theme</Label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-[180px] text-sm">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Themes</SelectLabel>
              <SelectItem className="text-xs" value="vs-dark">
                Visual Studio Dark
              </SelectItem>
              <SelectItem className="text-xs" value="github-dark">
                Github Dark
              </SelectItem>
              <SelectItem className="text-xs" value="light">
                Light Mode
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-xs">Font Size</Label>
        <Select
          value={fontSize.toString()}
          onValueChange={(val) => setFontSize(+val)}
        >
          <SelectTrigger className="w-[80px] text-sm">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 22 - 8 }, (_, i) => (
                <SelectItem
                  key={i}
                  className="text-sm"
                  value={(i + 10).toString()}
                  onSelect={(e) => e.preventDefault()}
                >
                  {i + 8 + 1}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

CodeSnippets.displayName = "CodeSnippets";
export default CodeSnippets;
