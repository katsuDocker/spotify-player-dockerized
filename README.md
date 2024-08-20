# Spotify Playback SDK

This project is based on the repository [UP-archive/spotify-remote](https://github.com/UP-archive/spotify-remote) which is I made it for my `Microprocessor's Final Project` and the repository that I mentions is the web UI with socket base for API serve.

## Installation

For the installation just `clone this repository` and install package by using

```zsh
yarn # It's okay to use `npm` or `pnpm` too
```

After that, don't forget to set variable in `.env` file by using the example from [.env.example](./.env.example)

### Config setting up

#### Session Secret

For the session secret. You can set it with a random string or just use unique string of your own instead.

```conf
SESSION_SECRET=""   # a secret parse for session can use a random string instead :3
```

And about the Spotify API. Please go to [Spotify Developer Portal](https://developer.spotify.com/), create an app and get the key that required below this

```conf
CLIENT_ID=""        # Spotify Client ID
CLIENT_SECRET=""    # Spotify Client Secret
REDIRECT_URI=""     # Redirecting URI that register with spotify
```

## Usage

For the usage. This project require the user to have `Spotify Premium`. It's okay with any plan. If you don't have that's really tooooooo bad because Web Playback API need a premium plan to use the Web Playback SDK (and yeah there's no ads, can show on discord, can let your friend join your session and yeah~ the ecosystem is really really great :3). So if you already have it just run

```sh
yarn start # it's okay w `npm run start` and `pnpm start`
```

If you want to contributed and want a dev console just run the below one

```sh
yarn dev # okay w `npm run dev` and `pnpm dev` too
```

And if you want and docker version... nah I'm lazy now.. (JK just give me a time and it gonna be soon :3)

---

Made w 🤍 by [Suphakit P.](https://suphakit.net)
