;
//asignando un nombre y versión al cache
const CACHE_NAME = 'v1_cache_jeison_portfolio',
 urlsToCache = [
     './',
     'https://jeisonroblero.ga/',
     './es/',
     'https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css',
     './assets/img/guatemala.png',
     './assets/img/united-states.png',
     './assets/pdf/Jeison-Cv-En.pdf',
     './assets/pdf/Jeison-Cv-Es.pdf',
     './assets/music/click.mp3',
     './assets/music/Night.mp3',
     './assets/img/perfil01.png',
     './assets/img/Perfil.jpg',
     './assets/img/materialize-icon.png',
     './assets/img/mysql-logo.png',
     './assets/img/postgress-icon.png',
     './assets/img/net-icon.png',
     './assets/videos/ieaenglish.mkv',
     './assets/img/ieaenglish-1.png',
     './assets/videos/zeli-1.mp4',
     './assets/img/zeli-thumb.png',
     './assets/videos/scroll.mp4',
     './assets/img/scroll-nav.png',
     './assets/videos/amazing-1.mp4',
     './assets/img/amazing-thumb.png',
     './assets/videos/speech-1.mp4',
     './assets/img/speech-1.png',
     './assets/img/testimonial1.png',
     './assets/img/testimonial2.png',
     './assets/img/testimonial3.png',
     './assets/js/scrollreveal.min.js',
     './assets/js/swiper-bundle.min.js',
     './assets/js/mixitup.min.js',
     './assets/js/main.js'
 ]

 
//Almacenando en cahé los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})
  
//Cuando se instala el SW, se activa y busca los recursos para que 
//pueda funcionar sin conexión a internet
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]
  
    e.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              //Eliminamos lo que ya no se necesita en cache
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName)
              }
            })
          )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})
  

//cuando el navegador recupera una url, actualiza la información almacenada
self.addEventListener('fetch', e => {
    //Da respuesta ya sea con el objeto en caché o continua buscando la url real
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          if (res) {
            //recuperando del cache
            return res
          }
          //recuperando de la petición a la url
          return fetch(e.request)
        })
    )
})