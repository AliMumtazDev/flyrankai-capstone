import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
  description?: string
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  className,
  id,
  disabled,
  ...props
}: SwitchProps) {
  const switchId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 rounded-xl border border-border bg-surface-elevated px-4 py-3.5',
        className,
      )}
    >
      <div className="min-w-0">
        <label htmlFor={switchId} className="text-sm font-medium text-ink cursor-pointer">
          {label}
        </label>
        {description ? (
          <p className="mt-0.5 text-sm text-ink-muted leading-snug">{description}</p>
        ) : null}
      </div>
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          'disabled:opacity-50 disabled:pointer-events-none',
          checked ? 'bg-accent' : 'bg-border-strong',
        )}
        {...props}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </div>
  )
}
