# Understanding Germany

- English GitHub Pages: https://alphyoung.github.io/understanding/germany/
- English GitBook source: `markdown/`
- Chinese GitBook source: `chinese/markdown/`
- Shared GitBook site configuration: `../gitbook-docs.yaml`

The English edition follows the Chinese chapter structure and preserves its tables, image credits and source links. English GitBook content is configured under `understanding-germany`; the existing Chinese `germany` route is retained.

## Rebuild the English website

With Node.js 20 or later, run from this directory:

```sh
npm ci
npm run build
npm run check
```

Edit English chapters in `markdown/`, then rebuild and commit the generated HTML and CSS together with the sources. `SUMMARY.md` determines navigation and chapter order. The build converts GitBook hints and steps into static HTML and uses the Europe website's stylesheet.

The check verifies generated files, local links, English content, chapter coverage, and configured GitBook directories. Publishing uses the repository's existing `main` branch integrations.
