import { Mail, Phone, MapPin, Globe, Code2 } from 'lucide-react';

const contactInfo = [
  { label: 'EMAIL', value: 'ekalavyaaditya@gmail.com', icon: <Mail size={16} /> },
  { label: 'PHONE', value: '+91 9110809527', icon: <Phone size={16} /> },
  { label: 'LOCATION', value: 'Bangalore, India', icon: <MapPin size={16} /> },
  { label: 'LINKEDIN', value: 'linkedin.com/in/ekalavya-aditya', icon: <Globe size={16} /> },
  { label: 'GITHUB', value: 'github.com/ekalavyaaditya', icon: <Code2 size={16} /> }
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-16 max-w-screen-2xl mx-auto border-t border-white/5">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
          Get in Touch.
        </h2>
        <p className="text-[#A1A1AA] font-light max-w-xl">
          Interested in collaborating or have a question? Feel free to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contactInfo.map((info, index) => (
          <div
            key={info.label}
            className="flex items-start gap-4 p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
          >
            <div className="text-white mt-1">
              {info.icon}
            </div>
            <div>
              <span className="text-xs font-medium tracking-[0.2em] text-[#A1A1AA] block mb-2">
                {info.label}
              </span>
              <span className="text-sm font-light text-white break-all">
                {info.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
