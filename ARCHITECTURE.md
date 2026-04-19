# NEPACALC — Institutional Engineering Document

This document serves as the official blueprint and maintenance protocol for the NEPACALC platform. It is designed for institutional durability and security.

## 1. System Architecture (Static-Export Optimized)

The platform is engineered as a **Purely Static Web Application** to ensure maximum performance, security, and compatibility with standard cPanel/Apache shared hosting.

- **Frontend**: Next.js 14 (App Router)
- **Deployment Strategy**: `output: export` (Static HTML/JS/CSS)
- **Hosting Environment**: Apache/cPanel (nepacalc.com)
- **Database (REST)**: Firestore (Dynamic content fetched at build-time)
- **Mathematical Engine**: custom-engineered TypeScript modules and `mathjs`

## 2. Security & "Hide All" Protocol

To fulfill institutional security requirements, the following components are **explicitly excluded** from the production build at `nepacalc.com`:

1. **Admin Dashboard**: Moved to `src/admin-dashboard`. It is accessible ONLY during local development (`npm run dev`). No login pages or administrative endpoints exist on the public domain.
2. **API Layer**: Dynamic API routes (Node.js) are isolated from the static export to prevent exposure of endpoint signatures.
3. **Middleware**: Decommissioned to prevent Edge Runtime overhead and satisfy static environment constraints.
4. **Source Integrity**: `.git`, `.env`, and `node_modules` are strictly ignored via `.ftpignore`.

## 3. Institutional Maintenance Protocols

### A. Updating Content (Blog & Guides)
Since the site is static, new blog posts require a "re-build" to appear on the live site:
1. Run the site locally: `npm run dev`.
2. Access the dashboard at `http://localhost:3000/admin`.
3. Draft and publish your post to Firestore.
4. Push your changes to the GitHub `main` branch.
5. GitHub Actions will rebuild the site and push the new static HTML to cPanel.

### B. CI/CD Deployment Pipeline
The automated deployment is handled via **GitHub Actions** (`.github/workflows/deploy.yml`):
- **Triggers**: On every `push` to the `main` branch.
- **Process**: `npm install` -> `npm run build` -> `FTP Sync` to cPanel.
- **Security**: FTP credentials are encrypted within GitHub Repository Secrets.

## 4. Technical Specifications

| Feature | Specification |
|---------|---------------|
| Canonical Domain | `https://nepacalc.com` |
| Image Optimization | Disabled (Static Export Requirement) |
| Routing | `.htaccess` handled Client-Side Routing |
| SEO | JSON-LD (Article, Breadcrumb, FAQ, Organization) |
| Performance | 100/100 Lighthouse Potential (Static delivery) |

## 5. Directory Mapping

- `/src/app`: Public Static Routes
- `/src/admin-dashboard`: Isolated Administrative Code (Local only)
- `/src/api-routes`: Isolated Dynamic Logic
- `/public`: Static Assets & `.htaccess`
- `/.github/workflows`: Deployment Logic

---
*Created by Antigravity for NEPACALC Production Release (April 2026).*
