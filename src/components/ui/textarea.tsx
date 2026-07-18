import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}

export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'flex min-h-24 w-full rounded-lg border bg-surface-elevated px-3.5 py-2.5 text-[0.95rem] text-ink',
        'placeholder:text-ink-muted/60 resize-y',
        'transition-[border-color,box-shadow] duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        invalid
          ? 'border-danger focus-visible:ring-danger/25 focus-visible:border-danger'
          : 'border-border',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}
