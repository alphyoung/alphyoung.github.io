# Understanding Series — site maintenance

Repository: https://github.com/alphyoung/alphyoung.github.io

| Book | Published address | Maintained directory |
| --- | --- | --- |
| Europe | https://alphyoung.github.io/understanding/europe/ | understanding/europe/ |
| London | https://alphyoung.github.io/understanding/london/ | understanding/london/ |

Both books are static HTML published together by GitHub Pages from the main branch and repository root. Europe also keeps its authoritative Markdown in `understanding/europe/markdown/` for GitBook Git Sync. No separate Pages setup is needed for London. Preserve the root `.nojekyll` file.

Europe contains nine chapters plus an index alias. Edit Europe content in `understanding/europe/markdown/`, then update the published HTML; see `tools/europe/README.md`. London contains a home page, eight chapters, an appendix and a standalone 404 page. London's local images, stylesheet and progress script are under assets/; its Markdown edition is under markdown/.

## Update procedure

1. Read the current main branch before editing. Online changes by the author take precedence over older local exports.
2. Edit only the requested book's maintained directory. Keep English text, sources, image credits and sponsorship information intact unless an edit is requested.
3. For London text edits, update the corresponding HTML and Markdown editions together. HTML is the published reader; Markdown is a separately maintained edition, not an automatic build input. Keep all ten chapter-menu links and previous/next links consistent.
4. Use relative links for chapters and assets. London's canonical and og:url metadata use the published address above; update them if a page moves.
5. Check local targets and anchors with node scripts/check-understanding.cjs from a repository checkout. Check rendered desktop/mobile pages when layout changes, then verify published pages and assets after deployment.
6. Publish a normal commit on main without overwriting concurrent changes. Preserve old Europe redirect pages at /europe/ and the repository root; they are compatibility links, not content sources.

London's nested 404.html is only an ordinary page at that address. GitHub Pages selects custom error pages from the publishing root; do not assume the nested file handles missing URLs automatically.

Local working copy for this task: understanding-managed/. Older europe-export/ and london-site/ directories are not the current published source.
