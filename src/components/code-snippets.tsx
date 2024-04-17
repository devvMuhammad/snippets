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
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import React from "react";
import EmptySnippet from "./empty-snippet";
import { ActualCodeSnippet, ExpType } from "@/types";
import exp from "constants";

export default function CodeSnippets({
  language,
  framework,
}: {
  language: string;
  framework: string;
}) {
  //! additional tip, save progress after every 2 seconds, check this later
  //! when kaafi kaam hochuka hai, then issue warning before changing the language or framework
  // array of snippets
  const [codeSnippets, setCodeSnippets] = React.useState<ActualCodeSnippet[]>(
    []
  );
  // for theme
  const [theme, setTheme] = React.useState("vs-dark");
  // for fontSize
  const [fontSize, setFontSize] = React.useState(17);
  // for snippets

  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-lg">Snippets</Label>
          <Button
            size="sm"
            onClick={() => {
              //! set this later
              // if (!language || !framework) return;
              setCodeSnippets((prev) => [
                ...prev,
                { language, framework, code: "", explanations: [] },
              ]);
            }}
          >
            <Icons.add className="mr-2 h-4 w-4" />
            Create
          </Button>
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
            <div className="space-y-8">
              {codeSnippets.map((snippet, index) => (
                <CodeEditor
                  key={index}
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
                  code={snippet.code} //later
                  // explanations={snippet.explanations} //later
                  initialExplanations={[]} //later
                  // codeSnippets={codeSnippets}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

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
