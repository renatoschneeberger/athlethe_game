# Deployment auf eigenen Server

## Übersicht

Die App kann auf jedem Server mit einem Web-Server (Nginx, Apache, Node.js, etc.) deployed werden. Da es eine statische SPA ist, benötigt sie nur einen Web-Server, der statische Dateien ausliefert.

## Vorbereitung

### 1. Build erstellen

```bash
npm run build
```

Dies erstellt den optimierten Build im `dist/` Ordner.

### 2. dist/ Ordner auf Server hochladen

Verwende `scp`, `rsync`, `ftp`, oder einen anderen Transfer-Methode:

```bash
# Beispiel mit scp
scp -r dist/* user@dein-server.com:/var/www/athlethe_game/

# Beispiel mit rsync (empfohlen)
rsync -avz --delete dist/ user@dein-server.com:/var/www/athlethe_game/
```

## Option 1: Nginx (Empfohlen)

### Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

### Konfiguration

Erstelle `/etc/nginx/sites-available/athlethe_game`:

```nginx
server {
    listen 80;
    server_name deine-domain.com www.deine-domain.com;
    root /var/www/athlethe_game;
    index index.html;

    # Gzip Kompression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # React Router - Alle Routen auf index.html umleiten
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache für statische Assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Aktivieren

```bash
# Link erstellen
sudo ln -s /etc/nginx/sites-available/athlethe_game /etc/nginx/sites-enabled/

# Test Konfiguration
sudo nginx -t

# Nginx neu starten
sudo systemctl restart nginx
```

### HTTPS mit Let's Encrypt (Optional, aber empfohlen)

```bash
# Certbot installieren
sudo apt install certbot python3-certbot-nginx

# SSL Zertifikat erstellen
sudo certbot --nginx -d deine-domain.com -d www.deine-domain.com

# Auto-Renewal testen
sudo certbot renew --dry-run
```

## Option 2: Apache

### Installation

```bash
# Ubuntu/Debian
sudo apt install apache2

# CentOS/RHEL
sudo yum install httpd
```

### Konfiguration

Erstelle `/etc/apache2/sites-available/athlethe_game.conf`:

```apache
<VirtualHost *:80>
    ServerName deine-domain.com
    ServerAlias www.deine-domain.com
    DocumentRoot /var/www/athlethe_game

    <Directory /var/www/athlethe_game>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # React Router Support
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </IfModule>

    # Gzip Kompression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>
</VirtualHost>
```

### .htaccess Alternative

Falls du keine Server-Konfiguration ändern kannst, erstelle `/var/www/athlethe_game/.htaccess`:

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

### Aktivieren

```bash
# Site aktivieren
sudo a2ensite athlethe_game.conf

# Apache neu starten
sudo systemctl restart apache2
```

## Option 3: Node.js Express Server

Falls du Node.js auf dem Server hast, kannst du einen einfachen Express Server verwenden.

### server.js erstellen

```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien ausliefern
app.use(express.static(join(__dirname, 'dist')));

// React Router - Alle Routen auf index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
```

### package.json erweitern

```json
{
  "scripts": {
    "start": "node server.js",
    "start:prod": "NODE_ENV=production node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### Mit PM2 betreiben (für Production)

```bash
# PM2 installieren
npm install -g pm2

# Server starten
pm2 start server.js --name athlethe_game

# Auto-Start bei Reboot
pm2 startup
pm2 save
```

## Option 4: Docker

### Dockerfile erstellen

```dockerfile
# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf für Docker

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build & Run

```bash
# Docker Image bauen
docker build -t athlethe_game .

# Container starten
docker run -d -p 80:80 --name athlethe_game athlethe_game
```

## Wichtige Hinweise

### 1. React Router Konfiguration

**Sehr wichtig!** Da es eine Single-Page-Application ist, müssen alle Routen auf `index.html` zeigen. Ohne diese Konfiguration funktionieren direkte URLs wie `/app/challenge` nicht.

### 2. Dateiberechtigungen

```bash
# Setze korrekte Berechtigungen
sudo chown -R www-data:www-data /var/www/athlethe_game
sudo chmod -R 755 /var/www/athlethe_game
```

### 3. Firewall

```bash
# Ubuntu/Debian (UFW)
sudo ufw allow 'Nginx Full'
# oder für Apache
sudo ufw allow 'Apache Full'

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 4. Base Path (falls nicht im Root)

Falls die App nicht im Root-Verzeichnis liegt (z.B. `https://deine-domain.com/athlethe_game/`), muss `vite.config.js` angepasst werden:

```js
export default defineConfig({
  plugins: [react()],
  base: '/athlethe_game/'
})
```

Dann Build neu erstellen.

## Deployment-Script Beispiel

Erstelle `deploy.sh`:

```bash
#!/bin/bash

# Build erstellen
echo "Building..."
npm run build

# Auf Server hochladen
echo "Uploading..."
rsync -avz --delete dist/ user@dein-server.com:/var/www/athlethe_game/

# Server neu laden (falls nötig)
echo "Reloading server..."
ssh user@dein-server.com "sudo systemctl reload nginx"

echo "Deployment abgeschlossen!"
```

Ausführbar machen:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Checkliste

- [ ] Build erfolgreich erstellt (`npm run build`)
- [ ] `dist/` Ordner auf Server hochgeladen
- [ ] Web-Server konfiguriert (Nginx/Apache/Node.js)
- [ ] React Router Rewrite-Regel konfiguriert
- [ ] Dateiberechtigungen gesetzt
- [ ] Firewall konfiguriert
- [ ] Domain/DNS konfiguriert (falls eigene Domain)
- [ ] HTTPS eingerichtet (empfohlen)
- [ ] Getestet: Alle Routen funktionieren

## Troubleshooting

### 404 bei direkten URLs

→ React Router Rewrite-Regel fehlt oder falsch konfiguriert

### Assets werden nicht geladen

→ Base Path in `vite.config.js` prüfen
→ Dateiberechtigungen prüfen

### CORS Errors

→ Nicht relevant für statische Dateien, aber falls API-Calls: CORS Headers im Server konfigurieren

