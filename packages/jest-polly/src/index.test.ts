import { Polly } from '@pollyjs/core';
import { polly } from './polly';

test('exports polly instance', async () => {
  expect(polly).toBeInstanceOf(Polly);
});
