import Image from "next/image";
import { site } from "@/lib/site";

type LogoProps = {
  className?: string;
  priority?: boolean;
  onDark?: boolean;
};

export default function Logo({ className = "h-12 w-auto", priority = false, onDark = false }: LogoProps) {
  return (
    <span className="inline-flex max-w-full items-center">
      <Image
        src={onDark ? "/jp-logo-on-dark.png" : "/jp-logo.png"}
        alt={`${site.name} logo`}
        width={1024}
        height={291}
        priority={priority}
        className={`max-w-full object-contain object-left ${className}`}
      />
    </span>
  );
}
