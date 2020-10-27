if (Object.keys(req.files).length !== 0) {
    let buff = fs.readFileSync(req.files.photoCover[0].path);
    let base64data = buff.toString('base64');


    req.body.photoCover = [req.files.photoCover[0].filename,base64data];
    if (req.files.photoContent_1) {
        req.body.photoContent_1 = req.files.photoContent_1[0].filename;
    }
    if (req.files.photoContent_2) {
        req.body.photoContent_2 = req.files.photoContent_2[0].filename;
    }
    if (req.files.photoContent_3) {
        req.body.photoContent_3 = req.files.photoContent_3[0].filename;
    }
    if (req.files.photoContent_4) {
        req.body.photoContent_4 = req.files.photoContent_4[0].filename;
    }
    if (req.files.photoContent_5) {
        req.body.photoContent_5 = req.files.photoContent_5[0].filename;
    }
    if (req.files.photoContent_6) {
        req.body.photoContent_6 = req.files.photoContent_6[0].filename;
    }
    if (req.files.photoContent_7) {
        req.body.photoContent_7 = req.files.photoContent_7[0].filename;
    }
                    // if (req.files.images.length > 1) {
                //     req.body.images = [];
                //     req.files.images.forEach((el, index) => {
                //         req.body.images.push(el.filename);
                //     });
                // }
}

