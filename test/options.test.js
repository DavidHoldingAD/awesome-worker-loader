import { pitch } from '../src';
import { WORKER_TYPES } from '../src/workers';

describe('Options', () => {
  [WORKER_TYPES.SHARED, WORKER_TYPES.SERVICE].forEach((type) => {
    test('Options validation', () => {
      const fn = () =>
        pitch.call({
          query: {
            inline: true,
            type,
          },
        });

      expect(fn).toThrowErrorMatchingSnapshot();
    });
  });
});
