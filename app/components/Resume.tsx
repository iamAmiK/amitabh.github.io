import { ResumeData } from "../lib/resume/types";
import { Timeline } from "./Timeline";

const resumeData: ResumeData = {
  experiences: [
    {
      company:
        "Fintech AI Innovation Consortium (FAIC) — Finance, AI/Cloud, Digital Trade",
      period: "Mar 2025 - Present",
      positions: [
        {
          title: "Software Engineering Intern (Apr 2025 - Present)",
          description: [
            "Granted by Prof. Fethi Rabhi, I am collaborating with PhD students to lead database refactoring and population, AI/NLP/agentic research and full-stack implementation for business process automation.",
            "Created a secure, scalable and PEPPOL compliant API in Lambda for e-invoicing with schema validation and 16 other features, incorporating feedback from stakeholders to align with industry & regulatory needs.",
            "Contributing to backend enhancements in a Flask-based web app that translates BPMN workflows into AWS Step Functions and improving AWS SQS communication between the S3 bucket and Lambdas.",
          ],
        },
        {
          title: "Research Analyst (Mar 2025 - Present)",
          description: [
            "Leading APAC market research on digital trade and fintech to support product strategy, market fit and commercialisation planning with industry partners.",
            "Engaged with Macquarie, Data61, Westpac and C-level executives at fintech and AI startups (Cognitivo, Stardog) to explore partnership opportunities, validate solution fit and user adoption goals across APAC markets.",
            "Delivered stakeholder briefs and technical requirement reports on trends, competitive positioning and risks to inform AI business process adoption and market engagement strategies.",
          ],
        },
      ],
    },
    {
      company: "InspireEd - Training and Consulting Firm (Acquired)",
      period: "2023 - July 2025",
      positions: [
        {
          title: "Product / Operations Lead",
          description: [
            "As co-founder of our second family business, I took responsibility for growing our training and consulting firm's product and operations capabilities. We achieved rapid product-market fit in 2024 through strategic B2B partnerships and scaled our team to 15 people while expanding our service offerings.",
            "Led go-to-market strategy and delivery operations for both B2C acquisition and B2B partnerships. Managed a multidisciplinary team of 7 (onshore and overseas) across operations and product development.",
            "Scaled service offerings and business operations throughout 2024, growing from startup to 15-person team. Successfully negotiated and completed an acquisition exit for a low six-figure sum in July 2025.",
            "Developed and deployed a REST API on AWS Lambda with API Gateway to integrate the aXcelerate CMS with Azure Communication Services and the main site, enabling secure and automated email enrollment workflows.",
            "Managed Learning Management System, CMS and SMTP network infrastructure, applying security best practices to ensure data integrity, availability and compliance with RTO standards.",
            "Enhanced email reliability by deploying and configuring a secure, open-source SMTP gateway, saving costs and improving uptime.",
            "Built automated reporting & analytics pipelines to track student progress, completion rates and business KPIs to enable data-driven decision making."
          ],
        },
      ],
    },
    {
      company: "Family Business - Education, Edtech",
      period: "2017 - Present (Still working here now and then)",
      positions: [
        {
          title: "Product, Engineer, Marketing, Growth and everything in between",
          description: [
            "Our first family venture, starting at the age of 12, I was first involved in marketing making graphic designs, giving flyers and emailing before moving into product development and market fit testing as I  and the company grew.",
            "I took on broader responsibilities across product, operations and customer success. This was a a vital experience where I learned first hand how innovation, execution and customer centric design drive business success.",
            "Through all the ups and downs that happened, we are still running strong til date and have impacted over 5000 customers."
          ],
        },
      ],
    },
  ],
  avatarUrl: "/profile.png",
};

export function Resume() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden">
          <div className="divide-y divide-gray-100">
            {resumeData.experiences.map((experience) => (
              <div
                key={experience.company}
                className="grid grid-cols-[1fr,5fr] gap-6 py-12 first:pt-0 last:pb-0 md:grid-cols-[2fr,1fr,4fr]"
              >
                <div className="hidden md:block">
                  <h3 className="text-xl font-bold">{experience.company}</h3>
                  <p className="text-sm text-gray-600">{experience.period}</p>
                </div>

                <div />

                <div className="space-y-6">
                  {experience.positions.map((position, index) => (
                    <div
                      key={`${experience.company}-${index}`}
                      className="space-y-4"
                    >
                      {/* Show company info on mobile above each position */}
                      <div className="block md:hidden">
                        <h3 className="text-xl font-bold">{experience.company}</h3>
                        <p className="text-sm text-gray-600">{experience.period}</p>
                      </div>
                      
                      <h4 className="text-lg font-semibold">
                        {position.title}
                      </h4>
                      <div className="space-y-3">
                        {position.description.map((desc, i) => (
                          <p key={i} className="text-gray-600">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute top-0 h-full w-8 md:left-[calc(28%_-_1rem)]"
            aria-hidden
          >
            <Timeline avatarUrl={resumeData.avatarUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
