import { Router, Request, Response, NextFunction } from 'express';

import convertFileToMultipleArray from '@/utils/convert_file_multiple_array';
import HttpException from '@/utils/exceptions/http_exception';
import upload from '@/utils/file_helper';
import Controller from '@/utils/interfaces/controller.interface';
import SpotlightOperation from '@/utils/spotlight_operation';

class HomeController implements Controller {
    public path: string = '/home';
    public router: Router = Router();
    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(`${this.path}`, this.index);
        this.router.post(
            `${this.path}/upload-file`,
            upload.single('file'),
            this.loadFile
        );
    }

    private index(req: Request, res: Response): Response {
        return res.status(200).send('Hello World :D!');
    }

    private async loadFile(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        const file: any = req.file;

        if (!file) {
            return next(new HttpException(400, 'Please upload a valid file.'));
        }

        try {
            const contents: string = Buffer.from(file.buffer).toString('utf-8');
            const data: number[][] = convertFileToMultipleArray(contents);

            const spotlightOperation: SpotlightOperation =
                new SpotlightOperation(data);
            const spotlightData: string[][] =
                spotlightOperation.getDataWithSpotlight();

            res.json({ data: spotlightData });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default HomeController;
