const cartAmount = document.getElementById("cartAmount");
const shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("order")) || [];
console.log(basket.length);

const generateItemCart = () => {
  return (shoppingCart.innerHTML = basket.map((x) => {
    // find all products id and item;
    const { id, item } = x;
    const searchData = shopItemsData.find((x) => x.id === id);
    const { name, img, price } = searchData;
    return `
        <div class="cart-item">
            <img width="100" src="${img}" alt="not found" />
            <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                <p>${name}</p>
                <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i class="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
                <i onclick="decrement()" class="bi bi-dash"></i>
                <div id="update-">10</div>
                <i onclick="increment()" class="bi bi-plus"></i>
            </div>
            </div>
    </div>
            `;
  }));
};

generateItemCart();

const cartQuantity = () => {
  const search = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartAmount.innerHTML = search;
};

cartQuantity();
