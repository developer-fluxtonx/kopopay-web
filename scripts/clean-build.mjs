import { rm } from "node:fs/promises";

const targets = [".next-build"];

for (const target of targets) {
  try {
    await rm(target, { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors so builds can proceed when the directory is absent.
  }
}
