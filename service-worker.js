const addResourcesToCache = async (resouces) => {
    const cache = await caches.open('v1');  // creates a new cache called v1
    await cache.addAll(resouces);
};

self.addEventListener('install', (event) => {
    event.waitUntil(
        addResourcesToCache([
            'index.html',
            'snake_game.js',
            'leaderboard.html',
            'how_to_play.html',
            'about_us.html',
            'leaderboard.js',
            'style.css',
            'style-leaderboard.css',
            'style-about.css',
            'snakeIcon.ico',
            'eat.wav',
            'game-over.wav',
            'game-win.wav'
        ])
    )
});