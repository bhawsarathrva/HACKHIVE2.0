import { useState, useEffect } from "react";
const T = {
  bg: "#0b0b0c",
  panel: "#141416",
  card: "#18181b",
  line: "#26262a",
  accent: "#F5A83C",
  accentSoft: "rgba(245,168,60,0.14)",
  text: "#EAEAEA",
  muted: "#9C9CA3",
};

/* -------------------------- Content -------------------------- */
const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "themes", href: "#themes" },
  { label: "timeline", href: "#timeline" },
  { label: "prizes", href: "#prizes" },
  { label: "gallery", href: "#gallery" },
  { label: "FAQs", href: "#faqs" },
];

const STATS = [
  { value: "2000+", label: "registrations" },
  { value: "50+", label: "community partners" },
  { value: "45+", label: "evangelists" },
  { value: "35+", label: "cities" },
];

const THEMES = [
  {
    icon: "🌐",
    title: "Web3 & Blockchain",
    desc: "Decentralized apps, smart contracts and everything on-chain.",
  },
  {
    icon: "🤖",
    title: "AI / ML",
    desc: "Intelligent products powered by models, agents and data.",
  },
  {
    icon: "🏥",
    title: "HealthTech",
    desc: "Solutions that make healthcare accessible and human.",
  },
  {
    icon: "🎓",
    title: "EdTech",
    desc: "Tools that change the way people learn and teach.",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    desc: "Tech for the planet — climate, energy and beyond.",
  },
  {
    icon: "💡",
    title: "Open Innovation",
    desc: "Your wildest idea. Any stack, any problem, no limits.",
  },
];

const TIMELINE = [
  { time: "Day 0 · 10:00 AM", title: "Registrations open", desc: "Doors open, check-in and team formation begins." },
  { time: "Day 0 · 12:00 PM", title: "Opening ceremony", desc: "Kickoff, keynote and track announcements." },
  { time: "Day 0 · 02:00 PM", title: "Hacking begins", desc: "36 hours on the clock — build something legendary." },
  { time: "Day 1 · 11:00 AM", title: "Mentorship rounds", desc: "Industry mentors review progress and unblock teams." },
  { time: "Day 2 · 02:00 AM", title: "Submissions close", desc: "Push your final commit and submit on Devfolio." },
  { time: "Day 2 · 11:00 AM", title: "Judging & closing", desc: "Demos, results and the closing ceremony." },
];

const PRIZES = [
  { place: "1st", title: "Winner", amount: "₹50,000", perks: "Cash + swag + incubation support", featured: true },
  { place: "2nd", title: "First Runner-up", amount: "₹30,000", perks: "Cash + swag kits", featured: false },
  { place: "3rd", title: "Second Runner-up", amount: "₹20,000", perks: "Cash + swag kits", featured: false },
];

const FAQS = [
  {
    q: "What is HackHive 2.0?",
    a: "HackHive 2.0 is a community hackathon by SDSF DAVV a space to learn, network, build and have fun with people who love tech as much as you do.",
  },
  {
    q: "Who can participate?",
    a: "Anyone with curiosity for tech — students, professionals, designers and first-time hackers are all welcome.",
  },
  {
    q: "How much does it cost?",
    a: "Nothing. Participation is completely free, including food, swag and workshops.",
  },
  {
    q: "What is the team size?",
    a: "Teams of 2 to 4 members. You can also register solo and find teammates at the venue.",
  },
  {
    q: "Do I need to know how to code?",
    a: "Not necessarily. Designers, product thinkers and no-code builders make great hackathon teammates.",
  },
  {
    q: "What should I bring?",
    a: "Your laptop, charger, valid ID and a lot of enthusiasm. We handle the rest.",
  },
];

const SOCIALS = [
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "Instagram", href: "https://www.instagram.com/hack_hive26?igsh=MXVyMG4ycWZtNTcxeA==", icon: "📷" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Discord", href: "https://discord.gg/z5pjHmMFz", icon: "🎮" },
  { label: "Email", href: "mailto:hackhive26@gmail.com", icon: "✉" },
];

/* ----------------------- Shared components ------------------- */

/** Code-style section heading: `import about;` */
function SectionHeading({ name }) {
  return (
    <h2 className="font-mono font-bold leading-none" style={{ color: T.accent, fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
      import
      <br />
      {name};
    </h2>
  );
}

/** Two-column section shell: heading left, content right */
function Section({ id, name, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-24 px-6 md:px-14 lg:px-24 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-14 items-start">
        <SectionHeading name={name} />
        <div>{children}</div>
      </div>
    </section>
  );
}

/* --------------------------- Navbar --------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(11,11,12,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.line}` : "1px solid transparent",
      }}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 md:px-8 h-16">
        <a href="#home" className="font-mono font-bold text-lg tracking-tight" style={{ color: T.accent }}>
          {"<HackHive 2.0/>"}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-sm transition-colors duration-200 hover:opacity-100"
              style={{ color: T.muted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="font-mono text-sm font-semibold px-4 py-2 rounded-md transition-transform duration-200 hover:scale-105"
            style={{ background: T.accent, color: "#111" }}
          >
            Apply with Devfolio ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="md:hidden font-mono text-2xl"
          style={{ color: T.accent }}
        >
          {open ? "×" : "≡"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4" style={{ background: "rgba(11,11,12,0.97)", borderBottom: `1px solid ${T.line}` }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-mono text-sm" style={{ color: T.text }}>
              {l.label}
            </a>
          ))}
          <a href="#" className="font-mono text-sm font-semibold px-4 py-2 rounded-md w-fit" style={{ background: T.accent, color: "#111" }}>
            Apply with Devfolio ↗
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------------------------- Hero ---------------------------- */
function Hero() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 pt-16 pb-10 overflow-hidden select-none"
      style={{
        backgroundColor: "#f3b232",
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 40px),
          repeating-linear-gradient(-45deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 40px)
        `,
        color: "#0e0e0e",
      }}
    >
      {/* Background dots pattern top left */}
      <div
        aria-hidden="true"
        className="absolute top-6 left-6 w-56 h-32 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Top Header Row: DAVV Logo - University Text - SDSF Logo */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-4 md:gap-8 z-10">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-md border-2 border-black/10 flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src="images/davv_logo.png"
            alt="DAVV Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-center font-mono font-bold text-xs sm:text-sm md:text-base leading-tight" style={{ color: "#0e0e0e" }}>
          <p className="tracking-tight">School of Data Science and Forecasting, DAVV</p>
          <p className="font-normal text-xs md:text-sm mt-0.5">Devi Ahilya VishwaVidhyalaya,</p>
          <p className="font-normal text-xs md:text-sm">Indore</p>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-md border-2 border-black/10 flex items-center justify-center overflow-hidden flex-shrink-0">
          <img
            src="images/sdsf_logo.png"
            alt="SDSF Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Middle Block: DEAD CENTERED ON SCREEN */}
      <div className="my-auto w-full max-w-6xl mx-auto flex items-center justify-center relative px-4 py-4">

        {/* Left side vertical tags */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 font-mono text-xs md:text-sm font-bold tracking-wider opacity-85"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "#0e0e0e" }}>
          #ignite #innovate #elevate
        </div>

        {/* Main HACK HIVE 2.0 Title - Dead Center */}
        <div className="text-center font-mono font-bold tracking-tight select-none flex flex-col items-center justify-center mx-auto" style={{ fontFamily: "'Archivo Black', 'Space Mono', sans-serif" }}>
          <h1 className="text-[3.5rem] sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem] leading-[0.82] tracking-tighter text-center" style={{ color: "#0e0e0e" }}>
            H<span style={{ color: "#d9932a" }}>∧</span>CK
          </h1>
          <h1 className="text-[3.5rem] sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem] leading-[0.82] tracking-tighter text-center whitespace-nowrap" style={{ color: "#0e0e0e" }}>
            HI<span style={{ color: "#d9932a" }}>∨</span>E 2.0
          </h1>
        </div>

        {/* Right side description text */}
        <div className="hidden lg:block absolute right-0 bottom-0 text-right font-mono text-xs sm:text-sm md:text-base font-bold max-w-[210px] leading-snug" style={{ color: "#0e0e0e" }}>
          <p>A 36</p>
          <p>hours long</p>
          <p>hackathon.</p>
        </div>
      </div>

      {/* Mobile-only tags & description helper row */}
      <div className="lg:hidden flex flex-col items-center gap-1 text-center font-mono text-xs font-bold mb-2" style={{ color: "#0e0e0e" }}>
        <span>#ignite #innovate #elevate</span>
        <span className="opacity-80">36 hours long hackathon.</span>
      </div>

      {/* Bottom Meta + Discord Button */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-3 z-10">
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono font-bold text-xs sm:text-sm md:text-base" style={{ color: "#0e0e0e" }}>
          <span className="flex items-center gap-1.5">📅 16-17 March</span>
          <span className="flex items-center gap-1.5">📍 INDORE (M.P.)</span>
        </div>

        <a
          href="https://discord.gg/5mN6g3YUqX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-mono font-bold text-sm bg-white text-black shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-black inline-block"></span>
          discord
        </a>
      </div>

      {/* Floating Scroll Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 z-50"
      >
        ↑
      </button>
    </section>
  );
}

/* ---------------------------- About --------------------------- */
function About() {
  return (
    <Section id="about" name="about">
      <div className="space-y-6 text-[15px] md:text-base leading-relaxed" style={{ color: T.text }}>
        <p>
          Behind this legendary hackathon and series of extraordinary events lies the heart and soul of SDSF DAVV.
          More than a community, it's a gathering of passionate individuals sharing love, interest, and compassion
          for technology.
        </p>
        <p>
          We aim to bring together all the community-minded hunters to provide them with the perfect space where they
          can nurture their tech curiosities by learning, networking, interacting, and sharing their
          experiences—all while having fun!
        </p>
        <p>
          so, if you love tech just like us, this is the place to be !
          <br />
          Here's <span className="font-semibold" style={{ color: T.accent }}>how</span> we made it.
        </p>
      </div>
    </Section>
  );
}

/* ---------------------------- Stats --------------------------- */
function Stats() {
  return (
    <div className="px-0 md:px-14 lg:px-24">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-y-10 py-12 px-8 md:px-14 rounded-none md:rounded-xl" style={{ background: T.panel }}>
        {STATS.map((s) => (
          <div key={s.label}>
            <p
              className="font-mono font-bold text-4xl md:text-5xl"
              style={{ color: T.accent, textShadow: "0 0 18px rgba(245,168,60,0.45)" }}
            >
              {s.value}
            </p>
            <p className="mt-1 text-sm" style={{ color: T.muted }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- Themes --------------------------- */
function Themes() {
  return (
    <Section id="themes" name="themes">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {THEMES.map((t) => (
          <article
            key={t.title}
            className="theme-card rounded-xl p-6 transition-transform duration-200"
            style={{ background: T.card, border: `1px solid ${T.line}` }}
          >
            <div
              className="w-11 h-11 flex items-center justify-center rounded-lg text-xl mb-4"
              style={{ background: T.accentSoft }}
              aria-hidden="true"
            >
              {t.icon}
            </div>
            <h3 className="font-mono font-semibold text-lg" style={{ color: T.text }}>
              {t.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: T.muted }}>
              {t.desc}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------- Timeline -------------------------- */
function Timeline() {
  return (
    <Section id="timeline" name="timeline" className="section-alt">
      <ol className="relative border-l pl-8 space-y-10" style={{ borderColor: T.line }}>
        {TIMELINE.map((item) => (
          <li key={item.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[41px] top-1 w-4 h-4 rounded-full"
              style={{ background: T.accent, boxShadow: "0 0 12px rgba(245,168,60,0.6)" }}
            />
            <p className="font-mono text-xs tracking-wide" style={{ color: T.accent }}>
              {item.time}
            </p>
            <h3 className="mt-1 font-semibold text-lg" style={{ color: T.text }}>
              {item.title}
            </h3>
            <p className="mt-1 text-sm" style={{ color: T.muted }}>
              {item.desc}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* --------------------------- Prizes --------------------------- */
function Prizes() {
  return (
    <Section id="prizes" name="prizes">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PRIZES.map((p) => (
          <article
            key={p.place}
            className="rounded-xl p-6 text-center flex flex-col items-center"
            style={{
              background: p.featured ? T.accentSoft : T.card,
              border: `1px solid ${p.featured ? T.accent : T.line}`,
              boxShadow: p.featured ? "0 0 30px rgba(245,168,60,0.18)" : "none",
            }}
          >
            <p className="font-mono text-xs tracking-widest uppercase" style={{ color: T.muted }}>
              {p.place} place
            </p>
            <h3 className="mt-2 font-mono font-semibold text-xl" style={{ color: T.text }}>
              {p.title}
            </h3>
            <p
              className="mt-4 font-mono font-bold text-4xl"
              style={{ color: T.accent, textShadow: "0 0 16px rgba(245,168,60,0.4)" }}
            >
              {p.amount}
            </p>
            <p className="mt-3 text-sm" style={{ color: T.muted }}>
              {p.perks}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-sm font-mono" style={{ color: T.muted }}>
        // plus track prizes, swag and goodies for every hacker
      </p>
    </Section>
  );
}

/* --------------------------- Gallery -------------------------- */
function Gallery() {
  const tiles = [
    "col-span-2 row-span-2",
    "",
    "",
    "row-span-2",
    "",
    "col-span-2",
  ];
  return (
    <Section id="gallery" name="gallery" className="section-alt">
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[110px] md:auto-rows-[140px] gap-3">
        {tiles.map((cls, i) => (
          <div
            key={i}
            className={`rounded-lg flex items-center justify-center font-mono text-xs ${cls}`}
            style={{
              background: `linear-gradient(135deg, ${T.card}, ${T.panel})`,
              border: `1px solid ${T.line}`,
              color: T.muted,
            }}
          >
            📸 memory_{String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------- FAQ ---------------------------- */
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id="faqs" name="FAQs">
      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={f.q} className="rounded-lg overflow-hidden" style={{ background: T.card, border: `1px solid ${isOpen ? T.accent : T.line}` }}>
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-mono text-sm md:text-base font-medium" style={{ color: isOpen ? T.accent : T.text }}>
                  {f.q}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-lg transition-transform duration-200"
                  style={{ color: T.accent, transform: isOpen ? "rotate(180deg)" : "none" }}
                >
                  ∨
                </span>
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: T.muted }}>
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------------------- Footer -------------------------- */
function Footer() {
  return (
    <footer className="px-6 md:px-14 lg:px-24 pt-16 pb-8" style={{ background: T.panel, borderTop: `1px solid ${T.line}` }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <p className="font-mono font-bold text-xl" style={{ color: T.accent }}>
              {"<HackHive 2.0/>"}
            </p>
            <p className="mt-2 max-w-xs text-sm" style={{ color: T.muted }}>
              A hackathon by SDSF DAVV — for the hunters, by the hunters.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="font-mono text-sm" style={{ color: T.muted }}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-10 h-10 flex items-center justify-center rounded-md font-mono text-sm transition-transform duration-200 hover:scale-110"
                style={{ background: T.card, border: `1px solid ${T.line}`, color: T.accent }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-14 pt-6 text-center font-mono text-xs" style={{ color: T.muted, borderTop: `1px solid ${T.line}` }}>
          made with <span style={{ color: T.accent }}>❤</span> by SDSF DAVV · © 2026 HackHive 2.0
        </p>
      </div>
    </footer>
  );
}

/* ----------------------------- App ---------------------------- */
export default function App() {
  return (
    <div className="min-h-screen antialiased" style={{ background: T.bg, color: T.text, fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Poppins:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .section-alt { background: ${T.panel}; }
        .theme-card:hover { transform: translateY(-4px); border-color: ${T.accent} !important; }
        .cursor-blink { animation: blink 1.1s steps(1) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .cursor-blink, .animate-bounce { animation: none !important; }
          .theme-card, .theme-card:hover { transform: none; }
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${T.accent};
          outline-offset: 3px;
          border-radius: 4px;
        }
      `}</style>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Themes />
        <Timeline />
        <Prizes />
        <Gallery />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
