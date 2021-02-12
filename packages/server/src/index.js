import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import logger from './tools/logger';
import auth from './routes/auth';
import me from './routes/me';
import user from './routes/user';
import mostLiked from './routes/mostLiked';
import dbInit from './db/dbInit';
import config from './tools/environment';

const app = express();
app.use(express.json());

//express safety middleware
app.use(cors({exposedHeaders: 'auth-token'}));
app.use(helmet());

//DB connection
export const db = dbInit();

//signup and login routes
auth(app,db);
me(app,db);
user(app,db);
mostLiked(app,db);

const port = config.PORT || 5000;
app.listen(port);
logger.info(`Server is on localhost:${port}`);

//for testing purposes
export default app;
