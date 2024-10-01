import express, { Application } from 'express';
import wdioRouter from '../../src/remote/server/router.api';

const app: Application = express();
const port: number = 3333;

app.use(express.json());
app.use('/wdio', wdioRouter);


export const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
