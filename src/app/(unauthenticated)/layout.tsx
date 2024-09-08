"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "../lib/store";
import { useEffect } from "react";

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Fetching user data...");
      if (user !== "") {
        router.push("/protected-route");
      }
    }, 2000);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [user, router]);

  // Render children when the user is authenticated
  return <>{children}</>;
}
