const { generateSW, injectManifest } = require('workbox-build');

let swDest = 'public/service-worker.js';
let swSrc = 'themes/diary/static/service-worker.js';
injectManifest({
    globDirectory: 'public',
    swSrc,
    swDest,
}).then(({ count, size }) => {
    console.log(`precache ${count} files`)
});

swDest = 'public/service-worker.min.js';
swSrc = 'themes/diary/static/service-worker.min.js'

injectManifest({
    globDirectory: 'public',
    swSrc,
    swDest,
}).then(({ count, size }) => {
    console.log(`precache ${count} files`)
});