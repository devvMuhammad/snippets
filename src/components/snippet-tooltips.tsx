import { Icons } from "./icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
export default function SnippetTooltips({
  createdAt,
  likes,
  views,
}: {
  createdAt: Date;
  likes: number;
  views: number;
}) {
  return (
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
            {createdAt.toLocaleString()}
          </span>
        </div>
      </Tooltip>
      <Tooltip>
        <div className="flex items-center gap-2">
          <TooltipTrigger>
            <Icons.eye className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-green-500 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent className="text-green-600 border-none text-xs px-2 py-1">
            Views
          </TooltipContent>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {views.toString()}
          </span>
        </div>
      </Tooltip>
      <Tooltip>
        <div className="flex items-center gap-2">
          <TooltipTrigger>
            <Icons.likes className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-red-600 cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent className="text-red-600 border-none text-xs px-2 py-1">
            Likes
          </TooltipContent>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {likes.toString()}
          </span>
        </div>
      </Tooltip>
    </div>
  );
}
