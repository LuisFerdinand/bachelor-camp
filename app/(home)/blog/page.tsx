import BlogPage from "@/modules/home/ui/pages/blog";
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <BlogPage />
    </HydrateClient>
  );
};

export default Page;
