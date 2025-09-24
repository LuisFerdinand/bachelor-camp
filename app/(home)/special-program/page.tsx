import ProgramPage from "@/modules/home/ui/pages/program";
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <ProgramPage />
    </HydrateClient>
  );
};

export default Page;
