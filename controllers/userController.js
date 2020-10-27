const User = require('../models/userModel');
const api = require('../api/api');

exports.getAccount = (req, res, next) => {
    res.status(200).render('account.pug', {
        title: 'Your account'
    });
}
exports.getSignUp = (req, res, next) => {
    res.status(200).render('sigup.pug', {
        title: 'Create your account!'
    });
}
exports.getLogin = (req, res, next) => {
    res.status(200).render('login.pug', {
        title: 'Log into your account'
    });
}
exports.updateMeData = async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return res.status(400).json({
            status: 'error',
            message: "Không dành cho thay đổi mật khẩu. Vui lòng sử dụng thay đổi mật khẩu!"
        });
    }
    const ob = {};
    // forEach cac key property trong ob thoi gia tri tra ve la list property not value
    Object.keys(req.body).forEach(el => {
        if (['name', 'email'].includes(el)) {
            // day la them property cho ob la name email do va gan gia tri property do luon
            ob[el] = req.body[el];
        }
    });

    if (req.file) {
        // if there are file images then push to the cloud and save to db
        // ob['photo'] = req.file.filename;
        // both action upload and save data by object parameter
        ob['photo'] = await api.UploadFile(req.file.path,'user');
    }
    try {
        // khong thay user
        //update thi du lieu da thay doi roi
        const updatedUser = await User.findByIdAndUpdate(req.user.id, ob, {
            new: true,// return doc updated
            runValidators: true // validation before update
        });
        res.status(200).json({
            status: 'success',
            message: 'Thay đổi dữ liệu thành công!',
            data: {
                user: updatedUser
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: "Khong the sua doi du lieu nguoi dung! Vui long thu lai!"
        })
    }
}
exports.updatePassword = async (req, res, next) => {
    // get user from collection
    const user = await User.findById(req.user.id).select('+password');
   
    // 2 check if posted current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return res.status(400).json({
            status:'error',
            message: 'Mật khẩu bạn nhập không chính xác! Vui lòng thử lại!'
        });
    }
    // console.log(user);
    // 3 if so update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // create token set cookie send json resopnse
    api.CreateSendToken(user,200,res);

};