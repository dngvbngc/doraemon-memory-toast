"use client";

import { CourseBreadInfo } from "@/app/lib/definitions";
import { Center, Heading, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import ActionBar from "./ActionBar";
import AddBreadDiv from "./AddBreadDiv";
import BreadDiv from "./BreadDiv";
import { useState } from "react";

interface Props {
  name: string;
  user: string;
  courseId: string;
  breads: CourseBreadInfo[];
}

export default function CourseDisplay({ name, user, courseId, breads }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Stack
        direction={{ base: "column", lg: "row" }}
        justifyContent={{ base: "center", lg: "space-between" }}
        paddingLeft={{ lg: 20 }}
        paddingRight={{ lg: 10 }}
        paddingBottom={10}
      >
        <Heading
          paddingLeft={{ lg: 10 }}
          textAlign='center'
          width={{ lg: "80vw" }}
        >
          {name}
        </Heading>
        <Spacer />
        <ActionBar
          isEditing={isEditing}
          setIsEditing={() => setIsEditing(!isEditing)}
          user={user}
          courseId={courseId}
        />
      </Stack>
      {breads.length >= 1 ? (
        <HStack
          spacing={5}
          overflowX='auto'
          whiteSpace='nowrap'
          width='100%'
          paddingX={5}
          paddingTop={{ base: "8vh", lg: 0 }}
        >
          <div>
            <AddBreadDiv
              isEditing={isEditing}
              user={user}
              courseId={courseId}
            />
          </div>
          {breads.map((b) => (
            <div key={b.id}>
              <BreadDiv
                isEditing={isEditing}
                user={user}
                courseId={courseId}
                bread={b}
              />
            </div>
          ))}
          <div>
            <AddBreadDiv
              isEditing={isEditing}
              user={user}
              courseId={courseId}
            />
          </div>
        </HStack>
      ) : (
        <Center>
          <Text fontSize='large' paddingRight={5}>
            Add first bread to start memorizing.
          </Text>
          <AddBreadDiv isEditing={isEditing} user={user} courseId={courseId} />
        </Center>
      )}
    </>
  );
}
