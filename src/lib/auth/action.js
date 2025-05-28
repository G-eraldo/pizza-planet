"use server";

import { auth } from "@/lib/auth/auth";
import { APIError } from "better-auth/api";
import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";

const client = new MongoClient(process.env.MONGO);
const db = client.db();

export async function signUp(prevState, formData) {
  const rawFormData = {
    email: formData.get("email"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    password: formData.get("pwd"),
  };

  const { email, password, firstname, lastname } = rawFormData;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstname} ${lastname}`,
        email: email.toLowerCase().trim(),
        password,
      },
    });
  } catch (error) {
    console.error("Erreur BetterAuth:", error);

    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "Utilisateur déjà existant" };
        case "BAD_REQUEST":
          return { errorMessage: "Email invalide" };
        default:
          return { errorMessage: "Une erreur est survenue" };
      }
    }

    return { errorMessage: "Une erreur inattendue est survenue" };
  }
  redirect("/se-connecter");
}

export async function signIn(prevState, formData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("pwd"),
  };

  const { email, password } = rawFormData;

  try {
    await auth.api.signInEmail({
      body: {
        email: email.toLowerCase().trim(),
        password,
      },
    });
  } catch (error) {
    console.error("Erreur de connexion:", error);

    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return {
            errorMessage: "Utilisateur non trouvé ou mot de passe incorrect",
          };
        case "BAD_REQUEST":
          return { errorMessage: "Email invalide" };
        default:
          return { errorMessage: "Une erreur est survenue" };
      }
    }

    return { errorMessage: "Une erreur inattendue est survenue" };
  }
  redirect("/dashboard");
}

export async function searchAccount(email) {
  const user = await db.collection("user").findOne({
    email: email.toLowerCase().trim(),
  });
  return !!user;
}
