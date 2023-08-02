import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import { db } from './models';
import userRoutes from './routes/userRoutes'
import messageRoutes from './routes/messageRoutes'
import estimateRoutes from './routes/estimateRoutes';
import { frontendUrl, port } from './environmentTypes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
const corsOptions = {
    origin: [ frontendUrl ]
};
app.use(cors(corsOptions));
// routes
// TODO: add routes here
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/estimate', estimateRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen( port );