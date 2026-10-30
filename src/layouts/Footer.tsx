const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-stone-600">
        © {CURRENT_YEAR} Recipe Sharing
      </p>
    </footer>
  )
}
