import express, { Express } from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    spotifyAccount: { [key: string]: string }
  }
}

export function Middleware(app: Express) {
  app.use(express.static('static'))

  // app.use(bodyParser.json())
  app.use(bodyParser.text())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.use(
    session({
      secret: String(process.env.SESSION_SECRET),
      saveUninitialized: false,
    })
  )
}
