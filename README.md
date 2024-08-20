# Spotify Playback SDK Dockerized

This project is based on the repository [dethMastery/spotify-plater](https://github.com/dethMastery/spotify-plater) and just added dockerfile and docker compose to create it as an image for the server installation

## Installation

For the dockerized version. Just setting up the config in docker compose file (if you need any explanation just go to [ENV Explanation](#env-explanation)) and then run the below command.

```zsh
docker compose up
```

## ENV Explanation

At first on session secret. You can set it with a random string or just use unique string of your own instead.

```yaml
SESSION_SECRET: ''
```

And on this part. Please go to [Spotify Developer Portal](https://developer.spotify.com/), create an app and get the key that required below this

```yaml
CLIENT_ID: '' # Spotify Client ID
CLIENT_SECRET: '' # Spotify Client Secret
REDIRECT_URI: '' # Redirect URI that register with Spotify
```

---

Made w 🤍 by [Suphakit P.](https://suphakit.net)
