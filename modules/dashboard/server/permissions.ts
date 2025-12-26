import { Role } from "@/db/schema/enums";

export type Permissions = {
  manageUsers?: boolean;
  viewAnalytics?: boolean;
};

export const ROLE_PERMISSIONS: Record<Role, Permissions> = {
  super_admin: {
    manageUsers: true,
    viewAnalytics: true,
  },
  admin: {
    viewAnalytics: true,
  },
  room_master: {},
  teacher: {},
  accommodation_staff: {},
  author: {},
};

export function hasPermission(
  role: Role | null,
  permission: keyof Permissions
) {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.[permission] === true;
}
