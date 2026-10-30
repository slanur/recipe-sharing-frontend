import { Sparkles } from 'lucide-react'

const DEMO_PASSWORD = 'demo1234'

const DEMO_ACCOUNTS = [
  { label: 'Kullanıcı', email: 'user@example.com' },
  { label: 'Organization', email: 'org@example.com' },
]

interface DemoAccountsProps {
  onSelect: (email: string, password: string) => void
}

export function DemoAccounts({ onSelect }: DemoAccountsProps) {
  return (
    <div className="rounded-2xl border border-dashed border-sand-300 p-3.5">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
        <Sparkles aria-hidden="true" className="h-4 w-4 text-saffron" />
        Demo hesabıyla dene
      </p>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.email}
            type="button"
            onClick={() => onSelect(account.email, DEMO_PASSWORD)}
            className="rounded-xl bg-sand-100 px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-sand-200 hover:text-ink"
          >
            {account.label}
          </button>
        ))}
      </div>
    </div>
  )
}
