import LoginForm from "@/components/LoginForm";
import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import background from "@/assets/login-bg.svg";
import phoneBackground from "@/assets/phone-bg.png";

export default function LoginPage() {
  return (
    <>
      <Center>
        <Box marginTop={{ sm: 10, lg: "45vh" }}>
          <LoginForm />
        </Box>
      </Center>
      <Box display={{ base: "none", lg: "block" }}>
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
