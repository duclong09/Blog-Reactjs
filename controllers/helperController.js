const faker = require('faker');
const Product = require('../models/productModel');
exports.autoCreateData = (req, res, next) => {
    for (let i = 0; i < 90; i++) {
        let product = new Product();
        product.product_name = faker.commerce.productName();
        product.product_price = faker.commerce.price();
        product.photoCover = faker.image.image();
        product.product_description = faker.commerce.productDescription();
        product.product_summary = faker.commerce.productAdjective();
        product.save(function (err) {
            if (err) throw err
        });
    }
    res.redirect('/');
}