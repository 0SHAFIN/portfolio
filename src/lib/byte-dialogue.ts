export const BYTE_LINES = [
  "Hello, world!",
  "Hey! I’m Byte.",
  "Tiny pixels. Big ideas.",
  "One step. One commit.",
  "Powered by curiosity.",
  "Let’s build something cool!",
  "Still running. Still learning.",
  "Your next idea starts here.",
] as const;

export const BYTE_BUBBLES = [
  { position: "upper-left", animation: "pop" },
  { position: "upper-right", animation: "slide" },
  { position: "above", animation: "bounce" },
  { position: "side-right", animation: "flip" },
  { position: "side-left", animation: "pixel" },
] as const;

export type ByteGreeting = {
  id: number;
  text: string;
} & (typeof BYTE_BUBBLES)[number];
