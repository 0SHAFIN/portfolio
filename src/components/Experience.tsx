import React from 'react';
import { PixelCard } from './PixelCard';
import { Calendar, ExternalLink, MapPin } from 'lucide-react';

const experiences = [
  {
    title: 'Frontend Developer',
    company: 'Ecomstal',
    location: 'Remote',
    period: '2023 - Present',
    type: 'Professional',
    description: 'Building modern, responsive web applications using React, Next.js, and TypeScript. Collaborating with design teams to create pixel-perfect user interfaces and optimizing applications for performance and SEO.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    highlights: [
      'Improved application performance by 40%',
      'Built responsive components used across multiple projects',
      'Collaborated with cross-functional teams',
    ],
  },
  {
    title: 'E-Commerce Website',
    company:'University',
    location:'On Campus',
    period:'20 june 2025 - 17 September 2025',
    type:'Education',
    description:'Developed a full-stack e-commerce website using Nest.js, Next.js, Tailwind CSS, and postgreSQL. The website allows users to browse products, add them to the cart, and checkout securely. The admin can manage products, orders, and users.',
    technologies:['Nest.js','Next.js','Tailwind CSS','TypeScript','Supabase','API Integration', 'Secure routing','postgreSQL'],
    highlights:['Developed a full-stack e-commerce website using Next.js, Tailwind CSS, and Supabase.','The website allows users to browse products, add them to the cart, and checkout securely.','The admin can manage products, orders, and users.'],
  },
  
];

const projects = [
  {
    title: 'Money Exchange App',
    description: 'Cross-platform mobile application built with Flutter, featuring real-time inventory, payment integration, and admin dashboard.',
    technologies: ['Flutter', 'Firebase', 'Dart', 'REST APIs','API Integration'],
    status: 'Completed',
  },
  {
    title: 'IoT Survey Bot',
    description: 'Arduino-based smart survey bot with mobile app control, sensor monitoring, and automated responses.',
    technologies: ['Arduino', 'Flutter', 'IoT', 'Sensors','Firebase'],
    status: 'Completed',
  },
 
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
              Experience & <span className="text-green-500 dark:text-green-400">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-green-500 dark:bg-green-400 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              My journey combining academic learning with real-world development experience.
            </p>
          </div>

          {/* Experience Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              PROFESSIONAL EXPERIENCE
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <PixelCard key={index} glowing={exp.type === 'Professional'}>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide mb-2 ${
                        exp.type === 'Professional' 
                          ? 'bg-green-500 text-black' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {exp.type}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-green-500 dark:text-green-400 font-semibold mb-2">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Highlights:</h4>
                        <ul className="space-y-1">
                          {exp.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <div className="w-1 h-1 bg-green-500 dark:bg-green-400"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </PixelCard>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              FEATURED PROJECTS
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <PixelCard key={index} className="h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wide ${
                      project.status === 'Completed' 
                        ? 'bg-green-500 text-black' 
                        : 'bg-orange-500 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className="flex items-center gap-2 text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 text-sm font-medium">
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </button>
                </PixelCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};