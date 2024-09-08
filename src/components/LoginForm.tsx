"use client";

import { Button, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { authenticate } from "@/app/lib/actions";
import useAuthStore from "@/app/lib/store";

const LoginForm = () => {
  const { login } = useAuthStore();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const auth = async () => {
    setIsPending(true);
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);

    try {
      const error = await authenticate(undefined, formData);
      if (!error) {
        login(userName);
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
        <Input
          bgColor='white'
          width={{ sm: "80vw", md: "50vw", lg: "20vw" }}
          placeholder='username'
          id='username'
          type='text'
          name='username'
          autoFocus
          minLength={3}
          required
          onChange={(e) => {
            setUserName(e.target.value);
            setErrorMessage(null);
          }}
        />
        <Input
          bgColor='white'
          width={{ sm: "80vw", md: "50vw", lg: "20vw" }}
          placeholder='password'
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
        <Button type='submit' aria-disabled={isPending}>
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
