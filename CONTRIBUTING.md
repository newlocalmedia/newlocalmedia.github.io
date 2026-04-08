# Contributing

Thanks for helping improve the New Local Media project showcase.

## Before you start

- Check for an existing issue or open one first for substantial changes.
- Keep changes focused and easy to review.
- If you update generated outputs, include the source change that produced them.

## Local setup

```bash
npm install
npm run check
python3 -m http.server 8000
```

Open <http://localhost:8000> to review the site locally.

## Project workflow

### Site and content changes

- Edit source files such as `/index.html`, `/scripts/*.mjs`, or supporting assets.
- Rebuild generated files with:

```bash
npm run build
```

### Validation

Before submitting a pull request, run:

```bash
npm run check
```

This validates:

- generated project pages
- sitemap updates
- HTML structure
- required site metadata and assets

## Pull request expectations

Please include:

- a short summary of the change
- screenshots for visible UI changes when helpful
- any related issue references
- notes about generated files if they changed

## Writing and style

- Keep copy concise and plain-language.
- Preserve the site’s existing tone: direct, editorial, and technical.
- Prefer accessible, semantic HTML and low-complexity CSS/JS changes.

## Security

Please do **not** report security issues in public issues or pull requests.

See [SECURITY.md](SECURITY.md) for the correct reporting process.
