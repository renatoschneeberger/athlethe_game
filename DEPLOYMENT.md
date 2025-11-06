# Deployment-Anleitung

## Was wird benötigt?

**Nichts Besonderes!** Die App ist eine statische Single-Page-Application (SPA) und benötigt:
- ✅ Kein Backend
- ✅ Keine Datenbank
- ✅ Keine Server-Side-Logik
- ✅ Nur statische Dateien (HTML, CSS, JS)

## 1. Production Build erstellen

```bash
npm run build
```

Dies erstellt einen optimierten Build im Ordner `dist/`, der auf jeden statischen Web-Server hochgeladen werden kann.

## 2. Build lokal testen

```bash
npm run preview
```

Öffne `http://localhost:4173` um den Production-Build lokal zu testen.

## 3. Hosting-Optionen

### Option A: Vercel (Empfohlen - Einfachste Lösung)

1. **Installiere Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   Folge den Anweisungen. Die App wird automatisch gebaut und deployed.

3. **Oder via GitHub:**
   - Push Code zu GitHub
   - Gehe zu [vercel.com](https://vercel.com)
   - Importiere das Repository
   - Vercel erkennt automatisch Vite und deployed

**Vorteile:**
- ✅ Kostenlos für kleine Projekte
- ✅ Automatisches HTTPS
- ✅ Custom Domain möglich
- ✅ Automatische Deployments bei Git Push

### Option B: Netlify

1. **Installiere Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build & Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. **Oder via Drag & Drop:**
   - Gehe zu [netlify.com](https://netlify.com)
   - Ziehe den `dist/` Ordner in den Browser

**Vorteile:**
- ✅ Kostenlos
- ✅ Einfaches Drag & Drop
- ✅ Automatisches HTTPS

### Option C: GitHub Pages

1. **Installiere gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Füge Script zu package.json hinzu:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Update vite.config.js:**
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/athlethe_game/' // Dein Repository-Name
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

**Vorteile:**
- ✅ Kostenlos
- ✅ Direkt mit GitHub verbunden
- ⚠️ URL: `https://username.github.io/athlethe_game/`

### Option D: Eigener Server (Nginx, Apache, etc.)

1. **Build erstellen:**
   ```bash
   npm run build
   ```

2. **dist/ Ordner auf Server hochladen**

3. **Nginx Konfiguration:**
   ```nginx
   server {
     listen 80;
     server_name deine-domain.com;
     root /path/to/dist;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

   **Wichtig:** `try_files` mit `/index.html` ist notwendig für React Router!

4. **Apache .htaccess:**
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Option E: Cloudflare Pages

1. Push Code zu GitHub/GitLab
2. Gehe zu [pages.cloudflare.com](https://pages.cloudflare.com)
3. Importiere Repository
4. Build Command: `npm run build`
5. Build Output Directory: `dist`

## Wichtige Hinweise

### React Router & 404 Errors

Da es eine SPA ist, müssen alle Routen auf `index.html` zeigen. Die meisten Hosting-Provider machen das automatisch, aber bei eigenem Server muss die Konfiguration angepasst werden (siehe oben).

### Base Path

Falls die App nicht im Root-Verzeichnis liegt (z.B. `/athlethe_game/`), muss in `vite.config.js` der `base` Parameter gesetzt werden:

```js
export default defineConfig({
  plugins: [react()],
  base: '/dein-pfad/'
})
```

### Environment Variables

Falls später echte API-URLs benötigt werden, können Environment Variables verwendet werden:

1. Erstelle `.env.production`:
   ```
   VITE_API_URL=https://api.example.com
   ```

2. Verwende in Code:
   ```js
   const apiUrl = import.meta.env.VITE_API_URL
   ```

## Empfehlung

**Für schnelles Deployment:** Vercel oder Netlify
- Einfachste Einrichtung
- Automatisches HTTPS
- Kostenlos für kleine Projekte
- Automatische Deployments

**Für GitHub-Integration:** GitHub Pages
- Direkt mit Repository verbunden
- Kostenlos

**Für volle Kontrolle:** Eigener Server
- Maximale Flexibilität
- Eigene Domain
- Eigene Konfiguration

## Checkliste vor Deployment

- [ ] `npm run build` erfolgreich
- [ ] `npm run preview` lokal getestet
- [ ] Alle Routen funktionieren
- [ ] Mobile Responsive getestet
- [ ] Keine Console-Errors
- [ ] Base Path korrekt konfiguriert (falls nötig)

