import express, {Application} from "express";
import {json, urlencoded} from "body-parser";
import morgan from "morgan";
import cors from "cors";
import 'express-async-errors'
import {handleError, ValidationError} from "./utils/erros";
//import {pool} from "./utils/db";

export function createServer(): Application {
    const app = express();
    app
        .disable("x-powered-by")
        .use(morgan("dev"))
        .use(urlencoded({extended: true}))
        .use(json())
        .use(cors({
            origin: 'http:localhost:3001',
        }))
        .get("/message/:name", (req, res) => {
            return res.json({message: `hello ${req.params.name}`});
        })
        .get("/healthz", (req, res) => {
            return res.json({ok: true});
        })
        .get("/error",async () => {
            throw new ValidationError("test Error");
        })
        .use(handleError)

return app;
}
