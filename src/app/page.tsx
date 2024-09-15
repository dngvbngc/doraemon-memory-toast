"use client";

import banner from "@/assets/homepage-banner.svg";
import endBanner from "@/assets/homepage-endbanner.svg";
import phoneBanner from "@/assets/phone-homepage-bg.png";
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import useAuthStore from "./lib/store";
import Link from "next/link";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <Center>
      <VStack>
        <Stack height='94vh'>
          <VStack paddingX={10} marginTop={10}>
            <Box textAlign='center'>
              <Heading fontSize={{ base: "5xl", lg: "6xl" }} padding={1}>
                you are not{" "}
                <Text
                  fontSize={{ base: "6xl", lg: "6xl" }}
                  as='span'
                  color='#c99276'
                >
                  toasted
                </Text>
              </Heading>
              <Box
                fontFamily='Comic Sans MS'
                fontSize={{ base: "small", lg: "large" }}
              >
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
            <Box display={{ base: "none", lg: "block" }}>
              <Image
                src={banner}
                alt='banner'
                style={{ padding: "1vh 2vw", width: "80vw" }}
              ></Image>
            </Box>
            <Box display={{ base: "block", lg: "none" }}>
              <Image
                src={phoneBanner}
                alt='banner'
                style={{ paddingTop: "5vh" }}
              ></Image>
            </Box>
          </VStack>
        </Stack>
        <Stack
          width='100vw'
          bgColor='lightblue'
          display={{ base: "none", xl: "block" }}
        >
          <VStack paddingX={10} paddingTop={10}>
            <Box textAlign='center'>
              <Heading fontSize='6xl' padding={1}>
                what is{" "}
                <Text as='span' color='#c99276'>
                  memory toast?
                </Text>
              </Heading>
            </Box>
            <SimpleGrid columns={2} paddingTop={10} paddingBottom={10}>
              <Box paddingX='10vw'>
                <Text fontFamily='Comic Sans MS' fontSize='xl'>
                  A favorite gadget among Doraemon&#39;s fans. In the manga,
                  lesson content can be &#39;printed&#39; on this piece of
                  toast, and whoever consumes the toast will memorize the
                  content instantly.
                  <br></br>
                  <br></br>
                  Memory toasts are here for you virtually. Take note of your
                  lessons in bite-size pieces and memorize them with ease!
                </Text>
              </Box>
              <Box>
                <iframe
                  width='560'
                  height='315'
                  src='https://www.youtube.com/embed/dqqKr0pbR7A?si=R6h4EKwyRXmzY59o&amp;start=750'
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                ></iframe>
              </Box>
            </SimpleGrid>
            <Box textAlign='center'>
              <Heading fontSize='4xl' padding={1} color='#c99276' zIndex={5}>
                let&#39;s get this{" "}
                <Text color='black' as='span'>
                  bread
                </Text>
              </Heading>
              <Text fontFamily='Comic Sans MS' fontSize='small'>
                @dngvbngc 2024, <a href='https://github.com/dngvbngc'>Github</a>
              </Text>
              <Image
                src={endBanner}
                alt='end banner'
                style={{ width: "35vw" }}
              ></Image>
            </Box>
          </VStack>
        </Stack>
      </VStack>
    </Center>
  );
}
