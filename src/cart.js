const shopping_cart = document.getElementById("shopping_cart");
let basket = JSON.parse(localStorage.getItem("userOrder")) || [];
const lable = document.getElementById("lable");

const generateShop = () => {
  if (basket.length !== 0) {
    return (shopping_cart.innerHTML = basket.map((x) => {
      const { id, item } = x;
      const findData = shopItemsData.find((x) => x.id === id) || [];
      const { name, price, img, title } = findData;
      return `
                <div class="cart-item">
                    <img width="100" src="${img}" alt="" />
                    <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                        <p>${name}</p>
                        <p class="cart-item-price">$${price}</p>
                        </h4>
                        <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id="update-${id}">
                            ${item}
                        </div>              
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                    <strong style="text-align:center">Total Amount: $${
                      item * price
                    }</strong>
                 </div>                
              </div>`;
    })).join("");
  } else {
    shopping_cart.innerHTML = "";
    lable.innerHTML = `
            <h2 class="emptyText">Cart is Empty</h2>
            <a href="index.html" class="homeLink">
                <button class="homeBtn">Back to home</button>
            </a>
        `;
  }
};

generateShop();

const increment = (id) => {
  const selectedId = id;
  const search = basket.find((x) => x.id === selectedId);
  if (search === undefined) {
    basket.push({
      id: selectedId,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  // console.log(basket);
  update(selectedId);
  calculatedQuantity();
  totalAmount();
  localStorage.setItem("userOrder", JSON.stringify(basket));
  generateShop();
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(`update-${id}`).innerHTML = search.item;
  totalAmount();
  calculatedQuantity();
};

const decrement = (id) => {
  const selectedId = id;
  const search = basket.find((x) => x.id === selectedId);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedId);
  //!filter basket if item = 0 then basket one object remove();
  basket = basket.filter((x) => x.item !== 0);
  generateShop();
  totalAmount();
  localStorage.setItem("userOrder", JSON.stringify(basket));
};

const calculatedQuantity = () => {
  cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculatedQuantity();

const removeItem = (id) => {
  const selectedId = id;
  basket = basket.filter((x) => x.id !== selectedId);

  calculatedQuantity();
  generateShop();
  totalAmount();
  localStorage.setItem("userOrder", JSON.stringify(basket));
};

const totalAmount = () => {
  if (basket.length !== 0) {
    const amount = basket
      .map((x) => {
        const { id, item } = x;
        const findPrice = shopItemsData.find((x) => x.id === id);
        return findPrice.price * item;
      })
      .reduce((x, y) => x + y, 0);
    return (lable.innerHTML = `
      <div>
        <h2>Total Bill: $${amount}</h2>
        <a href="checkout.html">
         <button class="checkout">Checkout</button>
        </a> 
        <button class="removeAll" onclick="clearCart()">Clear Cart</button>
      </div>
    `);
  } else {
    return;
  }
};

totalAmount();

const clearCart = () => {
  basket = [];
  calculatedQuantity();
  generateShop();
  localStorage.setItem("userOrder", JSON.stringify(basket));
};
