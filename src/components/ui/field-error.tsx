import { cn } from '@/lib/utils'

type FieldErrorProps = {
  message?: string
  className?: string
}

export function FieldError({ message, className }: FieldErrorProps) {
  if (!message) return null

  return (
    <p
      role="alert"
      className={cn('mt-1.5 text-sm text-danger', className)}
    >
      {message}
    </p>
  )
}
