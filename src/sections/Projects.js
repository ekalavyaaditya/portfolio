import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: '01',
    title: 'Analytics Dashboard',
    description: 'Real-time analytics platform built with Next.js and Node.js. Visualizes complex data sets with interactive charts and reports.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis'],
    stats: [
      { value: '35%', label: 'Increase in data insights efficiency' },
      { value: '10K+', label: 'Active users' },
      { value: '99.9%', label: 'Uptime achieved' }
    ]
  },
  {
    id: '02',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with secure payments, inventory management, and admin analytics.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'AWS S3'],
    stats: [
      { value: '40%', label: 'Increase in sales conversion' },
      { value: '25K+', label: 'Products sold' },
      { value: '98%', label: 'Customer satisfaction' }
    ]
  },
  {
    id: '03',
    title: 'Task Management System',
    description: 'Collaborative task management tool with real-time updates, team boards, and progress tracking.',
    tech: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB'],
    stats: [
      { value: '50%', label: 'Increase in team productivity' },
      { value: '5K+', label: 'Teams onboarded' },
      { value: '99.8%', label: 'Uptime achieved' }
    ]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-16 max-w-[1600px] mx-auto">
      <div className="mb-24">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
          SELECTED WORKS
        </h2>
        <p className="text-[#A1A1AA] font-light max-w-xl text-lg">
          A showcase of recent projects, highlighting my approach to problem-solving and technical implementation.
        </p>
      </div>

      <div className="flex flex-col gap-32">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-16 group"
          >
            {/* Left side: Project Info */}
            <div className="lg:w-1/3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono tracking-[0.3em] text-[#A1A1AA] mb-6 block">
                  {project.id}
                </span>
                <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[#A1A1AA] font-light leading-relaxed mb-10 text-lg">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {project.tech.map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs font-mono text-[#A1A1AA] border border-white/10 rounded-none bg-transparent">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side: Project Details & Stats */}
            <div className="lg:w-2/3 bg-[#09090B] border-b border-white/10 p-10 md:p-16 flex flex-col justify-between transition-colors duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {project.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-4 border-l border-white/10 pl-8">
                    <span className="text-4xl font-mono text-white tracking-tighter">{stat.value}</span>
                    <span className="text-xs font-mono text-[#A1A1AA] tracking-[0.1em] uppercase">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
