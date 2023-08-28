import { Request, Response } from 'express';
import {handleError, ValidationError} from "../utils/erros";

describe('handleError', () => {
    let status: number;
    let message: string;

    const mockRequest = {} as Request;
    const mockResponse = {
        status: function (code: number) {
            status = code;
            return this;
        },
        json: function ({message: msg}: {
            message: string
        }) {
            message = msg;
            return this;
        },
    } as unknown as Response;

// reset status and message before each test
    beforeEach(function () {
        status = 0;
        message = '';
    });

    it('should handle ValidationError with status 400', () => {
        const error = new ValidationError('Validation Error');
        console.log(error instanceof ValidationError); // Must return true
        handleError(error, mockRequest, mockResponse, jest.fn());
        expect(status).toEqual(400);
        expect(message).toEqual('Validation Error');
    });

    it('should handle generic Error with status 500', () => {
        const error = new Error('Generic Error');
        handleError(error, mockRequest, mockResponse, jest.fn());
        expect(status).toEqual(500);
        expect(message).toEqual('Internal Server Error');
    });
})