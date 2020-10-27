exports.getPostPerPage = async function (req, res, next) {
    const perPage = 6;
    const page = req.params.page || 1;
    try {
        await Product.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, products) {
                Product.count().exec(function (err, count) {
                    if (err) return next(err);
                    res.render('index.pug', {
                        title: `Page ${page}`,
                        products: products,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    });
                });
            });
    } catch (err) {
        res.status(400).send('Cannot execute query in get all post!');
    }
}