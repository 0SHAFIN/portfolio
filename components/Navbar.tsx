"use client";
import { useState } from "react";
import Brand from "./Brand";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [
  "Projects",
  "About",
  "Experience",
  "Skills",
  "Education",
  "Contact",
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Brand />
      <nav
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <a
            key={link}
            href={"#" + link.toLowerCase()}
            onClick={() => setOpen(false)}
          >
            {link}
          </a>
        ))}
        <a className="nav-resume" href="/resume/shafin_resume.pdf" download>
          Resume <ArrowUpRight size={14} />
        </a>
      </nav>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
