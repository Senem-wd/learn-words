export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0]!
}

export function addDays(dateISO: string, days: number): string {
  const date = new Date(dateISO)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]!
}

export function isToday(dateISO: string): boolean {
  return dateISO === getTodayISO()
}

export function isPast(dateISO: string): boolean {
  return dateISO < getTodayISO()
}

export function formatDate(dateISO: string, locale = 'tr-TR'): string {
  return new Date(dateISO).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
