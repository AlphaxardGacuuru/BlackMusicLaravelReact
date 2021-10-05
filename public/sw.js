// // staticCacheName needs to be changed after any of the assets are changed
const staticCacheName = 'BlackMusicReactLaravelCache';
// const dynamicCacheName = 'site-dynamic-v1';
// // Assests to be cached
// const assets = [
// 	'/',
// 	'/posts',
// 	'/video-charts/newlyReleased/All',
// 	// '/search',
// 	'/cart',
// 	'/library',
// 	'/home',
// 	'manifest.webmanifest',
// 	'css/app.css',
// 	'css/custom.css',
// 	'js/app.js',
// 	'js/custom.js',
// 	'storage/img/musical-note-2.png',
// 	'storage/img/musical-note.png',
// 	'https://fonts.googleapis.com/css?family=Nunito',
// 	'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700',
// ];

// // Cache size limit function
// const limitCacheSize = (name, size) => {
// 	caches.open(name).then(cache => {
// 		cache.keys().then(keys => {
// 			if (keys.length > size) {
// 				cache.delete(keys[0]).then(limitCacheSize(name, size));
// 			}
// 		})
// 	})
// };

// Install event
self.addEventListener('install', e => {
	console.log('Service Worker installed');
	// Function to prevent the install event from stopping the async methods from finishing 
	// e.waitUntil(
	// 	// 	Cache assets for faster page loading and offline mode
	// 	caches.open(staticCacheName)
	// 		.then(cache => {
	// 			console.log('Caching files');
	// 			cache.addAll(assets);
	// 		})
	// 		.then(() => self.skipWaiting())
	// );
});

// Activate event
self.addEventListener('activate', e => {
	console.log('Service Worker Activated');
	// Function to prevent the install event from stopping the async methods from finishing 
	e.waitUntil(
		// Get cached assests based on keys
		caches.keys().then(staticCacheNames => {
			// Returns multiple promises 
			return Promise.all(
				//for each return check whether the key of the already cached assests is present if not delete 
				staticCacheNames.map(cache => {
					if (cache !== staticCacheName) {
						console.log('Service Worker: Clearing all cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// Fetch event
// self.addEventListener('fetch', e => {
// 	// console.log('Fetching')
// 	e.respondWith(
// 		fetch(e.request)
// 			.then(res => {
// 				// Make clone of response
// 				const resClone = res.clone();
// 				// Open cache
// 				caches.open(staticCacheName)
// 					.then(cache => {
// 						// Add response to cache
// 						cache.put(e.request, resClone);
// 					});
// 				return res
// 			}).catch(err => cache.match(e.request).then(res => res))
// 	)
// })