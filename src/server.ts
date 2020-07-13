import express from 'express';
import 'reflect-metadata';
import './database';
import routes from './routes';
import uploadConfig from './config/upload';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on por 3333!');
});
