import express, { Router, Request, Response, NextFunction } from 'express';
import * as staffmodel from '../models/staff';
import * as deptmodel from '../models/dept';

const router: Router = express.Router();


/* insert a staff, should have used POST instead of GET */
router.get('/add/:id/:name/:code', async function(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const name = req.params.name;
    const code = req.params.code;
    const staff = new staffmodel.Staff(id, name, code);

    await staffmodel.insertMany( [staff]);
    res.send(`${JSON.stringify(staff)}`);
});

/* GET staff listing. */

router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
    const all = await staffmodel.all();
    res.send(`${JSON.stringify([all])}`); // TODO: Fixme
});


export default router;