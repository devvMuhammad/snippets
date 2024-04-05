"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface UserAccountNavProps {
  user: {
    name: string;
    image: string;
    email: string;
  };
}

const supabase = createClient();

export default function UserProfile({ user }: UserAccountNavProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
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
          onSelect={(e) => {
            e.preventDefault();
            startTransition(async () => {
              const resp = await supabase.auth.signOut();
              if (!resp.error) router.replace("/login");
              console.log("response of logout", resp);
            });
          }}
        >
          {isPending ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
