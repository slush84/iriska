import Image from "next/image";

type LogoVariant = "default" | "cream" | "burgundy" | "ink";

interface LogoProps {
  variant?: LogoVariant;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Iriska.AI brand logo.
 *
 * Usage:
 *   <Logo />                              // default (Ink + Burgundy AI) on light surface
 *   <Logo variant="cream" />              // cream mono — for dark surfaces
 *   <Logo variant="burgundy" />           // burgundy mono — single-color
 *   <Logo variant="ink" />                // ink mono — print, B&W
 *
 * Minimum width: 96px. Maintains the lockup; never separate the wordmark from ".AI".
 */
export function Logo({
  variant = "default",
  width = 200,
  height = 56,
  priority = false,
  className,
}: LogoProps) {
  const src = `/brand/iriska-logo-${variant}.svg`;

  return (
    <Image
      src={src}
      alt="Iriska.AI"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
