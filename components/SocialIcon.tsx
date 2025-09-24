type SocialMedia = {
  platform: string;
  icon: string; // raw SVG string from DB
  url: string;
};

export default function SocialIcon({ social }: { social: SocialMedia }) {
  return (
    <div className="flex gap-4">
      <a
        key={social.platform}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-6 h-6"
        dangerouslySetInnerHTML={{ __html: social.icon }}
      />
    </div>
  );
}
