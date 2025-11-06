// Einfacher Express Server für Production
// Installation: npm install express
// Start: node server.js

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien ausliefern
app.use(express.static(join(__dirname, 'dist')));

// React Router - Alle Routen auf index.html umleiten
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
  console.log(`📦 Statische Dateien aus: ${join(__dirname, 'dist')}`);
});

