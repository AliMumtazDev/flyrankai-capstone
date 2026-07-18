import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean
}

export function Select({ className, invalid, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'flex h-11 w-full appearance-none rounded-lg border bg-surface-elevated px-3.5 pr-10 text-[0.95rem] text-ink',
        'bg-[length:1rem] bg-[right_0.85rem_center] bg-no-repeat',
        'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%234a5d6a\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")]',
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
    >
      {children}
    </select>
  )
}
