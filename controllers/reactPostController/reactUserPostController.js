const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.loginPost = async (req, res, next) => {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        //Header yêu cầu không chứa mã xác thực cần thiết và client bị từ chối truy cập.
        return res.status(200).json({
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
            return res.status(200).json({
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
            message: "Đăng nhập thành công!",
            token,
            // tuy nhien gui ve day thi ko hien password
            data: user
        });
    } catch (err) {
        console.log('dsfasdfdf');
        return res.status(200).json({
            status: 'error',
            message: "Có một lỗi cú pháp trong yêu cầu và yêu cầu bị từ chối.!"
        });
    }
}
