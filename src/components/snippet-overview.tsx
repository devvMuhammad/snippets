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
      <CardContent className="w-full grid grid-cols-[1fr_auto] gap-6 justify-between items-center p-4 md:p-6">
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
          <div className="w-full flex justify-evenly items-center gap-4">
            <Tooltip>
              <div className="flex items-center gap-2">
                <TooltipTrigger>
                  <Icons.calender className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-500 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="text-blue-500 border-none text-xs px-2 py-1">
                  Date
                </TooltipContent>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {/* 2 days ago */}
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </Tooltip>
            <Tooltip>
              <div className="flex items-center gap-2">
                <TooltipTrigger>
                  <Icons.eye className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-green-500 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="text-green-600 border-none text-xs px-2 py-1">
                  Likes
                </TooltipContent>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  100
                </span>
              </div>
            </Tooltip>
            <Tooltip>
              <div className="flex items-center gap-2">
                <TooltipTrigger>
                  <Icons.likes className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-red-600 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="text-red-600 border-none text-xs px-2 py-1">
                  Date
                </TooltipContent>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  48
                </span>
              </div>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
