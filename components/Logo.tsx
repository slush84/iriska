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
 * Renders an inline <img> referencing the SVG in /public/brand/.
 * Uses native browser sizing — pass either width OR height (or neither for default).
 * Aspect ratio is preserved automatically by the SVG itself.
 *
 * Usage:
 *   <Logo />                       // default (Ink + Burgundy AI), 200×56
 *   <Logo width={180} />           // height auto-scales from SVG viewBox
 *   <Logo variant="cream" />       // cream mono — for dark surfaces
 *   <Logo variant="burgundy" />    // burgundy mono — single-color
 *   <Logo variant="ink" />         // ink mono — print, B&W
 *
 * Minimum width: 96px. Maintains the lockup; never separate the wordmark from ".AI".
 *
 * Note: `priority` is accepted for API compatibility but unused —
 * native <img> doesn't support Next.js Image priority hints. The logo SVG
 * is so small (a few KB) that priority loading is irrelevant.
 */
export function Logo({
  variant = "default",
  width,
  height,
  className,
}: LogoProps) {
  const src = `/brand/iriska-logo-${variant}.svg`;

  // Build inline style with whichever dimension the caller passed.
  // Browser computes the other from the SVG's intrinsic aspect ratio.
  const style: React.CSSProperties = {};
  if (width !== undefined) style.width = `${width}px`;
  if (height !== undefined) style.height = `${height}px`;

  return (
    <img
      src={src}
      alt="Iriska.AI"
      style={style}
      className={className}
    />
  );
}