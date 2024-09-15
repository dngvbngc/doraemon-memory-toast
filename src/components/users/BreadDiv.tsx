"use client";

import {
  Box,
  Button,
  HStack,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CourseBreadInfo } from "@/app/lib/definitions";
import breadImage from "@/assets/bread.svg";
import Image from "next/image";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { deleteBread, updateBread, UpdateBreadState } from "@/app/lib/actions";
import { useFormState } from "react-dom";

interface Props {
  isEditing: boolean;
  user: string;
  courseId: string;
  bread: CourseBreadInfo;
}

export default function BreadDiv({ isEditing, user, courseId, bread }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [content, setContent] = useState(bread.content);
  const maxLength = 580;
  const toast = useToast();
  const router = useRouter();

  const deleteBreadWithId = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await deleteBread(user, courseId, bread.id);
      toast({
        title: "Bread deleted.",
        description: "The bread has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(`/${user}/courses/${courseId}`);
    } catch (error) {
      toast({
        title: "Error deleting bread.",
        description: "There was an error while deleting the bread.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initialState: UpdateBreadState = { message: null, errors: {} };
  const updateBreadWithId = updateBread.bind(null, bread.id);
  const [state, formAction] = useFormState(updateBreadWithId, initialState);

  const handleSubmit = async (payload: FormData) => {
    formAction(payload);
    setIsFormVisible(false);
    toast({
      title: `Bread edited.`,
      description: `${payload
        .get("content")
        ?.slice(0, 10)}... is the new content.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div>
      <Box
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
        {!isFormVisible && (
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "40%",
              transform: "translate(-30%, -50%)",
              fontWeight: "semi-bold",
              color: "black",
              zIndex: 1,
            }}
            fontSize='medium'
            textAlign='left'
          >
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              <strong>{bread.content.split("\n")[0]}</strong>
              {bread.content.split("\n").slice(1).join("\n")}
            </pre>
          </Box>
        )}
        {isFormVisible && (
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
            fontSize='medium'
            textAlign='left'
          >
            <form action={handleSubmit}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                id='content'
                name='content'
                required
                style={{ height: "48vh", width: "20vw" }}
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
                bgColor='lightpink'
                _hover={{ bgColor: "hotpink" }}
                color='white'
                margin={1}
                onClick={() => setIsFormVisible(false)}
              >
                <CloseIcon />
              </Button>
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
        )}
        <HStack
          display={isEditing ? "flex" : "none"}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
          spacing={1}
        >
          <Button onClick={() => setIsFormVisible(true)}>
            <EditIcon />
          </Button>
          <form onSubmit={deleteBreadWithId}>
            <Button
              type='submit'
              isLoading={isLoading}
              _hover={{ bgColor: "red", color: "white" }}
            >
              <DeleteIcon />
            </Button>
          </form>
        </HStack>
      </Box>
    </div>
  );
}
