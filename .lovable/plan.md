

# AI Resume Builder — Build Track (Project 3)

## Overview
Add Project 3 "AI Resume Builder" to the KodNest Premium Build System — an 8-step guided build track with strict sequential gating, artifact uploads, and a final proof/submission page. No actual resume features — only the route rail and gating system.

---

## 1. Premium Layout System
Reusable layout matching the existing KodNest design:
- **Top bar**: Left → "AI Resume Builder" | Center → "Project 3 — Step X of 8" | Right → Status badge (Not Started / In Progress / Complete)
- **Main workspace area (70%)**: Step-specific content (title, description, instructions)
- **Secondary build panel (30%)**: "Copy This Into Lovable" textarea, Copy button, "Build in Lovable" link/button, feedback buttons (It Worked / Error / Add Screenshot)
- **Proof footer**: Navigation bar with Previous/Next buttons

## 2. Eight Build Steps (Routes)
Each step follows the same layout with unique content:

| Route | Step | Title |
|-------|------|-------|
| `/rb/01-problem` | 1 | Problem Definition |
| `/rb/02-market` | 2 | Market Research |
| `/rb/03-architecture` | 3 | Architecture |
| `/rb/04-hld` | 4 | High-Level Design |
| `/rb/05-lld` | 5 | Low-Level Design |
| `/rb/06-build` | 6 | Build |
| `/rb/07-test` | 7 | Test |
| `/rb/08-ship` | 8 | Ship |

## 3. Step Gating System
- Steps must be completed **sequentially** — no skipping
- **Next button is disabled** until the user uploads/saves an artifact for the current step
- Artifacts stored in local state as `rb_step_X_artifact`
- Visual indicators show locked/unlocked/completed status for each step
- Attempting to navigate directly to a locked step redirects to the current active step

## 4. Artifact Upload
- Each step has an artifact upload area (file upload or text input)
- Uploading an artifact unlocks the Next button
- Artifacts persist in localStorage so progress survives page refreshes

## 5. Proof Page (`/rb/proof`)
- **8-step status grid**: Shows completion status for all steps with checkmarks/pending icons
- **Submission inputs**: Lovable project link, GitHub repo link, Deploy/live link
- **Copy Final Submission** button: Copies all links + step statuses as formatted text
- Only accessible after all 8 steps are completed

## 6. State Management
- All step progress and artifacts stored in **localStorage** (no backend needed)
- Custom React context/hook to manage build track state across routes

