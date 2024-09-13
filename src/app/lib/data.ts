import { sql } from "@vercel/postgres";
import { UserCourseInfo } from "./definitions";

export async function fetchCoursesByUser(user: string) {
  try {
    const data = await sql<UserCourseInfo>`
		SELECT
		  doraemon_courses.id,
		  doraemon_courses.name,
		  doraemon_courses.last_updated_date
		FROM doraemon_courses
        LEFT JOIN doraemon_users ON doraemon_users.id = doraemon_courses.owner_id
		WHERE
		  doraemon_users.username = ${user}
	  `;

    return data.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch users' courses.");
  }
}
