import { db } from "@/db";
import { eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
import { testimonials } from "@/db/schema";

export async function DELETE(
  req: Request,
  { params }: { params: { testimonialId: string } }
) {
  const { userId } = await auth();
  const testimonialId = await params.testimonialId;

  if (!userId || !testimonialId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const testimonial = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, testimonialId))
    .then((res) => res[0]);

  if (!testimonial) {
    return new Response(JSON.stringify({ message: "Testimonial not found" }), {
      status: 404,
    });
  }

  if (!testimonial.imageKey) {
    return new Response(JSON.stringify({ message: "No image to delete" }), {
      status: 400,
    });
  }

  const utapi = new UTApi();
  try {
    await utapi.deleteFiles(testimonial.imageKey);
  } catch (err) {
    return new Response(JSON.stringify({ message: "Failed to delete image" }), {
      status: 500,
    });
  }

  await db
    .update(testimonials)
    .set({ imageUrl: null, imageKey: null })
    .where(eq(testimonials.id, testimonialId));

  return new Response(JSON.stringify({ message: "Image deleted" }), {
    status: 200,
  });
}
