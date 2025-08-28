export type SkillCategory =
  | "Programming Languages"
  | "Cloud & Infrastructure"
  | "Tools & Applications"
  | "Agile & Product Knowledge";

export type Skill = {
  name: string;
  category: SkillCategory;
  description: string;
};

export const skills: Skill[] = [
  // Programming Languages
  {
    name: "Python",
    category: "Programming Languages",
    description: "Used for scripting, backend development, and data analysis. Proficient (somewhat) with libraries like Flask and NumPy.",
  },
  {
    name: "JavaScript/TypeScript",
    category: "Programming Languages",
    description: "Extensive experience in building modern, responsive web applications with React, Next.js, and Node.js.",
  },
  {
    name: "Java",
    category: "Programming Languages",
    description: "Solid foundation in object-oriented programming, used in academic projects and for building robust applications.",
  },
  {
    name: "SQL",
    category: "Programming Languages",
    description: "Proficient in writing complex queries, database design, and working with relational databases like PostgreSQL and MySQL.",
  },
  {
    name: "C",
    category: "Programming Languages",
    description: "Strong understanding of low-level programming concepts, memory management, and system performance from university coursework.",
  },

  // Cloud & Infrastructure
  {
    name: "AWS",
    category: "Cloud & Infrastructure",
    description: "Experience with core services like EC2, S3, Lambda, and RDS for deploying and managing scalable applications.",
  },
  {
    name: "Azure",
    category: "Cloud & Infrastructure",
    description: "Familiarity with Azure services for building and deploying applications in a cloud environment.",
  },
  {
    name: "CI/CD",
    category: "Cloud & Infrastructure",
    description: "Implemented automated build, test, and deployment pipelines using tools like GitHub Actions and Jenkins.",
  },
  {
    name: "Containerization",
    category: "Cloud & Infrastructure",
    description: "Experience with Docker for creating consistent development and deployment environments.",
  },
  {
    name: "Serverless",
    category: "Cloud & Infrastructure",
    description: "Built and deployed serverless functions using AWS Lambda to create efficient, event-driven architectures.",
  },

  // Tools & Applications
  {
    name: "Postman",
    category: "Tools & Applications",
    description: "Used extensively for API testing, documentation, and development.",
  },
  {
    name: "Swagger",
    category: "Tools & Applications",
    description: "Experience in designing and documenting RESTful APIs using the OpenAPI specification.",
  },
  {
    name: "GitHub",
    category: "Tools & Applications",
    description: "Proficient with Git for version control and collaborative development using GitHub workflows.",
  },
  {
    name: "VS Code",
    category: "Tools & Applications",
    description: "My primary code editor, customized with extensions for optimal productivity.",
  },
  {
    name: "LMS Platforms",
    category: "Tools & Applications",
    description: "Experience in managing and integrating with Learning Management Systems from my edtech background.",
  },
  {
    name: "SMTP",
    category: "Tools & Applications",
    description: "Knowledge of email protocols and experience integrating email services into applications.",
  },

  // Agile & Product Knowledge
  {
    name: "Scrum",
    category: "Agile & Product Knowledge",
    description: "Worked in Agile environments, participating in sprint planning, stand-ups, and retrospectives.",
  },
  {
    name: "Product Lifecycle",
    category: "Agile & Product Knowledge",
    description: "Understanding of the full product lifecycle, from ideation and development to launch and iteration.",
  },
  {
    name: "Market Fit Evaluation",
    category: "Agile & Product Knowledge",
    description: "Experience in analyzing market needs and evaluating product-market fit from my startup background.",
  },
  {
    name: "SaaS Development",
    category: "Agile & Product Knowledge",
    description: "Involved in the development and scaling of SaaS products, focusing on user experience and business goals.",
  },
];

export const skillCategories = [
  "All",
  ...Array.from(new Set(skills.map((skill) => skill.category))),
];
