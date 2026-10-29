import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "House Price Prediction",
    description:
      "Predicts house prices for a given location and country over a specified time period.",
    tech: ["Streamlit", "Google Colab", "Machine Learning"],
    stats: [
      { value: "95%", label: "Model Accuracy" },
      { value: "1M+", label: "Data Points Analyzed" },
      { value: "Real-time", label: "Predictions" },
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Auto Scaling and EC2 Windows Server",
    description:
      "Balances incoming user load across EC2 instances and auto-scales instances to maintain performance.",
    tech: ["EC2", "Windows Server", "Auto Scaling", "ELB"],
    stats: [
      { value: "Auto", label: "Scaling Policy" },
      { value: "ELB", label: "Traffic Distribution" },
      { value: "Windows", label: "Server Environment" },
    ],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Ethereum Blockchain-Based House Purchase Application",
    description:
      "Locks a house after booking and maintains a buyer record on-chain to prevent the seller from selling it to more than one person.",
    tech: ["Blockchain", "React", "Ethereum"],
    stats: [
      { value: "On-Chain", label: "Buyer Records" },
      { value: "Immutable", label: "Booking Security" },
      { value: "Smart Contract", label: "Execution" },
    ],
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Projects() {
  const projectsRef = useRef(null);

  useLayoutEffect(() => {
    const section = projectsRef.current;
    if (!section) return undefined;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const cards = gsap.utils.toArray("[data-project-card]", section);
        if (!cards.length) return undefined;

        gsap.set(cards, {
          autoAlpha: 0,
          y: 32,
          transition: "none",
        });

        ScrollTrigger.batch(cards, {
          start: "top 84%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: true,
              clearProps: "opacity,visibility,transform,transition",
            });
          },
        });

        return undefined;
      },
      section
    );

    return () => media.revert();
  }, []);

  return (
    <section ref={projectsRef} id="projects" className="py-24">
      <div className="px-6 md:px-16 max-w-[1600px] mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
          SELECTED WORKS
        </h2>
        <p className="text-[#A1A1AA] font-light max-w-xl text-lg">
          A showcase of recent projects, highlighting my approach to
          problem-solving and technical implementation.
        </p>
      </div>

      <div className="px-6 md:px-16 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            data-project-card
            className="group relative flex min-h-[560px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/30 transition-[transform,background-color,border-color] duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/70 via-white/20 to-transparent opacity-70" />

            <div className="flex w-full flex-col">
              <div className="relative h-56 overflow-hidden border-b border-white/10">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale transition-[transform,filter] duration-[1.2s] ease-out group-hover:scale-105 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-black/30 to-black/10" />
                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-[#E4E4E7] backdrop-blur-md">
                  Project {project.id}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <p className="mb-4 text-xs font-mono uppercase tracking-[0.24em] text-[#A1A1AA]">
                  Featured Build
                </p>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                  {project.title}
                </h3>

                <p className="mt-4 text-base text-[#A1A1AA] font-light leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="border-l border-white/20 bg-black/20 px-4 py-3"
                    >
                      <span className="block text-lg font-mono text-white tracking-tight">
                        {stat.value}
                      </span>
                      <span className="mt-2 block text-[10px] font-mono text-[#A1A1AA] tracking-[0.12em] uppercase leading-relaxed">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-mono text-[#E4E4E7] transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/10 motion-reduce:transition-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
