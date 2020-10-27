// de chi dinh thu muc luu tru va chinh sua ten file cho tot hon thi dung this
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/blog');
    },
    filename: (req, file, cb) => {
        // user-23423234342-3243234.jpeg
        const minetypeDuoiFile = file.mimetype.split('/')[1];
        // chi dinh ten file
        cb(null, `imageCover-${Date.now()}.${minetypeDuoiFile}`);
    }
});

// loc file nao nen duoc upload file nao khong cho upload
function multerFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        // To accept the file pass `true`, like so:
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload only image."), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});