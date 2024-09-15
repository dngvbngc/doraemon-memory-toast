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
import { createUser, CreateUserState } from "@/app/lib/actions";
import { useFormState } from "react-dom";

const SignupForm = () => {
  const initialState: CreateUserState = { message: null, errors: {} };

  const [state, formAction] = useFormState(createUser, initialState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isMatching = password === confirmPassword;
  const isValidUsername = /^[0-9a-z_]+$/.test(username) || username === "";
  const unableToSubmit = !isMatching || password === "" || !isValidUsername;

  return (
    <form action={formAction}>
      <VStack>
        <Heading padding={3}>sign up</Heading>
        {/* Username field */}
        <Box>
          <FormLabel as='i' marginLeft={1} htmlFor='username'>
            username
          </FormLabel>
          <Input
            bgColor='white'
            width={{ base: "80vw", md: "50vw", lg: "30vw", xl: "20vw" }}
            placeholder='nobita'
            id='username'
            type='text'
            name='username'
            autoFocus
            minLength={3}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <Box
            id='username-error'
            aria-live='polite'
            aria-atomic='true'
            marginLeft={1}
          >
            {!isValidUsername && (
              <small style={{ color: "red" }}>
                only lowercase letters, numbers & underscores
              </small>
            )}
            {state.errors?.username &&
              state.errors.username.map((error: string) => (
                <small style={{ color: "red" }} key={error}>
                  {error}
                </small>
              ))}
          </Box>
        </Box>

        {/* Password field */}
        <Box>
          <FormLabel as='i' marginLeft={1} htmlFor='password'>
            password
          </FormLabel>
          <Input
            bgColor='white'
            width={{ base: "80vw", md: "50vw", lg: "30vw", xl: "20vw" }}
            placeholder='ilovedoraemon'
            id='password'
            type='password'
            name='password'
            minLength={5}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Box
            id='password-error'
            aria-live='polite'
            aria-atomic='true'
            marginLeft={1}
          >
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <small style={{ color: "red" }} key={error}>
                  {error}
                </small>
              ))}
          </Box>
        </Box>

        {/* Confirm password field */}
        <Box>
          <FormLabel as='i' marginLeft={1} htmlFor='confirm-password'>
            confirm password
          </FormLabel>
          <Input
            bgColor='white'
            width={{ base: "80vw", md: "50vw", lg: "30vw", xl: "20vw" }}
            placeholder='ilovedoraemon'
            id='confirm-password'
            type='password'
            name='confirm-password'
            minLength={5}
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <Box
            id='confirm-password-error'
            aria-live='polite'
            aria-atomic='true'
            marginLeft={1}
          >
            {!isMatching && (
              <small style={{ color: "red" }}>
                confirmation password does not match
              </small>
            )}
            {state.errors?.confirmPassword &&
              state.errors.confirmPassword.map((error: string) => (
                <small style={{ color: "red" }} key={error}>
                  {error}
                </small>
              ))}
          </Box>
        </Box>

        <Button
          bgColor={{ base: "lightblue", lg: "lightpink" }}
          _hover={{ bgColor: { base: "skyblue", lg: "hotpink" } }}
          color='black'
          type='submit'
          aria-disabled={username === "" || unableToSubmit}
        >
          sign up
        </Button>
        <div aria-live='polite' aria-atomic='true'>
          {state.message && (
            <small style={{ color: "red" }}>{state.message}</small>
          )}
        </div>
      </VStack>
    </form>
  );
};

export default SignupForm;
