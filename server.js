const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mainRoutes = require('./routes/main');
const tch_routePost = require('./routes/reactRoute/tch_routePost');

// const callTestApi = require('./TEST/CALL-API-SERVER/api-server');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require("cors");
const app = express();
// post of client 
// var corsOptions = {
//     origin: "http://localhost:8082/"
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());
dotenv.config({ path: "./config.env" });
// connet database
mongoose.connect('mongodb+srv://hoa:IxF2MLy3OjNpGCNJ@cluster0.safbv.mongodb.net/be1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// LOCAL HOST
// const url = 'mongodb://127.0.0.1:27017/be1';
// mongoose.connect(url, { useNewUrlParser: true })
// thong bao ket noi thanh cong or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {
    console.log('DB connection successfully!');
});


app.set('view engine', 'pug');
app.set('view engine', 'ejs');

// serving static files
app.use(express.static(`${__dirname}/public`));
//để có thể nhận được dữ liệu tu req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// require("./routes/reactRoute/reactPostRoutes")(app);

// uu tien client chay truoc
app.use(express.static('client/build'));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});
app.use(mainRoutes);
// api server data
app.use(tch_routePost);
// app.use(callTestApi);
app.all('*', (req, res, next) => {
    res.status(200).render('page404.pug', {
        title: 'Page not found!'
    });
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('App listening on port ' + port);
});