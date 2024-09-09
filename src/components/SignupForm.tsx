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
import { createUser, State } from "@/app/lib/actions";
import { useFormState } from "react-dom";

const SignupForm = () => {
  const initialState: State = { message: null, errors: {} };

  const [state, formAction] = useFormState(createUser, initialState);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isMatching = password === confirmPassword;
  const unableToSubmit = !isMatching || password === "";

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
            width={{ sm: "80vw", md: "50vw", lg: "30vw", xl: "20vw" }}
            placeholder='nobita'
            id='username'
            type='text'
            name='username'
            autoFocus
            minLength={3}
            required
          />
          <div id='username-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.username &&
              state.errors.username.map((error: string) => (
                <small style={{ color: "red" }} key={error}>
                  {error}
                </small>
              ))}
          </div>
        </Box>

        {/* Password field */}
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
            }}
          />
          <div id='password-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <small style={{ color: "red" }} key={error}>
                  {error}
                </small>
              ))}
          </div>
        </Box>

        {/* Confirm password field */}
        <Box>
          <FormLabel as='i' marginLeft={1} htmlFor='confirm-password'>
            confirm password
          </FormLabel>
          <Input
            bgColor='white'
            width={{ sm: "80vw", md: "50vw", lg: "30vw", xl: "20vw" }}
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
          <div
            id='confirm-password-error'
            aria-live='polite'
            aria-atomic='true'
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
          </div>
        </Box>

        <Button
          bgColor={{ base: "lightblue", lg: "lightpink" }}
          color='black'
          type='submit'
          aria-disabled={unableToSubmit}
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
