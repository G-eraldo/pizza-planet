import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { resend } from "../resend";

const client = new MongoClient(process.env.MONGO);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    async sendResetPassword(data) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: data.user.email,
        subject: "Réinitialiser votre mot de passe",
        text: `Réinitialiser votre mot de passe: ${data.url}`,
      });
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [nextCookies()],
});
