import { Express, Request, Response } from 'express'

import { NoAuth } from './Pages/Login'
import { IndexPage } from './Pages/Player'
import { SpotifyMain } from './Modules/controller'

export async function Routes(app: Express) {
  app.get('/', async (req, res) => {
    const token = req.session.spotifyAccount

    if (token === undefined) {
      res.send(NoAuth)
    } else {
      res.send(IndexPage(token['access_token']))
    }
  })

  await SpotifyMain(app)
}
