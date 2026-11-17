import { createPublicKey, verify } from "node:crypto";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const path = process.argv[2] ?? "receipt.json";
const fixture = JSON.parse(readFileSync(path, "utf8"));
assert.equal(fixture.algorithm, "SLH-DSA-SHA2-128s");
const receipt = JSON.parse(fixture.message);
assert.equal(receipt.environment, "demo");
assert.equal(receipt.amountAtomic, "300000");

const key = createPublicKey({
  key: Buffer.from(fixture.publicKeySpkiBase64, "base64"),
  format: "der",
  type: "spki",
});
assert.equal(key.asymmetricKeyType, "slh-dsa-sha2-128s");
assert.equal(
  key.export({ format: "der", type: "spki" }).subarray(-32).toString("hex"),
  fixture.publicKeyHex,
);

const signature = Buffer.from(fixture.signatureBase64, "base64");
assert.equal(signature.length, 7856);
const original = Buffer.from(fixture.message);
const edited = Buffer.from(
  fixture.message.replace('"amountAtomic":"300000"', '"amountAtomic":"900000"'),
);
assert.equal(verify(null, original, key, signature), true);
assert.equal(verify(null, edited, key, signature), false);
console.log("0.30 USDC — valid test signature");
console.log("0.90 USDC — original signature rejected");
