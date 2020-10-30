import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import SocketIO from 'socket.io';
import bodyParser from 'body-parser';
import migrationRouter from './routes/migration';
import initMigration from './migrations/migration';
// import memoryCardRouter from './routes/memoryCard';
import authenticationRouter from './routes/authentication';

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/subToMyOnlyfan', { useUnifiedTopology: true });

initMigration();

// app.use('/', memoryCardRouter);
app.use('/migration', migrationRouter);
app.use('/user', authenticationRouter);

app.all('*', (req: express.Request, res: express.Response) => res.status(404).json({ error: 'What you ask ain\'t found mate' }));

/* eslint-disable no-console */
server.listen(port, () => console.log(`Listening on port ${port}`));
/* eslint-enable no-console */
