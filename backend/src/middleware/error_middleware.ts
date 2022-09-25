import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http_exception';

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Something is not working as expected';

    res.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
