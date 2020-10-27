
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please procide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,
        default: 'https://res.cloudinary.com/tranconghoa/image/upload/v1603467537/user/default_lefmy2.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'mod'],
        default: 'user'
    },
    // password === passwordconfirm thi encrypt password to the database
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        // requied la bat buoc nhap chu ko phai bat buoc luu vao db
        required: [true, 'Please confirm your password'],
        validate: {
            // this only work on create and save
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password are not the same!'
        }
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});
// ma hoa pass truoc khi luu vao database
userSchema.pre('save', async function (next) {
    // neu password duoc sua doi thi bam con khong thi giu nguyen khong bam nua
    // vi moi lan update no se a/h
    if (!this.isModified('password')) return next();
    // chieu dai bam la 12
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});
// kiem tra login password co bang password database da hash ko (instance method)
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    // khong the dung this.password de lay password hien tai o day nen phai pass param
    // return true is correct false is not
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimesCreate) {
    if (this.passwordChangeAt) {
        // tai vi jwt time create (default) la second va timeChanngePass la milisecond nen phai chuyen doi
        const timeChangePass = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
        return JWTTimesCreate < timeChangePass;
    }
    return false;
}

const User = mongoose.model('User', userSchema);
module.exports = User;