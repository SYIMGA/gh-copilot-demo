import { describe, expect, it } from "vitest";
import { validateDate } from "./date";
import { validateIPV6, validateAlbumId } from "./validators";

describe('validateIPV6', () => {
  it('accepts the "::" shorthand', () => {
    expect(validateIPV6('::')).toBe(true)
  })

  it('accepts a full 8-group IPv6 address', () => {
    expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true)
  })

  it('accepts compressed forms', () => {
    expect(validateIPV6('2001:db8::1')).toBe(true)
    expect(validateIPV6('::1')).toBe(true)
  })

  it('rejects addresses with spaces or empty input', () => {
    expect(validateIPV6('2001: db8::1')).toBe(false)
    expect(validateIPV6('')).toBe(false)
  })

  it('rejects addresses with too many groups', () => {
    expect(validateIPV6('1:2:3:4:5:6:7:8:9')).toBe(false)
  })

  it('rejects invalid hex groups', () => {
    expect(validateIPV6('zzzz::1')).toBe(false)
    expect(validateIPV6('2001:db8:85a3:0:0:8a2e:370g:7334')).toBe(false)
  })
})

describe('validateAlbumId', () => {
  it('accepts positive integer ids as strings and numbers', () => {
    expect(validateAlbumId('123')).toBe(true)
    expect(validateAlbumId(5)).toBe(true)
  })

  it('rejects zero, negatives and non-numeric values', () => {
    expect(validateAlbumId('0')).toBe(false)
    expect(validateAlbumId('-1')).toBe(false)
    expect(validateAlbumId('abc')).toBe(false)
    expect(validateAlbumId('')).toBe(false)
  })
})

describe('validateDate', () => {
  it('returns a Date object when given a valid date string', () => {
    const date = '01/01/2019'
    const expectedDate = new Date(2019, 0, 1)

    expect(validateDate(date)).toEqual(expectedDate)
  })

  it('returns null when given an invalid date string', () => {
    const date = 'invalid-date'

    expect(validateDate(date)).toBeNull()
  })
})
