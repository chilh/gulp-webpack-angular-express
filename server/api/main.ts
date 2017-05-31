import * as express from 'express';

export let api: express.Router = express.Router();

api.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.headers);
    next();
});

api.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: 'hello world!' });   
});

