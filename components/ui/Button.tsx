import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-vojvodina-red text-vojvodina-light hover:bg-vojvodina-red/90",
  secondary: "bg-vojvodina-dark text-vojvodina-light hover:bg-vojvodina-dark/90",
  outline: "border border-vojvodina-red text-vojvodina-red hover:bg-vojvodina-red hover:text-vojvodina-light",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

const base =
  "inline-flex items-center justify-center rounded-md font-heading uppercase tracking-wider transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

export default function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled,
  className,
  children,
  onClick,
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
