import { describe, it, expect } from 'vitest';
import { type ErrorCode, getMessageByErrorCode } from '../lib/errors';

describe('errors', () => {
  it('returns known message', () => {
    expect(getMessageByErrorCode('bad_request:api')).toBe(
      "The request couldn't be processed. Please check your input and try again."
    );
  });

  it('returns default for unknown code', () => {
    expect(getMessageByErrorCode('foo:bar' as ErrorCode)).toBe(
      'Something went wrong. Please try again later.'
    );
  });
});
