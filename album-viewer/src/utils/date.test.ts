import { describe, expect, it } from "vitest"
import { validateDate } from './date'

describe('validateDate', () => {
  it('accepts a valid French date and returns a Date object', () => {
    expect(validateDate('31/12/2024')).toEqual(new Date(2024, 11, 31))
  })

  it('rejects invalid day values', () => {
    expect(validateDate('31/02/2024')).toBeNull()
    expect(validateDate('32/01/2024')).toBeNull()
  })

  it('rejects malformed input', () => {
    expect(validateDate('2024-12-31')).toBeNull()
    expect(validateDate('')).toBeNull()
  })
})
