"use client";

import { Box, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import breadImage from "@/assets/bread.svg";
import Image from "next/image";
import { AddIcon, CheckIcon } from "@chakra-ui/icons";
import { createBread, CreateBreadState } from "@/app/lib/actions";
import { useFormState } from "react-dom";

interface Props {
  isEditing: boolean;
  user: string;
  courseId: string;
}

export default function AddBreadDiv({ isEditing, user, courseId }: Props) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [content, setContent] = useState("");
  const maxLength = 580;
  const toast = useToast();

  const handleSubmit = async (payload: FormData) => {
    setIsFormVisible(false);
    formAction(payload);
    toast({
      title: "Bread added.",
      description: `${payload
        .get("content")
        ?.slice(0, 10)}... added to your course`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const initialState: CreateBreadState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createBread, initialState);

  if (!isFormVisible)
    return (
      <Button
        display={isEditing ? "block" : "none"}
        onClick={() => setIsFormVisible(true)}
      >
        <AddIcon color='black' />
      </Button>
    );

  return (
    <Box
      display={isEditing ? "block" : "none"}
      style={{
        position: "relative",
      }}
      width={{ base: "80vw", lg: "38vw" }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        src={breadImage}
        alt='bread image'
      />
      <Box>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "100%",
            textAlign: "center",
          }}
        >
          <form action={handleSubmit}>
            <Textarea
              placeholder='Add text here'
              onChange={(e) => setContent(e.target.value)}
              id='content'
              name='content'
              required
              height={{ base: "25vh", md: "38vh", lg: "48vh" }}
              width={{ base: "40vw", lg: "20vw" }}
              variant='fill'
              marginBottom={1}
              maxLength={maxLength}
            />
            <Input
              hidden
              readOnly
              value={user}
              id='author'
              type='text'
              name='author'
            />
            <Input
              hidden
              readOnly
              value={courseId}
              id='course-id'
              type='text'
              name='course-id'
            />
            <br></br>
            {content.length >= 575 && (
              <small style={{ color: "red" }}>
                {content.length}/{maxLength} characters allowed <br></br>
              </small>
            )}
            {state?.errors?.content &&
              state.errors.content.map((error: string) => (
                <small style={{ color: "red" }} key={error}>
                  {error} <br></br>
                </small>
              ))}
            {state?.message && (
              <small style={{ color: "red" }}>
                {state.message} <br></br>
              </small>
            )}
            <Button
              type='submit'
              bgColor='lightpink'
              _hover={{ bgColor: "hotpink" }}
              color='white'
              aria-disabled={content === "" || content.length > maxLength}
              margin={1}
            >
              <CheckIcon />
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
