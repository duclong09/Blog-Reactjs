import '@babel/polyfill';

import { createProduct } from './createProduct';
import { login, logout } from './login';
import { sigup } from './sigup';
import { updateSettings } from './updateSettings';
import { getMe } from './getme';
// import * as a from './mapbox';
import { displayMap } from './mapbox';
import * as handleClick from './handleClick';
import { introHoa } from './aboutme';
import { updateDelete } from './update-delete';
import axios from 'axios';


const btnDeleteProduct = document.querySelectorAll('.btnDeleteProduct');
const btnUpdateProduct = document.querySelectorAll('.btnUpdateProduct');
const loginForm = document.querySelector('.login-form');
const sigupForm = document.querySelector('.sigup-form');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const getMeDom = document.querySelector('.getMe');
const mapBox = document.getElementById('map');
const getIntroMe = document.getElementById('introMe');
const imgPhoto = document.getElementById('photo');




if (getIntroMe) {
    introHoa();
}
function loadFile(event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('dataImg');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};

if(imgPhoto){
    imgPhoto.addEventListener('change',e => {
        loadFile(e);
    });
}





if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locationvip);
    displayMap(locations);
}

if (getMeDom) {
    getMeDom.addEventListener('click', async () => await getMe);
}

if (userDataForm) {
    userDataForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        updateSettings(form, 'data');
        // const name = document.getElementById('name').value;
        // const email = document.getElementById('email').value;
        // const photo = document.getElementById('photo').files[0];
        // updateSettings({ name, email, photo }, 'data');
    });
}
if(userPasswordForm){
    userPasswordForm.addEventListener('submit',async e => {
        alert('a');
        e.preventDefault();
        document.querySelector('.btn--save-password').textContent = 'Updating...';
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await updateSettings({passwordCurrent,password,passwordConfirm},'password');
        document.querySelector('.btn--save-password').textContent = 'Save password';
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
    });
}


if (sigupForm) {
    sigupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        sigup({ name, email, password, passwordConfirm });
    });
}
// if (loginForm) {
//     loginForm.addEventListener('submit', e => {
//         e.preventDefault();
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         login(email, password);
//     });
// }

if (btnDeleteProduct) {
    btnDeleteProduct.forEach((el, index) => {
        el.addEventListener('click', async (e) => {
            e.target.textContent = 'Processing...';
            const { productId } = e.target.dataset;
            await updateDelete('delete', productId);
            e.target.textContent = 'Delete';
        });
    });
}
// if (btnUpdateProduct) {
//     btnUpdateProduct.forEach((el, index) => {
//         el.addEventListener('click', async (e) => {
//             e.target.textContent = 'Processing...';
//             const { productId } = e.target.dataset;
//             await updateDelete('update', productId);
//             e.target.textContent = 'Update';
//         })
//     });
// }
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}
