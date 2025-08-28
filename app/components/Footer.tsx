 
import { SocialPill } from "./SocialPill";
import { GridWrapper } from "./GridWrapper";

interface FooterLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "General",
    links: [
      { href: "/", label: "Home" },
      { href: "/experience", label: "Experience" },
      { href: "/projects", label: "Projects" },
      { href: "/experience#certs", label: "Resume" },
    ],
  },
];

export function Footer() {
  const renderFooterLink = (link: FooterLink) => {
    if (link.isExternal) {
      return (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      );
    }
    return <a href={link.href}>{link.label}</a>;
  };

  return (
    <>
      <div className="relative max-w-7xl border-border-primary/50">
        <GridWrapper className="">
          {/* wrapper start */}
          <div className="max-w-6xl divide-y px-4 lg:mx-auto lg:flex lg:divide-x lg:px-4 xl:px-0">
            <div className="flex w-full py-6 text-sm">
              <div>
                <div className="flex-grow space-y-6">
                  <a className="inline-block" href="/">
                    <video
                      className="h-24 w-24"
                      src="/ak_logo.mp4"
                      aria-label="Amitabh's logo animation"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </a>
                  <p className="w-60 leading-5 text-gray-500">
                    I&apos;m Amitabh - a Software Engineering (Honours) student at UNSW with a developer, innovator and teacher heart.
                  </p>
                </div>
                <p className="mt-6 text-gray-500">
                  © {new Date().getFullYear()} Amitabh Kumar
                </p>
              </div>
              <div className="flex w-full items-end justify-end pr-16">
                <SocialPill />
              </div>
            </div>
            <div className="flex w-full flex-col items-end py-6 text-xs lg:pl-16">
              <div className="ld:space-x-0 flex w-full justify-between md:justify-start md:space-x-36 lg:justify-between">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <span className="mb-4 inline-block text-base font-medium text-text-primary">
                      {section.title}
                    </span>
                    <ul className="space-y-2 text-sm text-gray-500">
                      {section.links.map((link) => (
                        <li className="hover:text-text-primary" key={link.href}>
                          {renderFooterLink(link)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* wrapper end */}
        </GridWrapper>
      </div>
      <div className="relative h-8 w-full [background-image:linear-gradient(45deg,theme(colors.border-primary)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-primary)_50%,theme(colors.border-primary)_62.50%,transparent_62.50%,transparent_100%)] [background-size:5px_5px]"></div>
    </>
  );
}
