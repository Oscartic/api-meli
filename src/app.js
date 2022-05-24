const express = require('express');
const morgan = require('morgan');
const productRoutes = require('./api/v1/routes/products.routes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', productRoutes); 
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`[SERVER][MELIAPI] Listening on port: ${PORT}`);
});