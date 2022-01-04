/**
 * Required External Modules
 */

import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'

// Router
import ProductRouter from './routes/ProductRouter'

/**
 * App Configuration 
 */

const app:Application = express()
app.use(bodyParser.json())

/**
 * Router
 */

app.use('/api', ProductRouter)


/**
 * Server Activation
 */

app.listen(3001, () => {
    console.log('app listen')
})