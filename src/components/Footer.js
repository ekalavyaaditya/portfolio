export default function Footer() {
  return (
    <footer className="pt-5 md:px-16 border-t border-white/5 flex items-center justify-between text-xs tracking-widest text-[#A1A1AA]">
      <div>© {new Date().getFullYear()} AS. All rights reserved.</div>
      <div className="flex gap-6">
        <a
          href="https://github.com/ekalavyaaditya"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GITHUB
        </a>

        <a
          href="https://linkedin.com/in/ekalavya-aditya/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          LINKEDIN
        </a>
      </div>
    </footer>
  );
}
