"use client";

import useAuthStore from "@/app/lib/store";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { navigate, signUserOut } from "@/app/lib/actions";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  const handleLogOut = async () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // If user is logged in
  if (user) {
    return (
      <HStack
        color='black'
        backgroundColor='lightblue'
        justifyContent='space-between'
        fontSize='20'
        paddingX={5}
        height='5dvh'
      >
        <Box>
          <Link href='/'>
            <Text fontWeight='bold'>memory toast</Text>
          </Link>
        </Box>
        <HStack fontWeight='semi-bold'>
          <Link href={`/${encodeURIComponent(user)}`}>
            <Text as='i' fontWeight='bold'>
              {user}
            </Text>
          </Link>
          <form action={signUserOut}>
            <button type='button' onClick={handleLogOut}>
              <Text as='i'>log out</Text>
            </button>
          </form>
        </HStack>
      </HStack>
    );
  }

  // If user is not logged in
  return (
    <HStack
      color='black'
      backgroundColor='lightblue'
      justifyContent='space-between'
      fontSize='20'
      paddingX={5}
      paddingY={2}
    >
      <Box>
        <Link href='/'>
          <Text fontWeight='bold'>memory toast</Text>
        </Link>
      </Box>
      <HStack>
        <Link href='/login'>
          <Text as='i'>log in</Text>
        </Link>
        <Link href='/signup'>
          <Text as='i'>sign up</Text>
        </Link>
      </HStack>
    </HStack>
  );
};

export default NavBar;
