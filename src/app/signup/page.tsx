import { Box, Button, Center, Heading, Input, VStack } from "@chakra-ui/react";
import Image from "next/image";
import background from "@/assets/login-bg.svg";
import phoneBackground from "@/assets/phone-bg.png";

export default function SignupPage() {
  return (
    <>
      <Center>
        <Box marginTop={{ sm: 10, lg: "45vh" }}>
          <form>
            <VStack>
              <Heading padding={3}>sign up</Heading>
              <Input
                bgColor='white'
                width={{ sm: "80vw", md: "50vw", lg: "20vw" }}
                placeholder='username'
                autoFocus
              />
              <Input
                bgColor='white'
                width={{ sm: "80vw", md: "50vw", lg: "20vw" }}
                placeholder='password'
                type='password'
              />
              <Button>sign up</Button>
            </VStack>
          </form>
        </Box>
      </Center>
      <Box display={{ base: "none", lg: "block" }}>
        <Image
          className='background-img'
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
