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
      {/* <CardHeader className="flex items-start gap-4">
        <div className="flex items-start gap-2">
          <CardTitle className="text-base">Next.js Image</CardTitle>
          <CardDescription className="text-sm">
            Optimize images in your Next.js project
          </CardDescription>
        </div>
        <div>
          <div>
            <Button className="rounded-full border" size="icon" variant="ghost">
              <MoreHorizontalIcon className="w-4 h-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
          <div>
            <div>
              <FileEditIcon className="w-4 h-4 mr-2" />
              Edit
            </div>
            <div>
              <CopyIcon className="w-4 h-4 mr-2" />
              Copy
            </div>
            <div>
              <TrashIcon className="w-4 h-4 mr-2" />
              Delete
            </div>
          </div>
        </div>
      </CardHeader> */}
      <CardContent className="w-full grid grid-cols-[1fr_100px] p-4 md:p-6">
        <div className="grid gap-1">
          <CardTitle className="text-lg">Integrating with Shadcn</CardTitle>
          <CardDescription className="overflow-hidden text-nowrap overflow-ellipsis">
            Lorem ipsum dol Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Animi sit, aliquid repellat voluptatum quae repudiandae illum
            beatae quis expedita facere voluptatem minima officiis cum et magni
            excepturi at quas tempore dolore similique dolorem. Hic qui dolorem
            deleniti reprehenderit perspiciatis quam.
          </CardDescription>
        </div>
        <Button size="sm">View</Button>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Created 2 days ago
            </span>
          </div>
          <div className="flex items-center gap-2">
            <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Viewed 100 times
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
