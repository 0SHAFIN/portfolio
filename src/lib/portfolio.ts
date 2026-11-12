export const profile = {
  name: "Shafin",
  fullName: "Tafsirul Shafin",
  role: "Full-stack developer",
  location: "Dhaka, Bangladesh",
  email: "shafin3024344@gmail.com",
  github: "https://github.com/0SHAFIN",
  linkedin: "https://www.linkedin.com/in/tafsirulshafin",
  resume: "/documents/shafin-resume.pdf",
  originalPortfolio: "https://www.tafsirulshafin.me/",
};

export type Project = {
  id: string;
  name: string;
  category: "Full-stack" | "Frontend";
  label: string;
  description: string;
  detail: string;
  stack: string[];
  url: string;
  world: number;
  period: string;
  artwork: string;
};

export const projects: Project[] = [
  {
    id: "hattim",
    artwork: "/art/work-hattim-logo.webp",
    name: "Hattim",
    category: "Full-stack",
    label: "THE COMMERCE QUEST",
    description: "A playful store. A seriously capable platform.",
    detail:
      "An online toy car store I designed and developed from start to finish. A complete full-stack shopping experience, with complex product logic, secure processing, and a thoughtful storefront that makes discovering the next favorite toy effortless.",
    stack: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
    url: "https://hattimbd.com/",
    world: 0,
    period: "December 2025 — Present",
  },
  {
    id: "mj-properties",
    artwork: "/art/work-mj-properties-logo.webp",
    name: "MJ Properties",
    category: "Full-stack",
    label: "A PLACE TO CALL HOME",
    description: "A considered digital home for Dubai real estate.",
    detail:
      "A luxury real estate portal for a Dubai-based agency. Working in a professional team as a full-stack developer, I helped build buy, sell, and rental listing management alongside client-facing features for a polished property discovery experience.",
    stack: ["Next.js", "TypeScript", "Supabase", "Node.js"],
    url: "https://www.mjproperties.ae/",
    world: 1,
    period: "September — October 2025",
  },
];

export const skillGroups = [
  {
    name: "Frontend",
    title: "The things you see.",
    description:
      "Thoughtful interfaces, accessible interactions, and those little details that make a product feel right.",
    icon: "window",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Flutter",
    ],
  },
  {
    name: "Backend",
    title: "The magic underneath.",
    description:
      "Reliable APIs, well-structured data, and the foundations that turn a good interface into a great product.",
    icon: "database",
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "Prisma",
      "REST API",
      "Python",
      "C++",
      "Dart",
    ],
  },
  {
    name: "Tools",
    title: "Always ready to build.",
    description:
      "A dependable toolkit for collaborating, exploring ideas, and shipping the next iteration.",
    icon: "tools",
    skills: ["Git", "GitHub", "Postman", "VS Code", "Arduino"],
  },
] as const;
