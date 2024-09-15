import { fetchCourseBreads, fetchCourseName } from "@/app/lib/data";
import CourseDisplay from "@/components/users/CourseDisplay";
import { Metadata } from "next";

type Props = {
  params: { user: string; id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = await fetchCourseName(params.id);
  return {
    title: name,
  };
}

export default async function CoursePage({ params }: Props) {
  const courseId = params.id;
  const user = params.user;
  const name = await fetchCourseName(courseId);
  const breads = await fetchCourseBreads(courseId);

  return (
    <CourseDisplay
      name={name}
      user={user}
      courseId={courseId}
      breads={breads}
    />
  );
}
