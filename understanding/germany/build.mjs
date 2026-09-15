import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { marked } from 'marked';
import { parse } from 'yaml';

const root = dirname(fileURLToPath(import.meta.url));
const check = process.argv.includes('--check');
const read = path => readFileSync(resolve(root, path), 'utf8').replaceAll('\r\n', '\n');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const chapters = [...read('markdown/SUMMARY.md').matchAll(/^\* \[([^\]]+)\]\(([^)]+\.md)\)$/gm)]
  .map(([, title, source]) => ({ title, source, target: source.replace(/\.md$/, '.html') }));
assert(chapters.length > 0, 'The chapter summary must not be empty');
assert.equal(new Set(chapters.map(chapter => chapter.source)).size, chapters.length, 'Duplicate chapter in summary');
const outputs = new Map();

function render(source) {
  const stack = [];
  const converted = source.replace(/\{%\s*(\w+)(?:\s+style="([^"]+)")?\s*%\}/g, (_, tag, style) => {
    if (tag.startsWith('end')) {
      assert.equal(stack.pop(), tag.slice(3), `Unbalanced GitBook tag: ${tag}`);
      return '\n\n</div>\n\n';
    }
    assert(['hint', 'stepper', 'step'].includes(tag), `Unsupported GitBook tag: ${tag}`);
    stack.push(tag);
    return `\n\n<div class="${tag}${style ? ` ${escape(style)}` : ''}">\n\n`;
  });
  assert.equal(stack.length, 0, 'Unclosed GitBook tags');
  return marked.parse(converted).replace(/href="([^"#:]+)\.md(#[^"]*)?"/g, (_, path, hash = '') => `href="${path}.html${hash}"`);
}

for (const [i, chapter] of chapters.entries()) {
  const source = read(`markdown/${chapter.source}`);
  assert(!/[\u3400-\u9fff]/u.test(source), `Untranslated Chinese in ${chapter.source}`);
  assert(source.startsWith(`# ${chapter.title}\n`), `Title mismatch: ${chapter.source}`);
  const nav = chapters.map(item => `<a href="${item.target}"${item === chapter ? ' aria-current="page"' : ''}>${escape(item.title)}</a>`).join('');
  const previous = i ? `<a href="${chapters[i - 1].target}">← ${escape(chapters[i - 1].title)}</a>` : '<span></span>';
  const next = i + 1 < chapters.length ? `<a href="${chapters[i + 1].target}">${escape(chapters[i + 1].title)} →</a>` : '<span></span>';
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Understanding Germany: dynasties, faith and territory through five stages of history."><title>${escape(chapter.title)} | Understanding Germany</title><link rel="stylesheet" href="style.css"></head><body><a class="skip" href="#content">Skip to content</a><aside><strong>Understanding<br>Germany</strong><nav aria-label="Chapters">${nav}</nav></aside><main id="content"><p class="eyebrow">Dynasties · Faith · Territory</p>${render(source)}<div class="pager">${previous}${next}</div><footer>Understanding Germany · <a href="https://tour-1.gitbook.io/understanding/understanding-germany/">English GitBook edition</a> · <a href="https://tour-1.gitbook.io/understanding/germany/">Chinese GitBook edition</a> · <a href="../europe/">Understanding Europe</a></footer></main></body></html>\n`;
  outputs.set(chapter.target, html);
}
outputs.set('index.html', outputs.get(chapters[0].target));
outputs.set('style.css', read('../europe/style.css').trimEnd() + '\n.stepper{margin:25px 0;padding-left:22px;border-left:3px solid #b19760}.step{padding:0 0 12px}.step h2,.step h3{margin-top:1em}h4{font-size:20px;line-height:1.45}main{overflow-wrap:break-word}\n');

for (const [file, content] of outputs) {
  assert(!content.includes('{%'), `Unconverted GitBook markup in ${file}`);
  for (const [, url] of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|#)/.test(url)) continue;
    const local = url.split('#')[0];
    assert(outputs.has(local) || existsSync(resolve(root, local)), `Broken local link in ${file}: ${url}`);
  }
  if (check) assert.equal(read(file), content, `Generated file is stale: ${file}`);
  else writeFileSync(resolve(root, file), content);
}

const site = parse(read('../gitbook-docs.yaml'));
const directories = [];
function walk(value) {
  if (!value || typeof value !== 'object') return;
  if (value.directory) {
    assert(existsSync(resolve(root, '..', value.directory)), `Missing GitBook directory: ${value.directory}`);
    directories.push(value.directory);
  }
  for (const child of Object.values(value)) walk(child);
}
walk(site);
assert(directories.includes('./germany/markdown'));
assert(directories.includes('./germany/chinese/markdown'));
for (const folder of ['markdown', 'chinese/markdown']) {
  const summary = read(`${folder}/SUMMARY.md`);
  const listed = [...summary.matchAll(/\]\(([^)]+\.md)\)/g)].map(match => match[1]);
  const files = readdirSync(resolve(root, folder)).filter(file => file.endsWith('.md') && file !== 'SUMMARY.md');
  assert.deepEqual([...listed].sort(), files.sort(), `Chapter coverage mismatch in ${folder}`);
  for (const file of files) {
    const source = read(`${folder}/${file}`);
    render(source); // Validate GitBook tag balance in both editions.
    assert(!source.includes('\uFFFD'), `Invalid Unicode in ${folder}/${file}`);
    for (const [, target] of source.matchAll(/\]\(([^)\s]+\.md)(?:#[^)]*)?\)/g)) {
      if (/^https?:/.test(target)) continue;
      assert(existsSync(resolve(root, folder, target)), `Broken Markdown link in ${folder}/${file}: ${target}`);
    }
  }
}
console.log(`${check ? 'Verified' : 'Built'} ${outputs.size} files; ${chapters.length} chapters, local links and GitBook directories checked.`);
