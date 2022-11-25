const cartAmount = document.getElementById("cartAmount");
const shoppingCart = document.getElementById("shopping-cart");
const label = document.getElementById("label");

let basket = JSON.parse(localStorage.getItem("order")) || [];
// console.log(basket.length);

const generateItemCart = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
      // find all products id and item;
      const { id, item } = x;
      const searchData = shopItemsData.find((x) => x.id === id) || [];
      const { name, img, price, title } = searchData;
      // console.log(searchData);
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
                  <i onclick="decrement(${id})" class="bi bi-dash"></i>
                  <div id="update-${id}">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus"></i>
              </div>
              <h3>$${item * price}</h3>
              </div>
              
      </div>
              `;
    }));
  } else {
    shoppingCart.innerHTML = `
      <h4 class="emptyCart">Your Cart is Empty</h4>
     <a href="index.html">
     <button class="homeBtn"> Back to Home</button>
     </a>
     
     `;
  }
};

generateItemCart();

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

  updateQuantity(selectedId);
  localStorage.setItem("order", JSON.stringify(basket));
  generateItemCart();
};

const decrement = (id) => {
  const selectedId = id;
  const search = basket.find((x) => x.id === selectedId);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  updateQuantity(selectedId);

  basket = basket.filter((x) => x.item !== 0);

  generateItemCart();

  localStorage.setItem("order", JSON.stringify(basket));
};

const updateQuantity = (id) => {
  const search = basket.find((x) => x.id === id);
  document.getElementById(`update-${id}`).innerHTML = search.item;
  cartQuantity();
  // genereCartItem();
};

const cartQuantity = () => {
  const search = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  cartAmount.innerHTML = search;
  // generateItemCart();
};

cartQuantity();

const totalPrice = () => {
  if (basket.length !== 0) {
    const amount = basket.map((x) => {
      const { id, item } = x;
      let filterData = shopItemsData.find((x) => x.id === id);
      console.log(filterData.price * item);
      return filterData.price * item;
    }).reduce((x,y) => x+y,0);
    return label.innerHTML = `
      <h2>Total Bill: $${amount}</h2>
      <button class="checkout">checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>

    `
  }
};

totalPrice();


const clearCart = () => {
  basket = [];
  generateItemCart();
  localStorage.setItem('order',JSON.stringify(basket));
  
  totalPrice();
}