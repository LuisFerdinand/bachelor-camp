import { betterAuth } from "better-auth";

export const authEdge = betterAuth({
  // ⚠️ NO DATABASE
  // ⚠️ NO DRIZZLE
  // ⚠️ NO DOTENV
});