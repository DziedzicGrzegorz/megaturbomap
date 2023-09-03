import express, {Application} from "express";
import {json, urlencoded} from "body-parser";
import morgan from "morgan";
import cors from "cors";
import 'express-async-errors'
import {handleError, ValidationError} from "./utils/erros";
import rateLimit from "express-rate-limit";
import {adRouter} from "./router/adRouter";
//import {pool} from "./utils/db";
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
})

export function createServer(): Application {
    const app = express();
    app
        .disable("x-powered-by")
        .use(morgan("dev"))
        .use(urlencoded({extended: true}))
        .use(json())
        .use(cors({
            origin: ['http://localhost:3001', 'http://localhost:4173'],
        }))
        .use(limiter)
        .use('/ad',adRouter)
        .get("/message/:name", (req, res) => {
            return res.json({message: `hello ${req.params.name}`});
        })
        .get("/healthz", (req, res) => {
            return res.json({ok: true});
        })
        .get("/error",async () => {
            throw new ValidationError("test Error");
        })
        .get("/InternalError",async () => {
            throw new Error("Internal Error");
        })
        .use(handleError)

return app;
}
