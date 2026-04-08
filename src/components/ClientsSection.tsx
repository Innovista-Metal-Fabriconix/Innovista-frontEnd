import { LogoLoop } from "./LogoLoop";
import MainHeading from "./MainHeading";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

function ClientsSection() {
  const prefersReducedMotion =
    typeof globalThis.matchMedia === "function" &&
    globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="about-section-spacing">
      <MainHeading
        heading="Clients Who Inspire Us"
        description="We proudly serve a diverse range of clients across various industries."
      />
      <LogoLoop
        logos={techLogos}
        speed={40}
        direction="left"
        logoHeight={60}
        gap={60}
        disableMotion={prefersReducedMotion}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
        style={{ overflow: "hidden", maxWidth: "100%" }}
      />
    </section>
  );
}

export default ClientsSection;
