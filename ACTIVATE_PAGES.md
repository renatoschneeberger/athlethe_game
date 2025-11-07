# GitHub Pages aktivieren - Schritt für Schritt

## Problem
Der GitHub Actions Workflow schlägt fehl, weil GitHub Pages noch nicht aktiviert ist.

## Lösung

### Schritt 1: Gehe zu Repository Settings
Öffne diese URL:
```
https://github.com/renatoschneeberger/athlethe_game/settings/pages
```

**ODER manuell:**
1. Gehe zu: https://github.com/renatoschneeberger/athlethe_game
2. Klicke auf **Settings** (oben im Repository, nicht in deinem Profil!)
3. Links im Menü: **Pages**

### Schritt 2: Source auswählen
Unter **"Build and deployment"** → **"Source"**:
- Wähle: **"GitHub Actions"** (nicht "Deploy from a branch"!)
- Klicke **Save**

### Schritt 3: Warten
- GitHub erstellt automatisch die Pages-Umgebung
- Der Workflow wird automatisch neu ausgeführt
- Nach 1-2 Minuten sollte die App online sein

### Schritt 4: Prüfen
- Gehe zu **Actions** Tab im Repository
- Der Workflow sollte jetzt erfolgreich durchlaufen
- App ist verfügbar unter: https://renatoschneeberger.github.io/athlethe_game/

## Falls du den Settings-Tab nicht siehst

1. Stelle sicher, dass du im Repository bist (nicht in deinem Profil)
2. Prüfe, ob du Owner/Admin-Rechte hast
3. Falls nicht: Bitte den Repository-Owner, Pages zu aktivieren

## Alternative: gh-pages verwenden

Falls GitHub Actions Probleme macht, kannst du auch manuell deployen:

```bash
npm install --save-dev gh-pages
npm run deploy
```

Aber GitHub Actions ist besser, weil es automatisch bei jedem Push deployed!

