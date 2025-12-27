import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { connectMongoDB } from './config/mongo.config';
import { setupSwagger } from './config/swagger.config';
import authRouter from './routers/auth.route';
import vendorRouter from './routers/vendor.route';
import categoryRouter from './routers/category.route';


dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

const app: Express = express();
app.use(bodyParser.json());
setupSwagger(app);

// app.use('/horoscope', horoscopeRouter);
app.use('/auth', authRouter);
app.use('/vendors', vendorRouter);
app.use('/categories', categoryRouter);

(async () => {
    await connectMongoDB();
})()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
})
