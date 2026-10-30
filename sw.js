// ============================================================
// Service worker: permite usar la guía sin conexión.
// Usa la red primero (así siempre llegan las actualizaciones)
// y, si no hay conexión, usa la copia guardada.
// No hace falta cambiar este archivo al actualizar datos.
// ============================================================
const CACHE = 'belana-assistant-cache';

// Carga PERSONAJES e iconoDe desde data.js
importScripts('data.js');

// Archivos que se guardan al instalar
const ARCHIVOS = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  ...PERSONAJES.map(p => iconoDe(p)),
  ...MONSTERLINGS.map(m => iconoMonster(m.nombre)),
  ...ARTEFACTOS.map(a => iconoArtefacto(a.nombre)),
  ...PIEZAS_EQUIPO.map(x => iconoConjunto(x.conjunto, PIEZA_NUM[x.pieza]))
];

// Instalación: guarda los archivos. Si alguno falta, los demás se guardan igualmente.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.allSettled(ARCHIVOS.map(url => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

// Activación: toma el control de inmediato
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Peticiones: red primero; si no hay conexión, usa la copia guardada.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then(respuesta => {
        if (respuesta.ok) {
          const copia = respuesta.clone();
          caches.open(CACHE).then(cache => cache.put(req, copia));
        }
        return respuesta;
      })
      .catch(() =>
        caches.match(req).then(enCache =>
          enCache || caches.match(new URL('./index.html', self.registration.scope))
        )
      )
  );
});
