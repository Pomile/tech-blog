import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import error from './exception/error'
import routes from '../src/route';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from '../doc.swagger';
import ErrorHandler from './exception/errorHandler';
import './listener'

const app = express();
const specs = swaggerJsDoc(options);
dotenv.config();
// express body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api/v1', routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome to Tech Blog Api"})
})
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});
app.use(error);

export default app;
