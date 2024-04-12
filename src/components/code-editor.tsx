"use client";
// import { languages } from "@/config/languages";
import { Editor, loader } from "@monaco-editor/react";
import { githubDarkTheme } from "@/config/themes/github-dark";
import { useEffect } from "react";

export default function CodeEditor({
  language,
  theme,
  fontSize,
}: {
  language: string;
  theme: string;
  fontSize: number;
}) {
  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("github-dark", githubDarkTheme as any);
      // monaco.editor.crea
    });
  }, []);
  return (
    <>
      <Editor
        height="30vh"
        theme={theme}
        defaultLanguage={language}
        defaultValue="// start writing code here ..."
        options={{
          fontFamily: "Fira Code, monospace",
          fontLigatures: true,
          fontSize: fontSize,
          padding: { top: 15 },
          // language,
        }}
        onMount={(editor, monaco) => {
          console.log("onMount", editor, monaco);
          // editor.dec
          // monaco.editor.
        }}
      />
    </>
  );
}
