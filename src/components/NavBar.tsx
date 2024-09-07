"use client";

import { navigate } from "@/utils/actions";
import useAuthStore from "@/utils/store";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { user, logout } = useAuthStore();

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  // If user is logged in
  if (user !== "") {
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
        <HStack fontWeight='semi-bold'>
          <button>
            <Text as='i' fontWeight='bold'>
              {user}
            </Text>
          </button>
          <button>
            <Text as='i' onClick={handleLogOut}>
              log out{" "}
            </Text>
          </button>
        </HStack>
      </HStack>
    );
  }

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
