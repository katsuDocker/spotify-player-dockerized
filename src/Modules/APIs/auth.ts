import { Request, Response } from 'express'
import SpotifyWebApi from 'spotify-web-api-node'

export async function AuthIn(req: Request, res: Response, sAPI: SpotifyWebApi) {
  const scopes = [
    'ugc-image-upload',
    'user-read-recently-played',
    'user-top-read',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-modify',
    'user-follow-read',
    'user-library-modify',
    'user-library-read',
    'user-read-email',
    'user-read-private',
  ]

  var authUrl = sAPI.createAuthorizeURL(scopes, 'katzPlayer', true)
  res.redirect(authUrl)
}

export async function AuthCallback(
  req: Request,
  res: Response,
  sAPI: SpotifyWebApi
) {
  const { code } = req.query
  try {
    var data = await sAPI.authorizationCodeGrant(String(code))
    const { access_token, refresh_token } = data.body
    sAPI.setAccessToken(access_token)
    sAPI.setRefreshToken(refresh_token)

    req.session.spotifyAccount = { access_token, refresh_token }

    res.redirect('/')
  } catch (err) {
    res.send(`error ${err}`)
  }
}
