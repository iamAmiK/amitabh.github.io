import { siteMetadata } from "app/data/siteMetadata";

export function SocialPill() {
  return (
    <div 
      className="z-30 flex place-items-center space-x-1 rounded-full px-3 py-1.5"
      style={{ backgroundColor: "rgba(167, 139, 250, 0.18)" }}
    >
      <a href={siteMetadata.email}>
        <img
          src="/blog/email.svg"
          alt="Email"
          className="h-8 w-8 sm:h-6 sm:w-6 text-gray-400 hover:text-gray-300 transition-colors"
        />
        <span className="sr-only">Email</span>
      </a>
      <a href={siteMetadata.github} target="_blank" rel="noopener noreferrer">
        <img
          src="/blog/github.svg"
          alt="GitHub"
          className="h-8 w-8 sm:h-6 sm:w-6 text-gray-400 hover:text-gray-300 transition-colors"
        />
        <span className="sr-only">GitHub</span>
      </a>
      <a href={siteMetadata.youtube} target="_blank" rel="noopener noreferrer">
        <img
          src="/blog/youtube.svg"
          alt="YouTube"
          className="h-8 w-8 sm:h-6 sm:w-6 text-gray-400 hover:text-gray-300 transition-colors"
        />
        <span className="sr-only">YouTube</span>
      </a>
      <a 
        href="https://www.linkedin.com/in/amitabh-kumar-/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img
          src="/blog/linkedin.svg"
          alt="LinkedIn"
          className="h-8 w-8 sm:h-6 sm:w-6 text-gray-400 hover:text-gray-300 transition-colors"
        />
        <span className="sr-only">LinkedIn</span>
      </a>
    </div>
  );
}
