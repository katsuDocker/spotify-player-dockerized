import SpotifyWebApi from 'spotify-web-api-node'

export function sAPI() {
  const credentials = {
    clientId: String(process.env.CLIENT_ID),
    clientSecret: String(process.env.CLIENT_SECRET),
    redirectUri: String(process.env.REDIRECT_URI),
  }

  return new SpotifyWebApi(credentials)
}
