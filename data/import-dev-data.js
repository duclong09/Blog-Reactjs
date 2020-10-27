const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('../models/productModel');
// connect mongoose
mongoose.connect('mongodb+srv://hoa:IxF2MLy3OjNpGCNJ@cluster0.safbv.mongodb.net/be1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {
    console.log('DB connection successfully!');
});
// read file json
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));
// import data into mongodb
const importData = async () => {
    try {
        await Product.create(products);
        console.log('Data successfully loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}
// delete data
const deleteData = async () => {
    try {
        await Product.deleteMany();
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
