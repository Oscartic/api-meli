const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const productRoutes = require('./api/v1/routes/products.routes');

const PORT = process.env.PORT || 5001;

const app = express();
// * Pending configured Cors 
// const corsOptions = {
//     origin: process.env.FRONT_ORIGIN_URL, 
//     credentials:true,
//     optionSuccessStatus:200
// };
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/v1', productRoutes); 


const server = app.listen(PORT, () => {
    console.log(`[SERVER][MELIAPI] Listening on port: ${PORT}`);
});

module.exports = { app, server } ;