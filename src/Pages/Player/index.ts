export function IndexPage(session: string) {
  const index = `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>katzPlayer</title>
  </head>
  <body>
    <div class="container">
      <div class="playerDetailed">
        <div class="cover">
          <img src="" alt="cover" id="track-cover-image" />
        </div>
        <div class="detailed">
          <h2 id="track-title"></h2>
          <h4 id="track-artist"></h4>
          <div id="track-playlist"></div>
        </div>
      </div>
      <div class="controller">
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
        <button id="prev">⏮️</button>
        <button id="togglePlay"></button>
        <button id="next">⏭️</button>
      </div>
    </div>

    <button id="logout">Log Out</button>

    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
      function SecToMin(sec) {
        var mins = Math.floor(sec / 60);
        var secs = Math.floor(sec - mins * 60);
        if (secs < 10) {
          secs = "0" + secs;
        }
        if (mins < 10) {
          mins = "0" + mins;
        }
        return mins + ":" + secs;
      }

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = "${session}";
        const player = new Spotify.Player({
          name: "katz",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.1,
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          localStorage.setItem("device_id", device_id);
          fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: "Bearer ${session}",
            }),
            body: JSON.stringify({
              device_ids: [device_id],
              play: true,
            }),
          });

          Swal.fire({
            icon: "success",
            text: "Spotify Web Playback SDK is connected!",
          });

          window.setInterval(() => {
            player.getCurrentState().then((state) => {
              if (!state) return;
              document.querySelector("#durationBar").value = state.position;
            });
          });
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
          window.location.replace("/api/auth/logout");
        });

        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
          window.location.replace("/api/auth/logout");
        });

        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });

        document.getElementById("togglePlay").onclick = function () {
          player.togglePlay();
        };

        document.getElementById("prev").onclick = function () {
          player.previousTrack();
        };

        document.getElementById("next").onclick = function () {
          player.nextTrack();
        };

        document.querySelector("#logout").onclick = function () {
          window.location.replace("/api/auth/logout");
        };

        document.querySelector("#durationBar").onchange = function () {
          player.seek(document.querySelector("#durationBar").value);
        };

        function playToggle() {
          player.togglePlay();
        }

        function prev() {
          player.previousTrack();
        }

        function next() {
          player.nextTrack();
        }

        player.on("player_state_changed", (state) => {
          const playlist =
            state.context.metadata.context_description !== undefined
              ? state.context.metadata.context_description
              : "Single";
          const trackImage =
            state.track_window.current_track.album.images[0].url;
          const trackName = state.track_window.current_track.name;
          const trackArtist = state.track_window.current_track.artists
            .map((a) => a.name)
            .join(", ");

          // Web Title
          const title = trackName + " | " + playlist;
          document.querySelector("title").innerHTML = title;

          // Body BG
          document.body.style.background = "url(" + trackImage + ")";

          // Detailed
          document.querySelector("#track-cover-image").src = trackImage;
          document.querySelector("#track-title").innerHTML = trackName;
          document.querySelector("#track-artist").innerHTML = trackArtist;
          document.querySelector("#track-playlist").innerHTML = playlist;

          // Controller
          document
            .querySelector("#durationBar")
            .setAttribute("max", state.duration);
          if (state.paused) {
            document.querySelector("#togglePlay").innerHTML = "▶️";
          } else {
            document.querySelector("#togglePlay").innerHTML = "⏸️";
          }
        });

        player.connect();
      };
    </script>

    <script type="module">
      import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

      const socket = io();

      socket.on("controller", (state) => {
        if (state == "play") {
          fetch("https://api.spotify.com/v1/me/player", {
            headers: new Headers({
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: "Bearer ${session}",
            }),
          })
            .then((resp) => resp.json())
            .then((resp) => {
              if (resp.is_playing) {
                fetch(
                  "https://api.spotify.com/v1/me/player/pause?device_id=" +
                    localStorage.getItem("device_id"),
                  {
                    method: "PUT",
                    headers: new Headers({
                      "Content-Type": "application/json; charset=UTF-8",
                      Authorization: "Bearer ${session}",
                    }),
                  }
                );
              } else {
                fetch(
                  "https://api.spotify.com/v1/me/player/play?device_id=" +
                    localStorage.getItem("device_id"),
                  {
                    method: "PUT",
                    headers: new Headers({
                      "Content-Type": "application/json; charset=UTF-8",
                      Authorization: "Bearer ${session}",
                    }),
                  }
                );
              }
            });
        } else if (state == "prev") {
          fetch(
            "https://api.spotify.com/v1/me/player/previous?device_id=" +
              localStorage.getItem("device_id"),
            {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer ${session}",
              }),
            }
          );
        } else if (state == "next") {
          fetch(
            "https://api.spotify.com/v1/me/player/next?device_id=" +
              localStorage.getItem("device_id"),
            {
              method: "POST",
              headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer ${session}",
              }),
            }
          );
        }
      });
    </script>
  </body>
</html>
`
  return index
}
