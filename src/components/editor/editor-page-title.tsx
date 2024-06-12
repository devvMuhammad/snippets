import { Button } from "../ui/button";

type EditorPageTitleProps = {
  configChangesMade: boolean;
};

export default function EditorPageTitle({
  configChangesMade,
}: EditorPageTitleProps) {
  return (
    <>
      {" "}
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-semibold">Editor</h1>
        {configChangesMade && (
          <div className="w-full flex justify-end">
            <p className="self-end text-sm">
              Unsaved Config Changes{" "}
              <Button size="sm" className="ml-2">
                Save
              </Button>
            </p>
          </div>
        )}
      </div>
      <p className="text-base text-muted-foreground">
        This is the place where you can create and edit a particular snippet.
        For more info,{" "}
        <span className="underline cursor-pointer">click here</span>
      </p>{" "}
    </>
  );
}
