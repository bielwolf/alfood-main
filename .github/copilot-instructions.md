# Copilot / AI Agent Instructions — Alfood

This file contains short, actionable guidance for AI coding agents working on the Alfood React + TypeScript app.

1) Project summary
- Create React App (react-scripts v5) + TypeScript. Entry: `src/index.tsx` → `src/App.tsx`.
- Routing: defined in `src/App.tsx` (routes: `/` → `src/paginas/Home`, `/restaurantes` → `src/paginas/VitrineRestaurantes`).

2) Key folders and patterns
- `src/componentes/`: UI components. Each component lives in its own folder and exports a default component from `index.tsx`.
- `src/paginas/`: top-level page compositions (use these as route targets).
- `src/interfaces/`: TypeScript interfaces (e.g. `IPrato.ts`, `IRestaurante.ts`) — components use these as props types.
- `public/imagens/`: static images referenced from pages (via `/imagens/…`).
- Styles: SASS + CSS Modules. Style files use the `.module.scss` suffix (example: `Banner.module.scss`) and are imported as `import estilos from './X.module.scss'`.

3) Conventions to follow (observable rules)
- Components are functional, default-exported and placed in `index.tsx` inside the component folder.
- Props interfaces use `interface XxxProps { ... }` and are used inline: `const Componente = ({ prop }: XxxProps) => {}`.
- Data models are exported as default from `src/interfaces/*` and referenced by components (e.g. `import IRestaurante from '../../interfaces/IRestaurante'`).
- Static data currently lives in `src/componentes/ListaRestaurantes/index.tsx` — replacing it with API calls should preserve the same shapes defined in `IPrato` / `IRestaurante`.

4) Build / run / test (developer workflow)
- Install: `npm install`
- Start dev server: `npm start` (uses `react-scripts start`, opens on port 3000 by default)
- Build production: `npm run build`
- Tests: `npm test` (react-scripts test)
- Note: `sass` is a devDependency; CSS Modules require `.module.scss` naming.

5) Integration points & future changes
- API calls are not yet implemented — README mentions `axios` but `axios` is not present in `package.json`. If adding network integration, install `axios` and add async data fetching in the page or a service module (e.g. `src/services/restauranteService.ts`).
- When implementing API integration, fetch data in the page (or custom hook) and pass shaped data to `ListaRestaurantes`/`Restaurante` components — they expect `IRestaurante` with `pratos: IPrato[]`.

6) Examples from codebase (for quick orientation)
- Route setup: `src/App.tsx`.
- Page composition: `src/paginas/VitrineRestaurantes/index.tsx` imports `NavBar`, `Banner`, `ListaRestaurantes`, `Rodape`.
- Component props pattern: `src/componentes/ListaRestaurantes/Restaurante/index.tsx` maps `restaurante.pratos?.map(item => <Prato prato={item} key={item.id} />)`.

7) Editor / tooling tips
- `typescript-plugin-css-modules` is listed as a dev dependency — enabling that plugin in the editor improves type-safety for CSS module class names.
- Keep TypeScript `tsconfig.json` rules; prefer adding new types in `src/interfaces`.

8) Merge guidance
- If this repository already has a `.github/copilot-instructions.md`, merge by keeping unique, repo-specific sections above (architecture, commands, examples). Remove generic or duplicate guidance.

If anything is missing or you'd like this in Portuguese, tell me which sections to expand or edit.
