import http from 'http';
import fetch from 'node-fetch';
import './polly';

const server = http.createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello World!');
  res.end();
});

beforeEach(() => {
  server.listen(8080);
});

afterEach(() => {
  server.close();
});

test('replays recording', async () => {
  await fetchMessage(); // records if missing
  server.close(); // go offline
  const message = await fetchMessage(); // replays recording
  expect(message).toBe('Hello World!');
});

async function fetchMessage() {
  const response = await fetch('http://localhost:8080');
  return response.text();
}
