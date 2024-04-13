import { useEffect, useRef } from "react";
import { Editor, loader } from "@monaco-editor/react";
import { githubDarkTheme } from "@/config/themes/github-dark";

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

  useEffect(() => {
    console.log(document.querySelector(".editor"));
    const eventHandler = (e: Event) => {
      if (e?.target === document.querySelector(".myGlyphMarginClass")) {
        console.log("clicked");
      }
    };
    document.querySelector(".editor")?.addEventListener("click", eventHandler);

    return () => {
      document
        .querySelector(".editor")
        ?.removeEventListener("click", eventHandler);
    };
  }, []);

  return (
    <Editor
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
        monaco.editor.defineTheme("github-dark", githubDarkTheme as any);
        editor.createDecorationsCollection([
          {
            range: new monaco.Range(3, 1, 3, 1),
            options: {
              isWholeLine: true,
              // className: "myContentClass",
              glyphMarginClassName: "myGlyphMarginClass",
            },
          },
        ]);
      }}
    />
  );
}
