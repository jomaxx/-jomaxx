import fetch from "node-fetch";
import { polly } from "./polly";

test("replays", async () => {
  if (polly.mode === "record") {
    const response = await fetch("https://httpstat.us/200"); // ensure there is a recording
    expect(response.ok).toBe(true);
  }

  if (polly.mode === "replay") {
    await new Promise((resolve) => {
      polly.server.any().once("beforeReplay", (req) => {
        expect(req.url).toBe("https://httpstat.us/200");
        resolve();
      });

      fetch("https://httpstat.us/200");
    });
  }
});
