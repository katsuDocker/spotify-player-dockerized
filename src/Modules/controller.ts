import { Express } from 'express'

import { AuthIn, AuthCallback } from './APIs/auth'
import { sAPI } from './APIs/client'

export async function SpotifyMain(app: Express) {
  // Auth
  app.get('/api/auth/login', async (req, res) => {
    await AuthIn(req, res, sAPI())
  })

  app.get('/api/auth/callback', async (req, res) => {
    await AuthCallback(req, res, sAPI())
  })

  app.get('/api/auth/logout', async (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err
    })

    res.redirect('/')
  })
}
