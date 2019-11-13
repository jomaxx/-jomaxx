# @jomaxx/jest-polly

An opinionated integration between [Jest](https://jestjs.io/) and [Polly.js](https://netflix.github.io/pollyjs).

## Usage

### Install

```bash
yarn add --dev jest @jomaxx/jest-polly
# or with NPM
npm install --save-dev jest @jomaxx/jest-polly
```

### Use in all tests

In your `package.json`

```json
{
  "jest": {
    "setupFilesAfterEnv": ["@jomaxx/jest-polly"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  setupFilesAfterEnv: ['@jomaxx/jest-polly'],
};
```

### Use in a single test

In `my.test.js`

```js
import '@jomaxx/jest-polly';
import fetch from 'node-fetch';

test('is ok', async () => {
  const response = await fetch('https://www.google.com/', { method: 'HEAD' });
  expect(response.ok).toBe(true);
});
```

### Using the polly instance

Use the `polly` instance to change default behavior. Read [docs](https://netflix.github.io/pollyjs/#/api).

```js
import { polly } from '@jomaxx/jest-polly';
import fetch from 'node-fetch';

polly.server
  .any('https://www.google.com/')
  .intercept((req, res) => res.sendStatus(500));

test('is ok', async () => {
  const response = await fetch('https://www.google.com/', { method: 'HEAD' });
  expect(response.ok).not.toBe(true);
});
```
