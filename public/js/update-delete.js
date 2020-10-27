import { showAlert } from './alerts';
import axios from 'axios';
async function fnAutoAxios(type,productId){
    const strMethod = type === 'update' ? 'GET' : 'DELETE'
    try {
        const result = await axios({
            method: strMethod,
            url: `/${type}/${productId}`,
        });
        if (result.status === 204) {
           
            if(type === 'delete'){
                showAlert('success', ` Data ${type} successfully!`);

                window.setTimeout(() => {
                    location.assign('/');
                }, 1000);
            }
        }
        if(result.status === 200){
            // console.log(result.data);
            location.assign(`/${type}/${productId}`);
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
}


export const updateDelete = async (type,id) => {
    if(type === 'update'){
       await fnAutoAxios(type,id);
    }
    if(type === 'delete'){
       await fnAutoAxios(type,id);
    }
}