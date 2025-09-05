"use client";
import { ClapperboardIcon, UserCircleIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "size-10",
            },
          }}
        >
          <div></div>

          <UserButton.MenuItems>
            <UserButton.Link
              label="My Profile"
              href="/users/current"
              labelIcon={<UserIcon className="size-4"></UserIcon>}
            ></UserButton.Link>
            <UserButton.Link
              label="My Dashboard"
              href="/dashboard"
              labelIcon={
                <ClapperboardIcon className="size-4"></ClapperboardIcon>
              }
            ></UserButton.Link>
            <UserButton.Action label="manageAccount"></UserButton.Action>
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant={"outline"}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
          >
            <UserCircleIcon></UserCircleIcon>
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AuthButton;
