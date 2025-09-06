import Link from "next/link";

type Props = {
  navLinks: { href: string; label: string }[];
  pathname: string;
  closeMenus: () => void;
  shouldUseSolidStyling: boolean;
};

export default function DesktopNav({
  navLinks,
  pathname,
  shouldUseSolidStyling,
  closeMenus,
}: Props) {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-medium transition-all duration-500 ease-in-out ${
            pathname === link.href
              ? shouldUseSolidStyling
                ? "text-brand-600"
                : "text-accent-300"
              : shouldUseSolidStyling
                ? "text-gray-700 hover:text-brand-600"
                : "text-white/90 hover:text-white"
          }`}
          onClick={closeMenus}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
