"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  User,
  LayoutDashboard,
  Heart,
  BookOpen,
  Menu,
  UserCircleIcon,
} from "lucide-react";
import Image from "next/image";
import MenuItem from "@/components/MenuItem";
import { Separator } from "@/components/ui/separator";

interface UserMenuProps {
  isOpen: boolean;
  toggle: () => void;
  closeMenus: () => void;
  shouldUseSolidStyling: boolean;
  isSignedIn: boolean;
}

export const UserMenu = ({
  isOpen,
  toggle,
  closeMenus,
  shouldUseSolidStyling,
  isSignedIn,
}: UserMenuProps) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggle}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition bg-white shrink-0"
        >
          <Menu className="size-6" />
          <div className="hidden md:block">
            <Image
              className="rounded-full"
              height={35}
              width={35}
              alt="Avatar"
              src={user?.imageUrl || "/images/placeholder.jpg"}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl border border-gray-200 z-60">
          <div className="flex flex-col cursor-pointer mx-2 pb-1">
            {isSignedIn ? (
              <>
                <div className="flex flex-col px-4 py-3">
                  <span className="font-medium">{user?.fullName}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
                <div className="mx-2">
                  <Separator className="border-2"></Separator>
                </div>
                <MenuItem
                  onClick={() => {
                    closeMenus();
                    router.push("/users/current");
                  }}
                  label="My Profile"
                  icon={User}
                ></MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenus();
                    router.push("/dashboard");
                  }}
                  label="My Dashboard"
                  icon={LayoutDashboard}
                ></MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenus();
                    router.push("/favourites");
                  }}
                  label="Favorites"
                  icon={Heart}
                ></MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenus();
                    router.push("/courses");
                  }}
                  label="My Courses"
                  icon={BookOpen}
                ></MenuItem>
                <MenuItem
                  onClick={() => {
                    closeMenus();
                    router.push("/orders");
                  }}
                  label="My Order"
                ></MenuItem>
                <div className="mx-2">
                  <Separator className="my-1"></Separator>
                </div>
                <MenuItem
                  onClick={() => signOut()}
                  label="Sign Out"
                  icon={LogOut}
                  color="text-red-700"
                ></MenuItem>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <MenuItem onClick={() => {}} label="Sign In"></MenuItem>
                </SignInButton>
                <SignUpButton mode="modal">
                  <MenuItem onClick={() => {}} label="Sign Up"></MenuItem>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
