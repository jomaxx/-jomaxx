import path from 'path';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

// @ts-ignore
const testPath: string = global.jasmine.testPath;
const dirname = path.dirname(testPath);
const basename = path.basename(testPath);

export const polly = new Polly(basename, {
  adapters: ['node-http'],
  persister: 'fs',
  persisterOptions: {
    fs: {
      recordingsDir: `${dirname}/__recordings__`,
    },
  },
  recordIfMissing: process.env.CI ? false : true,
  recordFailedRequests: true,
  matchRequestsBy: {
    order: false,
  },
});

afterAll(() => {
  return polly.stop();
});
