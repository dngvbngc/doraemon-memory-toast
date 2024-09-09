"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../lib/store";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Fetching user data...");
      if (user === "") {
        router.push("/login");
      }
    }, 100);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [user, router]);

  // Render children when the user is authenticated
  return <>{children}</>;
}
