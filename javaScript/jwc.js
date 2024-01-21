self.addEventListener("notificationclick", (event) => {
  //console.log(event);
  event.notification.close();
  const action = event.action;
  if (action == "explore") clients.openWindow("/");
  if (action == "close");
});

// const filesToCache = [
//   "index.html",
//   "page1.html",
//   "CSS/page1.css",
//   "JS/page1.js",
//   "not-found.html",
//   "not-found-online.html",
// ];

// self.addEventListener("install", (event) => {
//   console.log("installing service worker ", event);
//   event.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       return cache.addAll(filesToCache);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("activating service worker", event);
// });

// self.addEventListener("fetch", (event) => {
//   console.log("fetching ", event.request.url);
//   //console.log(event.request);
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((rsponse) => {
//         console.log(rsponse);
//         if (rsponse) {
//           console.log("Found in cache", event.request.url);
//           return rsponse;
//         }
//         return fetch(event.request)
//           .then((res) => {
//             if (res.status === 404) {
//               return caches.match("/not-found-online.html");
//             }
//             return res;
//           })
//           .catch((error) => {
//             return caches.match("not-found.html");
//           });
//       })
//       .catch((error) => {})
//   );
// });
