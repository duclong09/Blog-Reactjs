const cloudinary = require("cloudinary");
const router = require("../routes/main");
const multer = require('multer');
const jwt = require('jsonwebtoken');
module.exports = {
    UploadFile: async function (pathFile,folderCloud) {
        let kq = null;
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    
       await cloudinary.v2.uploader.upload(pathFile, {
            folder: `${folderCloud}`,
            use_filename: true
        }, function (error, result) {
            console.log(result);
            if (error) {
                console.log("error ocurred in upload file", error);
                return kq;
            }
            else {
                // save url string
                console.log("upload image successfully url: \n", result.secure_url);
                return kq = result.secure_url;
            };
        });
        return kq;
    },
    SendFileHttp: function(response,nameFile){
        return response.sendFile(__dirname + '/' + nameFile);
    },
    MulterHelper: function(){
        let oo = {};
        // chỉ định thư mục lưu trữ hình ảnh và chỉnh sửa tên file khi lưu vào host cho dễ xem
        oo.multerStorage = multer.diskStorage({
            destination: (req,file,cb) => {
                cb(null,'public/img/blog');
            },
            filename: (req,file,cb) => {
                // replace name of image + date create
                cb(null,`conghoa-img-${Date.now()}`);
            }
        });
        // Filter which files to upload
        oo.multerFilter = (req,file,cb) => {
            if(file.mimetype.startsWith('image')){
                // To accept the file pass `true`, like so:
                cb(null, true);
            }else{
                cb(new Error("Not an image! Please upload only image."), false);                
            }
        }
        oo.upload = multer({
            storage:oo.multerStorage,
            fileFilter:oo.multerFilter
        });
        return oo;
    },
    CreateSendToken: function(user,statusCode,res){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        });
        const cookieOptions = {
            // time expires of cookie equal miliseconds
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000
            ),
            //HttpOnly is a flag added to cookies that tell the browser not to display the cookie through client-side scripts
            HttpOnly: true
        };
        res.cookie('jwt',token,cookieOptions);
        // if create user then hide pass
        user.password = undefined;
        // sent to client 
        res.status(statusCode).json({
            status: 'success',
            token,
            data:{
                user
            }
        });
    }
}