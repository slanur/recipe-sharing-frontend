import { Eye, EyeOff } from 'lucide-react'
import { useState, type InputHTMLAttributes } from 'react'
import { TextField } from '@/components/ui/TextField'

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function PasswordField(props: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = isVisible ? EyeOff : Eye

  return (
    <TextField
      {...props}
      type={isVisible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          aria-label={isVisible ? 'Şifreyi gizle' : 'Şifreyi göster'}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted hover:bg-sand-100 hover:text-ink"
        >
          <Icon aria-hidden="true" className="h-4.5 w-4.5" />
        </button>
      }
    />
  )
}
