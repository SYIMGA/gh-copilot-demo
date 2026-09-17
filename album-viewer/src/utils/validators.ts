export function validateDate(value: string): Date | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed)

  if (!match) {
    return null
  }

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])

  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return null
  }

  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

export function validateGuid(value: string): boolean {
  if (typeof value !== 'string') {
    return false
  }

  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value.trim())
}

export function validateIPV6(value: string): boolean {
  if (typeof value !== 'string') {
    return false
  }

  const trimmed = value.trim()
  if (!trimmed || trimmed.includes(' ')) {
    return false
  }

  const validGroup = (group: string): boolean => /^[0-9A-Fa-f]{1,4}$/.test(group)

  if (trimmed === '::') {
    return true
  }

  if (trimmed.includes('::')) {
    const [left, right] = trimmed.split('::')
    const leftGroups = left ? left.split(':').filter(Boolean) : []
    const rightGroups = right ? right.split(':').filter(Boolean) : []

    if (leftGroups.length + rightGroups.length >= 8) {
      return false
    }

    return leftGroups.every(validGroup) && rightGroups.every(validGroup)
  }

  const groups = trimmed.split(':')
  if (groups.length !== 8) {
    return false
  }

  return groups.every(validGroup)
}

export function validateAlbumId(value: string | number): boolean {
  if (typeof value === 'number') {
    return Number.isInteger(value) && value > 0
  }

  if (typeof value !== 'string') {
    return false
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return false
  }

  if (!/^\d+$/.test(trimmed)) {
    return false
  }

  const n = Number(trimmed)
  return Number.isInteger(n) && n > 0
}
