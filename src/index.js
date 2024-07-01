import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import healthCheckRouter from './routes/health-check.js';
import NotFoundError from './errors/not-found-error.js';
import errorHandler from './middlewares/error-handler.js';
import connectDB from './config/connectDB.js';

console.log(process.env.MONGODB_URI);

// === Vars ===
const app = express();
const PORT = process.env.PORT || 4000;


// === Middlewares ===
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// === Routes ===
app.use('/src/routes/health-check.js', healthCheckRouter)


/**
 * @method GET
 * @path /docs
 */
app.get('/docs', (req, res) => {
    res.send('docs...')
})


// === Catch-All Route ===
app.all('*', (req, res) => {
    throw new NotFoundError();
})


// === Errors ===
app.use(errorHandler);


// Main
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});