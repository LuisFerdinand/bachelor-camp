import { db } from "@/db";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { teamMembers } from "@/db/schema";

export async function DELETE(
  req: Request,
  { params }: { params: { teamMemberId: string } }
) {
  const { userId } = await auth();
  const teamMemberId = await params.teamMemberId;

  if (!userId || !teamMemberId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const teamMember = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.id, teamMemberId))
    .then((res) => res[0]);

  if (!teamMember) {
    return new Response(JSON.stringify({ message: "TeamMember not found" }), {
      status: 404,
    });
  }

  if (!teamMember.avatarKey) {
    return new Response(JSON.stringify({ message: "No avatar to delete" }), {
      status: 400,
    });
  }

  const utapi = new UTApi();
  try {
    await utapi.deleteFiles(teamMember.avatarKey);
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Failed to delete avatar" }),
      {
        status: 500,
      }
    );
  }

  await db
    .update(teamMembers)
    .set({ avatarUrl: null, avatarKey: null })
    .where(eq(teamMembers.id, teamMemberId));

  return new Response(JSON.stringify({ message: "Avatar deleted" }), {
    status: 200,
  });
}
