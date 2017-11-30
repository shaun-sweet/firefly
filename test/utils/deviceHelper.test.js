import { isActive } from 'src/utils/deviceHelper'

describe('deviceHelper.js', () => {
  it('should return a boolean when status is a boolean', () => {
    expect(isActive(true)).toBe(true)
    expect(isActive(true)).not.toBe(false)
    expect(isActive(false)).toBe(false)
    expect(isActive(false)).not.toBe(true)
  })
  describe('When passed a status string', () => {
    it('should return "true" when passed "on"', () => {
      expect(isActive('on')).toBe(true)
      expect(isActive('on')).not.toBe(false)
    });
    it('should return "false" when passed "off"', () => {
      expect(isActive('off')).toBe(false)
      expect(isActive('off')).not.toBe(true)
    });
    it('should return "true" when passed "open"', () => {
      expect(isActive('open')).toBe(true)
      expect(isActive('open')).not.toBe(false)
    });
    it('should return "false" when passed "close"', () => {
      expect(isActive('close')).toBe(false)
      expect(isActive('close')).not.toBe(true)
    });


  })
})
