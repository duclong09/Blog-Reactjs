
function render(number) {
    return `<div class="form-group">
    
    <label for="product_description">Product content ${number}: </label>
    <textarea
      class="form-control product_description"
      id="product_description_${number}"
      name="product_description_${number}"
      cols="100"
      rows="5"
    ></textarea>
    </div>

    <div class="form-group"><label for="photoContent_${number}">Choose one photo for content ${number}:</label><input id="photoContent_${number}" type="file" accept="image/*" name="photoContent_${number}"></div>`;
}

const locationInsert = document.getElementById("idSeeImg");
const btnPlus = document.querySelector(".btnPlus");
if (btnPlus) {
    let number = 1;
    btnPlus.addEventListener("click", () => {
        btnPlus.insertAdjacentHTML("beforebegin", render(++number));
    });
}
