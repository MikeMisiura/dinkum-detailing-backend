import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import messageRoutes from './routes/messageRoutes'
import estimateRoutes from './routes/estimateRoutes';
import { frontendIPs, port } from './environmentTypes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
// const corsOptions = {
//     origin: frontendIPs
// };
// app.use(cors(corsOptions));
app.use(cors());

// routes
// TODO: add routes here
app.use('/api/messages', messageRoutes)
app.use('/api/estimate', estimateRoutes)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

app.listen( port );