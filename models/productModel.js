const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    product_id: Number,
    product_name: String,
    photoCover: String,
    product_summary: String,
    product_description_1: String,
    product_description_2: String,
    product_description_3: String,
    product_description_4: String,
    product_description_5: String,
    product_description_6: String,
    product_description_7: String,

    photoContent_1: String,
    photoContent_2: String,
    photoContent_3: String,
    photoContent_4: String,
    photoContent_5: String,
    photoContent_6: String,
    photoContent_7: String,

    product_slug: String,
    product_price: Number,

    images: [String],


});
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
});

//  cach 1
// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;

//  cach 2
module.exports = mongoose.model('Product', productSchema);
