const shop = document.getElementById("shop");
const cartAmount = document.getElementById('cartAmount');

let basket = JSON.parse(localStorage.getItem('order')) || [];

const generateShop = () => {
  shop.innerHTML = shopItemsData
    .map((data) => {
      const { img, price, desc, id, name } = data;
	  const search = basket.find((x) => x.id === id) || [];
	  const {item} = search;
      return `
          <div class="item">
            <img width="223" src="${img}" alt="">
            <div class="card-details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id="update-${id}">
							${search.item === undefined ? 0 : search.item}
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

const increment = (id) => {
  const selectedId = id;
  const search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: selectedId,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  cartQuantity();
  updateQuantity(selectedId);
  localStorage.setItem('order',JSON.stringify(basket));
};

const decrement = (id) => {
	const selectedId = id;
	const search = basket.find((x) => x.id === selectedId);
	
	if(search === undefined) return;
	else if (search.item === 0) return;
	else{
		search.item -= 1;
	}
	cartQuantity();
	updateQuantity(selectedId);
	
	basket = basket.filter((x) => x.item !== 0);
	localStorage.setItem('order',JSON.stringify(basket));

};

generateShop();

const updateQuantity = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(`update-${id}`).innerHTML = search.item;
};

const cartQuantity = () => {
	const search = basket.map((x) => x.item ).reduce((x,y) => x+y,0);
	cartAmount.innerHTML = search;
}

cartQuantity();