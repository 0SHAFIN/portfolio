export const projects = [
  {
    title: "Hattim",
    role: "Lead Full-Stack Developer",
    period: "December 2025 – Present",
    description:
      "Hattim – Online toy car store. I designed and developed the entire platform from start to end as a comprehensive full-stack application, ensuring a seamless shopping experience with complex product logic and secure processing.",
    tech: [
      "Nextjs",
      "Nodejs",
      "Prisma",
      "PostgreSQL",
      "REST API",
      "Tailwind CSS",
    ],
    link: "https://hattimbd.com/",
    image: "/logo/hattim.webp",
  },
  {
    title: "Velopage",
    role: "Frontend Developer",
    period: "1st November 2025 - Present",
    description:
      "Velopage.io – AI-powered tool for high-converting landing pages. Serving as the solo frontend developer, I am responsible for building the entire user interface and ensuring a blazing-fast, responsive experience for dropshipping stores.",
    tech: ["Nextjs", "Nodejs", "Typescript", "Tailwind CSS", "Git"],
    link: "https://velopage.io/",
    image: "/logo/velo.webp",
  },
  {
    title: "MJ Properties",
    role: "Full-Stack Developer",
    period: "1st September 2025 - 15th October 2025",
    description:
      "MJ Properties – Dubai-based luxury real estate agency. Worked as a full-stack developer within a professional team to build a sophisticated property portal, specializing in buy/sell/rental listing management and client-facing features.",
    tech: ["Nextjs", "Nodejs", "Typescript", "Supabase", "Tailwind CSS", "Git"],
    link: "https://www.mjproperties.ae/",
    image: "/logo/mj.webp",
  },
];

interface Project {
  name: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  link: string;
}

interface Experience {
  company: string;
  period: string;
  status: "current" | "completed";
  description?: string;
  link?: string;
  projects: Project[];
}

export const experiences: Experience[] = [
  {
    company: "Upstal",
    period: "June 2025 - Present",
    status: "current",
    description:
      "Digital solutions company specializing in e-commerce tools and high-performance web applications.",
    link: "https://upstal.com/",
    projects: [
      {
        name: "Leadstal",
        role: "Full-Stack Developer",
        period: "January 2026 - Present",
        description:
          "Leadstal – A lead scraping platform that pulls leads from Instagram, Google Maps, Zillow, LinkedIn, and more. Recently expanded with an integrated email campaign system, letting users run campaigns from scraped leads or external leads imported into their account.",
        tech: ["Nextjs", "Typescript", "Tailwind CSS", "Git"],
        link: "https://leadstal.com",
      },
      {
        name: "10xProfit",
        role: "Frontend Developer",
        period: "June 2025 - Present",
        description:
          "10XProfit.io – All-in-one toolkit and training for Amazon sellers, offering tools for product research, profit calculation, and business growth.",
        tech: ["Nextjs", "Typescript", "Tailwind CSS", "Git", "Docker"],
        link: "https://10xprofit.io/",
      },
    ],
  },
  {
    company: "Codesurge",
    period: "13th January 2025 - 15th June 2025",
    status: "completed",
    description:
      "A subsidiary company of Upstal focusing on digital product innovation and mobile solutions.",
    projects: [
      {
        name: "Popsurge",
        role: "Frontend Developer",
        period: "January 2025 - February 2025",
        description:
          "PopSurge – A tool for website owners to display popups, discounts, and promotional messages to engage users.",
        tech: [
          "Nextjs",
          "Nodejs",
          "Typescript",
          "Tailwind CSS",
          "Supabase",
          "Git",
        ],
        link: "https://www.getpopsurge.com/",
      },
      {
        name: "Testotrack",
        role: "Frontend Developer",
        period: "March 2025 - May 2025",
        description:
          "Testotrack – A cross-platform mobile application designed for efficient testing process management and tracking.",
        tech: [
          "Expo go",
          "React Native",
          "Typescript",
          "Supabase",
          "React Query",
          "React Navigation",
        ],
        link: "https://play.google.com/store/apps/details?id=com.codesurge.testotrack&hl=en",
      },
    ],
  },
];

export const education = [
  {
    degree: "Bachelor in Computer Science and Engineering",
    institution: "American International University - Bangladesh",
    logo: "/art/education/aiub.png",
    institutionUrl: "https://www.aiub.edu/",
    major: "Software Engineering",
    period: "2022 - 2025",
    description:
      "Focused on software engineering, algorithms, and web development.",
    result: "GPA: 3.62/4.0",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "Adamjee Cantonment College",
    logo: "/art/education/adamjee-college.png",
    institutionUrl: "https://acc.edu.bd/",
    period: "2018 - 2020",
    // description: "Science major with focus on mathematics and computer studies.",
    result: "Grade: 5.00",
  },
  {
    degree: "Secondary School Certificate",
    institution: "Adamjee Cantonment Public School",
    logo: "/art/education/adamjee-school.png",
    institutionUrl: "https://acps.edu.bd/",
    period: "2012 - 2018",
    // description: "Science major with focus on mathematics and computer studies.",
    result: "Grade: 5.00",
  },
];
