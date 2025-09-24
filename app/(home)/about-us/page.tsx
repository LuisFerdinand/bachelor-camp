import AboutUsPage from "@/modules/home/ui/pages/about";
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <AboutUsPage />
    </HydrateClient>
  );
};

export default Page;
