import type {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {}

export const handleError = (err: Error, _req: Request, res: Response,next: NextFunction) => {
    console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json({
            message: err instanceof ValidationError ? err.message : "Internal Server Error",
        });
    next()
}