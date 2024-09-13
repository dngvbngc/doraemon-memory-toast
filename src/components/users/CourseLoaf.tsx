import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { UserCourseInfo } from "@/app/lib/definitions";
import loafImage from "@/assets/loaf.svg";
import Image from "next/image";

interface Props {
  course: UserCourseInfo;
}

export default function CourseLoaf({ course }: Props) {
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
      <Text
        style={{
          position: "absolute",
          top: "50%",
          left: "40%",
          transform: "translate(-30%, -50%)",
          fontWeight: "bold",
          color: "black",
          zIndex: 1,
        }}
        fontSize='28px'
        textAlign='center'
      >
        {course.name.toLowerCase()}
      </Text>
    </Box>
  );
}
