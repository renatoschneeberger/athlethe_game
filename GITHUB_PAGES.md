# Deployment auf GitHub Pages

GitHub Pages ist eine kostenlose Option, um statische Websites direkt aus einem GitHub Repository zu hosten.

## Option 1: Automatisches Deployment mit GitHub Actions (Empfohlen)

### 1. Repository auf GitHub erstellen

1. Gehe zu [github.com](https://github.com) und erstelle ein neues Repository
2. Repository-Name: z.B. `athlethe_game` (wird Teil der URL)
3. **Wichtig:** Repository muss **öffentlich** sein (für kostenlosen GitHub Pages)

### 2. Code zu GitHub pushen

```bash
# Git initialisieren (falls noch nicht geschehen)
git init
git add .
git commit -m "Initial commit"

# GitHub Repository als Remote hinzufügen
git remote add origin https://github.com/DEIN-USERNAME/athlethe_game.git
git branch -M main
git push -u origin main
```

### 3. GitHub Actions aktivieren

Die Datei `.github/workflows/deploy.yml` wurde bereits erstellt. Sie wird automatisch bei jedem Push ausgeführt.

**Was passiert:**
- Bei jedem Push zu `main` wird automatisch gebaut
- Der Build wird auf GitHub Pages deployed
- Die App ist dann unter `https://DEIN-USERNAME.github.io/athlethe_game/` verfügbar

### 4. GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **Settings** → **Pages**
3. Unter **Source** wähle: **GitHub Actions**
4. Die App sollte nach ein paar Minuten verfügbar sein!

## Option 2: Manuelles Deployment mit gh-pages

### 1. gh-pages installieren

```bash
npm install --save-dev gh-pages
```

### 2. Scripts in package.json

Die Scripts sind bereits vorhanden:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

### 3. Base Path in vite.config.js anpassen

**Wichtig:** Der Base Path muss deinem Repository-Namen entsprechen!

```js
export default defineConfig({
  plugins: [react()],
  base: '/athlethe_game/' // ← Dein Repository-Name
})
```

### 4. Deployen

```bash
npm run deploy
```

Das war's! Die App ist jetzt auf GitHub Pages verfügbar.

## URL-Struktur

Nach dem Deployment ist die App verfügbar unter:

```
https://DEIN-USERNAME.github.io/REPOSITORY-NAME/
```

**Beispiele:**
- Repository: `athlethe_game` → `https://username.github.io/athlethe_game/`
- Repository: `trading-app` → `https://username.github.io/trading-app/`

## Wichtige Hinweise

### 1. Base Path konfigurieren

Der `base` Parameter in `vite.config.js` **muss** dem Repository-Namen entsprechen!

**Falsch:**
```js
base: '/' // Funktioniert nicht auf GitHub Pages!
```

**Richtig:**
```js
base: '/athlethe_game/' // Repository-Name
```

### 2. Repository muss öffentlich sein

GitHub Pages ist für private Repositories nur mit GitHub Pro verfügbar. Für kostenlosen Hosting muss das Repository öffentlich sein.

### 3. Custom Domain (Optional)

Falls du eine eigene Domain verwenden möchtest:

1. Erstelle `CNAME` Datei im `public/` Ordner:
   ```
   deine-domain.com
   ```

2. DNS Einstellungen:
   - Erstelle einen `CNAME` Record: `www` → `DEIN-USERNAME.github.io`

3. In GitHub Repository Settings → Pages → Custom domain eintragen

### 4. HTTPS

GitHub Pages bietet automatisch HTTPS für alle Domains.

## Troubleshooting

### 404 Errors bei Routen

→ Base Path in `vite.config.js` prüfen
→ Muss mit Repository-Namen übereinstimmen

### Assets werden nicht geladen

→ Base Path falsch konfiguriert
→ Build neu erstellen nach Änderung

### "Page not found" nach Deployment

→ Warte 1-2 Minuten (GitHub braucht Zeit)
→ Prüfe GitHub Actions Tab auf Fehler
→ Prüfe Repository Settings → Pages

### Build schlägt fehl

→ Prüfe `.github/workflows/deploy.yml`
→ Prüfe Node.js Version (sollte 18+ sein)
→ Prüfe GitHub Actions Logs

## Workflow

### Entwicklung

```bash
# Lokal entwickeln
npm run dev

# Änderungen committen
git add .
git commit -m "Beschreibung"
git push
```

### Deployment

**Automatisch:** Bei jedem Push zu `main` wird automatisch deployed!

**Manuell:** `npm run deploy` (falls gh-pages verwendet wird)

## Vorteile von GitHub Pages

✅ **Kostenlos** für öffentliche Repositories
✅ **Automatisches HTTPS**
✅ **Einfache Integration** mit GitHub
✅ **Automatische Deployments** bei Git Push
✅ **Custom Domain** möglich
✅ **Keine Server-Konfiguration** nötig

## Nachteile

⚠️ Repository muss **öffentlich** sein (für kostenlosen Plan)
⚠️ URL enthält GitHub Username
⚠️ Begrenzte Bandbreite (ausreichend für kleine/mittlere Projekte)

## Alternative: GitHub Pages mit privatem Repository

Falls du ein privates Repository verwenden möchtest:
- GitHub Pro Account erforderlich
- Oder: Repository öffentlich machen (Code ist dann sichtbar)

## Zusammenfassung

1. ✅ Repository auf GitHub erstellen
2. ✅ Code pushen
3. ✅ `vite.config.js` Base Path anpassen (Repository-Name)
4. ✅ GitHub Pages aktivieren (Settings → Pages)
5. ✅ Fertig! App ist online

Die GitHub Actions Workflow-Datei wurde bereits erstellt und wird automatisch funktionieren! 🚀

