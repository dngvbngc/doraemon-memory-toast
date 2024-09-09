"use client";

import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { authenticate } from "@/app/lib/actions";
import useAuthStore from "@/app/lib/store";

const LoginForm = () => {
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const auth = async () => {
    setIsPending(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const error = await authenticate(undefined, formData);
      if (!error) {
        login(username);
      } else {
        setErrorMessage(error);
      }
    } catch (err) {
      setErrorMessage("an unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        auth();
      }}
    >
      <VStack>
        <Heading padding={3}>log in</Heading>
        <Box>
          <FormLabel as='i' marginLeft={1} htmlFor='username'>
            username
          </FormLabel>
          <Input
            bgColor='white'
            width={{ sm: "80vw", md: "50vw", lg: "30vw", xl: "20vw" }}
            placeholder='nobita'
            id='username'
            type='text'
            name='username'
            autoFocus
            minLength={3}
            required
            onChange={(e) => {
              setUsername(e.target.value);
              setErrorMessage(null);
            }}
          />
        </Box>

        <Box>
          <FormLabel as='i' marginLeft={1} htmlFor='password'>
            password
          </FormLabel>
          <Input
            bgColor='white'
            width={{ sm: "80vw", md: "50vw", lg: "30vw", xl: "20vw" }}
            placeholder='ilovedoraemon'
            id='password'
            type='password'
            name='password'
            minLength={5}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage(null);
            }}
          />
        </Box>

        <Button
          bgColor={{ base: "lightblue", lg: "lightpink" }}
          color='black'
          type='submit'
          aria-disabled={isPending || !(username !== "" && password !== "")}
        >
          {isPending ? "logging in..." : "log in"}
        </Button>
        <div aria-live='polite' aria-atomic='true'>
          {errorMessage && (
            <small style={{ color: "red" }}>{errorMessage}</small>
          )}
        </div>
      </VStack>
    </form>
  );
};

export default LoginForm;
