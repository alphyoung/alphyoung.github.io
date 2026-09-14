# Europe: one source, two publications

Edit `understanding/europe/markdown/*.md` and its `SUMMARY.md` to update the English Europe reader. These are the authoritative chapter sources. Do not edit generated chapter HTML for content changes.

GitBook setup for the existing **Understanding Europe** space:

- Repository: `alphyoung/alphyoung.github.io`
- Branch: `main`
- Project directory: `understanding/europe/markdown`
- First sync direction: **GitHub → GitBook** (the nine source chapters were compared with the existing published content).

The directory contains `.gitbook.yaml`, a first-page mapping and `SUMMARY.md`. Keep other books outside this sync scope. Once connected, GitBook edits can export Markdown commits to the same directory; repository edits import into GitBook.

GitHub Pages uses `.github/workflows/pages.yml` (Source: GitHub Actions). Each main-branch push runs the Europe renderer, preserves London's static files and old redirects, and deploys `_site`. The repository's existing Europe HTML files remain layout templates/fallback snapshots; they are not automatically rewritten by the workflow.

Local build from the repository root:

```sh
npm ci --prefix tools/europe
node tools/europe/build.mjs
```

Preview `_site/`. Never commit `node_modules/` or `_site/`.

Supported GitBook content: standard Markdown, tables, HTML details and info/warning hints. Other GitBook custom blocks intentionally stop the build so content is not silently lost; extend the renderer before using them. Keep source filenames stable to preserve existing page URLs. For new pages, add them to SUMMARY.md and verify links before publication.

GitBook connection is a separate first-time UI setup. Source preparation and a successful Pages build alone do not mean Git Sync has been connected.
