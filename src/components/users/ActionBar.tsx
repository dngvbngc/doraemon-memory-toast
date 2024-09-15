"use client";

import { deleteCourse } from "@/app/lib/actions";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, HStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  isEditing: boolean;
  setIsEditing: () => void;
  user: string;
  courseId: string;
}

export default function ActionBar({
  isEditing,
  setIsEditing,
  user,
  courseId,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const deleteCourseWithId = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await deleteCourse(user, courseId);
      toast({
        title: "Course deleted.",
        description: "The course has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push(`/${user}`);
    } catch (error) {
      toast({
        title: "Error deleting course.",
        description: "There was an error while deleting the course.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing)
    return (
      <HStack justifyContent='center'>
        <form onSubmit={deleteCourseWithId}>
          <Button
            type='submit'
            isLoading={isLoading}
            _hover={{ bgColor: "red", color: "white" }}
          >
            <DeleteIcon />
          </Button>
        </form>
        <Button>
          <ViewIcon onClick={setIsEditing} />
        </Button>
      </HStack>
    );

  return (
    <HStack justifyContent='center'>
      <Button>
        <EditIcon onClick={setIsEditing} />
      </Button>
    </HStack>
  );
}
