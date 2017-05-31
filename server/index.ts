import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';

import {api} from './api/main';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'app')));

app.use('/api', api);

app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, 'app/index.html'))
});

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
