if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`../jwc.js`)
    .then((swReg) => {
      //console.log("Service Worker is registered", swReg);
    })
    .catch((err) => {
      //console.error("Service Worker Error", err);
    });
} else {
  //console.warn("serviceWorker is not supported");
}
