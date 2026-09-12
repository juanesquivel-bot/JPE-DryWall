import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-ink text-white hover:bg-ink-mid",
  mint: "bg-mint text-ink hover:bg-mint-dark hover:text-white",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  outlineWhite: "border border-white text-white hover:bg-white hover:text-ink",
  white: "bg-white text-ink hover:bg-gypsum",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  href,
}: ButtonProps) {
  const classes = `px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 font-medium inline-flex items-center justify-center gap-2 cursor-pointer ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
