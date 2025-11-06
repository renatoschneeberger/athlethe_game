# GitHub Pages - Quick Start

## In 5 Minuten online! 🚀

### 1. Repository auf GitHub erstellen

1. Gehe zu [github.com/new](https://github.com/new)
2. Repository-Name: `athlethe_game` (oder dein gewünschter Name)
3. **Wichtig:** Repository muss **öffentlich** sein
4. Klicke "Create repository"

### 2. Code zu GitHub pushen

```bash
# Falls noch nicht initialisiert
git init
git add .
git commit -m "Initial commit"

# GitHub Repository als Remote hinzufügen
# Ersetze DEIN-USERNAME mit deinem GitHub Username
git remote add origin https://github.com/DEIN-USERNAME/athlethe_game.git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **Settings** (oben rechts)
3. Scrolle zu **Pages** (links im Menü)
4. Unter **Source** wähle: **GitHub Actions**
5. Fertig! 🎉

### 4. Warten & Testen

- Warte 1-2 Minuten (GitHub baut die App)
- Prüfe den **Actions** Tab für den Build-Status
- Öffne: `https://DEIN-USERNAME.github.io/athlethe_game/`

## Automatisches Deployment

✅ Bei jedem `git push` wird automatisch deployed!
✅ Keine manuellen Schritte nötig
✅ GitHub Actions macht alles automatisch

## Base Path anpassen (falls nötig)

Falls dein Repository einen anderen Namen hat, passe `vite.config.js` an:

```js
base: '/dein-repository-name/',
```

**Aber:** Der GitHub Actions Workflow setzt das automatisch! Du musst nichts ändern.

## Troubleshooting

**404 Errors?**
→ Warte 2-3 Minuten nach dem ersten Push
→ Prüfe GitHub Actions Tab auf Fehler

**Assets werden nicht geladen?**
→ Base Path prüfen (sollte automatisch sein)
→ Build neu starten

**"Page not found"?**
→ Repository muss öffentlich sein
→ GitHub Pages muss aktiviert sein (Settings → Pages)

## Fertig! 🎉

Deine App ist jetzt online unter:
`https://DEIN-USERNAME.github.io/athlethe_game/`

