import axios from 'axios';
import { showAlert } from './alerts';
export const sigup = async (data) => {
    try {
        const url = '/sigup';
        const result = await axios({
            method: 'POST',
            url,
            data
        });
        if (result.data.status === 'success') {
            showAlert('success', 'Create user successfully. Congratulation!');
            console.log(result.data);
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}