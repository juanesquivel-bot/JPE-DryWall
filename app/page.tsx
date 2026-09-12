import Image from "next/image";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import Button from "./components/UI/button";
import SectionHeading from "./components/UI/sectionheading";
import ContactForm from "./components/ContactForm";
import LineArt from "./components/LineArt";
import { emailHref, site } from "@/lib/site";

const whyUs = [
  {
    title: "40+ Years of Field Leadership",
    description:
      "Decades of specialized mastery in commercial structural integrity and finishing.",
  },
  {
    title: "Strict Code & Fire Compliance",
    description:
      "Expertise in fire-rated assemblies, local commercial codes, and strict safety protocols.",
  },
  {
    title: "Trade Coordination Mastery",
    description:
      "Seamless collaboration with MEP trades to keep complex jobsites moving efficiently.",
  },
  {
    title: "Precision Architectural Execution",
    description:
      "Flawless implementation of blueprints, specialty walls, and high-performance layouts.",
  },
];

const offerings = [
  {
    art: "framing" as const,
    title: "Metal Stud Structural & Interior Framing",
    body: "Structural skeletons for exterior and interior commercial walls, bulkheads, and drop ceilings.",
  },
  {
    art: "drywall" as const,
    title: "Gypsum Board & Fire-Rated Drywall Installation",
    body: "High-volume installation of standard, fire-rated (Type X), and moisture-resistant gypsum boards.",
  },
  {
    art: "ceiling" as const,
    title: "Acoustical Ceiling Tile Systems (ACT)",
    body: "Grid system installation and acoustic panel placement designed for sound control and clean visual appeal.",
  },
  {
    art: "sound" as const,
    title: "Specialized Soundproofing & Moisture Solutions",
    body: "Sound-dampening assemblies and water-resistant systems engineered for offices, healthcare, and high-humidity environments.",
  },
];

const coreServices = [
  {
    title: "Metal Stud Framing",
    description:
      "Structural skeletons for exterior and interior commercial walls, bulkheads, and drop ceilings.",
  },
  {
    title: "Drywall Hanging & Finishing",
    description:
      "High-volume installation of standard, fire-rated (Type X), and moisture-resistant gypsum boards.",
  },
  {
    title: "Acoustical Ceilings",
    description:
      "Grid system installation and acoustic panel placement designed for sound control and clean visual appeal.",
  },
  {
    title: "Thermal & Sound Insulation",
    description:
      "High-R-value thermal barriers and acoustic insulation for improved energy efficiency and sound transfer reduction.",
  },
];

const specialtyServices = [
  {
    title: "Fire-Rated Wall Systems",
    description:
      "Certified fire-barrier construction strictly adhering to commercial life-safety codes.",
  },
  {
    title: "Acoustic & Soundproofing Assemblies",
    description:
      "Sound-dampening drywall configurations optimized for private offices, healthcare suites, and conference rooms.",
  },
  {
    title: "Moisture & Mold Protection",
    description:
      "Water-resistant backing and specialty materials engineered for high-humidity environments.",
  },
  {
    title: "Architectural & Specialty Features",
    description:
      "Complex wall designs, curved partitions, and technical builds, including radiation-shielded walls for medical facilities.",
  },
];

const capabilities = [
  {
    title: "New Construction",
    description: "High-rises, retail centers, educational institutions, corporate offices, and hospitals.",
  },
  {
    title: "Commercial Renovations",
    description: "Full-scale interior gut-remodels and tenant build-outs.",
  },
  {
    title: "Targeted Repairs & Conversions",
    description: "Small office reconfigurations and patch-and-repair maintenance.",
  },
];

export default function Home() {
  return (
    <>
      <section id="hero" className="relative h-screen w-full overflow-hidden scroll-mt-0">
        <div className="absolute inset-0 z-10 bg-ink/60" />
        <Image
          src="/hero.jpg"
          alt="Commercial construction team coordinating on a large-scale jobsite"
          fill
          className="object-cover animate-slow-zoom"
          priority
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,transparent_62%,rgba(145,221,211,0.28)_62%,rgba(145,221,211,0.28)_62.45%,transparent_62.45%)]" />
        <div className="relative z-20 container mx-auto flex h-full flex-col justify-center px-6 pt-24 text-white md:pt-28">
          <div className="animate-fade-in-up max-w-4xl">
            <h2 className="mb-6 border-l-2 border-mint pl-4 text-xs uppercase tracking-[0.4em] opacity-90 md:text-sm">
              {site.name} — {site.tagline}
            </h2>
            <h1 className="mb-8 font-serif text-4xl leading-[1.1] md:text-6xl lg:text-7xl">
              40 Years of Unmatched Expertise in Commercial Drywall
            </h1>
            <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed opacity-90">
              Precision metal stud framing, high-performance drywall installation, and acoustical systems built to code, on time, and within budget.
            </p>
            <div className="flex flex-col gap-6 sm:flex-row">
              <Button variant="mint" href="#contact">
                Request a Commercial Quote <ArrowRight size={16} />
              </Button>
              <Button variant="outlineWhite" href={emailHref}>
                <Mail size={16} />
                Email Us
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 z-20 flex w-full justify-center animate-bounce duration-[2000ms]">
          <div className="h-16 w-[1px] bg-mint/70" />
        </div>
      </section>

      <section id="why" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Why Partner With Us" title="Why Partner With J&P Drywall?" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className="border border-gypsum-dark bg-frost p-10 transition-shadow duration-500 hover:shadow-xl"
              >
                <span className="mb-6 block font-serif text-4xl text-mint-dark">0{i + 1}</span>
                <h3 className="mb-3 font-serif text-xl text-ink">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="offerings" className="scroll-mt-24 bg-gypsum py-24 md:py-32">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Core Offerings" title="Commercial systems, framed and finished with precision." />
          <div className="space-y-8">
            {offerings.map((item, i) => (
              <article
                key={item.title}
                className="grid grid-cols-1 overflow-hidden border border-gypsum-dark bg-white lg:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <LineArt name={item.art} className="min-h-[320px] w-full lg:min-h-full" />
                </div>
                <div className="flex flex-col justify-center p-10 md:p-16">
                  <span className="mb-4 font-serif text-4xl text-mint-dark">0{i + 1}</span>
                  <h3 className="mb-4 font-serif text-3xl text-ink">{item.title}</h3>
                  <p className="max-w-lg text-lg font-light leading-relaxed text-muted">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading subtitle="About Us" title="Decades of Structural Integrity & Commercial Excellence" />
              <div className="-mt-8 space-y-6 text-lg font-light leading-relaxed text-muted">
                <p>
                  At J&amp;P Drywall, operational success is built on a foundation of 40 years of commercial trade experience. From high-rise developments to specialized healthcare facilities, we deliver structural precision, code compliance, and reliable jobsite coordination on every build.
                </p>
                <p>
                  We understand the demands of commercial contracting: strict timelines, intricate architectural specifications, and the necessity of seamless coordination with electrical, plumbing, and HVAC trades. Whether framing exterior load-bearing walls or executing specialized radiation-shielded installations, our team brings seasoned craftsmanship and technical discipline to every stage of construction.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/about.jpg"
                alt="Crew members installing metal framing on a commercial deck"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-frost py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading subtitle="Services" title="Core Commercial Services" />
              <p className="-mt-8 text-lg font-light leading-relaxed text-muted">
                Framing, gypsum systems, acoustical ceilings, and insulation — specified for commercial schedules and life-safety codes.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/office.jpg"
                alt="Finished commercial interior with framed partitions and acoustic ceiling"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mb-28 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
            {coreServices.map((service) => (
              <div key={service.title} className="border-t border-mint-dark/40 pt-6">
                <h3 className="mb-3 font-serif text-xl text-ink">{service.title}</h3>
                <p className="font-light leading-relaxed text-muted">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden bg-ink p-10 text-white md:p-16">
            <div className="absolute top-0 right-0 h-full w-1/3 translate-x-1/2 -skew-x-12 bg-ink-mid/50" />
            <div className="relative z-10">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-mint">
                Specialized Installations
              </span>
              <h3 className="mb-6 font-serif text-3xl leading-tight md:text-4xl">
                Fire, acoustic, moisture, and architectural systems
              </h3>
              <p className="mb-14 max-w-3xl text-lg font-light leading-relaxed text-mint-light">
                Specialty assemblies for healthcare, hospitality, and high-performance commercial interiors — executed to spec and inspected to code.
              </p>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {specialtyServices.map((service) => (
                  <div key={service.title}>
                    <h4 className="mb-3 font-serif text-xl text-white">{service.title}</h4>
                    <p className="text-sm font-light leading-relaxed text-mint-light">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mb-16 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading subtitle="Project Capabilities" title="Built for commercial scale — from ground-up to tenant turn." />
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/building.jpg"
                alt="High-rise commercial buildings"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {capabilities.map((item, i) => (
              <div key={item.title} className="border border-gypsum-dark bg-gypsum p-10">
                <span className="mb-6 block font-serif text-4xl text-mint-dark">0{i + 1}</span>
                <h3 className="mb-3 font-serif text-2xl text-ink">{item.title}</h3>
                <p className="font-light leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
            <div>
              <SectionHeading subtitle="Contact Us" title="Get a Quote on Your Next Commercial Project" />
              <p className="-mt-8 mb-12 max-w-md text-lg font-light text-muted">
                Ready to discuss blueprints, scheduling, or bid submissions? Contact our team today.
              </p>
              <div className="space-y-8">
                <div className="flex items-start">
                  <Mail className="mt-1 mr-6 shrink-0 text-mint-dark" size={20} />
                  <div>
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-ink">Email</h4>
                    <a href={emailHref} className="font-light text-muted transition-colors hover:text-mint-dark">
                      {site.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-6 shrink-0 text-mint-dark" size={20} />
                  <div>
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-ink">Service Area</h4>
                    <p className="font-light text-muted">{site.serviceArea}</p>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
