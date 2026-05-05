type Props = {
    variant?: 'primary' | 'secondary'
    size?: 'default' | 'small'
    email?: string
    subject?: string
    className?: string
    children?: React.ReactNode
  }
  
  export function RequestAccessButton({
    variant = 'primary',
    size = 'default',
    email = 'hello@iriska.ai',
    subject = 'Iriska Access Request',
    className = '',
    children = 'Request Access',
  }: Props) {
    const encodedSubject = encodeURIComponent(subject)
    const href = `mailto:${email}?subject=${encodedSubject}`
  
    const base = 'rounded-full font-mono uppercase tracking-[0.14em] transition-colors'
    const sizing = size === 'small' ? 'px-4 py-2 text-[10px]' : 'px-5 py-2 text-xs'
    const palette =
      variant === 'primary'
        ? 'bg-burgundy text-cream hover:bg-burgundy-deep'
        : 'border border-pebble/60 bg-cream text-burgundy hover:border-burgundy/40'
  
    return (
      <a href={href} className={`${base} ${sizing} ${palette} ${className}`}>
        {children}
      </a>
    )
  }