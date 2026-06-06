import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { sync } from './models/sync';
import db from './models/db';
import deptRouter from './routes/dept';

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/dept', deptRouter);

sync();

process.on('SIGINT', db.cleanup);
process.on('SIGTERM', db.cleanup);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

export default app;