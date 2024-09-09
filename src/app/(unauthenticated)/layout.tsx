"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "../lib/store";
import { useEffect } from "react";
import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import background from "@/assets/login-bg.svg";
import phoneBackground from "@/assets/phone-bg.png";

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
    }, 100);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [user, router]);

  // Render children when the user is authenticated
  return (
    <>
      <Center>{children}</Center>
      <Box display={{ base: "none", xl: "block" }}>
        <Image
          src={background}
          alt='background'
          style={{
            position: "absolute",
            top: "0dvh",
            left: "10dvw",
            zIndex: -1,
            objectFit: "cover",
            width: "80dvw",
            height: "100dvh",
          }}
        ></Image>
      </Box>
      <Box display={{ base: "none", lg: "block", xl: "none" }}>
        <Image
          src={background}
          alt='background'
          style={{
            position: "absolute",
            top: "5dvh",
            zIndex: -1,
            objectFit: "cover",
            height: "90dvh",
          }}
        ></Image>
      </Box>
      <Box display={{ base: "block", lg: "none" }}>
        <Image
          src={phoneBackground}
          alt='background'
          style={{
            position: "fixed",
            bottom: "0",
            zIndex: -1,
            objectFit: "cover",
            width: "100dvw",
          }}
        ></Image>
      </Box>
    </>
  );
}
