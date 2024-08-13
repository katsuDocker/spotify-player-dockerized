import { Express, Request, Response } from 'express'

import { NoAuth } from './Pages/Login'
import { IndexPage } from './Pages/Player'

export async function Routes(app: Express) {
  app.get('/', async (req, res) => {
    const token = req.session.spotifyAccount

    if (token === undefined) {
      res.send(NoAuth)
    } else {
      res.send(IndexPage(token['access_token']))
    }
  })
}
