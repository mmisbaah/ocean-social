import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Raajje Explorers shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Raajje Explorers — Social Studies for Grades 1–6<\/title>/i);
  assert.match(html, /Sailing to Raajje Explorers/);
  assert.match(html, /Back to Atollingo/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the app files", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /Raajje Explorers/);
  for (const f of ["../public/manifest.webmanifest", "../public/sw.js", "../public/assets/beach.webp", "../public/assets/avatars/avatar-18.webp", "../dist/server/index.js"]) {
    await access(new URL(f, import.meta.url));
  }
});
