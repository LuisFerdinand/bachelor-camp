import ContactPage from "@/modules/home/ui/pages/contact";
import { HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  return (
    <HydrateClient>
      <ContactPage />
    </HydrateClient>
  );
};

export default Page;
