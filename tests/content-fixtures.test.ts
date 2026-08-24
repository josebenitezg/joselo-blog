import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const fixtures = path.resolve(process.cwd(), "src/seed/fixtures");

test("the import contains exactly the approved personal content", async () => {
  const posts = (await readdir(path.join(fixtures, "posts"))).sort();
  const pages = (await readdir(path.join(fixtures, "pages"))).sort();

  assert.deepEqual(posts, [
    "do-it-anyway.mdx",
    "hello-world.mdx",
    "marco-existencial.mdx",
  ]);
  assert.deepEqual(pages, ["about.mdx", "lab.mdx"]);
  assert.equal(posts.some((name) => /4o|paraguay/i.test(name)), false);
});

test("the Discipline Ratio equations remain explicit import inputs", async () => {
  const source = await readFile(
    path.join(fixtures, "posts", "do-it-anyway.mdx"),
    "utf8",
  );
  const equations = source.match(/\$\$[\s\S]*?\$\$/g) ?? [];

  assert.equal(equations.length, 2);
  assert.match(equations[0], /Discipline ratio/);
  assert.match(equations[1], /\\frac\{3\}\{5\}/);
});

test("Payload dependencies are pinned to one compatible release", async () => {
  const packageJSON = JSON.parse(
    await readFile(path.resolve(process.cwd(), "package.json"), "utf8"),
  ) as { dependencies: Record<string, string> };

  const payloadPackages = Object.entries(packageJSON.dependencies).filter(
    ([name]) => name === "payload" || name.startsWith("@payloadcms/"),
  );

  assert.ok(payloadPackages.length >= 6);
  for (const [name, version] of payloadPackages) {
    assert.equal(version, "3.88.0", `${name} must stay pinned`);
  }
});
