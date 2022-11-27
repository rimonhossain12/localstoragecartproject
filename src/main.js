const shop = document.getElementById("shop");
const cartAmount = document.getElementById("cartAmount");

let basket = JSON.parse(localStorage.getItem("userOrder")) || [];


const generateShop = () => {
  shop.innerHTML = shopItemsData
    .map((x) => {
    //   console.log("x found ", x);
      const { price, img, name, id, desc } = x;
      const findData = basket.find((x) => x.id === id) || [];
      return `
    <div class="item">
        <img width="223" src="${img}" alt="not found">
        <div class="card-details">
            <h2>${name}</h2>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id="update-${id}">
                         ${findData?.item === undefined ? 0 : findData.item}
                    </div>              
                    <i onclick="increment(${id})" class="bi bi-plus"></i>
                </div>
            </div>
        </div>
    </div>
    `;
    })
    .join("");
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
  localStorage.setItem("userOrder", JSON.stringify(basket));
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(`update-${id}`).innerHTML = search.item;
  quanitity();
};

const decrement = (id) => {
  const selectedId = id;
  const search = basket.find((x) => x.id === selectedId);
  if (search === undefined) return;
  else if (search.item === 0) return 0;
  else {
    search.item -= 1;
  }
  update(selectedId);
   //!filter basket if item = 0 then basket one object remove();
   basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("userOrder", JSON.stringify(basket));
};


// cart item quanitity
const quanitity = () => {
    const search = basket.map((x) => x.item).reduce((x,y) => x+y,0);
    cartAmount.innerHTML = search;
}

quanitity();