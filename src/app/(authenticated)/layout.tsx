"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "../lib/store";
import { Box } from "@chakra-ui/react";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuthStore();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user === "") {
        router.push("/login");
      }
      if (!pathName.startsWith(`/${user}`)) {
        router.push(`/${encodeURIComponent(user)}`);
      }
    }, 100);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [user, router]);

  // Render children when the user is authenticated
  return <Box padding={10}>{children}</Box>;
}
