import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Bachelor <auth@hello.vincentkon.tech>",
          to: [email],
          subject: "Your Bachelor login code",
          html: `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;">
          <h2>Sign in to Bachelor</h2>
          <p>Use the following one-time code to sign in:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">
            ${otp}
          </p>
          <p>This code will expire in a few minutes.</p>
          <p>If you didn’t request this, you can safely ignore this email.</p>
        </div>
      `,
        });
      },
    }),
  ],
});
