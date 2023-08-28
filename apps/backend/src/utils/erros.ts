import type {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
    constructor(message?: string) {
        super(message); // (1)
        Object.setPrototypeOf(this, ValidationError.prototype); // (2)
    }
//     Apologies for any confusion, and thank you for your patience. The Object.setPrototypeOf(this, ValidationError.prototype); is used to fix a TypeScript-specific issue when extending built-in JavaScript error objects, like Error.
// When you extend an Error object in TypeScript, TypeScript will do some internal magic to generate the JavaScript code. However, this generated JavaScript code has an issue: when you do instanceof ValidationError, it doesn't return true as expected. So the line Object.setPrototypeOf(this, ValidationError.prototype); is a workaround for this issue.
// Here's a bit more detail:
// Object.setPrototypeOf(obj, prototype): The Object.setPrototypeOf() method sets the prototype (i.e., the internal [[Prototype]] property) of a specified object to another object or null.
// this: Refers to the instance of ValidationError being created.
// ValidationError.prototype: Refers to the prototype object of ValidationError.
// In simpler terms, Object.setPrototypeOf(this, ValidationError.prototype); sets the internal [[Prototype]] property of the ValidationError instance to ValidationError.prototype, which makes instanceof checks work correctly in TypeScript when you're extending the Error object.
}

export const handleError = (err: Error, _req: Request, res: Response,next: NextFunction) => {
    // console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .json({
            message: err instanceof ValidationError ? err.message : "Internal Server Error",
        });
    next()
}