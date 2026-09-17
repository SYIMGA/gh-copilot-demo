import { describe, expect, it } from "vitest"
import { validateGuid } from './guid'

describe('validateGuid', () => {
  it('accepts a valid GUID', () => {
    expect(validateGuid('123e4567-e89b-42d3-a456-426614174000')).toBe(true)
  })

  it('rejects malformed GUIDs', () => {
    expect(validateGuid('123e4567-e89b-62d3-a456-426614174000')).toBe(false)
    expect(validateGuid('not-a-guid')).toBe(false)
    expect(validateGuid('')).toBe(false)
  })
})
