 
 
 
 
import { ScrapbookBento } from "./components/ScrapbookBento";
import { ToolboxBento } from "./components/ToolboxBento";
import { ConnectionsBento } from "./components/ConnectionsBento";
import { AnimatedProfilePicture } from "./components/AnimatedProfilePicture";
import { AnimatedText } from "./components/AnimatedText";
import { PhotoGallery } from "./components/PhotoGallery";
import { AboutMeBento } from "./components/AboutMeBento";
import { AnimatedMobilePhotos } from "./components/AnimatedMobilePhotos";
import { GridWrapper } from "./components/GridWrapper";
import { ArtPlum } from "./components/ArtPlum";
import { AboutTrackPattern } from "./components/AboutTrackPattern";
import { ShadowBox } from "./components/ShadowBox";
import { WavyHighlight } from "./components/WavyHighlight";

export default function Home() {

  const PROFILE_DELAY = 0;
  const HEADING_DELAY = PROFILE_DELAY + 0.2;
  const PARAGRAPH_DELAY = HEADING_DELAY + 0.1;
  const PHOTOS_DELAY = PARAGRAPH_DELAY + 0.1;

  return (
    <section>
      <ArtPlum minLength={6} maxLength={10} />
      <AnimatedProfilePicture delay={PROFILE_DELAY} />
      <div className="mt-6 space-y-10 md:mt-0 md:space-y-16">
        <section>
          <div className="relative text-balance">
            <GridWrapper>
              <AnimatedText
                as="h1"
                delay={HEADING_DELAY}
                className="mx-auto max-w-2xl text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]"
              >
                Hey, I&apos;m Amitabh! <br /> Welcome to my corner of the
                internet!
              </AnimatedText>
            </GridWrapper>
            <GridWrapper>
              <div className="mt-4 text-center md:mt-8">
                <AnimatedText
                  as="p"
                  delay={PARAGRAPH_DELAY}
                  className="leading-8 text-text-secondary"
                >
                  <WavyHighlight delay={200}>I&apos;m a person with a passion to see the</WavyHighlight> <WavyHighlight delay={200}>lifecycle of a
                  product from start to end.</WavyHighlight> <br /><WavyHighlight delay={200}>I have a knack for tinkering, a
                  love for design and the experience for building things.</WavyHighlight>
                </AnimatedText>
              </div>
            </GridWrapper>
          </div>
          <div>
            {/* Desktop Photos */}
            <div className="relative hidden h-fit w-full items-center justify-center lg:flex">
              <PhotoGallery animationDelay={PHOTOS_DELAY} />
            </div>

            {/* Mobile Photos */}
            <AnimatedMobilePhotos delay={PHOTOS_DELAY} />
          </div>
        </section>

        {/* About Section (moved from About page) */}
        <section className="relative space-y-10 md:space-y-16">
          <div className="relative space-y-8 text-center">
            <div className="space-y-4">
              <GridWrapper>
                <div className="text-center text-lg font-medium text-indigo-600">
                  <span>About</span>
                </div>
              </GridWrapper>
              <GridWrapper>
                <h2 className="mx-auto max-w-xl text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                  Here&apos;s a quick intro about me
                </h2>
              </GridWrapper>
            </div>
            <div className="relative h-fit w-full overflow-hidden">
              <div className="absolute left-0 top-0 w-full md:left-4 lg:left-[355px] xl:left-[455px]">
                <AboutTrackPattern />
              </div>

              {/* Section 1 */}
              <div className="grid grid-cols-1 gap-8 py-12 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-32 lg:pb-20 xl:py-32">
                <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={208} height={278}></ShadowBox>
                      <img
                        className="absolute left-0 top-0 h-[270px] w-[200px] rotate-[-8deg] rounded-lg object-cover shadow"
                        src="/fam.JPG"
                        alt="A headshot"
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    My Business Origins
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                  In 2017, my <WavyHighlight delay={400}>family launched an edtech business</WavyHighlight> that’s still running strong in 2025. From young, I <WavyHighlight delay={600}>started in marketing then moved into building products and testing for market fit</WavyHighlight> and as the company scaled, I took more responsibility. In 2023, we <WavyHighlight delay={800}>created a training and consulting firm</WavyHighlight> that reached product market fit rapidly and <WavyHighlight delay={1000}>was acquired in 2025</WavyHighlight> for a low six figure sum. These experiences taught me first hand how innovation, execution and customer centric design is vital in business success.
                  </p>
                </div>
                <div className="hidden lg:order-1 lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/fam.JPG"
                      alt="A headshot"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="grid grid-cols-1 gap-8 py-0 lg:grid-cols-2 lg:items-center lg:justify-between lg:pl-12">
                <div className="flex flex-col items-center text-left lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <img
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                        src="/amitabh_tutor.png"
                        alt="Tech conference"
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    Finding My Way to Code
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                  While business gave me exposure to markets, customers and growth strategies, technology was always at the core of everything we did. From building and implementing SaaS solutions to making sure systems ran reliably, I became interested in how software enables business outcomes.
                  <br />
                  <br />
                  At the <WavyHighlight delay={400}>UNSW as a Software Engineering (Honours) student</WavyHighlight>, I’ve been fortunate to <WavyHighlight delay={600}>achieve strong results</WavyHighlight>, including <WavyHighlight delay={400}>scoring in the top 1% of my cohort in Software Engineering Fundamentals and Requirements and Design</WavyHighlight> and <WavyHighlight delay={800}>receiving a Letter of Recommendation from the Director of Software Engineering, Prof. Fethi Rabhi.</WavyHighlight> These experiences confirmed that my place lies at the intersection of technology, product and innovation.
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[8deg] rounded-lg object-cover shadow"
                      src="/amitabh_tutor.png"
                      alt="Headshot"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="grid grid-cols-1 gap-8 pr-12 lg:grid-cols-2 lg:items-center lg:justify-between xl:py-24">
                <div className="flex flex-col items-center text-left lg:order-2 lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={188} height={278}></ShadowBox>
                      <img
                        className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                        src="/5866.JPG"
                        alt="A headshot"
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    Life Beyond Code
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                  Outside of business and engineering, I find inspiration in nature, startups, historical architecture, cars and paleontology (an unusual collection, I know...). I love hiking and seeing genuinely breathtaking views, helps keep me grounded. Startups, deep tech and global trends across industries help my think tank create new ideas. Historical architecture and paleontology go hand in hand for my childhood fascination of the past (you should see my stone and shark tooth collection). And cars, well they just look and sound nice (dream car is Novitec 812 Ferrari).

                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={188} height={278}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[270px] w-[180px] rotate-[-8deg] rounded-lg object-cover shadow"
                      src="/5866.JPG"
                      alt="A headshot"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:justify-between lg:py-12 lg:pl-12 xl:py-8">                
                <div className="flex flex-col items-center text-left lg:items-start">
                  <div className="mb-8 lg:hidden">
                    <div className="relative mx-auto w-fit">
                      <ShadowBox width={450} height={358}></ShadowBox>
                      <img
                        className="absolute left-0 top-0 h-[320px] w-[640px] rotate-[6deg] rounded-lg object-cover shadow"
                        src="/team.png"
                        alt="A headshot"
                      />
                    </div>
                  </div>
                  <h2 className="mb-6 w-full text-balance text-3xl font-medium leading-[40px] tracking-tighter text-text-primary">
                    These Days
                  </h2>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                  <WavyHighlight delay={400}>On top of my business experience</WavyHighlight>, I’ve had the chance to build my career across multiple roles. As a <WavyHighlight delay={600}>Platform Operations Engineer</WavyHighlight> at InspireEd, I managed infrastructure, DevOps and SRE. Later as a <WavyHighlight delay={800}>Product Research Analyst</WavyHighlight>, I focused on fintech and digital trade, combining technical insights with market strategy. Today, I’m a <WavyHighlight delay={1000}>Software Engineering Intern</WavyHighlight> at the Fintech AI Innovation Consortium (FAIC) where I've led and helped build products for industry partners like Macquarie, Westpac and CSIRO's Data61.
                  </p>
                  <p className="mb-6 text-base leading-8 text-text-secondary">
                  <WavyHighlight delay={1200}>Looking forward, I aim to expand into roles that involve the full product lifecycle, where I can bring together my experience in business, engineering and product innovation.</WavyHighlight>
                  </p>
                </div>
                <div className="hidden lg:block">
                  <div className="relative mx-auto w-fit">
                    <ShadowBox width={450} height={350}></ShadowBox>
                    <img
                      className="absolute left-0 top-0 h-[320px] w-[640px] rotate-[8deg] rounded-lg object-cover shadow"
                      src="/team.png"
                      alt="Team photo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More info Section */}
        <section className="relative space-y-10 md:space-y-16">
          {/* <InfoPattern /> */}
          <div className="space-y-4">
            <GridWrapper>
              <div className="text-center text-lg font-medium text-indigo-600">
                <span>Find out more!</span>
              </div>
            </GridWrapper>
            <GridWrapper>
              <h2 className="mx-auto max-w-lg text-balance text-center text-3xl font-medium leading-10 tracking-tight text-text-primary md:text-4xl">
                Here&apos;s what sets me apart and makes me unique
              </h2>
            </GridWrapper>
          </div>

          <GridWrapper>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12 lg:grid-rows-[14]">
              <div className="col-span-1 md:col-span-5 lg:col-span-5 lg:row-span-6">
                <AboutMeBento linkTo="/projects" />
              </div>

              <div className="md:col-span-12 lg:col-span-7 lg:row-span-8">
                <ConnectionsBento linkTo="/experience" />
              </div>

              <div className="md:col-span-7 md:row-start-1 lg:col-span-5 lg:row-span-7">
                <ToolboxBento linkTo="/experience#skills" />
              </div>

              <div className="md:col-span-12 lg:col-span-7 lg:row-span-5">
                <ScrapbookBento />
              </div>
            </div>
          </GridWrapper>
        </section>

        
      </div>
    </section>
  );
}
