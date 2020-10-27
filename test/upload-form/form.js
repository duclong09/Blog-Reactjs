
const formCreateProduct = document.querySelector('.form-create-product');
if (formCreateProduct) {
    formCreateProduct.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn-hoa-wait').textContent = "Creating...";
        // API call axios
        const form = new FormData();
        const totalField = document.querySelectorAll('.product_description');
        // console.log(totalField);
        form.append('_id', document.getElementsByName('_id')[0].value);
        form.append('product_name', document.getElementById('product_name').value);
        form.append('product_summary', document.getElementById('product_summary').value);
        form.append('photoCover', document.getElementById('photoCover').files[0]);

        // for (let numField = 1; numField <= totalField.length; numField++) {
        //     form.append(`product_description_${numField}`, document.getElementById(`product_description_${numField}`).value);
        //     console.log(document.getElementById(`product_description_${numField}`).value);
        //     form.append(`photoContent_${numField}`, document.getElementById(`photoContent_${numField}`).files[0]);
        // }

        // for (let i = 0; i < document.getElementById('photos').files.length; i++) {
        //     form.append('images', document.getElementById('photos').files[i]);
        // }

        form.append('product_price', document.getElementById('product_price').value);

        // du lieu gui vao form la name va chuoi value 
        await createProduct(form);


        document.querySelector('.btn-hoa-wait').textContent = "Add";
    });
}