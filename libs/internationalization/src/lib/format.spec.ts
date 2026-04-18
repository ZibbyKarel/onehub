import { formatMessage } from './format';

describe('formatMessage', () => {
  it('replaces known interpolation parameters', () => {
    expect(
      formatMessage('Hello {name}, you have {count} new messages.', {
        name: 'Alex',
        count: 3,
      }),
    ).toBe('Hello Alex, you have 3 new messages.');
  });

  it('keeps missing placeholders unchanged', () => {
    expect(formatMessage('Hello {name}, welcome to {city}.', { name: 'Alex' })).toBe(
      'Hello Alex, welcome to {city}.',
    );
  });

  it('ignores extra params that are not used in the message', () => {
    expect(
      formatMessage('Only {used} appears.', {
        used: 'this',
        unused: 'that',
      }),
    ).toBe('Only this appears.');
  });
});
