# Connectivity Diagram Builder

A GitHub-ready React/Vite starter app for building customer connectivity diagrams.

## What it includes

- React Flow canvas
- Customer / Internet / NiCE layout zones
- Custom diagram nodes
- Labeled SIP/TLS connections
- Example customer topology: one customer site connecting to Dallas and Los Angeles over open internet
- Export canvas to PNG

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal.

## Build for GitHub Pages or another static host

```bash
npm run build
```

The production site is generated in the `dist/` folder.

## Recommended hosting

For private source code with hosted website access control:

- Keep the GitHub repository private.
- Deploy to Cloudflare Pages, Netlify, or Vercel.
- Add Cloudflare Access, Netlify password protection, or SSO in front of the site.

## Notes

This is a starter framework. It is intentionally simple so you can customize icons, templates, node properties, and export logic.
