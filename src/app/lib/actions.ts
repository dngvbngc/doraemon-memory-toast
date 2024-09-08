"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";

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
