/**
 * Convert a GI name to URL-safe slug.
 *
 * Examples:
 *   "Parmigiano-Reggiano DOP" → "parmigiano-reggiano-dop"
 *   "Jamón de Guijuelo DOP" → "jamon-de-guijuelo-dop"
 *   "Açafrão de Trás-os-Montes (status — heritage)" → "acafrao-de-tras-os-montes"
 */
export function slugify(name: string): string {
    return name
      // Strip everything in parens (e.g. "(status — heritage)")
      .replace(/\([^)]*\)/g, '')
      // Lowercase
      .toLowerCase()
      // Decompose accented chars: é → e + combining acute, then strip combining marks
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Replace anything that's not a letter, number, or space with a dash
      .replace(/[^a-z0-9]+/g, '-')
      // Collapse multiple dashes
      .replace(/-+/g, '-')
      // Trim leading/trailing dashes
      .replace(/^-+|-+$/g, '')
  }