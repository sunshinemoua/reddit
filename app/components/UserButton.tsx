import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import UserAvatar from "./UserAvatar";
import { DarkModeToggle } from "./DarkModeToggle";

const UserButton = () => {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={session?.user?.name || "User"}
          image={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
            session?.user?.name || "placeholder"
          }`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex flex-col items-start gap-0">
          View Profile
          <span className="text-xs text-gray-500">u/{session?.user?.name}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>Edit Avatar</DropdownMenuItem>
        <DropdownMenuItem>Achievements</DropdownMenuItem>
        <DropdownMenuItem>Contributor Program</DropdownMenuItem>
        <DropdownMenuItem>
          Dark Mode <DarkModeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Log Out</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>Advertise on Reddit</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>Premium</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
