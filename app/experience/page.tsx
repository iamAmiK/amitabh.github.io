import { HorizontalLine } from "@/app/components/HorizontalLine";
import React from "react";
import { ScrapbookBento } from "@/app/components/ScrapbookBento";
import { Resume } from "app/components/Resume";
import { GridWrapper } from "@/app/components/GridWrapper";
import { Photo } from "@/app/components/Photo";
import { SkillsSection } from "@/app/components/SkillsSection";
import { ArtPlum } from "@/app/components/ArtPlum";

export default function ExperiencePage() {

  return (
    <div className="relative mt-14">
      <ArtPlum minLength={6} maxLength={10} />
      <title>Experience | Amitabh Kumar</title>
      <div className="relative space-y-10 md:space-y-16">
        {/* Title */}
        <GridWrapper className="space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around lg:px-24">
            <div className="order-2 mx-auto max-w-lg lg:order-1 lg:m-0 lg:max-w-3xl lg:pr-12">
              <div className="text-center text-sm font-medium text-indigo-600 lg:text-left">
                <span>Greetings!</span>
              </div>
              <h1 className="mx-auto max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-5xl lg:text-left lg:text-6xl lg:leading-[64px]">
                I&apos;m Amitabh, a creative software engineer.
              </h1>
            </div>
            <div className="order-1 my-12 flex-shrink-0 lg:order-2 lg:my-0">
              <div className="relative mx-auto w-full max-w-[400px]">
                <div className="relative grid grid-cols-3">
                  <div className="relative z-20 -translate-y-2">
                    <Photo
                      width={140}
                      height={140}
                      src="/amitabh_tutor.png"
                      alt="Amitabh Kumar"
                      direction="left"
                    />
                  </div>
                  <div className="relative z-30">
                    <Photo
                      width={140}
                      height={140}
                      src="/ami-image1.jpeg"
                      alt="Amitabh Kumar"
                      direction="right"
                    />
                  </div>
                  <div className="relative z-20 translate-y-4">
                    <Photo
                      width={140}
                      height={140}
                      src="/profile.png"
                      alt="Amitabh Kumar"
                      direction="left"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GridWrapper>

        <span className="absolute left-1/2 top-40 -translate-y-1/2 translate-x-1/2">
          <HorizontalLine />
        </span>

        {/* Experience */}
        <div id="experience" className="relative space-y-8 text-center">
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-lg font-medium text-indigo-600">
                <span>Experience</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="mx-auto max-w-lg text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                My work history
              </h2>
            </GridWrapper>
          </div>
        </div>
        <div id="resume" className="space-y-16">
          <GridWrapper>
            <Resume />
          </GridWrapper>
        </div>

        <section id="certs" className="relative space-y-16">
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-lg font-medium text-indigo-600">
                <span>See My Documents</span>
              </div>
            </GridWrapper>

            <GridWrapper>
              <h2 className="mx-auto text-balance text-center text-2xl font-medium leading-12 tracking-tight text-text-primary">
                Click to open my Resume, Recommendation Letter and Certificates
              </h2>
            </GridWrapper>
          </div>

          {/* Documents Grid */}
          <GridWrapper>
            <div className="flex justify-center items-center w-full">
              <ScrapbookBento />
            </div>
          </GridWrapper>
        </section>

        <SkillsSection />

      </div>
    </div>
  );
}


