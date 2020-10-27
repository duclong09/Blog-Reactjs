import axios from 'axios';
import { showAlert } from './alerts';
export const getMe = async () => {
    try {
        const result = await axios({
            method: 'GET',
            url: '/me'
        });
    } catch (err) {
        showAlert('error', err.response);
        window.setTimeout(() => {
            location.assign('/');
        }, 1000);
    }
}
