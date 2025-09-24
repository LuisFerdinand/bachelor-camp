import { db } from "@/db";
import { postCategories } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const postsRouter = createTRPCRouter({
  getCategories: baseProcedure.query(async () => {
    const data = await db
      .select({
        id: postCategories.id,
        name: postCategories.name,
        description: postCategories.description,
        slug: postCategories.slug,
        iconUrl: postCategories.iconUrl,
      })
      .from(postCategories);

    return data;
  }),
});
