# Wrise — Women's Career Module

A full React + MUI + Vite frontend for the Women's Career Platform.

## Theme
Deep dark background with **pink × violet** gradient palette. Uses:
- `Playfair Display` — display / heading font
- `DM Sans` — body / UI font
- Glassmorphism cards, floating orbs, grid texture overlay

## Pages & Flow

```
Home (Hero + Features)
  └─> Quiz (5-step adaptive questionnaire)
        └─> Results (4 matched career paths)
              └─> Roadmap (UX Designer full roadmap with interactive checklist)
```

## Project Structure

```
src/
├── theme/
│   └── theme.js          # MUI theme: pink-violet palette, typography, component overrides
├── components/
│   ├── Navbar.jsx         # Fixed navbar with scroll effect + mobile drawer
│   ├── HeroSection.jsx    # Hero with floating orbs, stats row, CTA
│   ├── FeaturesSection.jsx# 6-feature grid cards
│   ├── CareerQuiz.jsx     # 5-step quiz with animated transitions
│   ├── CareerResults.jsx  # 4 matched paths with expandable cards
│   └── RoadmapPage.jsx    # Full phase roadmap with interactive checklist + salary chart
└── App.jsx                # Page router (home / quiz / results / roadmap)
```

## Setup

```bash
npm install
npm run dev
```

## Dependencies

- `react` ^18
- `@mui/material` ^5
- `@emotion/react` + `@emotion/styled`
- `vite` + `@vitejs/plugin-react`

## Color Palette

| Token      | Hex       |
|------------|-----------|
| Pink 400   | `#FF4D94` |
| Pink 300   | `#FF80B5` |
| Violet 400 | `#7C4FEF` |
| Violet 500 | `#5C24E8` |
| Background | `#0D0818` |
| Surface    | `#140D24` |
