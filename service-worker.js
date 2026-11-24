const CACHE_NAME = 'app-cache-v7.15';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            const urlsToCache = [
                '/Workouts/index.html',
                '/Workouts/resources/css/animations.css',
                '/Workouts/resources/css/calendar.css',
                '/Workouts/resources/css/fixNvars.css',
                '/Workouts/resources/css/FlexReorder.css',
                '/Workouts/resources/css/fonts.css',
                '/Workouts/resources/css/global.css',
                '/Workouts/resources/css/mediaQueries.css',
                '/Workouts/resources/css/parameters.css',
                '/Workouts/resources/css/screenSaver.css',
                '/Workouts/resources/css/selectionPage.css',
                '/Workouts/resources/css/sessionPage.css',
                '/Workouts/resources/css/stats.css',
                '/Workouts/resources/css/timeSelector.css',
                '/Workouts/resources/css/konsole.css',
                '/Workouts/resources/css/toggle.css',
                '/Workouts/resources/css/updatePage.css',
                '/Workouts/resources/css/utility.css',
                '/Workouts/resources/fonts/Roboto-Black.ttf',
                '/Workouts/resources/fonts/Roboto-BlackItalic.ttf',
                '/Workouts/resources/fonts/Roboto-Bold.ttf',
                '/Workouts/resources/fonts/Roboto-BoldItalic.ttf',
                '/Workouts/resources/fonts/Roboto-Italic.ttf',
                '/Workouts/resources/fonts/Roboto-Light.ttf',
                '/Workouts/resources/fonts/Roboto-LightItalic.ttf',
                '/Workouts/resources/fonts/Roboto-Medium.ttf',
                '/Workouts/resources/fonts/Roboto-MediumItalic.ttf',
                '/Workouts/resources/fonts/Roboto-Regular.ttf',
                '/Workouts/resources/fonts/Roboto-Thin.ttf',
                '/Workouts/resources/fonts/Roboto-ThinItalic.ttf',
                '/Workouts/resources/splash_screens/splash_27.png',
                '/Workouts/resources/splash_screens/splash_29.png',
                '/Workouts/resources/splash_screens/splash_23.png',
                '/Workouts/resources/splash_screens/splash_25.png',
                '/Workouts/resources/splash_screens/splash_21.png',
                '/Workouts/resources/splash_screens/splash_17.png',
                '/Workouts/resources/splash_screens/splash_19.png',
                '/Workouts/resources/splash_screens/splash_31.png',
                '/Workouts/resources/splash_screens/splash_33.png',
                '/Workouts/resources/splash_screens/splash_10.png',
                '/Workouts/resources/splash_screens/splash_8.png',
                '/Workouts/resources/splash_screens/splash_6.png',
                '/Workouts/resources/splash_screens/splash_4.png',
                '/Workouts/resources/splash_screens/splash_2.png',
                '/Workouts/resources/splash_screens/splash_0.png',
                '/Workouts/resources/splash_screens/splash_14.png',
                '/Workouts/resources/splash_screens/splash_12.png',
                '/Workouts/resources/splash_screens/splash_28.png',
                '/Workouts/resources/splash_screens/splash_30.png',
                '/Workouts/resources/splash_screens/splash_24.png',
                '/Workouts/resources/splash_screens/splash_26.png',
                '/Workouts/resources/splash_screens/splash_22.png',
                '/Workouts/resources/splash_screens/splash_18.png',
                '/Workouts/resources/splash_screens/splash_20.png',
                '/Workouts/resources/splash_screens/splash_32.png',
                '/Workouts/resources/splash_screens/splash_34.png',
                '/Workouts/resources/splash_screens/splash_11.png',
                '/Workouts/resources/splash_screens/splash_9.png',
                '/Workouts/resources/splash_screens/splash_7.png',
                '/Workouts/resources/splash_screens/splash_5.png',
                '/Workouts/resources/splash_screens/splash_3.png',
                '/Workouts/resources/splash_screens/splash_1.png',
                '/Workouts/resources/splash_screens/splash_15.png',
                '/Workouts/resources/splash_screens/splash_13.png',
                '/Workouts/resources/imgs/appLogo.png',
                '/Workouts/resources/imgs/pastekup.png',
                '/Workouts/resources/imgs/link.png',
                '/Workouts/resources/imgs/add.svg',
                '/Workouts/resources/imgs/arrow.png',
                '/Workouts/resources/imgs/bin.svg',
                '/Workouts/resources/imgs/edit.svg',
                '/Workouts/resources/imgs/grab.svg',
                '/Workouts/resources/imgs/icon2.ico',
                '/Workouts/resources/imgs/congrats.png',
                '/Workouts/resources/imgs/clock.png',
                '/Workouts/resources/imgs/barbell.png',
                '/Workouts/resources/imgs/sad.png',
                '/Workouts/resources/imgs/web_ss.png',
                '/Workouts/resources/imgs/phone_ss.png',
                '/Workouts/resources/imgs/next.svg',
                '/Workouts/resources/imgs/parameters.svg',
                '/Workouts/resources/imgs/pause.svg',
                '/Workouts/resources/imgs/play.svg',
                '/Workouts/resources/imgs/preview.png',
                '/Workouts/resources/imgs/undo.png',
                '/Workouts/resources/imgs/backArrow.png',
                '/Workouts/resources/imgs/sound_full.svg',
                '/Workouts/resources/imgs/sound_low.svg',
                '/Workouts/resources/imgs/sound_mid.svg',
                '/Workouts/resources/imgs/sound_off.svg',
                '/Workouts/resources/imgs/stats.svg',
                '/Workouts/resources/imgs/tick.png',
                '/Workouts/resources/imgs/timer2.svg',
                '/Workouts/resources/js/bothSessions.js',
                '/Workouts/resources/js/bottomNotification.js',
                '/Workouts/resources/js/calendar.js',
                '/Workouts/resources/js/checkNformat.js',
                '/Workouts/resources/js/click.js',
                '/Workouts/resources/js/dataNsav.js',
                '/Workouts/resources/js/domAppend.js',
                '/Workouts/resources/js/errorHandling.js',
                '/Workouts/resources/js/FlexReorder.js',
                '/Workouts/resources/js/globalVars.js',
                '/Workouts/resources/js/graphicUpdate.js',
                '/Workouts/resources/js/Konsole.js',
                '/Workouts/resources/js/init.js',
                '/Workouts/resources/js/intervallSession.js',
                '/Workouts/resources/js/jquery.js',
                '/Workouts/resources/js/keys.js',
                '/Workouts/resources/js/method.js',
                '/Workouts/resources/js/phone.js',
                '/Workouts/resources/js/readWrite.js',
                '/Workouts/resources/js/schedule.js',
                '/Workouts/resources/js/selectionPage.js',
                '/Workouts/resources/js/sound.js',
                '/Workouts/resources/js/timeSelector.js',
                '/Workouts/resources/js/updatePage.js',
                '/Workouts/resources/js/utility.js',
                '/Workouts/resources/js/workoutSession.js',
                '/Workouts/resources/sounds/beep.mp3',
                '/Workouts/resources/sounds/beep2x3.mp3'
            ];

            const cachePromises = urlsToCache.map(url => {
                return cache.add(url).then(() => {
                    //console.log(`Successfully cached: ${url}`);
                }).catch(error => {
                    console.error(`Failed to cache ${url}:`, error);
                });
            });

            return Promise.all(cachePromises);
        }).catch(error => {
            console.error('Cache open failed:', error);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => {
                    return caches.delete(name); // Delete old caches
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => { 
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (event.request.method === 'GET') {
                        cache.put(event.request, networkResponse.clone()); // Update cache with new response
                    }
                    return networkResponse;
                }).catch(error => {
                    console.error('Fetch failed for:', event.request.url, '; Error:', error);
                    return response; // Return cached response if fetch fails
                });

                return response || fetchPromise;
            });
        })
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            if(clientList.length > 0){return clientList[0].focus()};

            return clients.openWindow('/');
        })
    );
});