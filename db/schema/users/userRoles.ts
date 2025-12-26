import { pgTable, uuid, timestamp, unique, text } from "drizzle-orm/pg-core";

export const userRoles = pgTable(
  "user_roles",
  {
    userId: text("user_id").notNull(),
    roleId: uuid("role_id").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    userRoleUnique: unique("user_roles_user_id_role_id_unique").on(
      t.userId,
      t.roleId
    ),
  })
);
