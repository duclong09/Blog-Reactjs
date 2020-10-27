const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.sigup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        // tao token
        // tao thoi gian  het han: 90d 10h 5m 3s
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1m'
        });
        res.cookie('jwt', token, { expires: new Date(Date.now() + 10 * 60000) });
        //gui token to client
        res.status(201).json({
            status: 'success',
            message: 'Đăng ký thành công!',
            token,
            data: newUser
        });
    }
    catch (err) {
        // truyen data ve  client
        res.status(200).json({
            status: 'error',
            message: 'Thông tin nhập không chính xác - Email không hợp lệ hoặc đã đăng ký! Vui lòng thử lại!'
        });
    }
};
// exports.updateMeData = 
exports.loginPost = async (req, res, next) => {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        //Header yêu cầu không chứa mã xác thực cần thiết và client bị từ chối truy cập.
        return res.status(401).json({
            status: 'error',
            message: "Email or Password not correct!"
        });
    }
    try {
        // check if user exists && password is correct
        // select ca password nua ke ca validation ko cho chon no cung ra
        const user = await User.findOne({ email }).select('+password');
        const checkCorrectPass = await user.correctPassword(password, user.password);
        if (!user || !checkCorrectPass) {
            return res.status(401).json({
                status: 'error',
                message: 'User or Password not correct! Yêu cầu không chứa mã xác thực cần thiết và bạn bị từ chối truy cập.'
            });
        }
        // everything ok thi tao token  cho nguoi dung nay gui ve clien luon
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '90d'
        });
        res.cookie('jwt', token, { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) });

        res.status(200).json({
            status: 'success',
            token,
            // tuy nhien gui ve day thi ko hien password
            data: user
        });
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: "h Có một lỗi cú pháp trong yêu cầu và yêu cầu bị từ chối.!"
        });
    }
}
exports.getLogout = (req, res, next) => {
    // res.cookie('jwt', 'loggedout', {
    //     expires: new Date(Date.now() + 10 * 1000)
    // });
    res.clearCookie('jwt');
    res.status(200).json({ status: 'success' });
}
// Neu da login tu truoc do roi thi hien thi data of user
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // giai ma user include {id:'iduser',iat: 123123,exp: 234234}
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            // console.log(decoded);
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }
            // neu user data change pass after the token created
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                // timeTokenCreate < TimePassChange(future) ==> true next
                return next();
            }
            // gui data user ve pug client show
            res.locals.user = currentUser;
            // grant(cap quyen) access to protected route
            req.user = currentUser;
            return next();
        } catch (err) {
            console.log('cannot decode jwt');
            return next();
        }
    }
    next();
}
// copy het parameter vao fn
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        console.log(req.user);
        if (!roles.includes(req.user.role)) {
            return res.status(200).json({
                status: 'error',
                message: "Bạn không có quyền thực hiện hành động này!"
            });
        }
        next();
    }
}
exports.protect = async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(200).json({
            status: 'error',
            message: `Bạn chưa đăng nhập! Vui lòng đăng nhập để truy cập!`
        });
    }
    // verification token  
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) {
        return res.status(200).json({
            status: 'error',
            message: 'Tài khoản không còn tồn tại! Vui lòng đăng ký lại!'
        });
    }
    if (user.changedPasswordAfter(decode.iat)) {
        return res.status(200).json({
            status: 'error',
            message: 'Tài khoản đã thay đổi mật khẩu! Vui lòng đăng nhập lại!'
        })
    }
    // allow access to route next
    req.user = user;
    res.locals.user = user;
    next();
}