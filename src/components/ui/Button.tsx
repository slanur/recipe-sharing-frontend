import { LoaderCircle } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import {
  buttonClass,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/buttonStyles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  type = 'button',
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={buttonClass(variant, size, className)}
      {...props}
    >
      {isLoading && (
        <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
      )}
      {children}
    </button>
  )
}
