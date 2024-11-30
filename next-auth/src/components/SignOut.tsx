"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const SignOut = () => {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/login`,
        });
      }}
    >
      Sign Out
    </Button>
  );
};
