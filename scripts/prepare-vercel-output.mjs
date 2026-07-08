import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist");
const outputDir = resolve("public_build");

if (!existsSync(distDir)) {
  throw new Error("Vite output directory 'dist' was not created.");
}

rmSync(outputDir, { recursive: true, force: true });
cpSync(distDir, outputDir, { recursive: true });

console.log("Prepared Vercel output directory: public_build");
