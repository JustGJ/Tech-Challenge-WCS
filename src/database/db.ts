const mongoose = require('mongoose');

mongoose
    .connect(
        'mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.lauwp.mongodb.net/Argonautes',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err: Error) => {
        console.log('Failed to connect to MongoDB : ', err);
    });
