import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { SnippetOperations } from "./snippet-operations";
import { Icons } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import SnippetTooltips from "./snippet-tooltips";

type SnippetOverviewProps = {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  lanugage: string;
  views: number;
  likes: number;
};

export default function SnippetOverview({
  title = "Omit and Partial in TypeScript",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, illo! Repellendus nesciunt fugit nostrum ducimus laboriosam voluptatibus, ipsam delectus, sed praesentium hic quo facere ab commodi fuga non repellat illo quod esse tempore totam? Aspernatur atque non quibusdam corrupti molestias quis enim. Deleniti mollitia corporis hic vel quidem incidunt illo?",
  createdAt = new Date(),
  // updatedAt=,
  lanugage = "typescript",
  views = 123,
  likes = 9,
}: Partial<SnippetOverviewProps>) {
  return (
    <Card>
      {/* CARD CONTENT */}
      <CardContent className="w-full grid grid-cols-[1fr_auto] gap-6 justify-between items-center p-4">
        <div className="grid gap-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="overflow-hidden text-nowrap overflow-ellipsis">
            {description}
          </CardDescription>
        </div>
        {/* <Button size="sm">View</Button> */}
        <SnippetOperations />
      </CardContent>
      {/* CARD FOOTER */}
      <CardFooter className="border-t p-4">
        <TooltipProvider delayDuration={0}>
          <SnippetTooltips createdAt={new Date()} views={100} likes={48} />
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
