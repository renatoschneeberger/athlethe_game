# Athlete Game - Web Prototyp

Ein klickbarer Web-Prototyp (Desktop + Mobile) mit realistischer UX für Demos/Tests. Das Projekt simuliert eine Trading-Lernplattform mit Real-Case-Szenarien.

## Features

- ✅ Vollständige Navigation durch alle Hauptrouten
- ✅ Mock-Daten (keine echten Integrationen)
- ✅ Simulierte Loading/Error/Success-States
- ✅ Responsive Design (Desktop + Mobile)
- ✅ Mini-Game mit Fragen
- ✅ Portfolio-Sandbox mit Trading-Simulation
- ✅ Leaderboards (Woche & Gesamt)
- ✅ Challenge-System
- ✅ Trade-History
- ✅ WhatsApp-Mock für Reminder-Flows
- ✅ Host-Demo für Session-Management

## Tech Stack

- **React 19** + **Vite**
- **TailwindCSS** für Styling
- **React Router** für Navigation
- **Zustand** für State Management
- Mock-API mit simulierten Delays (400-800ms) und 10% Fehlerrate

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

Die App läuft dann auf `http://localhost:5173`

## Routen

- `/` - Landing Page mit QR-Code
- `/session/:code` - Session beitreten
- `/session/:code/minigame` - Mini-Game (2-3 Fragen)
- `/session/:code/leaderboard` - Leaderboard mit E-Mail-Gating
- `/app` - Dashboard / Season Home
- `/app/challenge` - Wochenauftrag (Real-Case)
- `/app/portfolio` - Portfolio-Sandbox
- `/app/leaderboards` - Leaderboards (Woche/Gesamt)
- `/app/history` - Trade-History & Lern-Snippets
- `/mock/whatsapp` - WhatsApp Companion Mock
- `/host` - Host-Demo (Session-Kontrollen)

## Mock-Daten

Alle Daten befinden sich in `src/data/`:
- `session.json` - Session-Daten und Fragen
- `leaderboard.json` - Leaderboard-Daten (Woche & Gesamt)
- `assets.json` - Asset-Preise
- `portfolio.json` - Portfolio-Daten
- `challenge.json` - Challenge-Daten
- `whatsapp.json` - WhatsApp-Nachrichten

## Projektstruktur

```
src/
├── components/     # Wiederverwendbare UI-Komponenten
├── pages/         # Seiten-Komponenten
├── data/          # Mock-Daten (JSON)
├── stores/        # Zustand State Management
├── utils/         # Mock-API & Utilities
└── App.jsx        # Haupt-App mit Routing
```

## Hinweise

- Alle Daten sind statisch/generiert (Mock)
- Loading-States werden simuliert (400-800ms)
- 10% zufällige Fehlerrate für realistische Demo
- Keine echte Authentifizierung oder Persistenz
- Responsive Design für Desktop & Mobile

## Demo-Flow

1. Landing Page → Session-Code eingeben (z.B. `ABC123`)
2. Session beitreten → Nickname eingeben
3. Mini-Game → 3 Fragen beantworten
4. Leaderboard → E-Mail eingeben (Gating)
5. Dashboard → Challenge, Portfolio, etc. erkunden

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```
