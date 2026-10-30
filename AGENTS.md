<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Personal website project guide

Abhiroop Mukherjee's personal website and growing archive of projects, tools, experiments, and academic work, including work absent from the CV.

- Repository: https://github.com/Abhiroop25902/personal-website
- Public site: https://abhiroop.dev
- Read dependency versions and scripts from `package.json`; do not assume framework behavior from older Next.js versions.

## Architecture and content

- `app/page.tsx` composes `ProfileHeader`, `FeaturedProjects`, the archive link, and the gaming-channel note.
- `app/projects/page.tsx` renders the full archive through `ProjectTimeline`.
- `app/data/projects.ts` is the shared source of project content. Maintain its array manually in newest-first order; `featured` selects homepage entries.
- Keep display dates explicit. `href` and `dateTime` are optional: entries without destinations use plain headings, and date ranges use plain text rather than invalid `<time>` values.
- Use the main project website as `href` when one is supplied, otherwise its repository. Put additional source repositories and resources in labeled `supportingLinks`.
- Preserve list semantics, descriptive accessible link names, supplied URLs, and same-tab external navigation. Use Next.js `Link` for internal routes.
- Keep pages and content components as Server Components. `TimelineReveal` is the small Client Component accepting server-rendered timeline children; project data stays outside its client module graph.

## Design and motion

- Reuse the existing layout, Geist fonts, Tailwind theme tokens, and installed React Icons. Keep visual changes within the requested scope.
- Shared styles and keyframes live in `app/globals.css`.
- Timeline entries reveal once per entry per visit to `/projects`, including initially visible entries. Returning to a cached route starts a new visit.
- The observer's `seen` set is intentionally local to its effect. With `cacheComponents`, Next.js preserves routes but cleans up and recreates effects as routes become hidden or visible.
- Preserve observer/listener cleanup and the guard against callbacks after cleanup. Supporting-link list items are not separate reveal targets.
- Respect reduced motion, reveal focused entries immediately, retain visible keyboard focus, and keep content readable without JavaScript or IntersectionObserver support.
- Keep decorative movement separate from clickable areas; preserve existing icon and navigation target sizes.

## Development and verification

- Preserve the user's existing changes, including staged changes. Do not overwrite or reset unrelated work.
- The user normally runs `npm run dev` in WebStorm. Check the existing preview at http://localhost:3000 before starting another server, and preserve the user-managed service.
- Prefer small changes using current components and installed dependencies; avoid extra abstractions or a new test framework for routine edits.
- For TypeScript/component changes, run `npx tsc --noEmit`, scoped ESLint (`npx eslint <changed-files>`), and `git diff --check`.
- For UI changes, check relevant mobile/desktop layouts, wrapping, keyboard access, destinations, and console errors in the existing preview.
- For timeline motion changes, check fresh loading, home/archive round trips, a reload partway down the archive, one reveal per visit, focus handling, reduced motion, and static fallback. Use a small assert-based self-check for nontrivial observer logic.
- Next.js can retain hidden route DOM through Activity. Scope browser assertions to the visible page rather than counting every `main` element or project heading in the document.
- Run `npm run build` when requested or appropriate for the change. If the environment blocks it, report the actual failure; do not assume earlier sandbox/port restrictions are permanent or claim a successful build from other checks.
- Documentation-only edits need a content/path review and `git diff --check`, not an application build.

## Hosting and durable context

- Hosting uses Firebase App Hosting for the public domain above. Inspect `firebase.json`, `.firebaserc`, `apphosting.yaml`, and `next.config.ts` for the current project, backend, runtime, and rendering configuration before hosting work.
- Deployment is user-controlled. Deploy, push, or configure deployment automation only when requested.
- Recall project namespace: `personal-website`.
- Keep detailed architecture and workflow in this file. Recall should hold concise durable project pointers or decisions, not temporary screenshots, test results, staged-file status, local IPs, or DNS verification records.
- Treat recalled context as supporting evidence; current code and explicit user instructions take precedence.
