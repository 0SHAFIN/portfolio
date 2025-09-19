import React from 'react';
import { ThemeProvider } from '../src/components/ThemeProvider';
import { Header } from '../src/components/Header';
import { Hero } from '../src/components/Hero';
import { About } from '../src/components/About';
import { Skills } from '../src/components/Skills';
import { Career } from '../src/components/Career';
import { Experience } from '../src/components/Experience';
import { Contact } from '../src/components/Contact';
import { Footer } from '../src/components/Footer';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Career />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
