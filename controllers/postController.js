const Product = require('../models/productModel');
const api = require('../api/api');


async function fnMixinUpload(files,req) {
    // save file to cloud and name to mongodb
    if (files.photoCover) {
        // save name to db
        // save to cloud
        let photo = await api.UploadFile(files.photoCover[0].path,'blog');
        req.body.photoCover = photo;
    }
    if (files.photoContent_1) {
        photo = await api.UploadFile(req.files.photoContent_1[0].path,'blog');
        req.body.photoContent_1 = photo;
    }
    if (files.photoContent_2) {
        photo = await api.UploadFile(files.photoContent_2[0].path,'blog');
        req.body.photoContent_2 = photo;
    }
    if (files.photoContent_3) {
        photo = await api.UploadFile(files.photoContent_3[0].path,'blog');
        req.body.photoContent_3 = photo;
    }
    if (files.photoContent_4) {
        photo = await api.UploadFile(files.photoContent_4[0].path,'blog');
        req.body.photoContent_4 = photo;
    }
    if (files.photoContent_5) {
        photo = await api.UploadFile(files.photoContent_5[0].path,'blog');
        req.body.photoContent_5 = photo;
    }
    if (files.photoContent_6) {
        photo = await api.UploadFile(files.photoContent_6[0].path,'blog');
        req.body.photoContent_6 = photo;
    }
    if (files.photoContent_7) {
        photo = await api.UploadFile(files.photoContent_7[0].path,'blog');
        req.body.photoContent_7 = photo;
    }
}
exports.getPostHome = async (req, res, next) => {
    const perPage = 6;
    const page = req.params.page || 1;
    try {
        await Product.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, products) {
                Product.count().exec(function (err, count) {
                    if (err) return next(err);
                    // res.render('index.pug', {
                    //     title: 'Home',
                    //     products: products,
                    //     current: page,
                    //     pages: Math.ceil(count / perPage),
                    //     hoa:req.hoa
                    // });
                    res.status(200).json({
                        title: 'Home',
                        products: products,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        hoa:req.user
                    });
                });
            });
    } catch (err) {
        res.status(400).send('Cannot execute query in get all post!');
    }
}
exports.getAddPost = function (req, res, next) {
    res.render('postAddEdit.pug', {
        title: 'Create A Post'
    });
}
exports.getPost = async (req, res, next) => {
    try {
        const post = await Product.findOne({ product_slug: req.params.slug });
        console.log(post);
        if (!post) {
            res.status(404).send('Not found post detail with name!');
        }
        res.status(200).render('detail.pug', {
            title: `${post.product_name}`,
            post
        });
    } catch (err) {
        res.status(400).send('Cannot execute query in detail!');
    }
}
exports.getUpdatePost =  (req, res, next) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.status(200).render('postAddEdit.pug', {
                title: 'Update Post Detail',
                data: doc
            });
        }
    });
}
exports.addUpdatePost = async function (req, res, next) {
    try {
        // xuat ra xem name of photo
        // console.log('body tu server:', req.body);
        // console.log(req.file);
        // console.log('files tu server: ', req.files);
        if (!req.body._id) {
            // (Add) INSERT INTO MONGODB
            if (Object.keys(req.files).length !== 0) {
               await fnMixinUpload(req.files,req);
            }
            const post = await Product.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    data: post
                }
            });

        } else {
            // UPDATE INTO MONGODB
            if (Object.keys(req.files).length !== 0) {
                await fnMixinUpload(req.files,req);
            }
            await Product.findOneAndUpdate({ _id: req.body._id }, req.body, { useFindAndModify: false, new: true }, (err, doc) => {
                if (!err) {
                    res.redirect('/');
                }
                else {
                    // neu update khong duoc
                    if (err.name == 'ValidationError') {
                        // co the them xu ly validation error o day nghien cuu 
                        // hien thi lai data da edit nhung chua thanh cong
                        res.render('postAddEdit.pug', {
                            title: 'Update A Post Details',
                            data: req.body
                        });
                    } else {
                        console.log('Error during updating the record! ' + err);
                    }
                }
            });
        }

    } catch (err) {
        console.log(err);
        res.status(400).send('Cannot add or update product');
    }
}
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Product.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).send('Not found post with ID to delete!');
        }
        res.status(200).json({
            status:'success',
            message: "Xóa Thành Công!"
        })
    } catch (err) {
        res.status(400).send('Cannot add delete product');
    }
}
