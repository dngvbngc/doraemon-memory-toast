"use client";

import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import background from "@/assets/login-bg.svg";
import phoneBackground from "@/assets/phone-bg.png";
import useAuthStore from "../../utils/store";
import { useState } from "react";
import { navigate } from "@/utils/actions";

export default function LoginPage() {
  const { login } = useAuthStore();
  const users = [{ username: "ari", password: "aloha" }];

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [message, setMessage] = useState("");

  const auth = () => {
    if (
      users.find(
        (user) => user.username === userName && user.password === passWord
      )
    ) {
      login(userName);
      window.localStorage.setItem("user", userName);
      navigate("/");
    } else {
      setMessage("username or password is not correct");
    }
  };

  return (
    <>
      <Center>
        <Box marginTop={{ sm: 10, lg: "45vh" }}>
          <form>
            <VStack>
              <Heading padding={3}>log in</Heading>
              <Input
                bgColor='white'
                width={{ sm: "80vw", md: "50vw", lg: "20vw" }}
                placeholder='username'
                autoFocus
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                bgColor='white'
                width={{ sm: "80vw", md: "50vw", lg: "20vw" }}
                placeholder='password'
                type='password'
                onChange={(e) => setPassWord(e.target.value)}
              />
              <Button onClick={() => auth()}>log in</Button>
              <Text color='red'>{message}</Text>
            </VStack>
          </form>
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
