const fs = require("fs");
const path = require("path");

function decodeLatex(str) {
  return str
    .replace(/\{\\o\}|\\o\b/g, "ø")
    .replace(/\{\\O\}|\\O\b/g, "Ø")
    .replace(/\{\\aa\}|\\aa\b/g, "å")
    .replace(/\{\\AA\}|\\AA\b/g, "Å")
    .replace(/\{\\ae\}|\\ae\b/g, "æ")
    .replace(/\{\\AE\}|\\AE\b/g, "Æ")
    .replace(/\{\\"([aAoOuUeEiI])\}|\\"([aAoOuUeEiI])/g, (_, a, b) => {
      const ch = a || b;
      const map = { a: "ä", A: "Ä", o: "ö", O: "Ö", u: "ü", U: "Ü", e: "ë", E: "Ë", i: "ï", I: "Ï" };
      return map[ch] || ch;
    })
    .replace(/\{\\'([aAeEiIoOuUcCnNsSzZ])\}|\\'([aAeEiIoOuUcCnNsSzZ])/g, (_, a, b) => {
      const ch = a || b;
      const map = { a: "á", A: "Á", e: "é", E: "É", i: "í", I: "Í", o: "ó", O: "Ó", u: "ú", U: "Ú", c: "ć", C: "Ć", n: "ń", N: "Ń", s: "ś", S: "Ś", z: "ź", Z: "Ź" };
      return map[ch] || ch;
    })
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractField(body, fieldName) {
  const regex = new RegExp(`\\b${fieldName}\\s*=\\s*`, "i");
  const match = regex.exec(body);
  if (!match) return null;

  let i = match.index + match[0].length;
  const opener = body[i];
  if (opener !== "{" && opener !== '"') {
    const bare = body.slice(i).match(/^([^,\r\n}]+)/);
    return bare ? bare[1].trim() : null;
  }

  let depth = 0;
  let start = i + 1;
  for (; i < body.length; i++) {
    const ch = body[i];
    if (opener === "{") {
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) return body.slice(start, i);
      }
    } else if (opener === '"') {
      if (ch === '"' && body[i - 1] !== "\\") {
        if (depth === 0) {
          depth = 1;
          start = i + 1;
        } else {
          return body.slice(start, i);
        }
      }
    }
  }
  return null;
}

function formatAuthor(rawAuthor) {
  const trimmed = rawAuthor.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return decodeLatex(trimmed);
  }
  const clean = decodeLatex(trimmed);
  if (clean.includes(",")) {
    return clean.split(",")[0].trim();
  }
  const parts = clean.split(" ");
  return parts[parts.length - 1].trim();
}

function parseBibtex(bibText) {
  const entries = new Map();
  const entryStartRegex = /@\w+\s*\{\s*([^,\s]+)\s*,/g;
  const starts = [];
  let m;

  while ((m = entryStartRegex.exec(bibText)) !== null) {
    starts.push({ key: m[1].trim(), bodyStart: m.index + m[0].length, entryStart: m.index });
  }

  for (let idx = 0; idx < starts.length; idx++) {
    const { key, bodyStart } = starts[idx];
    const bodyEnd = idx + 1 < starts.length ? starts[idx + 1].entryStart : bibText.length;
    const body = bibText.slice(bodyStart, bodyEnd);

    const rawAuthorField = extractField(body, "author") || extractField(body, "editor");
    const rawYearField = extractField(body, "year") || extractField(body, "date");

    const yearMatch = rawYearField ? rawYearField.match(/(\d{4}[a-z]?)/i) : null;
    const year = yearMatch ? yearMatch[1] : "n.d.";

    let authorLabel = key;
    if (rawAuthorField) {
      const authors = rawAuthorField
        .split(/\s+and\s+/i)
        .map(formatAuthor)
        .filter(Boolean);

      if (authors.length === 1) {
        authorLabel = authors[0];
      } else if (authors.length === 2) {
        authorLabel = `${authors[0]} & ${authors[1]}`;
      } else if (authors.length > 2) {
        authorLabel = `${authors[0]} et al.`;
      }
    }

    entries.set(key, `${authorLabel}, ${year}`);
  }

  return entries;
}

function normalizeLocator(raw) {
  return raw
    .trim()
    .replace(/^(p\.|pp\.|s\.|ch\.|sec\.|vol\.|fig\.|table)\s*/i, (_, prefix) => `${prefix.toLowerCase()} `);
}

function rewriteMarkdown(text, bibMap) {
  let frontmatter = "";
  let body = text;
  if (text.startsWith("---")) {
    const endMatch = text.slice(3).match(/\r?\n---(?:\r?\n|$)/);
    if (endMatch) {
      const splitIdx = 3 + endMatch.index + endMatch[0].length;
      frontmatter = text.slice(0, splitIdx);
      body = text.slice(splitIdx);
    }
  }

  let replacements = 0;
  const citationRegex = /\[\[@([a-zA-Z0-9_.:-]+)(?:\|([^\]]+))?\]\](?:[ \t]*((?:p\.|pp\.|s\.|ch\.|sec\.|vol\.|fig\.|table)\s*\d+(?:\s*[-–—]\s*\d+)?))?/gi;

  let updatedBody = body.replace(citationRegex, (full, key, alias, trailingLocator) => {
    const formatted = bibMap.get(key);
    if (!formatted) return full;

    if (trailingLocator) {
      replacements++;
      return `[[@${key}|${formatted}, ${normalizeLocator(trailingLocator)}]]`;
    }

    if (!alias) {
      replacements++;
      return `[[@${key}|${formatted}]]`;
    }

    if (/^(?:p\.|pp\.|s\.|ch\.|sec\.|vol\.|fig\.|table)\s*\d/i.test(alias.trim())) {
      replacements++;
      return `[[@${key}|${formatted}, ${normalizeLocator(alias)}]]`;
    }

    return full;
  });

  // Add a space after semicolons separating consecutive citation wikilinks
  updatedBody = updatedBody.replace(/(\[\[@[^\]]+\]\]\)?)\s*;\s*(?=\[\[@)/g, "$1; ");

  return { text: frontmatter + updatedBody, replacements };
}

function walk(dir, bibMap) {
  let filesModified = 0;
  let totalLinks = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = walk(fullPath, bibMap);
      filesModified += sub.filesModified;
      totalLinks += sub.totalLinks;
    } else if (entry.name.endsWith(".md")) {
      const original = fs.readFileSync(fullPath, "utf8");
      const { text, replacements } = rewriteMarkdown(original, bibMap);
      if (replacements > 0) {
        fs.writeFileSync(fullPath, text, "utf8");
        filesModified++;
        totalLinks += replacements;
      }
    }
  }

  return { filesModified, totalLinks };
}

const targetDir = process.argv[2] || "content";
const bibPath = process.argv[3] || "bibliography.bib";

if (!fs.existsSync(bibPath)) {
  console.error(`Bibliography file not found: ${bibPath}`);
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  console.log(`Target directory "${targetDir}" does not exist yet; skipping citation aliasing.`);
  process.exit(0);
}

const bibMap = parseBibtex(fs.readFileSync(bibPath, "utf8"));
const { filesModified, totalLinks } = walk(targetDir, bibMap);
console.log(`Parsed ${bibMap.size} BibTeX entries; aliased ${totalLinks} citations across ${filesModified} files in "${targetDir}".`);





