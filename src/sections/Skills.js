import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  FileCode,
  GitBranch,
  Layout,
  Box,
  Layers,
  Cloud,
  Server,
  Database,
  Cpu
} from 'lucide-react';

const skills = [
  { name: 'JavaScript', icon: <Code2 size={16} /> },
  { name: 'Tailwind CSS', icon: <Palette size={16} /> },
  { name: 'TypeScript', icon: <FileCode size={16} /> },
  { name: 'Git', icon: <GitBranch size={16} /> },
  { name: 'React', icon: <Layout size={16} /> },
  { name: 'Docker', icon: <Box size={16} /> },
  { name: 'Next.js', icon: <Layers size={16} /> },
  { name: 'AWS', icon: <Cloud size={16} /> },
  { name: 'Node.js', icon: <Server size={16} /> },
  { name: 'MongoDB', icon: <Database size={16} /> },
  { name: 'Express.js', icon: <Cpu size={16} /> },
  { name: 'PostgreSQL', icon: <Database size={16} /> },
  { name: 'HTML5', icon: <Code2 size={16} /> },
  { name: 'GraphQL', icon: <GitBranch size={16} /> },
  { name: 'CSS3', icon: <Palette size={16} /> },
  { name: 'Redis', icon: <Database size={16} /> }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 max-w-screen-2xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
          Core Skills.
        </h2>
        <p className="text-[#A1A1AA] font-light max-w-xl">
          A selection of tools and technologies I use to build modern digital experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 p-3 md:p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
          >
            <div className="text-[#A1A1AA] shrink-0">
              {skill.icon}
            </div>
            <span className="text-xs md:text-sm text-gray-200 font-medium tracking-wide truncate">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}