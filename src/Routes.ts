import { Express, Request, Response } from 'express'

export async function Routes(app: Express) {
  app.get('/', (req: Request, res: Response) => {
    res.send('hi')
  })
}
