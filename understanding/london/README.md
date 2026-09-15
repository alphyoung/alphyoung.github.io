# Understanding London — 读懂伦敦（英文版）

An English translation of the Chinese history reader **《读懂伦敦》**, packaged as a static site
ready for **GitHub Pages**.

英文版《读懂伦敦》静态站点，可直接部署到 GitHub Pages。

Eight chapters follow the Thames from Roman Londinium to Greater London, plus an appendix of
historical sites, a full timeline and a table of English and British dynasties.

八个篇章沿泰晤士河，从罗马伦蒂尼恩写到现代大伦敦，并附历史现场、总时间轴与英国王朝表。

---

## Contents / 目录

| # | Page | File |
|---|------|------|
| — | Home | `index.html` |
| I | River and Rome — Where London begins | `01-river-and-rome.html` |
| II | Heptarchy and Middle Ages — From Lundenwic to the Tower of London | `02-heptarchy-and-medieval.html` |
| III | The Tudor Reformation — Marriage, church and Puritans | `03-tudor-reformation.html` |
| IV | Renaissance London — Print, humanism and the theatre | `04-renaissance-london.html` |
| V | The Age of Sail — Merchantmen, privateers and the beginnings of empire | `05-age-of-sail.html` |
| VI | Civil War, Fire and Finance — Seventeenth-century London rebuilt three times | `06-civil-war-fire-and-finance.html` |
| VII | The Victorian Era — How an industrial metropolis worked | `07-victorian-london.html` |
| VIII | War, Migration and Modern London — An imperial capital becomes a world city | `08-war-migration-and-modern-london.html` |
| — | Appendix — Sites, timeline and dynasties | `appendix.html` |
| — | 404 page | `404.html` |

## Structure / 目录结构

```
london-en-pages/
├── index.html                 # home
├── 01-river-and-rome.html     # the eight chapters
├── …
├── 08-war-migration-and-modern-london.html
├── appendix.html
├── 404.html
├── assets/
│   ├── style.css              # all styling (no framework, no CDN)
│   ├── main.js                # reading-progress bar only
│   └── img/
│       ├── hero-thames.jpg    # Tower Bridge / Thames — Benjamin Davies, Unsplash
├── markdown/                  # the same text as GitBook-ready Markdown
├── .nojekyll                  # tell GitHub Pages not to run Jekyll
└── README.md
```

No build step, no dependencies, no external CSS/JS. Open `index.html` and it works.

无需构建、无依赖、不外链 CDN，直接打开 `index.html` 即可阅读。

## Publication / 发布与维护

Live site: https://alphyoung.github.io/understanding/london/

This book shares the alphyoung/alphyoung.github.io repository and main-branch Pages deployment with Europe. Maintain files in understanding/london/. No separate repository or Pages configuration is required.

与 Europe 共用同一仓库及 GitHub Pages 发布流程，正式维护目录为 understanding/london/。

See the repository README for the shared update and verification procedure. Keep the HTML and Markdown editions in sync when editing text. Preserve chapter navigation, image credits and sponsorship assets.

The nested 404.html is a standalone page; GitHub Pages does not automatically use it as this folder's error handler.

## Markdown edition / Markdown 版

`markdown/` holds the identical English text as Markdown, split one file per page, with front
matter. Useful if you want to re-import it into GitBook or another documentation platform.
The HTML edition uses local assets; the Markdown home page currently references an external Unsplash image.

`markdown/` 目录是同样内容的英文 Markdown，每页一个文件并带 front matter，可用于重新导入
GitBook 等文档平台。

## Editing the text / 修改内容

All text lives in one place per page inside the HTML. The pages share a fixed template:
`header.topbar` (brand + chapter nav) → `section.chead` (chapter title block) →
`article.sheet` (the body) → `nav.pager` → `footer`.

To change a chapter title or add a page, update the nav in **every** HTML file (the nav is
repeated on each page, so a one-file edit will leave the rest out of sync).

## Design / 视觉

The reading site follows the Understanding Series identity.

| Token | Value |
|---|---|
| Deep blue | `#102c3b` |
| Secondary blue | `#173a4d` |
| Gold accent | `#d4af37` |
| Gold (dark) | `#b8860b` |
| Paper | `#f7f5f0` |
| Card | `#ffffff` |
| Hairline | `#e3ded4` |
| Body / heading type | system sans / Georgia |

Each page opens with a deep-blue header band, body text sits on a paper-coloured sheet at a
860 px measure, key asides use a single gold-bordered note card, and wide tables scroll
horizontally rather than compressing their columns. A gold progress bar tracks reading position.

## Credits and licensing / 来源与授权

- **Text** — an English translation of the Chinese reading edition 《读懂伦敦》
  (originally published at `tour-1.gitbook.io/london`). Translations of linked sources are
  paraphrased from the sources cited at the foot of each chapter.
- **Hero photograph** — *The Thames and Tower Bridge* by **Benjamin Davies** via
  [Unsplash](https://unsplash.com/photos/aerial-photography-of-london-skyline-during-daytime-Oja2ty_9ZLM),
  used under the [Unsplash License](https://unsplash.com/license). Attribution appears in the
  hero figure caption and in the site footer.
- **Tables and timeline** — original to this edition.
- **Sponsorship QR code** — the author's own QR image, carried over from the Chinese edition.

All external source links are preserved from the original edition (Museum of London, Historic
Royal Palaces, UK Parliament, Royal Museums Greenwich, Bank of England, Historic England,
London Transport Museum).
