# Possible migration off Hugo

*Notes from November 2026. Not started — for consideration later.*

## Why consider it

Hugo was chosen to try Go, but Hugo templates aren't Go code, so that reason doesn't really hold. Moving to a Python or Node generator would put the site on a stack I already know and can debug.

Frictions hit while adding the Answers to April album (tUC104):

- The dev server's output ended up in `public/`, with links to `localhost:1313` and the live-reload script. Uploading it broke the live site.
- Artist pages need a hand-maintained `[[albums]]` list.

Both could also be fixed within Hugo: always build with `hugo --cleanDestinationDir`, and generate album lists from `artistdirectory`. Staying on Hugo is a legitimate option.

## Size of the job

Small, about a weekend, mostly rewriting templates.

- About 475 lines of templates in `themes/ucrekkids/layouts/`:
  - home page (`index.html`)
  - `releases/single.html` and `artists/single.html`
  - two section lists (`section/releases.html` and `section/artists.html`)
  - five shared partials (head, header, footer)
- About 45 Markdown content files with TOML (`+++`) front matter, plus static assets in `static/`.
- `index.xml` (RSS) and `sitemap.xml`.
- The Hugo-specific parts are mostly links built from `.Site.BaseURL` and a few `where` lookups over the releases and artists sections.

## Recommendation: Eleventy (Node)

- **It reads the content files as-is.** It can parse TOML front matter with a small config change.
- **The templates convert almost line for line.** Nunjucks templates are Jinja-style, so `{{ range .Params.storelinks }}` becomes `{% for link in storelinks %}`.
- **It can generate the artist album lists** from release front matter, so they no longer need maintaining by hand.
- **It has no separate production mode.** `npx @11ty/eleventy` always writes a production build, and the dev server serves from memory.

**Python alternative:** a small custom script, about 150 lines, using Jinja2, python-frontmatter and markdown. It's easy to understand after a long break, but needs its own dev server and file watching. I'd avoid Pelican: it expects a blog structure, and this site is a catalog.

## Process

1. **Capture the current output as a baseline:** run `hugo --cleanDestinationDir` and copy `public/` somewhere else.
2. **Set up Eleventy** to read `content/` and copy `static/` straight through, with the base path set to `/rekkids/`.
3. **Make releases and artists into collections**, sorted as now: releases newest first, artists by title.
4. **Port the templates**, starting with the partials. Then do the release and artist pages, the two section lists and the home page.
5. **Keep the URLs the same** (`/rekkids/releases/tUCxxx/`, `/rekkids/artists/Name/`) so existing links and search results don't break.
6. **Recreate `index.xml` and `sitemap.xml`** with the RSS plugin or a small template.
7. **Compare the new build against the baseline** page by page and fix the differences.
8. **Switch over:** update the README and deploy the same way, by uploading the whole output folder over FTP.

Do it on a branch, so Hugo keeps working until the new build matches.
