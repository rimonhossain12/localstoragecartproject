let basket = JSON.parse(localStorage.getItem('order')) || [];
const cartAmount = document.getElementById('cartAmount');


const generateCartItem = () => {
    
}



const cartQuantity = () => {
	const search = basket.map((x) => x.item ).reduce((x,y) => x+y,0);
	cartAmount.innerHTML = search;
}

cartQuantity();