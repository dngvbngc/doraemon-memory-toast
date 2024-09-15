import { sql } from "@vercel/postgres";
import { CourseBreadInfo, UserCourseInfo } from "./definitions";

export async function fetchCoursesByUser(user: string) {
  try {
    const data = await sql<UserCourseInfo>`
		SELECT
		  doraemon_courses.id,
		  doraemon_courses.name,
      doraemon_courses.created_date,
		  doraemon_courses.last_updated_date
		FROM doraemon_courses
        LEFT JOIN doraemon_users ON doraemon_users.id = doraemon_courses.owner_id
		WHERE
		  doraemon_users.username = ${user}
    ORDER BY doraemon_courses.created_date DESC
	  `;

    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch users' courses.");
  }
}

export async function fetchBreadCountByUser(user: string) {
  try {
    const data = await sql`
      SELECT
        COUNT(*) AS bread_count
      FROM doraemon_breads
      INNER JOIN doraemon_users ON doraemon_users.id = doraemon_breads.author_id
      WHERE doraemon_users.username = ${user}
    `;

    return data.rows[0].bread_count;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch user's bread count.");
  }
}

export async function fetchCourseName(id: string) {
  try {
    const data = await sql`
      SELECT
        doraemon_courses.name AS course_name
      FROM doraemon_courses
      WHERE
        doraemon_courses.id = ${id}
    `;

    if (data.rows.length === 0) {
      throw new Error("Course not found.");
    }

    return data.rows[0].course_name;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch course's name.");
  }
}

export async function fetchCourseBreads(courseId: string) {
  try {
    const data = await sql<CourseBreadInfo>`
		SELECT
		  doraemon_breads.id,
		  doraemon_breads.content,
      doraemon_breads.created_date,
      doraemon_breads.last_updated_date
		FROM doraemon_breads
		WHERE
		  doraemon_breads.course_id = ${courseId}
    ORDER BY doraemon_breads.created_date ASC
	  `;

    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch course's breads.");
  }
}
