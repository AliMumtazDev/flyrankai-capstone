import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'sm'
}

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'disabled:pointer-events-none disabled:opacity-50',
        size === 'default' && 'h-11 px-5 text-[0.95rem]',
        size === 'sm' && 'h-9 px-3.5 text-sm',
        variant === 'primary' &&
          'bg-accent text-white shadow-sm hover:bg-accent-hover active:scale-[0.98]',
        variant === 'secondary' &&
          'border border-border-strong bg-surface-elevated text-ink hover:bg-surface',
        variant === 'ghost' && 'text-ink-muted hover:bg-accent-soft hover:text-accent',
        className,
      )}
      {...props}
    />
  )
}
