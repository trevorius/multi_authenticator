"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LogOutButton() {
  return (
    <Button className="font-bold py-2 px-4 rounded" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
