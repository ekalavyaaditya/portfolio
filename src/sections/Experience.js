import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    period: 'Dec 2025 - Mar 2026',
    title: 'Software Engineer',
    company: 'Inner Sprout Solutions',
    description: [
      'Elevated product data accuracy by partnering with the Wayfair Data Services team to optimize product-feed mapping and catalog relationships.',
      'Engineered Inboxless, an email productivity platform integrating Gmail and Microsoft Outlook to unify communication workflows.',
      'Architected investor and customer portals with Gmail and Outlook integrations, enabling seamless collaboration and workflow automation.',
      'Collaborated across engineering, product, and data teams to deliver scalable, production-ready solutions.'
    ]
  },
  {
    period: 'Jul 2024 - Dec 2025',
    title: 'Software Engineer',
    company: 'AmberTag',
    description: [
      'Full-stack developer with 2.7+ years of experience, contributing to 9+ projects including Vama, HRM, Artree, MkRetail, LMS, CostPrize, Clearblue, Inboxless, and Wayfair.',
      'Developed 20+ features across the full stack, built responsive UI components, and implemented features such as OTP-based sign-up flows.',
      'Resolved 30+ bugs, improved UI responsiveness, and optimized modules, increasing application performance and workflow efficiency by ~25%, while collaborating with clients to identify and fix critical issues.'
    ]
  },
  {
    period: 'Apr 2024 - Jul 2024',
    title: 'Software Engineer Intern',
    company: 'AmberTag',
    description: [
      'Developed and implemented front-end components using React for Unisense, HRM, and Vama projects, enhancing user experience and integrating an internal company product.'
    ]
  },
  {
    period: 'Aug 2023 - Dec 2023',
    title: 'Full Stack Web Developer Intern',
    company: 'Kenpath',
    description: [
      'Leveraged the MEAN stack to develop and refine features for the "apurva.ai" project, significantly improving application performance and user interaction.'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 md:px-16 max-w-[1600px] mx-auto">
      <div className="mb-24">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 uppercase">
          Experience
        </h2>
        <p className="text-[#A1A1AA] font-light max-w-xl text-lg">
          My professional journey and roles I've held in the industry.
        </p>
      </div>

      <div className="max-w-3xl border-l border-white/10 ml-1 md:ml-4 pl-6 md:pl-16 flex flex-col gap-16 relative">
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
            <div className="absolute -left-[29px] md:-left-[69px] top-1.5 w-[9px] h-[9px] bg-[#000000] border border-white rounded-full group-hover:bg-white transition-colors duration-300"></div>

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
              <div className="text-[#A1A1AA] font-light leading-relaxed text-lg">
                {Array.isArray(exp.description) ? (
                  <ul className="list-disc pl-5 flex flex-col gap-2 marker:text-[#A1A1AA]/50">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{exp.description}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
