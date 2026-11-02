# ucrekkids-hugo
Hugo code for unit circle rekkids site

I decided to try Hugo to generate the unit circle rekkids site. This code works, but it is a bit out of step with the current version of Hugo so it might not by the best example code.

## Adding a release

1. **Release page:** copy a recent file in `content/releases/` to `content/releases/tUCxxx.md` (next catalog number) and update every field:
   - `catalogid`, `date`, and `releaseyear` (easy to leave stale when copying)
   - `releasename`: the display name of the album. It's shown on the page and used as the share title, so it's not a slug.
   - `title`, `[menu.releases]` name and identifier, `tracklist`, store and stream links, and the description below the front matter
2. **Cover art:** add four JPEGs to `static/img/`, generated from a square source image of at least 800px:
   | File | Size |
   |---|---|
   | `tUCxxx-large.jpg` | 400×400 |
   | `tUCxxx-large@2X.jpg` | 800×800 |
   | `tUCxxx-small.jpg` | 150×150 |
   | `tUCxxx-small@2X.jpg` | 300×300 |

   On macOS: `sips -s format jpeg -z 400 400 source.jpg --out static/img/tUCxxx-large.jpg` (repeat for each size).
3. **Artist page:** add an `[[albums]]` entry (name and catalogid) to the artist's file in `content/artists/`. It's not picked up automatically.
4. **Related releases:** add `[[relatedreleases]]` entries to the new release, and add one pointing back to it in each of the earlier releases it relates to.
5. Preview, build and deploy as described below.

## Preview locally

```
hugo server
```

Then open http://localhost:1313/rekkids/ (the `/rekkids/` path is required because of the `baseurl`). The page reloads as you edit.

**Never upload `public/` after running the dev server.** It can leave pages in `public/` that link to `localhost:1313` and include the live-reload script, which breaks the live site.

## Build for production

```
hugo --cleanDestinationDir
```

This regenerates `public/` from scratch with the production `baseurl`. To confirm no dev-server output slipped in, this should print nothing:

```
grep -rl "localhost:1313" public
```

## Deploy

FTP the contents of `public/` to the server's `rekkids` directory. Upload the whole folder rather than just the files you think changed: adding a release changes the home page, the releases list, the artist page, related release pages, `index.xml` and `sitemap.xml`.

Afterwards, check https://unitcircle.com/rekkids/ and the new release's page.
