import express, { Router, Request, Response, NextFunction } from 'express';
import * as deptmodel from '../models/dept';
import * as staffmodel from '../models/staff';

const router: Router = express.Router();


router.get('/add/:code', async function(req: Request, res: Response, next: NextFunction) {
    const code = req.params.code;
    const dept = new deptmodel.Dept(code);
    await deptmodel.insertMany([dept]);
    res.send(`${JSON.stringify(dept)}`); // TODO: Fixme
});



/* GET dept listing. */

router.get('/all/', async function(req: Request, res: Response, next: NextFunction) {
    const all = await deptmodel.all();
    res.send(`${JSON.stringify(all)}`); // TODO: Fixme
});


router.get('/all/withstaff/', async function(req: Request, res: Response, next: NextFunction) {
    const result = [];
    const all = await deptmodel.all();
    for (const dept of all){
        const staff = await staffmodel.find({dept : dept.code});
        result.push({code: dept.code, staffs: staff})
    }

    res.send(`${JSON.stringify(result)}`); // TODO: Fixme
})


export default router;