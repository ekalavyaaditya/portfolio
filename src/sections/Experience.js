import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    period: '2022 - Present',
    title: 'Software Engineer',
    company: 'Innovatech Solutions',
    description: 'Leading core product development, system design, and mentoring engineers.'
  },
  {
    period: '2020 - 2022',
    title: 'Software Engineer',
    company: 'TechNova Systems',
    description: 'Developed and maintained scalable web applications using MERN stack.'
  },
  {
    period: '2019 - 2020',
    title: 'Associate Software Engineer',
    company: 'WebCraft Technologies',
    description: 'Built responsive UI components and RESTful APIs, collaborated with cross-functional teams.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-8 md:px-16 max-w-[1600px] mx-auto border-t border-white/10">
      <div className="mb-24">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
          Experience
        </h2>
        <p className="text-[#A1A1AA] font-light max-w-xl text-lg">
          My professional journey and roles I've held in the industry.
        </p>
      </div>

      <div className="max-w-3xl border-l border-white/10 ml-2 md:ml-4 pl-8 md:pl-16 flex flex-col gap-16 relative">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Timeline Marker */}
            <div className="absolute -left-[37px] md:-left-[69px] top-1.5 w-[9px] h-[9px] bg-[#000000] border border-white rounded-full group-hover:bg-white transition-colors duration-300"></div>
            
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono tracking-[0.2em] text-[#A1A1AA] uppercase mb-2 block">
                {exp.period}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {exp.title}
              </h3>
              <span className="text-xs font-mono tracking-[0.1em] text-[#A1A1AA] mb-4 block">
                {exp.company}
              </span>
              <p className="text-[#A1A1AA] font-light leading-relaxed text-lg">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
