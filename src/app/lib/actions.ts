"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

const SignUpFormSchema = z.object({
  username: z.string().min(3, {
    message: "Please choose a username with at least 3 characters.",
  }),
  password: z.string().min(5, {
    message: "Please choose a password with at least 5 characters.",
  }),
  confirmPassword: z.string(),
});

const CreateCourseFormSchema = z.object({
  name: z.string(),
  owner: z.string(),
});

const BreadFormSchema = z.object({
  courseId: z.string(),
  author: z.string(),
  content: z.string().min(1).max(580),
});

const CreateUser = SignUpFormSchema;
const CreateCourse = CreateCourseFormSchema;
const CreateBread = BreadFormSchema;
const UpdateBread = BreadFormSchema;

export type CreateUserState = {
  errors?: {
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export type CreateCourseState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export type CreateBreadState = {
  errors?: {
    content?: string[];
    courseId?: string[];
    author?: string[];
  };
  message?: string | null;
};

export type UpdateBreadState = {
  errors?: {
    content?: string[];
    courseId?: string[];
    author?: string[];
  };
  message?: string | null;
};

export async function createUser(
  prevState: CreateUserState,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreateUser.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields. failed to sign up.",
    };
  }

  // Prepare data for insertion into the database
  const { username, password, confirmPassword } = validatedFields.data;

  // Check if username already exists in the database
  const existingUser = await sql`
    SELECT username FROM doraemon_users WHERE username = ${username}
  `;

  if (existingUser.rows.length > 0) {
    return {
      message: "sign up failed: username is already taken",
    };
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return {
      errors: { confirmPassword: ["passwords do not match"] },
      message: "sign up failed: passwords do not match",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert data into the database
  try {
    if (password !== confirmPassword) {
      throw new Error("passwords do not match");
    }
    await sql`
      INSERT INTO doraemon_users (username, password)
      VALUES (${username}, ${hashedPassword})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "database error: failed to sign up.",
    };
  }

  redirect("/login");
}

export async function navigate(route: string) {
  redirect(route);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "username or password is not correct";
        default:
          return "something went wrong";
      }
    }
    throw error;
  }
}

export async function signUserOut() {
  await signOut();
}

export async function createCourse(
  prevState: CreateCourseState,
  formData: FormData
) {
  const validatedFields = CreateCourse.safeParse({
    name: formData.get("name"),
    owner: formData.get("owner"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Course.",
    };
  }

  // Prepare data for insertion into the database
  const { name, owner } = validatedFields.data;

  // Check if owner exists in the database
  const owner_data = await sql`
    SELECT id FROM doraemon_users WHERE username = ${owner}
  `;

  if (owner_data.rows.length === 0) {
    return {
      errors: { owner: [`User ${owner} does not exist.`] },
      message: `User ${owner} does not exist.`,
    };
  }

  const owner_id = owner_data.rows[0].id;

  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO doraemon_courses (owner_id, name, created_date, last_updated_date)
      VALUES (${owner_id}, ${name}, ${date}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Course.",
    };
  }

  // Revalidate the cache for the courses page and redirect the user.
  revalidatePath(`/${owner}`);
  redirect(`/${owner}`);
}

export async function createBread(
  prevState: CreateBreadState,
  formData: FormData
) {
  const validatedFields = CreateBread.safeParse({
    courseId: formData.get("course-id"),
    author: formData.get("author"),
    content: formData.get("content"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Bread.",
    };
  }

  // Prepare data for insertion into the database
  const { courseId, author, content } = validatedFields.data;

  // Check if author exists in the database
  const author_data = await sql`
    SELECT id FROM doraemon_users WHERE username = ${author}
  `;

  if (author_data.rows.length === 0) {
    return {
      errors: { author: [`User ${author} does not exist.`] },
      message: `User ${author} does not exist.`,
    };
  }

  const authorId = author_data.rows[0].id;
  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO doraemon_breads (course_id, author_id, content, created_date, last_updated_date)
      VALUES (${courseId}, ${authorId}, ${content}, ${date}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Bread.",
    };
  }

  // Revalidate the cache for the courses page and redirect the user.
  revalidatePath(`/${author}/courses/${courseId}`);
  redirect(`/${author}/courses/${courseId}`);
}

export async function deleteCourse(user: string, id: string) {
  try {
    await sql`DELETE FROM doraemon_courses WHERE id = ${id}`;
    revalidatePath(`/${user}`);
    return { message: "Course deleted" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Course." };
  }
}

export async function deleteBread(
  user: string,
  courseId: string,
  breadId: string
) {
  try {
    await sql`DELETE FROM doraemon_breads WHERE id = ${breadId}`;
    revalidatePath(`/${user}/courses/${courseId}`);
    return { message: "Bread deleted" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Bread." };
  }
}

export async function updateBread(
  id: string,
  prevState: UpdateBreadState,
  formData: FormData
) {
  const validatedFields = UpdateBread.safeParse({
    courseId: formData.get("course-id"),
    author: formData.get("author"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Bread.",
    };
  }

  const { courseId, author, content } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      UPDATE doraemon_breads
      SET content = ${content}, last_updated_date = ${date}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Bread." };
  }

  revalidatePath(`/${author}/courses/${courseId}`);
  redirect(`/${author}/courses/${courseId}`);
}
