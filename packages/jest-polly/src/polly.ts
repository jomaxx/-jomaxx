import * as path from "path";
import * as fs from "fs";
import { Polly } from "@pollyjs/core";
import FSPersister from "@pollyjs/persister-fs";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

// @ts-ignore
const testPath: string = global.jasmine.testPath;
const dirname = path.dirname(testPath);
const basename = path.basename(testPath);
const recordingsDir = `${dirname}/__recordings__`;

export const polly = new Polly(basename, {
  adapters: ["node-http"],
  persister: "fs",
  persisterOptions: {
    fs: {
      recordingsDir,
    },
  },
  recordIfMissing: false,
  recordFailedRequests: true,
  matchRequestsBy: {
    order: false,
  },
});

if (fs.existsSync(`${recordingsDir}/${polly.recordingId}`)) {
  polly.replay();
} else {
  polly.record();
}

afterEach(() => polly.flush());

afterAll(() => polly.stop());
