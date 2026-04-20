# CLAUDE.md — RealEye v2

This file is the primary convention and specification document for RealEye. Read it at the start of every Claude Code session before making changes.

---

## 1. Project overview

**RealEye** is an interactive web app that teaches adults with low AI literacy to recognize AI-generated images. The app walks learners through concept-focused rounds, each centered on a single "tell" — a visual feature that gives away an AI image. Learners build a mental library of tells through guided practice.

### Scope for this version

This is a **proof of concept**, not a production app. Goals:

- Demonstrate the complete learning model end-to-end for one tell (hands & fingers)
- Serve as a deliverable for a graduate course on online learning tools
- Provide a working demo that reviewers can interact with

Explicitly **out of scope**:
- Multiple rounds beyond Round 1 (structure should support extension, but no additional content)
- User accounts, login, or identity
- Data collection, tracking, or analytics
- Mobile layouts (desktop-only)
- Backend services or APIs

### Target audience

Adults with **low AI exposure or literacy**. This shapes design decisions throughout:

- Tone is warm, matter-of-fact, and calm — not alarmist, technical, or condescending
- Avoid jargon (no "diffusion models," "latent space," "training data"). Use plain language.
- Provide structure before asking for articulation; novices freeze when asked open-ended questions with no scaffolding
- Reward engagement over accuracy; beginners need confidence to persist
- Causal "why" explanations transfer better than rule memorization — always explain *why* AI fails in a particular way

### Relationship to v1

This is a structural redesign of the v1 app, based on user testing that revealed:

- Learners could reliably identify *which* photo was AI-generated, but could not articulate *why*
- Scaffolding alone (hotspots, checklists) did not solve the articulation problem
- Learners lacked vocabulary and conceptual knowledge about tells, not just perception skills

v2 addresses these findings by:

- Restructuring into **concept-first rounds** (one tell per round, deeply taught)
- Adding an **instructional phase** (Phase 2: Learn) between the contrasting cases and the spotting task
- Replacing free-text annotation in Phase 3 with a simpler perception check
- Adding a **Tell Library** that accumulates as learners complete rounds, serving as both progress indicator and reference

v1 repo and deployment remain available for comparison. v2 is a clean rebuild, not a fork.

---

## 2. Learning design (the "why")

This section exists so implementation decisions don't accidentally violate the pedagogy. When in doubt, return to this section.

### Core learning principles in use

- **Contrasting cases** (Schwartz & Bransford): Phase 1 shows paired real/AI images to surface perceptual distinctions before instruction
- **Worked examples** (Sweller et al.): Phase 2 Beat 3 shows 2 fully-explained AI images to build transferable schemas
- **Scaffolding and fading**: Phase 3 includes a hint button and a reveal button for stuck learners; future rounds (not in demo) would reduce support
- **Concept-first blocking**: Each round focuses on one tell, revisited multiple times with variation, rather than interleaving many tells at once. Better for novices.
- **Spatial contiguity** (Mayer): Annotations sit directly next to the image content they describe, never in a sidebar
- **Productive struggle → instruction**: Phase 1's guided discovery primes learners to absorb Phase 2's instruction more deeply

### Three-phase round structure

Each round has three phases with distinct pedagogical jobs:

- **Phase 1 — Examine**: Productive struggle. Learner compares two images, makes a commitment (which is AI), and articulates what they noticed via a structured selection. No teaching yet.
- **Phase 2 — Learn**: Instruction. The tell is named, explained causally, shown in the Phase 1 image, and shown in 2 worked examples from other AI images. This is the main learning event.
- **Phase 3 — Practice**: Perception check. Learner applies the tell by clicking to mark instances in 3 new AI images. Simple, low-stakes verification that the concept transferred.

### Key constraints derived from learning design

These are firm rules. Do not override them for UI convenience:

- **"Something felt off but I can't say what" must always be a Phase 1 selection option.** Validates tacit recognition, reduces pressure to fake expertise.
- **"I guessed" must always be a Phase 1 selection option.** Removes the stigma of uncertainty for novices.
- **Annotations in Phase 2 must be spatially adjacent to the image content they describe.** Never place annotation text in a sidebar separated from the visual.
- **Wrong clicks in Phase 3 must not trigger punishing feedback.** Neutral gray markers or silent dismissal only.
- **The Tell Library unlocks on engagement, not performance.** A learner who used the reveal button still earns the tell. The library is a record of "I worked through this," not "I mastered this."
- **Phase 2 beats advance only on learner click.** No auto-advance. Respects reading speed; small commitments aid encoding.
- **Causal "why" explanations accompany every tell, not just rules.** "AI gets hands wrong *because* it doesn't understand anatomy," not just "AI gets hands wrong."

---

## 3. App structure and flow

### Top-level pages

- **Home** (`/`): Welcome, three-step explainer, "Start learning tells" button, Tell Library grid
- **Round** (`/round/:roundId`): Internal state machine routing through Phase 1 → Phase 2 (4 beats) → Phase 3 (3 images) → Round Complete
- **Tell Detail** (`/tell/:tellId`): Reference view of an earned tell, reassembling Phase 2 content plus sub-type list

### Round flow in sequence

```
START
  ↓
Phase 1: Examine
  ├─ View contrasting pair
  ├─ Select photo → Confirm
  ├─ If correct: receive confirmation, proceed to tell selection
  ├─ If wrong:   receive correction, skip directly to Phase 2
  ├─ (If correct path) Select tells from 5-option list → Continue
  ├─ Receive acknowledgment (one of 4 variants based on selection)
  ↓
Phase 2: Learn
  ├─ Beat 1: Name & frame the tell + causal "why"
  ├─ Beat 2: Annotated view of Phase 1 AI image (highlight + zoom + annotation)
  ├─ Beat 3: 2 worked example images with annotations
  ├─ Beat 4: Bridge ("Start practicing")
  ↓
Phase 3: Practice (find-until-solved, immediate per-click feedback)
  ├─ Image 1: Click to find the tell → correct click triggers success + bonus reveal → Continue
  ├─ Image 2: Click to find either tell → success on first correct click → remaining tell revealed → Continue
  ├─ Image 3: Click to find the tell → correct click triggers success + bonus reveal → "Complete Round"
  ↓
Round Complete
  ├─ Celebration heading
  ├─ Tell Library card unlocks with animation
  ├─ "Back to home" button
  └─ "Learn another tell" button (disabled for demo)
```

### Navigation rules

- **Home icon** in the header: always visible during a round, saves progress silently, returns to home. No confirmation dialog.
- **Back navigation** exists only between Phase 2 beats (previous beat / next beat).
- **No back button** during Phase 3 — these disrupt the find-success-continue flow.
- **Mid-round exit** via home icon returns to home. The relevant Tell Library card shows in-progress state with a "Continue" option that resumes at the exact point the learner left.
- **Browser back button** should behave reasonably but isn't a primary navigation path. Route changes should persist to localStorage so browser back doesn't lose progress.

### Header design

The header should **not** show phase/round info (unlike v1). Keep it minimal:

- Left: prominent, clearly-labeled Home icon (with hover tooltip: "Return to home — your progress will be saved")
- Right: RealEye logo or title
- No phase indicator, no round indicator, no user context

---

## 4. Tech stack and conventions

### Stack

- **React** (via Vite)
- **Tailwind CSS** for styling
- **JavaScript** (not TypeScript, for consistency with v1 and iteration speed)
- **No backend**, no API calls, no external services
- **No authentication**, no login, no user identification
- **No data collection**, no tracking, no analytics

### Data

- All round content is hardcoded in `src/data/exercises.js`
- localStorage is used for two things only:
  - Tell Library state (which tells are unlocked)
  - Mid-round progress (for resume-where-you-left-off)
- No other persistence

### Deployment

- **GitHub Pages** via manual dist push workflow (same as v1):
  1. `npm run build` generates `dist/`
  2. Initialize git in `dist/`, force-push to `gh-pages` branch
- **Vercel and gh-pages npm package both failed** in v1 due to environment issues. Do not retry these.
- `vite.config.js` must set `base: '/realeye-tol-final-project-v2/'` to fix image loading on GitHub Pages
- Use `import.meta.env.BASE_URL` (exported as `BASE` from `exercises.js`) for all asset paths

### Environment

- Development: VS Code on Windows, PowerShell with execution policy `RemoteSigned` for current user
- Node: use current LTS (same version as v1)

---

## 5. File and component architecture

### Directory structure

```
src/
  data/
    exercises.js          # Rounds, Tell Library, app copy
  components/
    common/               # Shared primitives (Button, Modal, Card, Header, etc.)
    home/                 # Home page components (Intro, LibraryGrid, TellCard)
    round/                # Round-level components (RoundContainer, PhaseRouter)
    phase1/               # Phase 1 components (ContrastingPair, TellSelection, Acknowledgment)
    phase2/               # Phase 2 components (Beat1, Beat2, Beat3, Beat4, BeatNav)
    phase3/               # Phase 3 components (PracticeImage, HotspotMarker, HintRegion, RoundComplete)
    tellDetail/           # Tell detail page components
  hooks/
    useLocalStorage.js    # Safe localStorage read/write
    useRoundProgress.js   # Progress tracking logic
  utils/
    selectionLogic.js     # Phase 1 acknowledgment cascade
    hotspotDetection.js   # Percentage-based click hit detection
  App.jsx
  main.jsx
  index.css               # Tailwind imports

public/
  images/
    round1/
      phase1-a.jpg        # Real classroom photo
      phase1-b.jpg        # AI classroom photo (missing arm)
      phase1-b-zoom.jpg   # Zoomed in version on tell
      worked-example-1.jpg
      worked-example-2.jpg
      practice-1.jpg      # Marine (single-tell)
      practice-2.jpg      # Candle workshop (multi-tell)
      practice-3.jpg      # Dinner table (single-tell)
```

### Component naming

- **PascalCase** for component files and exports
- Components that render a single visual element: noun (`TellCard`, `HotspotMarker`)
- Components that orchestrate state or flow: more descriptive (`RoundContainer`, `PhaseRouter`)
- One component per file

### Build order (for Claude Code sessions)

Always build **leaf components before containers**. This produces better code and easier debugging.

Recommended session-by-session order:

1. Shared primitives in `components/common/` (Button, Modal, Card, Header)
2. Data layer verification — confirm `exercises.js` loads and types are as expected
3. Tell Library grid on home page (renders from data, no interaction yet)
4. Phase 1 components (contrasting pair, tell selection, acknowledgments)
5. Phase 2 components (one beat at a time: Beat 1, then Beat 2, then Beat 3, then Beat 4)
6. Phase 3 components (practice image with hotspot clicking, then results view)
7. Round-level orchestration and routing
8. localStorage integration (progress persistence, library unlocks)
9. Polish, animations, edge cases

---

## 6. Data contract (exercises.js)

### Exports

The file at `src/data/exercises.js` exports four things:

- `BASE` — `import.meta.env.BASE_URL` for asset paths
- `rounds` — array of round objects
- `tellLibrary` — array of 6 tell category definitions (only hands-fingers is unlockable in demo)
- `appCopy` — app-level UI copy (home page, navigation, errors, etc.)

### Coordinate convention

All image coordinates use **percentages (0-100)** relative to the image's intrinsic dimensions:

- `x`, `y`: top-left of the region (not center)
- `width`, `height`: dimensions of the region
- Hotspot hit detection: a click counts as correct if it falls within any hotspot's rectangle

This keeps positioning responsive across display sizes.

### Image path convention

Always prefix image paths with `BASE`:

```js
src: `${BASE}images/round1/phase1-a.jpg`
```

Never use relative paths or hardcoded absolute paths. This is what broke image loading on GitHub Pages in v1.

### When to modify exercises.js

**Yes, modify it for:**
- Adding/editing round content (copy, images, coordinates)
- Adding new tells to the Tell Library
- Updating app-level copy

**No, don't modify it for:**
- Component-specific UI state (use component state or props)
- User progress (use localStorage)
- Runtime flags or preferences (use config or constants elsewhere)

### Adding a new round (future work)

To add Round 2, append a new round object to the `rounds` array following the Round 1 shape, and set `unlockRoundId` on the corresponding Tell Library entry to point to the new round's id. No code changes should be required for additional rounds if the component layer is built correctly.

---

## 7. localStorage schema

Two localStorage keys, both scoped to the RealEye app:

### Key: `realeye.unlockedTells`

Array of tell IDs that have been fully earned (learner completed all 3 Phase 3 images, whether by finding tells or using reveal).

```js
["hands-fingers"]
```

### Key: `realeye.roundProgress`

Object mapping round IDs to their progress state. Used to resume mid-round.

```js
{
  "round-1-hands-fingers": {
    currentPhase: "phase2",           // "phase1" | "phase2" | "phase3"
    phase1Complete: true,
    phase2Beat: 3,                    // which beat (1-4), only if currentPhase === "phase2"
    phase3ImagesCompleted: 0,         // count of completed images, only if currentPhase === "phase3"
    phase3CurrentImageId: "practice-1"
  }
}
```

### Read/write rules

- All localStorage access goes through the `useLocalStorage` hook (in `src/hooks/`)
- Wrap reads and writes in try/catch — storage can fail in private browsing or quota-exceeded scenarios
- On read failure: treat as empty state (no unlocked tells, no round progress)
- On write failure: show the `appCopy.errors.storageFailure` message, let the learner continue (progress just won't persist)
- **No migration strategy.** For a prototype, breaking schema changes simply reset localStorage. Not worth building migration infrastructure.

### When to clear

Never clear localStorage automatically. If the learner wants to reset, they can do so via browser settings. For development, a small debug utility to reset localStorage is fine but should not ship.

---

## 8. Key implementation details

These are behaviors that are easy to get wrong. Read carefully before implementing related features.

### Phase 1 acknowledgment cascade

After the learner selects tell options and clicks Continue, the app picks **one** acknowledgment message using this cascade:

```
If any selected option has isCorrect === true:
    → use acknowledgments.correctTell
Else if any selected option has isCorrect === false:
    → use acknowledgments.plausibleWrong
Else if "felt-off" is selected:
    → use acknowledgments.feltOff
Else (only "guessed" is selected):
    → use acknowledgments.guessed
```

The learner may select multiple options. The cascade picks the first match in priority order.

### Phase 1 wrong photo flow

If the learner picks the real photo as AI:

1. Show `wrongPhotoFeedback` ("Actually, Photo B is the AI-generated one...")
2. **Skip the tell selection entirely**
3. **Skip the acknowledgment step**
4. Transition directly to Phase 2 Beat 1

The wrong-photo learner does not get to answer "what made you pick that?" because the question no longer makes sense.

### Phase 3 interaction model

Phase 3 uses a **find-until-solved** model with immediate per-click feedback. There is no Submit button.

**Click behavior:**
- **Correct click** (lands within any `primaryTells` hitbox): green check marker appears at click location, `successMessage` from that tell is shown, active find phase ends immediately
- **Wrong click** (outside all hitboxes): gray persistent marker placed at click location, `wrongClickText` fades in for ~2s then disappears; the gray marker persists so the learner can track where they've already looked

**Success → bonus reveal flow:**
1. Brief pause after the success message
2. If `revealIntroText` is non-null for this image, show it
3. Any `primaryTells` entries NOT found fade in one at a time with their `revealAnnotation` text shown as a small label below the marker (always visible, not hover-only)
4. Continue button appears to advance to next image

**Reveal button** (available during active find phase only): clicking opens `revealConfirmModal`; on confirm, all `primaryTells` entries are shown with their `revealAnnotation` text and `revealIntroText` (if non-null), then Continue button appears.

**Data shape:** Each image has a `primaryTells` array (one or two entries). The first correct click on any `primaryTells` hitbox triggers success. Any remaining unfound entries are shown in the bonus reveal. There is no `bonusTells` field.

**No graded results screen.** The success moment + bonus reveal replaces a results screen entirely. No score shown, no copy variants for performance.

**Button text:** "Continue" after images 1 and 2; "Complete Round" (`completeButtonText`) after image 3.

### Phase 3 library unlock trigger

The Tell Library card for the round unlocks **after the learner completes all 3 practice images**, regardless of performance or whether Reveal was used on any image. Completion means reaching the Continue / Complete Round button on each image.

### Tell Library card state selection

Each card in the Tell Library grid has one of four visual states:

```
If the tell is unlocked (id in unlockedTells):
    → "Earned" state (full color, checkmark, "View details →")
Else if the tell has round progress (roundProgress[unlockRoundId] exists):
    → "In progress" state (partial color, progress label, "Continue →")
Else if the tell's unlockRoundId is null:
    → "Coming soon" state (grayscale, lock icon, "Coming soon")
Else:
    → "Locked / available" state (grayscale, lock icon, no label — shouldn't occur in demo)
```

The in-progress label text varies by current phase:
- Phase 1 in progress: "In progress: Examine"
- Phase 2 in progress: `"In progress: Learn (Beat ${beat} of 4)"`
- Phase 3 in progress: `"In progress: Practice (${current} of ${total} images)"`

### Hotspot hit detection

A click is correct if:

```
click.x >= hotspot.x AND click.x <= hotspot.x + hotspot.width
AND
click.y >= hotspot.y AND click.y <= hotspot.y + hotspot.height
```

All values are percentages. Convert pixel click coordinates to percentages relative to the displayed image's dimensions before comparing.

### Hint region highlighting

When the hint button is clicked, apply a soft highlight (e.g., amber background at 20% opacity) to the `hintRegion` rectangle. The hint region is typically larger than any individual hotspot and covers the general zone where tells exist. Show the `hintTooltip` text briefly when the hint is activated.

---

## 9. UI and design guidelines

### Color conventions

- **Green** (e.g., `#10b981`): correct feedback, earned state, success
- **Amber / yellow** (e.g., `#f59e0b`): attention, hints, highlights (use sparingly to avoid alarm)
- **Gray** (e.g., `#9ca3af`): neutral, locked, disabled, in-progress base
- **Red** (e.g., `#ef4444`): hard errors only (e.g., image load failure). Do NOT use for wrong clicks in Phase 3 — that's what gray is for.
- **Blue** (e.g., `#3b82f6`): primary actions, interactive elements, links

Do not introduce additional colors beyond these without explicit reason.

### Typography hierarchy

- Page title (home, round complete): large (30-36px), bold
- Tell name / beat heading: medium-large (22-26px), bold
- Section headings (within beats, within detail views): 18-20px, semibold
- Body text: 16px, regular
- Annotations and captions: 14-15px, regular
- Small meta text (tooltips, progress labels): 13-14px, regular

Use Tailwind's default type scale where possible; avoid custom pixel values.

### Spacing and whitespace

- **Err on more whitespace.** Instructional content especially should breathe. Cramped layouts signal "this is hard."
- Between phase transitions: use generous vertical space (e.g., py-12 or more).
- Between beats within Phase 2: full-screen transitions, not scroll.
- Between hotspots and their markers: visual connection must be clear but not crowded.

### Button conventions

- **Primary buttons** (Continue, Submit, Start): solid blue background, white text
- **Secondary buttons** (Back, Cancel): outlined or subtle background, blue text
- **Disabled buttons**: 50% opacity, not-allowed cursor, no hover effects
- **Destructive / reveal** (use sparingly): amber or outlined style, never red
- Always include disabled states where user input is required before action (e.g., Confirm disabled until photo is selected in Phase 1)

### Animation guidance

- Keep animations subtle and purposeful
- **Phase transitions**: short fade or slide (200-300ms)
- **Tell Library unlock**: moderate unlock animation (lock icon falls away, color fills in, checkmark appears) — should feel satisfying but not disrupt flow
- **Hotspot reveals**: stagger revealed markers with small delays (100-200ms between them) so the learner sees them appear one at a time
- **Hint activation**: brief pulse on the hint region (500-800ms)
- **Avoid**: spinning loaders for anything that takes less than 500ms, bouncing icons, attention-grabbing animations during instruction

### Accessibility (known limitation)

For v2, accessibility features beyond defaults are explicitly out of scope. This is a known limitation. When building, use semantic HTML (buttons, not divs, for clickable elements) and sensible hover/focus states, but don't invest in ARIA, keyboard navigation beyond defaults, or screen reader optimization. Note this in the final writeup as future work.

---

## 10. What NOT to build

Things Claude Code might suggest or want to add that are explicitly out of scope for this version:

- **Login, accounts, or user identification** — the app is fully anonymous
- **Data collection, event tracking, or analytics** — not even anonymous telemetry
- **Admin data export or debug shortcuts** — removed from v1, do not re-add
- **Backend services, APIs, or server state** — everything runs client-side
- **Mobile-specific layouts or responsive optimization** — desktop-only for now
- **Touch interactions** — mouse/trackpad only
- **Keyboard shortcuts** — beyond what browsers provide by default
- **Additional rounds beyond Round 1** — structure must support them but don't build the content
- **AI-generated or LLM-powered feedback** — all copy is hardcoded in `exercises.js`
- **Image upload or user-provided content** — all images are hand-curated and live in `public/images/`
- **Social features** (sharing, comparing, leaderboards) — not the learning model's intent
- **Dark mode** — single light theme only
- **Confidence ratings, pre/post assessments, or other metacognitive features** — considered and explicitly deferred

If a suggestion doesn't fit the proof-of-concept scope, the right response is "that's out of scope for v2, but we can revisit it in a future version."

---

## 11. Deployment workflow

### Repo info

- GitHub username: `saralian`
- Repo name: `realeye-tol-final-project-v2` (or updated name — verify in repo URL)
- Branch: `main` for source, `gh-pages` for deployed build
- Live URL: `https://saralian.github.io/realeye-tol-final-project-v2/` (update if repo name changes)

### `vite.config.js` base path

The `base` in `vite.config.js` must match the repo name exactly:

```js
export default defineConfig({
  base: '/realeye-tol-final-project-v2/',
  plugins: [react()],
})
```

Without this, image paths break on the deployed GitHub Pages site (the issue that plagued v1 until `BASE_URL` was used consistently).

### Deployment steps

From the project root:

1. Commit and push source changes to `main` as usual
2. Build: `npm run build`
3. Navigate to the `dist` directory
4. Initialize git and force-push to gh-pages:
   ```
   cd dist
   git init
   git add -A
   git commit -m "Deploy v2"
   git branch -M gh-pages
   git remote add origin https://github.com/saralian/realeye-tol-final-project-v2.git
   git push -f origin gh-pages
   cd ..
   ```
5. Wait 1-2 minutes for GitHub Pages to update
6. Verify at the live URL

Do NOT attempt to use Vercel or the `gh-pages` npm package — both failed in v1.

### Testing

- Local dev: `npm run dev` (runs at `http://localhost:5173`)
- Local production build: `npm run build && npm run preview`
- Always test the production build locally before deploying; the base path only applies in production, so image loading bugs won't surface in dev

---

## 12. Session conventions

For every Claude Code session on this project:

1. **Re-read CLAUDE.md at the start of the session.** Conventions in this file take precedence over general best practices.
2. **Before writing code, confirm understanding of the specific task.** Ask clarifying questions rather than guessing. Better to confirm once than refactor later.
3. **Build leaf components before containers.** A `TellCard` before a `LibraryGrid`. A `HotspotMarker` before a `PracticeImage`.
4. **Verify specific interaction paths before moving on.** After building a component, walk through the intended interactions and confirm each works. Don't just trust that code is "done" because it compiles.
5. **When a change might affect learning design, flag it explicitly.** If an implementation choice could violate a principle from Section 2, pause and discuss before committing to it.
6. **Keep files focused.** One component per file. No god-components that do Phase 1, Phase 2, and Phase 3 in one place.
7. **Match existing style.** If similar code exists, match its patterns. Consistency beats cleverness.
8. **Update CLAUDE.md when conventions change.** If a decision gets made during a session that affects future work, note it here before the session ends.

---

*Last updated: April 20, 2026*