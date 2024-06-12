import EditorForm from "@/components/editor/editor-form";

export const metadata = {
  title: "Editor",
};

export default function Editor() {
  const dummyInitalData = {
    title: "Dummy Title",
    description: "Dummy Description",
    language: "javascript",
    framework: "React",
    codeSnippets: [
      {
        code: "console.log('Hello World!');",
        explanations: [
          {
            lineNumber: 1,
            text: "This is a simple console.log statement",
          },
        ],
      },
      {
        code: "const a = 25;",
        explanations: [
          {
            lineNumber: 1,
            text: "This is a simple variable declaration with a being set to 25",
          },
        ],
      },
    ],
  };
  return (
    <div className="space-y-3 px-8">
      <EditorForm initialData={dummyInitalData} />
    </div>
  );
}
