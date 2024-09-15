"use client";

import banner from "@/assets/homepage-banner.svg";
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import useAuthStore from "./lib/store";
import Link from "next/link";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <Center padding={10}>
      <VStack>
        <Box textAlign='center'>
          <Heading fontSize='6xl' padding={1}>
            You are not{" "}
            <Text as='span' color='#c99276'>
              toasted
            </Text>
          </Heading>
          <Box fontFamily='Comic Sans MS' fontSize='large'>
            <Text>your on-the-go, simple and efficient notes</Text>
            {user ? (
              <Text>
                view your toasts in{" "}
                <Link href={`/${user}`}>
                  <strong>dashboard</strong>
                </Link>{" "}
              </Text>
            ) : (
              <Text>
                <Link href='/login'>
                  <strong>log in</strong>
                </Link>{" "}
                or{" "}
                <Link href='/signup'>
                  <strong>sign up</strong>
                </Link>{" "}
                to start memorizing
              </Text>
            )}
          </Box>
        </Box>
        <Box>
          <Image
            src={banner}
            alt='banner'
            style={{ padding: "1vh 2vw", width: "80vw" }}
          ></Image>
        </Box>
      </VStack>
    </Center>
  );
}
