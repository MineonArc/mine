import assert from "node:assert/strict";
import { createPublicKey, verify } from "node:crypto";
import { readFileSync } from "node:fs";

const fixture = JSON.parse(readFileSync(process.argv[2] ?? "receipt.json", "utf8"));
assert.equal(fixture.algorithm, "SLH-DSA-SHA2-128s");
const receipt = JSON.parse(fixture.message);
assert.equal(receipt.environment, "demo");
assert.equal(receipt.asset, "USDC");
assert.equal(receipt.decimals, 6);
assert.equal(receipt.schema, "mine.receipt.demo.v1");
assert.match(receipt.amountAtomic, /^[1-9]\d{0,14}$/);
assert.match(fixture.publicKeyHex, /^[0-9a-f]{64}$/);

// DER SubjectPublicKeyInfo prefix for a 32-byte SLH-DSA-SHA2-128s public key.
const spkiPrefix = "3030300b0609608648016503040314032100";
const spki = Buffer.from(spkiPrefix + fixture.publicKeyHex, "hex");
if (fixture.publicKeySpkiBase64 !== undefined) {
  assert.deepEqual(Buffer.from(fixture.publicKeySpkiBase64, "base64"), spki);
}
const key = createPublicKey({ key: spki, format: "der", type: "spki" });
assert.equal(key.asymmetricKeyType, "slh-dsa-sha2-128s");

const signature = Buffer.from(fixture.signatureBase64, "base64");
assert.equal(signature.length, 7856);
assert.equal(verify(null, Buffer.from(fixture.message), key, signature), true);

const amount = BigInt(receipt.amountAtomic);
const adjusted = amount % 10n === 9n ? amount - 1n : amount + 1n;
const amountField = /("amountAtomic"\s*:\s*")([1-9]\d*)(")/g;
const matches = Array.from(fixture.message.matchAll(amountField));
assert.equal(matches.length, 1);
assert.equal(matches[0][2], receipt.amountAtomic);
const edited = fixture.message.replace(amountField, (_, prefix, value, suffix) => (
  prefix + adjusted.toString() + suffix
));
assert.equal(verify(null, Buffer.from(edited), key, signature), false);

function formatUsdc(atomic) {
  const digits = atomic.toString().padStart(7, "0");
  return digits.slice(0, -6) + "." + digits.slice(-6).replace(/0+$/, "").padEnd(2, "0");
}

console.log(formatUsdc(amount) + " USDC — valid test signature");
console.log(formatUsdc(adjusted) + " USDC — original signature rejected");
