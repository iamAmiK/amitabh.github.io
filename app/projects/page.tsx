"use client";

import { GridWrapper } from "@/app/components/GridWrapper";
import { ArtPlum } from "@/app/components/ArtPlum";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  bullets: string[];
  image?: string;
  url?: string;
  videoUrl?: string;
  award?: string;
  status?: string;
}

const projects: Project[] = [
  {
    title: "Full-stack UBL Invoice Automation Platform and API",
    description: "A comprehensive REST API and full-stack web application for UBL invoice generation, validation, translation, and automated dispatch.",
    techStack: ["TypeScript", "Node.js", "Express", "AWS (RDS, S3, Elastic Beanstalk)", "Gemini AI", "Vercel", "Gmail SMTP"],
    bullets: [
      "Developed a REST API and full-stack web application for UBL invoice generation/validation, translation (via Gemini AI), PDF export and SMTP dispatch, deployed on Elastic Beanstalk and Vercel.",
      "Designed schema validation and compliance mechanisms with PostgreSQL on AWS RDS, implemented CI/CD pipelines via GitHub Actions and deployed backend services on AWS EC2 to manage AI agentic workflows and allowing user driven natural language commands."
    ],
    videoUrl: "https://www.youtube.com/watch?v=HQjNpQa1V7Q"
  },
  {
    title: "Learning Management System SaaS",
    description: "Building a scalable LMS web platform for my family business with serverless deployment and secure authentication.",
    techStack: ["TypeScript", "SST SDK (IaC)", "AWS (Amplify, EC2, RDS)", "Azure Entra ID", "Node.js", "HTML", "CSS"],
    bullets: [
      "Building a scalable LMS web platform with serverless deployment on AWS Amplify and secure authentication using Azure Entra ID as well as focusing on secure API gateway usage.",
      "Designing modular backend services to handle course delivery, enrolments and user management using Node.js with secure token-based access controls."
    ],
    status: "In Development"
  },
  {
    title: "Open Source NPM Package",
    description: "Published a flexible call routing and trigger library used by multiple projects, achieving 200+ downloads.",
    techStack: ["TypeScript", "JavaScript", "Open Source", "Version Control", "NPM"],
    bullets: [
      "Published a package called any-call-system-web on NPMjs, a flexible call routing and trigger library used by multiple projects, achieving 200+ downloads."
    ],
    url: "https://www.npmjs.com/package/any-call-system-web"
  },
  {
    title: "Mars Rover",
    description: "Functional Mars Rover with precision bidirectional movement, remote-controlled scoop and real-time telemetry.",
    techStack: ["Arduino", "C++", "Wi-Fi", "Hardware Engineering", "Telemetry"],
    bullets: [
      "Engineered a functional Mars Rover with precision bidirectional movement, remote-controlled scoop and real-time telemetry with UNO Arduino Wi-Fi.",
      "Implemented real-time data transmission and remote control capabilities for autonomous navigation."
    ],
    award: "🏆 1st place for Most Aesthetic Design in Deeptech Hackathon at UNSW Founders x Engineering",
    videoUrl: "https://www.youtube.com/watch?v=ygeF7XZYYzQ"
  },
  {
    title: "Portfolio Website",
    description: "My personal portfolio website showcasing modern web development techniques with advanced animations and automated deployment.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub Actions", "Vercel", "React"],
    bullets: [
      "Built with Next.js 14 and TypeScript for type-safe, server-side rendered performance with optimised loading speeds.",
      "Implemented complex animations using Framer Motion including scroll-triggered animations, drag interactions and smooth page transitions.",
      "Automated CI/CD pipeline with GitHub Actions for seamless deployment to Vercel with branch previews and automated testing.",
      "Features dynamically generated fractal backgrounds using mathematical algorithms for unique visual patterns on each page load. (Because why not, and they look nice)",
      "Responsive design with mobile friendly approach, ensuring optimal experience across all devices and screen sizes.",
    ],
    url: "https://github.com/iamAmiK/amitabh.github.io" 
  }
];

function ProjectImage(props) {
  return (
    <img src={props.src} alt={props.alt} className="drama-shadow rounded-xl" />
  );
}

function VideoEmbed({ videoUrl }: { videoUrl: string }) {
  // Extract video ID from YouTube URL
  const videoId = videoUrl.split('v=')[1]?.split('&')[0];
  
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Project Demo Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function TechStack({ technologies }: { technologies: string[] }) {
  return (
    <div className="mb-4">
      <h4 className="mb-2 text-sm font-medium text-slate-700">Tech Stack</h4>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const scrollToProject = (index: number) => {
    const element = document.getElementById(`project-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const projectNames = [
    "UBL Invoice Platform",
    "LMS SaaS",
    "NPM Package", 
    "Mars Rover",
    "Portfolio Website"
  ];

  return (
    <div className="relative space-y-16">
      <ArtPlum minLength={6} maxLength={10} />
      <GridWrapper>
        <h1 className="mx-auto mt-16 max-w-2xl text-balance text-center text-4xl font-medium leading-tight tracking-tighter text-text-primary md:text-6xl md:leading-[64px]">
          A collection of my favourite works.
        </h1>
      </GridWrapper>

      {/* Navigation Buttons */}
      <GridWrapper>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {projectNames.map((name, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {name}
            </button>
          ))}
        </div>
      </GridWrapper>

      <GridWrapper className="space-y-16">
        {projects.map((project, index) => (
          <div key={project.title} id={`project-${index}`} className="space-y-8 scroll-mt-24">
            {/* Video or Image */}
            {project.videoUrl ? (
              <GridWrapper className="px-4 md:px-10">
                <VideoEmbed videoUrl={project.videoUrl} />
              </GridWrapper>
            ) : project.image ? (
              <GridWrapper className="px-4 md:px-10">
                <ProjectImage src={project.image} alt={project.title} />
              </GridWrapper>
            ) : null}

            {/* Project Content */}
            <GridWrapper className="px-4 md:px-10">
              <div className="mx-auto max-w-4xl">
                {/* Title and Status/Award */}
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <h2 className="text-2xl font-medium leading-tight tracking-tight text-slate-900 md:text-3xl">
                    {project.title}
                  </h2>
                  {project.status && (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Award */}
                {project.award && (
                  <div className="mb-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-4 border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-800">{project.award}</p>
                  </div>
                )}

                {/* Description */}
                <p className="mb-6 text-base leading-relaxed text-text-secondary md:text-lg">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <TechStack technologies={project.techStack} />

                {/* Bullet Points */}
                <div className="mb-6">
                  <ul className="space-y-3">
                    {project.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-600"></div>
                        <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {project.url && (
                    <a
                      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.url.includes('github') ? 'View on GitHub' : 
                       project.url.includes('npmjs') ? 'View on NPM' : 
                       `Visit ${project.title}`}
                      <svg
                        className="relative ml-2.5 mt-px overflow-visible"
                        width="3"
                        height="6"
                        viewBox="0 0 3 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M0 0L3 3L0 6"></path>
                      </svg>
                    </a>
                  )}
                  {project.videoUrl && (
                    <a
                      className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Demo
                      <svg
                        className="relative ml-2.5 mt-px overflow-visible"
                        width="3"
                        height="6"
                        viewBox="0 0 3 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M0 0L3 3L0 6"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </GridWrapper>

            {/* Divider (except for last project) */}
            {index < projects.length - 1 && (
              <div className="mx-auto max-w-4xl">
                <div className="border-t border-dashed border-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </GridWrapper>
    </div>
  );
}
