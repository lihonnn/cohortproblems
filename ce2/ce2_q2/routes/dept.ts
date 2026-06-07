import express, { Router, Request, Response, NextFunction } from 'express'; 
import * as deptmodel from '../models/dept'; // import model layer into this file to be able to use count()

const router: Router = express.Router();

router.get('/count', async function(req: Request, res: Response, next: NextFunction) { // assigns router to read for /count
    try {
        const result = await deptmodel.count(); // call count() from deptmodel
        res.send(`${JSON.stringify(result)}`); // serialise the result from count() as JSON 
    } catch (error) {
        next(error);
    }
});

export default router;