import express from 'express'
import * as dot from 'dotenv'
import ezServe from 'ez-serve'

import { Routes } from './src/Routes'

dot.config()

const app = express()
const PORT = Number(process.env.PORT) || 3000

Routes(app)

ezServe(app, PORT)
