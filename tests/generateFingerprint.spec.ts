import generateFingerprint from "../src/core/generateFingerprint";
const req = require("./req.json");

describe("generateFingerprint", () => {
  test("id and location", () => {
    const fingerprint = generateFingerprint(req, [
      "headers",
      "ipAddress",
      "userAgent",
      "location",
    ]);

    expect(fingerprint).toEqual({
      id: "75f04a35d6c8150fb86c4238f18d437f",
      ipAddress: {
        value: "::1",
      },
      location: null,
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        language: "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7",
        encoding: "gzip, deflate, br, zstd",
      },
      userAgent: {
        browser: {
          name: "Chrome",
          version: "131.0.0.0",
          major: "131",
        },
        device: {},
        os: {
          name: "Windows",
          version: "10",
        },
        cpu: {
          architecture: "amd64",
        },
      },
    });
  });
});
