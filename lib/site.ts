export const site = {
  name: "J&P Drywall",
  tagline: "Commercial Construction & Framing",
  email: "Juanesquivel@jpe-ventures.com",
  serviceArea: "Texas, USA",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  title: "J&P Drywall | Commercial Drywall, Metal Stud Framing & Acoustical Ceilings in Texas",
  description:
    "40 years of unmatched expertise in commercial drywall across Texas. Precision metal stud framing, fire-rated gypsum installation, and acoustical ceiling systems built to code, on time, and within budget.",
};

export const emailHref = `mailto:${site.email}`;
