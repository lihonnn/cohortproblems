import express, { Router, Request, Response, NextFunction } from 'express';
import * as deptmodel from '../models/dept';

const router: Router = express.Router();

router.get('/count', async function(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await deptmodel.count();
        res.send(`${JSON.stringify(result)}`);
    } catch (error) {
        next(error);
    }
});

export default router;