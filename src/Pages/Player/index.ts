export function IndexPage(session: string) {
  const index = `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>katzPlayer</title>
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/player.css" />
    <link rel="stylesheet" href="/css/playlist.css" />
  </head>
  <body>
    <div class="container">
      <div class="playerDetailed">
        <div class="cover">
          <img src="" alt="cover" id="track-cover-image" />
        </div>
      </div>
      <div class="controller">
        <div id="tab">
          <button id="control-button">Control Center</button>
          <button id="playlist-button">Your Playlist</button>
        </div>
        <div id="control-controller">
          <div class="detailed">
            <h2 id="track-title"></h2>
            <h4 id="track-artist"></h4>
            <div id="track-playlist"></div>
          </div>
          <div class="detailed">
            <input
              id="durationBar"
              type="range"
              min="0"
              step="0.1"
              value="0"
              max="220946"
            />
          </div>
          <div class="controller-manager">
            <button id="shuffle"></button>
            <button id="prev">⏮️</button>
            <button id="togglePlay"></button>
            <button id="next">⏭️</button>
            <button id="repeat"></button>
          </div>
          <div class="volume">
            <button id="volDown">➖</button>
            <span id="vol"> 0 </span>
            <button id="volUp">➕</button>
          </div>
        </div>
        <div id="playlist-controller" class="hidden">
          <h1>Hey</h1>
        </div>
      </div>
    </div>

    <button id="logout">Log Out</button>

    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="/js/Tabs.js"></script>

    <script src="/js/function/SecToMin.js"></script>
    <script src="/js/function/Player.js"></script>
    <script src="/js/function/Playlist.js"></script>
    <script src="/js/function/MediaController.js"></script>

    <script>
      sessionStorage.setItem('sessionToken', '${session}')

      PlayerFunction();
      PlayList(0);
    </script>
  </body>
</html>
`
  return index
}
