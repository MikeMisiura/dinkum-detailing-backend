import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import { db } from './models';
import userRoutes from './routes/userRoutes'

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
// TODO: add routes here
app.use('/api/users', userRoutes)


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen(3000);