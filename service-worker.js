const addResourcesToCache = async (resouces) => {
    const cache = await caches.open('v1');  // creates a new cache called v1
    await cache.addAll(resouces);
};

self.addEventListener('install', (event) => {
    event.waitUntil(
        addResourcesToCache([
            '/',
            'index.html',
            'snake_game.js',
            '/pages/leaderboard.html',
            '/pages/how_to_play.html',
            '/pages/about_us.html',
            '/scripts/leaderboard.js',
            '/styles/style.css',
            '/styles/style-leaderboard.css',
            '/styles/style-about.css',
            '/resources/images/snakeIcon.ico',
            '/resources/sounds/eat.wav',
            '/resources/sounds/game-over.wav',
            '/resources/sounds/game-win.wav'
        ])
    )
});