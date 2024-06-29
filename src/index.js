import express from 'express';
import morgan from 'morgan';
import healthCheckRouter from './routes/health-check.js';

// === Vars ===
const app = express();
const PORT = process.env.PORT || 4000;


// === Middlewares ===
app.use(express.static('public'));
app.use(morgan('dev'));
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
    res.status(404).send('<h1>Page Not Found</h1>')
})

// === Errors ===



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});