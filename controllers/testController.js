
const Product = require('../models/productModel');
exports.getData = async (req,res,next) => {
    try{
        const testData = await Product.find();
        res.status(200).json({
            message: 'test data',
            testData
        });
    }catch(err){
        res.status(400).send('Cannot get test data');
    }

}