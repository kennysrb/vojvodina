import { cn } from "@/lib/utils/cn";

type Tone = "blue" | "orange" | "neutral";

const toneClasses: Record<Tone, string> = {
  blue: "bg-vojvodina-red/15 text-vojvodina-red",
  orange: "bg-vojvodina-light/15 text-vojvodina-light",
  neutral: "bg-surface-600 text-surface-100",
};

export default function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-heading uppercase tracking-widest",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
