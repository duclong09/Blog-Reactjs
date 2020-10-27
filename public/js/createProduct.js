import { showAlert } from './alerts';
import axios from 'axios';
export const createProduct = async (data) => {
    try {
        const url = '/add-update-product';
        const result = await axios({
            method: 'POST',
            url,
            data
        });
        if (result.data.status === 'success') {
            showAlert('success', ` Data created successfully!`);

        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}