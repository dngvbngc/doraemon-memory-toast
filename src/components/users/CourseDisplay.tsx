"use client";

import { CourseBreadInfo } from "@/app/lib/definitions";
import { Center, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
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
      <HStack
        justifyContent='space-between'
        paddingLeft={20}
        paddingRight={10}
        paddingBottom={10}
      >
        <Heading paddingLeft={10} textAlign='center' width='80vw'>
          {name}
        </Heading>
        <Spacer />
        <ActionBar
          isEditing={isEditing}
          setIsEditing={() => setIsEditing(!isEditing)}
          user={user}
          courseId={courseId}
        />
      </HStack>
      {breads.length >= 1 ? (
        <HStack
          spacing={5}
          overflowX='auto'
          whiteSpace='nowrap'
          width='100%'
          paddingX={5}
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
