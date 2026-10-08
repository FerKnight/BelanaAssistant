/* Service worker de Belana Assistant.
   Sube el número de VERSION cada vez que cambies index.html para que los
   dispositivos descarguen la versión nueva. */
var VERSION = 'belana-assistant-v5';
var ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) { return c.addAll(ARCHIVOS); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (claves) {
      return Promise.all(
        claves.filter(function (k) { return k !== VERSION; })
              .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  /* Páginas: red primero (contenido fresco), caché si no hay conexión. */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (resp) {
        var copia = resp.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copia); });
        return resp;
      }).catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
      })
    );
    return;
  }

  /* Resto de archivos: caché primero. */
  e.respondWith(
    caches.match(req).then(function (r) {
      return r || fetch(req).then(function (resp) {
        var copia = resp.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copia); });
        return resp;
      });
    })
  );
});
