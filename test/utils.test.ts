import { describe, it, expect } from 'vitest';
import { sanitizeText, generateUUID } from '../lib/utils';

describe('utils', () => {
  it('sanitizeText removes placeholder', () => {
    expect(sanitizeText('<has_function_call>Hello')).toBe('Hello');
  });

  it('generateUUID returns uuid v4 format', () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });
});
