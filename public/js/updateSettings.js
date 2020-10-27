import axios from 'axios';
import { showAlert } from './alerts';
export const updateSettings = async (data, type) => {
    try {
        const url = type === 'password' ? '/updateMyPassword' : '/updateMe';
        const res = await axios({
            method: 'PATCH',
            url,
            data
        });
        if (res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} Data updated successfully!`);
        }
    } catch (err) {
        console.log(err.response);
        showAlert('error', err.response.data.message);
    }
}