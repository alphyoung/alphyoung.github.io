# Understanding Germany

- English GitHub Pages: https://alphyoung.github.io/understanding/germany/
- English Markdown source: `markdown/`
- Chinese Markdown source: `chinese/markdown/`

The English edition follows the Chinese chapter structure and preserves its tables, image credits and source links.

## Rebuild the English website

With Node.js 20 or later, run from this directory:

```sh
npm ci
npm run build
npm run check
```

Edit English chapters in `markdown/`, then rebuild and commit the generated HTML and CSS together with the sources. `SUMMARY.md` determines navigation and chapter order. The build converts hint and stepper blocks into static HTML and uses the Europe website's stylesheet.

The check verifies generated files, local links, English content, chapter coverage, and configured content directories. Publishing uses the repository's existing `main` branch integrations.
