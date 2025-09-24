import { TestimonialsView } from "@/modules/dashboard/ui/views/content/testimonials/TestimonialsView";
import IconDemo from "@/public/icons/social-icons";
// import {
//   PinterestIcon,
//   RedditIcon,
//   ThreadsIcon,
//   TikTokIcon,
//   XIcon,
//   DiscordIcon,
//   FacebookIcon,
//   InstagramIcon,
//   LinkedInIcon,
//   SnapChatIcon,
//   TelegramIcon,
//   WhatsAppIcon,
//   YoutubeIcon,
// } from "@/public/icons/social-icons";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.testimonials.getAllCategories.prefetch();
  return (
    <HydrateClient>
      <TestimonialsView />
      <div className="border flex ">
        {/* <TikTokIcon height={32} width={32} />
        <XIcon height={32} width={32} />
        <ThreadsIcon height={32} width={32} />
        <PinterestIcon height={32} width={32} />
        <RedditIcon height={32} width={32} />
        <YoutubeIcon height={32} width={32} />
        <DiscordIcon height={32} width={32} />
        <FacebookIcon height={32} width={32} />
        <InstagramIcon height={32} width={32} />
        <LinkedInIcon height={32} width={32} />
        <SnapChatIcon height={32} width={32} />
        <TelegramIcon height={32} width={32} />
        <WhatsAppIcon height={32} width={32} /> */}
        <IconDemo></IconDemo>
      </div>
    </HydrateClient>
  );
};

export default Page;
