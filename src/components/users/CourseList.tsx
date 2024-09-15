"use client";

import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { UserCourseInfo } from "@/app/lib/definitions";
import CourseLoaf from "./CourseLoaf";
import AddCourseLoaf from "./AddCourseLoaf";

interface Props {
  courses: UserCourseInfo[];
}

export default function CourseList({ courses }: Props) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }}>
      {courses.map((c) => (
        <Box key={c.id}>
          <CourseLoaf course={c} />
        </Box>
      ))}
      <Box>
        <AddCourseLoaf />
      </Box>
    </SimpleGrid>
  );
}
