import CampPage from "@/modules/home/ui/pages/camp";
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <CampPage />
    </HydrateClient>
  );
};

export default Page;
