import EditorForm from "@/components/editor-form";

export const metadata = {
  title: "Editor",
};

export default function Editor() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Editor</h1>
      <p className="text-base text-muted-foreground">
        This is the place where you can create and edit a particular snippet.
        For more info,{" "}
        <span className="underline cursor-pointer">click here</span>
      </p>
      <EditorForm />
    </div>
  );
}
