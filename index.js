const express = require('express');
const mongoose = require('mongoose');
const {PORT, DB_URL} = require('./config');
const stackHolderProfileRouter = require('./routes/stack_holder_profile.route');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/", stackHolderProfileRouter);

mongoose.connect(DB_URL).then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("DB connection failed!");
});