function createBase64FromPath(path){
    let buff = fs.readFileSync(path);
    let base64data = buff.toString('base64');
    return base64data;
}
if(!req.body._id){
    // (Add) INSERT INTO MONGODB
    if (Object.keys(req.files).length !== 0) {
        // luu buffer img vao db
        let base64data = createBase64FromPath(req.files.photoCover[0].path);
        req.body.photoCover = [req.files.photoCover[0].filename,base64data];


        if (req.files.photoContent_1) {
            base64data = createBase64FromPath(req.files.photoContent_1[0].path);
            req.body.photoContent_1 = [req.files.photoContent_1[0].filename,base64data];
        }
        if (req.files.photoContent_2) {
            base64data = createBase64FromPath(req.files.photoContent_2[0].path);
            req.body.photoContent_2 = [req.files.photoContent_2[0].filename,base64data];
        }
        if (req.files.photoContent_3) {
            base64data = createBase64FromPath(req.files.photoContent_3[0].path);
            req.body.photoContent_3 = [req.files.photoContent_3[0].filename,base64data];
        }
        if (req.files.photoContent_4) {
            base64data = createBase64FromPath(req.files.photoContent_4[0].path);
            req.body.photoContent_4 = [req.files.photoContent_4[0].filename,base64data];
        }
        if (req.files.photoContent_5) {
            base64data = createBase64FromPath(req.files.photoContent_5[0].path);
            req.body.photoContent_5 = [req.files.photoContent_5[0].filename,base64data];
        }
        if (req.files.photoContent_6) {
            base64data = createBase64FromPath(req.files.photoContent_6[0].path);
            req.body.photoContent_6 = [req.files.photoContent_6[0].filename,base64data];
        }
        if (req.files.photoContent_7) {
            base64data = createBase64FromPath(req.files.photoContent_7[0].path);
            req.body.photoContent_7 = [req.files.photoContent_7[0].filename,base64data];
        }
    }
    const post = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: post
        }
    });