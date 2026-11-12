import Image from "next/image";

const logos: Record<string, string> = {
  "Next.js": "/art/tech/nextjs.webp",
  "React": "/art/tech/react.webp",
  "TypeScript": "/art/tech/typescript.webp",
  "JavaScript": "/art/tech/javascript.webp",
  "Tailwind CSS": "/art/tech/tailwindcss.webp",
  "Framer Motion": "/art/tech/framermotion.webp",
  "Flutter": "/art/tech/flutter.webp",
  "Node.js": "/art/tech/nodejs-v2.webp",
  "NestJS": "/art/tech/nestjs-v2.webp",
  "Express": "/art/tech/express.webp",
  "PostgreSQL": "/art/tech/postgresql.webp",
  "Prisma": "/art/tech/prisma.webp",
  "REST API": "/art/tech/rest-api.webp",
  "Python": "/art/tech/python.webp",
  "C++": "/art/tech/cplusplus.webp",
  "Dart": "/art/tech/dart.webp",
  "Git": "/art/tech/git.webp",
  "GitHub": "/art/tech/github.webp",
  "Postman": "/art/tech/postman.webp",
  "VS Code": "/art/tech/vscode.webp",
  "Arduino": "/art/tech/arduino.webp",
  "Supabase": "/art/tech/supabase.webp"
};

export default function TechIcon({ name }: { name: string }) {
  return (
    <Image
      className="tech-icon"
      src={logos[name]}
      alt=""
      width={48}
      height={48}
      unoptimized
      aria-hidden="true"
    />
  );
}
