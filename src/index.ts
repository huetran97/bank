import * as express from 'express';
import route from './routes';
import * as mongoose from 'mongoose';
import * as http from 'http';
import { MONGO_URI } from './configs';

const app = express();

const server = http.createServer(app);

mongoose.connect(MONGO_URI);
app.use(express.json());
app.use(express.urlencoded());
app.use(route);
app.use((err, req, res, next) => {
    res.json({
        err: err.code || 0,
        msg: err.message,
        data: null,
        debug: err
    });
});

if (process.env.NODE_ENV === 'test') {
    server.listen(3003);
} else {
    server.listen(3004);
}

export default server;