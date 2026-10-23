# ocean-social · Raajje Explorers

Atollingo's Social Studies app for Grades 1–6, served at **social.atollingo.com**. It uses the same theme, layout, avatars and beach art as the Atollingo hub (OceanHub) and runs on the same vinext + Cloudflare Workers setup as the other Atollingo apps.

## What's inside

- **60 lessons**, 10 per grade, covering six strands: Culture and Identity; People, Places and Environment; The Economic World; Time, Continuity and Change; Active Citizenship; Investigating and Communicating.
- **Quizzes** with four question types: multiple choice, tap-the-map (a schematic map of the atolls with the Equator), put-in-order timelines, and sort-into-groups.
- **Visuals in the lessons**: a mascot guide for each strand (from the OceanLearn family) on reef, lagoon and beach scenes, plus 73 diagrams across the lesson pages: maps of the atolls, timelines, an island cross-section, how an atoll forms, the flag, monsoon winds, a day-and-prayer-times slider, rufiyaa notes with a change calculator, the three branches of government, a groundwater lens, rising seas, a bar-graph builder, a budget planner, Thaana letters and more. Most are interactive.
- **Daily challenge** with spaced review: missed questions come back after 1, 3 and 7 days.
- **Rewards**: stars, a reef shop, 11 badges and a certificate for each finished grade.
- **Parents area** (behind a times-table gate): weekly summary, minutes learning, missed questions with the child's answer, progress by strand and grade, and which grades a child may open.
- **Accessibility**: text size, high contrast and read-aloud, like the hub.
- **Offline**: a service worker caches the app and its pictures after the first visit.

Children pick a grade every time they log in. Progress stays in the browser (`localStorage` key `raajje-explorers-v1`).

## Connection to the Atollingo hub

On `social.atollingo.com`, "Use my Atollingo learner" borrows the learner chosen at atollingo.com through the hub's `/bridge` page (exact-origin `postMessage`, channel `atollingo-v1`). Each lesson finished for the first time, and each daily challenge, is sent to the hub as an `external` completion worth 1–3 stars. Results that can't be sent are queued and retried on the next connection.

The hub must list `https://social.atollingo.com` as an allowed origin and accept `OceanSocial` as an app name (see the `add-oceansocial` branch in OceanHub).

## Project layout

- `app/raajje/lessons.js`: all lesson and quiz content
- `app/raajje/app.js`: the learning app (plain DOM code, rendered into the shell)
- `app/SocialApp.tsx`, `app/layout.tsx`: the page shell, header and "Back to Atollingo" bar
- `app/globals.css`: the Atollingo theme
- `public/assets/`: beach banner, reef and lagoon scenes, mascot guides, the 18 hub avatars, app icons
- `public/sw.js`: offline cache

## Develop

```bash
npm install
npm run dev
npm test        # content checks, production build, rendered-HTML checks
npm run lint
```

## Deploy

Not set up yet. Pushes and pull requests run `.github/workflows/ci.yml`, which only builds, tests and lints; nothing is deployed. When the app is ready to go live, add a Cloudflare deploy step like the other Atollingo repos (Worker `atollingo-oceansocial`, secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`) and attach the `social.atollingo.com` custom domain.

## Content status

Lesson content was written to follow the National Institute of Education's Social Studies strands for Key Stages 1 and 2, without the official syllabus documents to hand. It has not been reviewed by an educator or endorsed by the NIE. Have a Maldivian teacher check facts and reading level before wide use.
