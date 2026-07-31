/* THROWAWAY. Merges tx-<locale>.json into the dictionaries using keys copied
 * programmatically from worklist.json. Delete before commit. */
const fs = require("fs");
const worklist = JSON.parse(fs.readFileSync("worklist.json", "utf8"));

for (const [locale, keys] of Object.entries(worklist)) {
  const file = `tx-${locale}.json`;
  if (!fs.existsSync(file)) {
    console.log(`${locale}: (no file, skipped)`);
    continue;
  }
  const values = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(values) || values.length !== keys.length) {
    throw new Error(
      `${locale}: expected ${keys.length} entries, got ${
        Array.isArray(values) ? values.length : typeof values
      }`,
    );
  }
  values.forEach((v, i) => {
    if (typeof v !== "string" || !v.trim())
      throw new Error(`${locale}: entry ${i} is empty`);
    if (/[–—]/.test(v))
      throw new Error(`${locale}: entry ${i} contains an en or em dash`);
  });

  const dictPath = `src/app/translations/${locale}.ts`;
  const src = fs.readFileSync(dictPath, "utf8");
  const tail = /\r?\n\};\r?\n?$/;
  if (!tail.test(src)) throw new Error(`${locale}: unexpected dictionary tail`);
  const esc = (s) => JSON.stringify(s);
  const added = keys
    .map((k, i) => `  ${esc(k)}:\n    ${esc(values[i])},`)
    .join("\n");
  fs.writeFileSync(dictPath, src.replace(tail, `\n${added}\n};\n`), "utf8");
  console.log(`${locale}: +${values.length}`);
}
