import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import "react-quill/dist/quill.snow.css";
import "./html-output-style.css";

export default function ExplanationSidebar({
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
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </SheetContent>
    </Sheet>
  );
}
