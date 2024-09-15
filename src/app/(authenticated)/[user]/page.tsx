import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import shizuka from "@/assets/profiles/shizuka.webp";
import { fetchBreadCountByUser, fetchCoursesByUser } from "@/app/lib/data";
import { Metadata } from "next";
import CourseList from "@/components/users/CourseList";

export const metadata: Metadata = {
  title: "Your Loaves",
};

export default async function UserHomePage({
  params,
}: {
  params: { user: string };
}) {
  const user = params.user;
  const courses = await fetchCoursesByUser(user);
  const breadCount = await fetchBreadCountByUser(user);

  return (
    <Grid
      templateAreas={{ base: `"profile" "content"`, lg: `"profile content"` }}
      gridTemplateColumns={{ base: `"1fr"`, lg: "20vw 1fr" }}
      gap='20'
    >
      <GridItem area={"profile"}>
        <Heading textAlign='center' padding={2}>
          hi, {user}
        </Heading>
        <Image
          style={{
            width: "18vw",
            height: "18vw",
            objectFit: "cover",
            marginLeft: "1vw",
            marginTop: "1vw",
            borderRadius: "18vw",
          }}
          src={shizuka}
          alt='Shizuka as profile photo'
        ></Image>
        <Heading paddingTop={10} textAlign='center' fontSize='x-large'>
          contributions
        </Heading>
        <Text paddingTop={5} textAlign='center' fontSize='large'>
          <i>&#9734;</i> {courses.length} loaves
        </Text>
        <Text paddingTop={3} textAlign='center' fontSize='large'>
          <i>&#9734;</i> {breadCount} breads
        </Text>
      </GridItem>
      <GridItem area={"content"}>
        <Heading textAlign='center' padding={2}>
          your loaves
        </Heading>
        <CourseList courses={courses} />
      </GridItem>
    </Grid>
  );
}
