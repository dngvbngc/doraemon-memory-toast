"use client";

import { Box, Button, Input, Text, Spinner, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import loafImage from "@/assets/loaf.svg";
import Image from "next/image";
import useAuthStore from "@/app/lib/store";
import { AddIcon } from "@chakra-ui/icons";
import { createCourse, CreateCourseState } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function AddCourseLoaf() {
  const { user } = useAuthStore();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [courseName, setCourseName] = useState("");
  const toast = useToast();

  const handleAddClick = () => {
    setIsFormVisible(true);
  };

  const initialState: CreateCourseState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createCourse, initialState);

  const handleSubmit = async (payload: FormData) => {
    formAction(payload);
    setIsFormVisible(false);
    toast({
      title: `Course added.`,
      description: `${payload.get("name")} added to your couses.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      style={{
        position: "relative",
        maxWidth: "20vw",
      }}
      _hover={{ transform: `scale(1.2)`, transition: `0.1s ease-in-out` }}
    >
      <Image
        style={{
          opacity: 0.1,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        src={loafImage}
        alt='loaf image'
      />
      <Box>
        {!isFormVisible ? (
          <Text
            onClick={handleAddClick}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              color: "black",
              zIndex: 1,
              cursor: "pointer",
            }}
            fontSize='28px'
            textAlign='center'
          >
            <AddIcon />
          </Text>
        ) : (
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSubmit(formData); // Use the handleSubmit function
              }}
            >
              <Input
                placeholder='New course name'
                onChange={(e) => setCourseName(e.target.value)}
                id='name'
                type='text'
                name='name'
                required
              />
              <Input
                hidden
                readOnly
                value={user}
                id='owner'
                type='text'
                name='owner'
              />
              {state?.errors?.name &&
                state.errors.name.map((error: string) => (
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
                _hover={{ bgColor: "red" }}
                color='white'
                aria-disabled={courseName === ""}
                margin={1}
              >
                <AddIcon />
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
}
