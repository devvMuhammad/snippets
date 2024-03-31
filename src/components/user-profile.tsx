"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";

// interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
//   user: Pick<User, "name" | "image" | "email">
// }
interface UserAccountNavProps {
  user: {
    name: string;
    image: string;
    email: string;
  };
}

export default function UserProfile({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-[0.25rem]">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[250px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer rounded-[0.25rem] p-2"
          // onSelect={(event) => {
          //   event.preventDefault();
          //   signOut({
          //     callbackUrl: `${window.location.origin}/login`,
          //   });
          // }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
