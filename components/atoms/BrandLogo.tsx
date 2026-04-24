import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  label?: string;
  labelClassName?: string;
  priority?: boolean;
  showLabel?: boolean;
  size?: number;
}

const joinClasses = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export function BrandLogo({
  className,
  imageClassName,
  label = "Kopo Pay",
  labelClassName,
  priority = false,
  showLabel = true,
  size = 36,
}: BrandLogoProps) {
  return (
    <span className={joinClasses("inline-flex items-center gap-2.5", className)}>
      <span
        className="relative shrink-0"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Image
          src="/brand-logos/kopoPayLogo.png"
          alt={`${label} logo`}
          fill
          priority={priority}
          sizes={`${size}px`}
          className={joinClasses(
            "object-contain drop-shadow-[0_4px_12px_rgba(42,206,209,0.3)] dark:drop-shadow-[0_4px_12px_rgba(255,255,255,0.1)]",
            imageClassName
          )}
        />
      </span>
      {showLabel ? <span className={joinClasses("whitespace-nowrap", labelClassName)}>{label}</span> : null}
    </span>
  );
}
