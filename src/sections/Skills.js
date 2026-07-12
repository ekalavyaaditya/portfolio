import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  FileCode,
  GitBranch,
  Layout,
  Server,
  Database
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'C', icon: <Code2 size={16} />, colorClass: 'group-hover:text-[#A8B9CC]' },
      { name: 'Python', icon: <Code2 size={16} />, colorClass: 'group-hover:text-[#3776AB]' },
      { name: 'JavaScript', icon: <Code2 size={16} />, colorClass: 'group-hover:text-[#F7DF1E]' },
      { name: 'HTML', icon: <Code2 size={16} />, colorClass: 'group-hover:text-[#E34F26]' },
      { name: 'CSS', icon: <Palette size={16} />, colorClass: 'group-hover:text-[#1572B6]' },
    ]
  },
  {
    title: 'Libraries/Frameworks',
    skills: [
      { name: 'Angular', icon: <Layout size={16} />, colorClass: 'group-hover:text-[#DD0031]' },
      { name: 'React', icon: <Layout size={16} />, colorClass: 'group-hover:text-[#61DAFB]' },
      { name: 'Node.js', icon: <Server size={16} />, colorClass: 'group-hover:text-[#339933]' },
    ]
  },
  {
    title: 'Tools / Platforms',
    skills: [
      { name: 'VS Code', icon: <FileCode size={16} />, colorClass: 'group-hover:text-[#007ACC]' },
      { name: 'GitHub', icon: <GitBranch size={16} />, colorClass: 'group-hover:text-white' },
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: <Database size={16} />, colorClass: 'group-hover:text-[#4479A1]' },
      { name: 'PostgreSQL', icon: <Database size={16} />, colorClass: 'group-hover:text-[#336791]' },
      { name: 'MongoDB', icon: <Database size={16} />, colorClass: 'group-hover:text-[#47A248]' }
    ]
  }
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

      <div className="flex flex-col gap-10">
        {skillCategories.map((category, catIndex) => (
          <div key={category.title}>
            <h3 className="text-xl text-white mb-6 font-medium">{category.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {category.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-3 p-3 md:p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <div className={`text-[#A1A1AA] shrink-0 transition-colors duration-300 ${skill.colorClass || 'group-hover:text-white'}`}>
                    {skill.icon}
                  </div>
                  <span className="text-xs md:text-sm text-gray-200 font-medium tracking-wide truncate group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}