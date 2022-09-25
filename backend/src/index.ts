import 'dotenv/config';
import 'module-alias/register';

import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import validateEnv from '@/utils/validateEnv';
import Controller from '@/utils/interfaces/controller.interface';
import HomeController from '@/resources/controllers/home.controller';
import errorMiddleware from '@/middleware/error_middleware';
import path from 'path';

validateEnv();

const port: number = Number(process.env.PORT);
const controllers: Controller[] = [new HomeController()];

let app: Express = express();

//middleware config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//serve the React static files after build
app.use(express.static(path.join(__dirname, '../../frontend/', 'build')));

//routes
controllers.forEach((controller: Controller) => {
    app.use('/api', controller.router);
});

//error handling
app.use(errorMiddleware);

//run!
app.listen(port, () => {
    console.log(`Running on the port ${port}`);
});
