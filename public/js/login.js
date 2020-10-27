import { showAlert } from './alerts';
import axios from 'axios';
export const login = async (email, password) => {
    try {
        const result = await axios({
            method: 'POST',
            url: '/login',
            data: {
                email,
                password
            }

        });
        if (result.data.status === 'success') {
            console.log(result.data);
            showAlert('success', 'Logged in successfully!');
            console.log(result.data);
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}
export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/logout'
        });
        if (res.data.status === 'success') location.reload(true);
    } catch (err) {
        showAlert('error', 'Không thể đăng xuất! thử lại!');
    }
}