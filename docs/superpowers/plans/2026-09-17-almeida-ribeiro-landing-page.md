# Almeida Ribeiro landing page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, OAB-conscious landing page for Almeida Ribeiro Advogados Associados that helps visitors find an area of practice, choose an attorney, and open the correct WhatsApp conversation.

**Architecture:** A Vite + React + TypeScript single page renders its content from one typed data module. The practice explorer owns only audience and area selection; the contact chooser owns attorney selection and uses a pure URL builder to keep WhatsApp behavior testable. No backend, form, database, chatbot, or analytics dependency is required.

**Tech Stack:** React 19, TypeScript, Vite, CSS modules by section plus global design tokens, Lucide React, Vitest, Testing Library, jsdom.

---

## Content condition before public launch

The current source confirms all top-level practice areas and three Civil services: Divórcio, Guarda and Usucapião. The office must approve the remaining services and short descriptions before the site is published. Until a category has approved services, the interface must show its category name and the neutral “Outro assunto” contact route. Do not invent legal services, descriptions, credentials, outcomes, testimonials, prices, or claims.

## File structure

| File | Responsibility |
| --- | --- |
| `package.json` | Scripts and dependencies. |
| `vite.config.ts` | Vite and Vitest configuration. |
| `src/data/site.ts` | Typed institutional data, contacts, areas and approved services. |
| `src/lib/whatsapp.ts` | Pure WhatsApp message and URL construction. |
| `src/lib/whatsapp.test.ts` | URL encoding and topic-context coverage. |
| `src/components/Header.tsx` | Responsive internal navigation and main contact trigger. |
| `src/components/Hero.tsx` | Institutional opening with photo-safe media frame. |
| `src/components/PracticeExplorer.tsx` | Audience switcher, area selection, service panel and other-subject route. |
| `src/components/PracticeExplorer.test.tsx` | Keyboard and pointer behavior for the explorer. |
| `src/components/ContactChooser.tsx` | Accessible dialog that lets the visitor choose Ana Paula or Deyvison. |
| `src/components/ContactChooser.test.tsx` | Dialog focus, close behavior and attorney WhatsApp links. |
| `src/components/AttorneyProfiles.tsx` | Balanced attorney profiles, OAB and photo-safe frames. |
| `src/components/HowItWorks.tsx` | Informative four-step service flow. |
| `src/components/Faq.tsx` | Native-button FAQ disclosure pattern. |
| `src/components/ContactSection.tsx` | Address, hours, map, email, Instagram and attorney cards. |
| `src/components/Footer.tsx` | Institutional footer and internal links. |
| `src/App.tsx` | Section composition and contact-dialog state boundary. |
| `src/App.test.tsx` | Whole-page smoke and critical route coverage. |
| `src/styles/tokens.css` | Semantic palette, type, spacing, layering and motion tokens. |
| `src/styles/global.css` | Reset, base typography, focus, skip-link and reduced-motion rules. |
| `src/styles/landing.css` | Page layout, responsive composition and component states. |
| `src/test/setup.ts` | Testing Library matchers and browser API stubs. |
| `public/images/.gitkeep` | Destination for approved logo and photographic assets. |
| `README.md` | Local setup, asset requirements and content-update procedure. |

### Task 1: Initialize the isolated React project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`
- Create: `public/images/.gitkeep`

- [ ] **Step 1: Scaffold the React TypeScript project in the approved empty directory**

Run:

```bash
npm create vite@latest . -- --template react-ts
npm install lucide-react
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: Vite creates `src/`, `public/`, TypeScript configuration and a `package.json`.

- [ ] **Step 2: Configure tests before adding page components**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Add the `test` script to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 3: Write the first failing application test**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the institutional heading and primary contact action', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /advocacia para pessoas e empresas/i,
    }),
  ).toBeVisible();
  expect(screen.getByRole('button', { name: /entrar em contato/i })).toBeVisible();
});
```

- [ ] **Step 4: Run the test and confirm the expected initial failure**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because `src/App.tsx` has not been implemented with the required heading and button.

- [ ] **Step 5: Create the minimal application shell**

Create `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/global.css';
import './styles/landing.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main id="main-content">
      <h1>Advocacia para pessoas e empresas.</h1>
      <button type="button">Entrar em contato</button>
    </main>
  );
}
```

- [ ] **Step 6: Run the test and build**

Run:

```bash
npm test -- src/App.test.tsx
npm run build
```

Expected: PASS, followed by a Vite production build in `dist/`.

- [ ] **Step 7: Commit the project foundation**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json src public/images/.gitkeep
git commit -m "chore: initialize Almeida Ribeiro landing page"
```

### Task 2: Add typed institutional content and WhatsApp URL construction

**Files:**
- Create: `src/data/site.ts`
- Create: `src/lib/whatsapp.ts`
- Create: `src/lib/whatsapp.test.ts`

- [ ] **Step 1: Write failing URL-builder tests**

Create `src/lib/whatsapp.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  it('keeps the selected practice area and service in the message', () => {
    expect(buildWhatsAppUrl('5588996575592', { area: 'Direito Civil', service: 'Divórcio' })).toBe(
      'https://wa.me/5588996575592?text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20em%20contato%20sobre%20Direito%20Civil%3A%20Div%C3%B3rcio.',
    );
  });

  it('keeps an area-only contact message when no approved service is listed', () => {
    expect(buildWhatsAppUrl('5585996274319', { area: 'Direito Agrário' })).toBe(
      'https://wa.me/5585996274319?text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20em%20contato%20sobre%20Direito%20Agr%C3%A1rio.',
    );
  });

  it('uses the neutral other-subject message only for the other-subject route', () => {
    expect(buildWhatsAppUrl('5585996274319', { otherSubject: true })).toBe(
      'https://wa.me/5585996274319?text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20em%20contato%20sobre%20um%20assunto%20n%C3%A3o%20listado%20no%20site.',
    );
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/lib/whatsapp.test.ts`

Expected: FAIL because `src/lib/whatsapp.ts` does not exist.

- [ ] **Step 3: Define the content contract and current approved data**

Create `src/data/site.ts`:

```ts
export type Audience = 'individual' | 'business';

export type Attorney = {
  id: 'ana-paula' | 'deyvison';
  name: string;
  oab: string;
  phone: string;
  bio: string;
  image?: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
};

export type PracticeArea = {
  id: string;
  name: string;
  audience: Audience;
  services: Service[];
};

export type Office = {
  name: string;
  address: string;
  hours: string;
  email: string;
  instagram: string;
  heroImage?: string;
};

export const attorneys: Attorney[] = [
  {
    id: 'ana-paula',
    name: 'Ana Paula Almeida',
    oab: 'OAB/CE 57.336',
    phone: '5588996575592',
    bio: 'Advogada e consultora empresarial, com atuação para pessoas físicas e jurídicas nos setores público e privado.',
  },
  {
    id: 'deyvison',
    name: 'Deyvison Ribeiro',
    oab: 'OAB/CE 20.651',
    phone: '5585996274319',
    bio: 'Advogado e consultor empresarial, com atuação no setor público e privado e em Direito Processual.',
  },
];

export const practiceAreas: PracticeArea[] = [
  {
    id: 'previdenciario',
    name: 'Direito Previdenciário',
    audience: 'individual',
    services: [],
  },
  {
    id: 'civil-pessoa',
    name: 'Direito Civil',
    audience: 'individual',
    services: [
      { id: 'divorcio', name: 'Divórcio', description: 'Orientação jurídica para questões relacionadas ao divórcio.' },
      { id: 'guarda', name: 'Guarda', description: 'Orientação jurídica para questões relacionadas à guarda.' },
      { id: 'usucapiao', name: 'Usucapião', description: 'Orientação jurídica para questões relacionadas à usucapião.' },
    ],
  },
  { id: 'consumidor-pessoa', name: 'Direito do Consumidor', audience: 'individual', services: [] },
  { id: 'digital-pessoa', name: 'Direito Digital', audience: 'individual', services: [] },
  { id: 'saude', name: 'Direito da Saúde', audience: 'individual', services: [] },
  { id: 'empresarial', name: 'Direito Empresarial', audience: 'business', services: [] },
  { id: 'agrario', name: 'Direito Agrário', audience: 'business', services: [] },
  { id: 'trabalho', name: 'Direito do Trabalho', audience: 'business', services: [] },
  { id: 'civil-empresa', name: 'Direito Civil', audience: 'business', services: [] },
  { id: 'digital-empresa', name: 'Direito Digital', audience: 'business', services: [] },
  { id: 'consultoria', name: 'Consultoria Jurídica', audience: 'business', services: [] },
  { id: 'consumidor-empresa', name: 'Direito do Consumidor', audience: 'business', services: [] },
];

export const office: Office = {
  name: 'Almeida Ribeiro Advogados Associados',
  address: 'R. Coronel Antônio Joaquim, 1881, sala 107, Centro, Limoeiro do Norte, CE, 62930-000',
  hours: '8h às 11h e 14h às 17h',
  email: 'almeidaribeiro.socadv@gmail.com',
  instagram: 'https://instagram.com/almeidaribeiro_adv',
};
```

- [ ] **Step 4: Implement the URL builder**

Create `src/lib/whatsapp.ts`:

```ts
export type WhatsAppTopic = {
  area?: string;
  service?: string;
  otherSubject?: boolean;
};

export function buildWhatsAppUrl(phone: string, topic?: WhatsAppTopic) {
  const message =
    topic?.otherSubject
      ? 'Olá, gostaria de entrar em contato sobre um assunto não listado no site.'
      : topic?.area && topic.service
        ? `Olá, gostaria de entrar em contato sobre ${topic.area}: ${topic.service}.`
        : topic?.area
          ? `Olá, gostaria de entrar em contato sobre ${topic.area}.`
          : 'Olá, gostaria de entrar em contato com o escritório.';

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 5: Run the focused test**

Run: `npm test -- src/lib/whatsapp.test.ts`

Expected: PASS with two passing assertions.

- [ ] **Step 6: Commit the content contract**

```bash
git add src/data/site.ts src/lib/whatsapp.ts src/lib/whatsapp.test.ts
git commit -m "feat: add office content and WhatsApp routing"
```

### Task 3: Establish the visual system and accessible global behavior

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/landing.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create semantic design tokens**

Create `src/styles/tokens.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wdth,wght@75..100,400..700&family=Source+Serif+4:opsz,wght@8..60,500..700&display=swap');

:root {
  --color-ink: #3d2c25;
  --color-ink-muted: #6d5d54;
  --color-cream: #f6f0e6;
  --color-sand: #e8dccd;
  --color-paper: #fffdf9;
  --color-gold: #9b7546;
  --color-line: #d5c5b4;
  --font-display: 'Source Serif 4', Georgia, serif;
  --font-body: 'Instrument Sans', sans-serif;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 5rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --shadow-sheet: 0 1.5rem 4rem rgb(61 44 37 / 0.22);
  --motion-fast: 160ms ease-out;
  --motion-base: 240ms ease-out;
}
```

- [ ] **Step 2: Create global reset, skip link, focus and reduced-motion rules**

Create `src/styles/global.css`:

```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--color-cream); color: var(--color-ink); font-family: var(--font-body); font-size: 1rem; line-height: 1.6; }
button, a { font: inherit; }
a { color: inherit; }
:focus-visible { outline: 3px solid var(--color-gold); outline-offset: 3px; }
.skip-link { left: var(--space-2); position: fixed; top: -4rem; z-index: 100; background: var(--color-ink); color: var(--color-paper); padding: var(--space-1) var(--space-2); }
.skip-link:focus { top: var(--space-2); }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; scroll-behavior: auto !important; transition-duration: 1ms !important; }
}
```

- [ ] **Step 3: Add the landing layout baseline**

Create `src/styles/landing.css`:

```css
.page-shell { overflow: clip; }
.section { margin-inline: auto; max-width: 75rem; padding: var(--space-6) var(--space-3); }
.eyebrow { color: var(--color-gold); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.section-title { font-family: var(--font-display); font-size: clamp(2.25rem, 6vw, 4.75rem); font-weight: 600; letter-spacing: -0.035em; line-height: 0.98; max-width: 14ch; }
.button-primary, .button-secondary { align-items: center; display: inline-flex; justify-content: center; min-height: 2.75rem; padding: 0.75rem 1rem; text-decoration: none; transition: background-color var(--motion-fast), color var(--motion-fast), transform var(--motion-fast); }
.button-primary { background: var(--color-ink); border: 1px solid var(--color-ink); color: var(--color-paper); }
.button-secondary { background: transparent; border: 1px solid var(--color-line); color: var(--color-ink); }
.button-primary:hover, .button-secondary:hover { transform: translateY(-2px); }
@media (max-width: 47.99rem) {
  .section { padding: var(--space-5) var(--space-2); }
  .section-title { max-width: 17ch; }
}
```

- [ ] **Step 4: Run the test and build after importing styles**

Run:

```bash
npm test -- src/App.test.tsx
npm run build
```

Expected: PASS and a successful production build.

- [ ] **Step 5: Commit the design system**

```bash
git add src/styles src/main.tsx
git commit -m "feat: add landing page visual system"
```

### Task 4: Implement and test the attorney contact chooser

**Files:**
- Create: `src/components/ContactChooser.tsx`
- Create: `src/components/ContactChooser.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write an accessibility and URL behavior test**

Create `src/components/ContactChooser.test.tsx`:

```tsx
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactChooser } from './ContactChooser';

it('renders both attorneys and keeps the selected service in each WhatsApp link', async () => {
  const user = userEvent.setup();
  function Harness() {
    const [open, setOpen] = useState(true);
    return (
      <ContactChooser
        open={open}
        onClose={() => setOpen(false)}
        topic={{ area: 'Direito Civil', service: 'Divórcio' }}
      />
    );
  }

  render(<Harness />);

  expect(screen.getByRole('dialog', { name: /escolha com quem falar/i })).toBeVisible();
  expect(screen.getByRole('button', { name: /fechar/i })).toHaveFocus();
  expect(screen.getByRole('link', { name: /ana paula almeida/i })).toHaveAttribute('href', expect.stringContaining('Direito%20Civil'));
  expect(screen.getByRole('link', { name: /deyvison ribeiro/i })).toHaveAttribute('href', expect.stringContaining('Div%C3%B3rcio'));

  await user.click(screen.getByRole('button', { name: /fechar/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/components/ContactChooser.test.tsx`

Expected: FAIL because `ContactChooser` does not exist.

- [ ] **Step 3: Implement the dialog**

Create `src/components/ContactChooser.tsx`:

```tsx
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { attorneys } from '../data/site';
import { buildWhatsAppUrl, type WhatsAppTopic } from '../lib/whatsapp';

export type ContactTopic = WhatsAppTopic;

type ContactChooserProps = {
  open: boolean;
  onClose: () => void;
  topic?: ContactTopic;
};

export function ContactChooser({ open, onClose, topic }: ContactChooserProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (open && event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="contact-chooser-title"
        aria-modal="true"
        className="contact-chooser"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button aria-label="Fechar" className="dialog-close" onClick={onClose} ref={closeButtonRef} type="button">
          <X aria-hidden="true" size={20} />
        </button>
        <p className="eyebrow">Contato via WhatsApp</p>
        <h2 id="contact-chooser-title">Escolha com quem falar</h2>
        <div className="attorney-choice-list">
          {attorneys.map((attorney) => (
            <a
              className="attorney-choice"
              href={buildWhatsAppUrl(attorney.phone, topic)}
              key={attorney.id}
              rel="noreferrer"
              target="_blank"
            >
              <strong>{attorney.name}</strong>
              <span>{attorney.oab}</span>
              <span>{attorney.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Connect the App button to the chooser**

Replace `src/App.tsx` with:

```tsx
import { useState } from 'react';
import { ContactChooser, type ContactTopic } from './components/ContactChooser';

export default function App() {
  const [topic, setTopic] = useState<ContactTopic>();
  const [chooserOpen, setChooserOpen] = useState(false);

  const openContact = (nextTopic?: ContactTopic) => {
    setTopic(nextTopic);
    setChooserOpen(true);
  };

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <main id="main-content">
        <h1>Advocacia para pessoas e empresas.</h1>
        <button onClick={() => openContact()} type="button">Entrar em contato</button>
      </main>
      <ContactChooser onClose={() => setChooserOpen(false)} open={chooserOpen} topic={topic} />
    </div>
  );
}
```

- [ ] **Step 5: Add a restrained dialog treatment and mobile-safe attorney choices**

Append to `src/styles/landing.css`:

```css
.dialog-backdrop { align-items: center; background: rgb(61 44 37 / 0.52); display: grid; inset: 0; padding: var(--space-2); position: fixed; z-index: 50; }
.contact-chooser { background: var(--color-paper); box-shadow: var(--shadow-sheet); margin: auto; max-width: 38rem; padding: clamp(1.5rem, 4vw, 3rem); position: relative; width: min(100%, 38rem); }
.dialog-close { background: transparent; border: 0; color: var(--color-ink); padding: 0.4rem; position: absolute; right: var(--space-2); top: var(--space-2); }
.attorney-choice-list { display: grid; gap: 0.75rem; margin-top: var(--space-3); }
.attorney-choice { border: 1px solid var(--color-line); display: grid; gap: 0.2rem; padding: var(--space-2); text-decoration: none; }
.attorney-choice:hover { border-color: var(--color-gold); }
```

- [ ] **Step 6: Run focused tests**

Run:

```bash
npm test -- src/components/ContactChooser.test.tsx src/App.test.tsx
npm run build
```

Expected: PASS and a successful build.

- [ ] **Step 7: Commit the chooser**

```bash
git add src/App.tsx src/components/ContactChooser.tsx src/components/ContactChooser.test.tsx src/styles/landing.css
git commit -m "feat: add attorney WhatsApp chooser"
```

### Task 5: Build the low-friction practice explorer

**Files:**
- Create: `src/components/PracticeExplorer.tsx`
- Create: `src/components/PracticeExplorer.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the explorer behavior test**

Create `src/components/PracticeExplorer.test.tsx`:

```tsx
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PracticeExplorer } from './PracticeExplorer';

it('switches audience and sends the selected Civil service to contact', async () => {
  const user = userEvent.setup();
  const onContact = vi.fn();
  render(<PracticeExplorer onContact={onContact} />);

  await user.click(screen.getByRole('button', { name: /direito civil/i }));
  await user.click(screen.getByRole('button', { name: /divórcio/i }));
  expect(onContact).toHaveBeenCalledWith({ area: 'Direito Civil', service: 'Divórcio' });

  await user.click(screen.getByRole('tab', { name: /para sua empresa/i }));
  expect(screen.getByRole('button', { name: /direito empresarial/i })).toBeVisible();

  await user.click(screen.getByRole('button', { name: /outro assunto/i }));
  expect(onContact).toHaveBeenCalledWith({ otherSubject: true });
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/components/PracticeExplorer.test.tsx`

Expected: FAIL because `PracticeExplorer` does not exist.

- [ ] **Step 3: Implement progressive disclosure**

Create `src/components/PracticeExplorer.tsx`:

```tsx
import { useMemo, useState } from 'react';
import { practiceAreas, type Audience, type PracticeArea } from '../data/site';
import type { ContactTopic } from './ContactChooser';

type PracticeExplorerProps = {
  onContact: (topic?: ContactTopic) => void;
};

export function PracticeExplorer({ onContact }: PracticeExplorerProps) {
  const [audience, setAudience] = useState<Audience>('individual');
  const [activeAreaId, setActiveAreaId] = useState('previdenciario');
  const areas = useMemo(
    () => practiceAreas.filter((area) => area.audience === audience),
    [audience],
  );
  const activeArea: PracticeArea = areas.find((area) => area.id === activeAreaId) ?? areas.at(0)!;

  const changeAudience = (nextAudience: Audience) => {
    setAudience(nextAudience);
    setActiveAreaId(practiceAreas.find((area) => area.audience === nextAudience)!.id);
  };

  return (
    <section aria-labelledby="practice-title" className="section practice-explorer" id="areas">
      <p className="eyebrow">Áreas de atuação</p>
      <h2 className="section-title" id="practice-title">Encontre a orientação que você procura.</h2>
      <div aria-label="Público" className="audience-tabs" role="tablist">
        <button aria-selected={audience === 'individual'} onClick={() => changeAudience('individual')} role="tab" type="button">Para você</button>
        <button aria-selected={audience === 'business'} onClick={() => changeAudience('business')} role="tab" type="button">Para sua empresa</button>
      </div>
      <div className="practice-layout">
        <div aria-label="Áreas disponíveis" className="area-grid">
          {areas.map((area) => (
            <button
              aria-pressed={activeArea.id === area.id}
              className="area-card"
              key={area.id}
              onClick={() => setActiveAreaId(area.id)}
              type="button"
            >
              {area.name}
            </button>
          ))}
          <button className="area-card area-card--other" onClick={() => onContact({ otherSubject: true })} type="button">Outro assunto</button>
        </div>
        <aside aria-live="polite" className="service-panel">
          <p className="eyebrow">{activeArea.name}</p>
          {activeArea.services.length > 0 ? (
            activeArea.services.map((service) => (
              <button
                className="service-button"
                key={service.id}
                onClick={() => onContact({ area: activeArea.name, service: service.name })}
                type="button"
              >
                <strong>{service.name}</strong>
                <span>{service.description}</span>
              </button>
            ))
          ) : (
            <>
              <p>Entre em contato para falar sobre esta área.</p>
              <button className="button-primary" onClick={() => onContact({ area: activeArea.name })} type="button">Entrar em contato</button>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add the explorer to the App and connect it to the chooser**

Add this import to `src/App.tsx`:

```tsx
import { PracticeExplorer } from './components/PracticeExplorer';
```

Render it immediately after the opening content:

```tsx
<PracticeExplorer onContact={openContact} />
```

- [ ] **Step 5: Style the staged disclosure so only the active information competes for attention**

Append to `src/styles/landing.css`:

```css
.audience-tabs { display: flex; gap: var(--space-1); margin: var(--space-3) 0; }
.audience-tabs button { background: transparent; border: 1px solid var(--color-line); color: var(--color-ink); padding: 0.65rem 0.9rem; }
.audience-tabs button[aria-selected='true'] { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-paper); }
.practice-layout { display: grid; gap: var(--space-2); grid-template-columns: minmax(14rem, 0.85fr) minmax(0, 1.15fr); }
.area-grid { display: grid; gap: 0.5rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.area-card { background: var(--color-paper); border: 1px solid var(--color-line); color: var(--color-ink); min-height: 5rem; padding: var(--space-2); text-align: left; }
.area-card[aria-pressed='true'] { border-color: var(--color-gold); box-shadow: inset 0 -3px var(--color-gold); }
.area-card--other { background: transparent; border-style: dashed; }
.service-panel { align-content: start; display: grid; gap: 0.75rem; min-height: 19rem; }
.service-button { background: transparent; border: 0; border-bottom: 1px solid var(--color-line); color: var(--color-ink); display: grid; gap: 0.2rem; padding: 0.9rem 0; text-align: left; }
.service-button span { color: var(--color-ink-muted); font-size: 0.9rem; }
@media (max-width: 47.99rem) {
  .practice-layout { grid-template-columns: 1fr; }
}
```

- [ ] **Step 6: Run focused tests and build**

Run:

```bash
npm test -- src/components/PracticeExplorer.test.tsx src/components/ContactChooser.test.tsx
npm run build
```

Expected: PASS and a successful build.

- [ ] **Step 7: Commit the explorer**

```bash
git add src/App.tsx src/components/PracticeExplorer.tsx src/components/PracticeExplorer.test.tsx src/styles/landing.css
git commit -m "feat: add guided practice explorer"
```

### Task 6: Compose the institutional sections and responsive navigation

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/AttorneyProfiles.tsx`
- Create: `src/components/HowItWorks.tsx`
- Create: `src/components/Faq.tsx`
- Create: `src/components/ContactSection.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/landing.css`


- [ ] **Step 1: Replace the smoke test with whole-page structure coverage**

Replace `src/App.test.tsx` with:

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the institutional heading and primary contact action', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /advocacia para pessoas e empresas/i,
    }),
  ).toBeVisible();
  expect(
    screen.getAllByRole('button', { name: /entrar em contato/i }).length,
  ).toBeGreaterThan(0);
});

it('exposes the institutional sections and direct contact information', () => {
  render(<App />);

  expect(screen.getByRole('navigation', { name: /navegação principal/i })).toBeVisible();
  expect(screen.getByText(/áreas de atuação/i)).toBeVisible();
  expect(screen.getByRole('heading', { name: /ana paula almeida/i })).toBeVisible();
  expect(screen.getByRole('heading', { name: /deyvison ribeiro/i })).toBeVisible();
  expect(screen.getByRole('heading', { name: /como funciona o atendimento/i })).toBeVisible();
  expect(screen.getByRole('heading', { name: /dúvidas frequentes/i })).toBeVisible();
  expect(screen.getByText(/r\. coronel antônio joaquim/i)).toBeVisible();
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because the institutional sections are absent.

- [ ] **Step 3: Implement the section contracts**

Create `src/components/HowItWorks.tsx`:

```tsx
const steps = [
  'Escolha com quem falar.',
  'Explique brevemente o assunto.',
  'Encaminhe as informações solicitadas.',
  'Receba orientação sobre os próximos passos.',
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works-title" className="section" id="como-funciona">
      <p className="eyebrow">Como funciona</p>
      <h2 className="section-title" id="how-it-works-title">Como funciona o atendimento.</h2>
      <ol className="steps">
        {steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
      </ol>
    </section>
  );
}
```

Create `src/components/AttorneyProfiles.tsx`:

```tsx
import { attorneys } from '../data/site';

export function AttorneyProfiles({ onContact }: { onContact: () => void }) {
  return (
    <section aria-labelledby="attorneys-title" className="section" id="advogados">
      <p className="eyebrow">Advogados</p>
      <h2 className="section-title" id="attorneys-title">Quem atende você.</h2>
      <div className="attorney-grid">
        {attorneys.map((attorney) => (
          <article className="attorney-profile" key={attorney.id}>
            <div aria-hidden="true" className="portrait-frame" />
            <h3>{attorney.name}</h3>
            <p>{attorney.oab}</p>
            <p>{attorney.bio}</p>
            <button className="button-secondary" onClick={onContact} type="button">Entrar em contato</button>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/Faq.tsx`:

```tsx
const questions = [
  ['O atendimento é online?', 'Sim. O escritório atende online em todo o Brasil e presencialmente em Limoeiro do Norte.'],
  ['Posso escolher com quem falar?', 'Sim. A página apresenta Ana Paula Almeida e Deyvison Ribeiro como opções de contato.'],
  ['Preciso ir ao escritório?', 'Não necessariamente. A equipe orienta sobre a melhor forma de atendimento para cada situação.'],
];

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="section" id="duvidas">
      <p className="eyebrow">Dúvidas</p>
      <h2 className="section-title" id="faq-title">Dúvidas frequentes.</h2>
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/ContactSection.tsx`:

```tsx
import { attorneys, office } from '../data/site';
import { buildWhatsAppUrl } from '../lib/whatsapp';

export function ContactSection() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;
  return (
    <section aria-labelledby="contact-title" className="section" id="contato">
      <p className="eyebrow">Contato</p>
      <h2 className="section-title" id="contact-title">Fale com o escritório.</h2>
      <address>
        <a href={mapUrl} rel="noreferrer" target="_blank">{office.address}</a>
        <p>{office.hours}</p>
        <a href={`mailto:${office.email}`}>{office.email}</a>
        <a href={office.instagram} rel="noreferrer" target="_blank">@almeidaribeiro_adv</a>
      </address>
      <div className="contact-card-grid">
        {attorneys.map((attorney) => (
          <a
            href={buildWhatsAppUrl(attorney.phone)}
            key={attorney.id}
            rel="noreferrer"
            target="_blank"
          >
            <strong>{attorney.name}</strong>
            <span>{attorney.oab}</span>
            <span>{attorney.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement Header, Hero and Footer with neutral calls to action**

Create `src/components/Header.tsx`:

```tsx
const links = [
  ['Escritório', '#escritorio'],
  ['Áreas de atuação', '#areas'],
  ['Advogados', '#advogados'],
  ['Como funciona', '#como-funciona'],
  ['Contato', '#contato'],
];

export function Header({ onContact }: { onContact: () => void }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#main-content">Almeida Ribeiro</a>
      <nav aria-label="Navegação principal">
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <button className="button-primary" onClick={onContact} type="button">Entrar em contato</button>
    </header>
  );
}
```

Create `src/components/Hero.tsx`:

```tsx
export function Hero({ onContact }: { onContact: () => void }) {
  return (
    <section className="hero section" id="escritorio">
      <div>
        <p className="eyebrow">Limoeiro do Norte, Ceará · Atendimento em todo o Brasil</p>
        <h1>Advocacia para pessoas e empresas.</h1>
        <p>Atendimento presencial em Limoeiro do Norte e online em todo o Brasil.</p>
        <button className="button-primary" onClick={onContact} type="button">Entrar em contato</button>
      </div>
      <div aria-hidden="true" className="hero-photo-frame" />
    </section>
  );
}
```

Create `src/components/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer className="site-footer">
      <p>Almeida Ribeiro Advogados Associados</p>
      <p>Ana Paula Almeida · OAB/CE 57.336</p>
      <p>Deyvison Ribeiro · OAB/CE 20.651</p>
    </footer>
  );
}
```

- [ ] **Step 5: Compose all sections in App**

Replace the `main` section in `src/App.tsx` with:

```tsx
<Header onContact={() => openContact()} />
<main id="main-content">
  <Hero onContact={() => openContact()} />
  <PracticeExplorer onContact={openContact} />
  <AttorneyProfiles onContact={() => openContact()} />
  <HowItWorks />
  <Faq />
  <ContactSection />
</main>
<Footer />
```

Add the imports:

```tsx
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AttorneyProfiles } from './components/AttorneyProfiles';
import { HowItWorks } from './components/HowItWorks';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
```

- [ ] **Step 6: Add mobile-first styles for the composition**

Append to `src/styles/landing.css`:

```css
.site-header { align-items: center; background: color-mix(in srgb, var(--color-cream) 92%, transparent); border-bottom: 1px solid var(--color-line); display: flex; gap: var(--space-2); justify-content: space-between; padding: var(--space-2) clamp(1rem, 4vw, 3rem); position: sticky; top: 0; z-index: 20; }
.site-header nav { display: flex; gap: var(--space-2); }
.site-header nav a { font-size: 0.875rem; text-decoration: none; }
.wordmark { font-family: var(--font-display); font-size: 1.25rem; text-decoration: none; }
.hero { align-items: end; display: grid; gap: var(--space-4); grid-template-columns: 1.1fr 0.9fr; min-height: min(48rem, 85dvh); }
.hero h1 { font-family: var(--font-display); font-size: clamp(3.5rem, 9vw, 7.5rem); font-weight: 600; letter-spacing: -0.05em; line-height: 0.88; margin: var(--space-2) 0; max-width: 9ch; }
.hero-photo-frame, .portrait-frame { background: linear-gradient(145deg, var(--color-sand), #c7b09a); min-height: 20rem; }
.attorney-grid, .contact-card-grid { display: grid; gap: var(--space-2); grid-template-columns: repeat(2, minmax(0, 1fr)); }
.attorney-profile, .contact-card-grid a, .service-panel, .faq-list details { border: 1px solid var(--color-line); padding: var(--space-3); }
.contact-card-grid a { display: grid; gap: 0.25rem; text-decoration: none; }
.steps { display: grid; gap: var(--space-2); list-style: none; padding: 0; }
.steps li { border-top: 1px solid var(--color-line); display: grid; gap: var(--space-2); grid-template-columns: 3rem 1fr; padding-top: var(--space-2); }
.site-footer { background: var(--color-ink); color: var(--color-paper); padding: var(--space-4) clamp(1rem, 4vw, 3rem); }
@media (max-width: 47.99rem) {
  .site-header nav { display: none; }
  .hero, .attorney-grid, .contact-card-grid { grid-template-columns: 1fr; }
  .hero { min-height: auto; }
}
```

- [ ] **Step 7: Run structural tests and the build**

Run:

```bash
npm test -- src/App.test.tsx src/components
npm run build
```

Expected: PASS and a successful build.

- [ ] **Step 8: Commit the institutional page**

```bash
git add src/App.tsx src/components src/styles/landing.css
git commit -m "feat: compose institutional landing page"
```

### Task 7: Add photo-ready asset handling and final content safeguards

**Files:**
- Modify: `src/data/site.ts`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/AttorneyProfiles.tsx`
- Modify: `src/styles/landing.css`
- Modify: `README.md`

- [ ] **Step 1: Write an asset fallback test**

Append to `src/App.test.tsx`:

```tsx
it('does not render invented attorney photographs when asset paths are absent', () => {
  render(<App />);
  expect(screen.queryByAltText(/foto de ana paula/i)).not.toBeInTheDocument();
  expect(screen.queryByAltText(/foto de deyvison/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and confirm it passes with the current media frames**

Run: `npm test -- src/App.test.tsx`

Expected: PASS because current attorney data does not include image paths.

- [ ] **Step 3: Implement conditional real-image rendering**

Replace the portrait frame in `src/components/AttorneyProfiles.tsx` with:

```tsx
{attorney.image ? (
  <img alt={`Foto de ${attorney.name}`} className="portrait-frame" height="720" loading="lazy" src={attorney.image} width="576" />
) : (
  <div aria-hidden="true" className="portrait-frame" />
)}
```

Replace `src/components/Hero.tsx` with this image-safe version, reading the already-typed optional `office.heroImage` field:

```tsx
import { office } from '../data/site';

export function Hero({ onContact }: { onContact: () => void }) {
  return (
    <section className="hero section" id="escritorio">
      <div>
        <p className="eyebrow">Limoeiro do Norte, Ceará · Atendimento em todo o Brasil</p>
        <h1>Advocacia para pessoas e empresas.</h1>
        <p>Atendimento presencial em Limoeiro do Norte e online em todo o Brasil.</p>
        <button className="button-primary" onClick={onContact} type="button">Entrar em contato</button>
      </div>
      {office.heroImage ? (
        <img alt="Ambiente do escritório Almeida Ribeiro" className="hero-photo-frame" height="900" src={office.heroImage} width="1200" />
      ) : (
        <div aria-hidden="true" className="hero-photo-frame" />
      )}
    </section>
  );
}
```

Append these image-fit rules to `src/styles/landing.css`:

```css
img.hero-photo-frame, img.portrait-frame { display: block; height: 100%; object-fit: cover; width: 100%; }
```

- [ ] **Step 4: Document the exact handoff contract for final assets and content**

Create `README.md`:

```md
# Almeida Ribeiro Advogados

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm test
npm run build
```

## Publication inputs

Before publishing, update `src/data/site.ts` with the office-approved service catalog and short descriptions. Add only approved WebP or AVIF images to `public/images/`, then set their paths in the `office.heroImage` and `attorneys[].image` fields.

Required assets:

- Official logo in SVG or transparent PNG.
- One horizontal office or team image for the opening section.
- One portrait each for Ana Paula Almeida and Deyvison Ribeiro.

Do not use generated portraits, testimonials, case results, prices, discounts, promises, unverified specialties, or unapproved legal-service descriptions.
```

- [ ] **Step 5: Run full validation**

Run:

```bash
npm test
npm run build
```

Expected: all tests pass and `dist/` is generated.

- [ ] **Step 6: Commit the handoff safeguards**

```bash
git add src/data/site.ts src/components/Hero.tsx src/components/AttorneyProfiles.tsx src/styles/landing.css src/App.test.tsx README.md
git commit -m "feat: prepare approved photo and content handoff"
```

### Task 8: Validate the interactive and legal-content quality gate

**Files:**
- Verify: all public routes and release strings; do not make unapproved content changes during this gate.

- [ ] **Step 1: Verify every public contact destination**

Run this command after finalizing `src/data/site.ts`:

```bash
npm run build && npm run dev
```

In the browser, verify these routes:

- Ana Paula’s direct choice opens `https://wa.me/5588996575592`.
- Deyvison’s direct choice opens `https://wa.me/5585996274319`.
- Divórcio, Guarda and Usucapião preserve the selected topic in the WhatsApp message.
- “Outro assunto” opens the same attorney choice and uses the neutral other-subject message.
- The map, `mailto:` link and Instagram link open their destinations.

- [ ] **Step 2: Run keyboard and responsive checks**

At 375, 768, 1024 and 1440 pixels wide, verify:

1. The skip link reaches `#main-content`.
2. Every button and area card has a visible focus style.
3. The contact dialog closes with Escape and with its close button.
4. The user can select both audiences, every area and the other-subject card by keyboard.
5. No page content is hidden under the sticky header and no horizontal scrollbar appears.
6. With reduced motion enabled, opening a service panel does not require animation to reveal content.

- [ ] **Step 3: Perform the OAB content review**

Review all strings in `src/data/site.ts`, `src/components/Hero.tsx`, `src/components/HowItWorks.tsx`, `src/components/Faq.tsx` and `README.md` against the following release rules:

- Keep copy factual and institutional.
- Remove result guarantees, prices, free consultations, discounts, testimonials, comparative claims and case outcomes.
- Retain only verified OAB registrations, titles, practice areas and contact details.
- Do not add a specialty claim without the office’s confirmation.

Reference: `docs/superpowers/specs/2026-09-17-almeida-ribeiro-landing-page-design.md` and the OAB’s Provimento nº 205/2021.

- [ ] **Step 4: Run final automated checks**

Run:

```bash
npm test
npm run build
git diff --check
git status --short
```

Expected: passing tests, successful build, no whitespace errors and a clean working tree after the preceding task commits.

## Plan self-review

### Spec coverage

- Institutional information, contacts, address, hours, e-mail and Instagram: Tasks 2 and 6.
- Equal entry points for individuals and businesses: Task 5.
- All known practice areas, detailed Civil services and a safe route for remaining categories: Tasks 2 and 5.
- Contact choice between Ana Paula and Deyvison, including context-preserving WhatsApp messages: Tasks 2 and 4.
- “Outro assunto” route: Task 5.
- Editorial regional visual direction, photo-safe frames, responsive layout and motion restraint: Tasks 3, 6 and 7.
- Accessibility, performance, link verification and OAB release review: Tasks 3, 4, 7 and 8.

### Placeholder scan

The plan contains no invented service catalog, visual assets, legal credentials, promises or release copy. It specifies a safe contact route for categories whose approved services have not yet been supplied.

### Type consistency

`Audience`, `PracticeArea`, `Service`, `Attorney` and `ContactTopic` are defined in Tasks 2 and 4. All later tasks use those exact names and the `onContact(topic?)` contract.
