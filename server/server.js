require('dotenv').config();
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressFileUpload({
        useTempFiles: true,
    }),
);
// connect mongoDB
const URI = process.env.MONGODB_URL 
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})


// App
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.use('/user', require('./routers/users.route'));
app.use('/api', require('./routers/category.route'));
app.use('/api', require('./routers/upload'));
app.use('/api', require('./routers/products.route'));
app.use('/api', require('./routers/payments.route'));
