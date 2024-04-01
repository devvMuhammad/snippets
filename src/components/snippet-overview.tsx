import {
  BellIcon,
  CalendarIcon,
  CopyIcon,
  EyeIcon,
  FileEditIcon,
  Link,
  MoreHorizontalIcon,
  Package,
  TrashIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SnippetOperations } from "./snippet-operations";
import { Icons } from "./icons";

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
          <CardTitle className="text-lg">
            Integrating with Shadcn Lorem ipsum
          </CardTitle>
          <CardDescription className="overflow-hidden text-nowrap overflow-ellipsis">
            Lorem ipsum dol Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Animi sit, aliquid repellat voluptatum quae repudiandae illum
            beatae quis expedita facere voluptatem minima officiis cum et magni
            excepturi at quas tempore dolore similique dolorem. Hic qui dolorem
            deleniti reprehenderit perspiciatis quam.
          </CardDescription>
        </div>
        {/* <Button size="sm">View</Button> */}
        <SnippetOperations />
      </CardContent>
      {/* CARD FOOTER */}
      <CardFooter className="border-t p-4">
        <div className="w-full flex justify-evenly items-center gap-4">
          <div className="flex items-center gap-2">
            <Icons.calender className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-500 cursor-pointer" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              2 days
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.eye className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-500 cursor-pointer" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              100 <span className="hidden md:inline"> Views</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.likes className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-red-600 cursor-pointer" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              48 <span className="hidden md:inline">Likes</span>
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
