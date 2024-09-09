"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

const SignUpFormSchema = z.object({
  username: z.string().min(3, {
    message: "Please choose a username with at least 3 characters.",
  }),
  password: z.string().min(5, {
    message: "Please choose a password with at least 5 characters.",
  }),
  confirmPassword: z.string(),
});

const CreateUser = SignUpFormSchema;

export type State = {
  errors?: {
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
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
