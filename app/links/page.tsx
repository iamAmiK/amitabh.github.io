
import { GridWrapper } from "@/app/components/GridWrapper";
import { ProfilePicture } from "@/app/components/ProfilePicture";
import { Button } from "@/app/components/Button";
import { siteMetadata } from "@/app/data/siteMetadata";
// Blog section removed

export default async function LinksPage() {

  return (
    <div className="relative">
      <title>Links | Amitabh Kumar</title>
      <div className="space-y-12">
        <ProfilePicture />
        <GridWrapper>
          <h1 className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
            Hey, I&apos;m Amitabh!
          </h1>
        </GridWrapper>
        <GridWrapper>
          <div className="mx-auto max-w-xl text-center md:mt-8">
            <p className="leading-8 text-text-secondary">
              I&apos;m a creative software engineer, entrepreneur and
              international speaker.
            </p>
          </div>
        </GridWrapper>
        <GridWrapper>
          <div className="flex justify-center space-x-4 py-4">
            <Button href="/" variant="primary">
              View my full website
            </Button>
            <Button href={siteMetadata.email} variant="secondary">
              Email me
            </Button>
          </div>
        </GridWrapper>
        <GridWrapper>
          <div className="text-center text-sm font-medium text-indigo-600">
            <span>Socials</span>
          </div>
        </GridWrapper>
        <GridWrapper>
          <div className="relative mx-auto grid max-w-2xl grid-cols-3 place-items-center justify-items-center">
            <a
              href={siteMetadata.email}
              className="group no-underline transition-all duration-500 group-hover:-translate-y-3"
            >
              <div className="group inline-block text-center">
                <div className="h-28 w-28 rounded-[20px] border border-border-primary bg-bg-primary p-2 transition-all duration-300 group-hover:-translate-y-3 group-hover:border-indigo-400">
                  <div
                    className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]"
                    style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
                  >
                    <img
                      src="/blog/email.svg"
                      alt="Email"
                      className="h-12 w-12"
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-500">Email</p>
                </div>
              </div>
            </a>
            <a
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group no-underline transition-all duration-500 group-hover:-translate-y-3"
            >
              <div className="group inline-block text-center">
                <div className="h-28 w-28 rounded-[20px] border border-border-primary bg-bg-primary p-2 transition-all duration-300 group-hover:-translate-y-3 group-hover:border-indigo-400">
                  <div
                    className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]"
                    style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
                  >
                    <img
                      src="/blog/github.svg"
                      alt="GitHub"
                      className="h-12 w-12"
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-500">GitHub</p>
                </div>
              </div>
            </a>
            <a
              href={siteMetadata.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group no-underline transition-all duration-500 group-hover:-translate-y-3"
            >
              <div className="group inline-block text-center">
                <div className="h-28 w-28 rounded-[20px] border border-border-primary bg-bg-primary p-2 transition-all duration-300 group-hover:-translate-y-3 group-hover:border-indigo-400">
                  <div
                    className="grid h-full place-items-center rounded-xl border-2 border-[#A5AEB81F]/10 bg-[#EDEEF0]"
                    style={{ boxShadow: "0px 2px 1.5px 0px #A5AEB852 inset" }}
                  >
                    <img
                      src="/blog/youtube.svg"
                      alt="YouTube"
                      className="h-12 w-12"
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-500">YouTube</p>
                </div>
              </div>
            </a>
          </div>
        </GridWrapper>

        {/* Blog list removed */}

        
      </div>
    </div>
  );
}
