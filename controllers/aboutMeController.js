const Location = require('../models/locationModel');

exports.getAboutMe = async (req, res, next) => {
    try {
        const data = await Location.find({});
        // console.log('day la data',data);
        res.status(200).render('aboutMe.pug', {
            title: 'About me',
            data
        });
    } catch (err) {
        res.status(400).send('Cannot get location');
    }

}