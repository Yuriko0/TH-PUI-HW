const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};


class Roll {
    constructor(rollType, element1, element2, basePrice) {
        this.type = rollType;
        this.glazing = element1;
        this.size = element2;
        this.basePrice = basePrice;

    }

    getPrice(){

        console.log('getting price')
        let glazingPriceChange, packSizePrice, finalPrice;

        if (this.glazing == "Sugar Milk"){
            glazingPriceChange = 0.00;
            console.log('x')
        } else if (this.glazing == "Vanilla Milk"){
            glazingPriceChange = 0.50;
        } else if (this.glazing == "Keep original"){
            glazingPriceChange = 0.00;
        } else if (this.glazing == "Double Chocolate"){
            glazingPriceChange = 1.50;
        }

        if (this.size == "1"){
            packSizePrice = 1.00;
        } else if (this.size == "3"){
            packSizePrice = 3.00;
        } else if (this.size == "6"){
            packSizePrice = 5.00;
        } else if (this.size == "12"){
            packSizePrice = 10.00;
        }

        finalPrice = ((this.basePrice + glazingPriceChange) * packSizePrice).toFixed(2);
        console.log(glazingPriceChange, packSizePrice, finalPrice)

        return finalPrice;

    }

}

let cart = []
console.log(cart.length);
let subtotal = 0;

if (localStorage.getItem('storedCart') != null){
    console.log('this has been called')
    retrieveFromLocalStorage()
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("remove-button")) {
      const section = e.target.closest(".flex4");
      if (section) {
        console.log('you have removed one item from the cart')
        section.remove(); 
        }
    }
}); // Methods learnt from online resources and tutorials

const queryString = window.location.search;
console.log(queryString);

if (queryString == ''){
    console.log('you are currently not in detail page')
    updateCart()
    updateSubtotal()
}

const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const basePrice = rolls[rollType].basePrice;
var glazingPriceChange = 0.00;
var packSizePrice = 1.00;
var unitPrice = rolls[rollType].basePrice;

var element1 = document.querySelector("#glazingOptions");
var element2 = document.querySelector("#packSizeOptions");
var finalPrice = document.querySelector("#price");  

function updateCart(){
    retrieveFromLocalStorage()
    const modCart = [];

    for (let i = 0; i < cart.length; i++){
        
        modCart.push(new Roll(cart[i].type, cart[i].glazing, cart[i].size, cart[i].basePrice));        
        var name = modCart[i].type;
        console.log(name);

        const template = document.getElementById('myTemplate');
        const clone = document.importNode(template.content, true);

        const image = clone.querySelector('img');
        image.src = "/TH-PUI-HW/assets/products/" + rolls[name].imageFile;
    
        const detail = clone.querySelector('detail');
        detail.innerHTML = modCart[i].type + "<br>Glazing: " + modCart[i].glazing + "<br>Pack Size: " + cart[i].size;
        
        const price = clone.querySelector('price');
        price.innerHTML = "$ " + modCart[i].getPrice();

        subtotal += Number(modCart[i].getPrice());

        document.getElementById('container').appendChild(clone);
    }
}


function updateElement(){

    const detailImage = document.querySelector("#detailImage");
    detailImage.src = "/TH-PUI-HW/assets/products/" + rolls[rollType].imageFile;
    console.log(detailImage.src);

    const basePrice = document.querySelector("#price");
    basePrice.innerHTML = "$ " + rolls[rollType].basePrice;
    console.log(basePrice.src);

};

function update1(){
    if (element1.value === "Sugar Milk"){
        glazingPriceChange = 0.00;
    } else if (element1.value === "Vanilla Milk"){
        glazingPriceChange = 0.50;
    } else if (element1.value === "Keep original"){
        glazingPriceChange = 0.00;
    } else if (element1.value === "Double Chocolate"){
        glazingPriceChange = 1.50;
    }

    updateFinal()
    console.log('Glazing option updated')

}

function update2(){
    if (element2.value === "1"){
        packSizePrice = 1.00;
    } else if (element2.value === "3"){
        packSizePrice = 3.00;
    } else if (element2.value === "6"){
        packSizePrice = 5.00;
    } else if (element2.value === "12"){
        packSizePrice = 10.00;
    }
    console.log('Package size updated')
    
    updateFinal()
    
}


function updateFinal(){
    finalPrice.innerHTML ="$ " + ((unitPrice + glazingPriceChange) * packSizePrice).toFixed(2);
}

function updateSubtotal(){
    let currentSubtotal = document.querySelector("#subtotal");
    currentSubtotal.innerHTML = "$ " + subtotal.toFixed(2);
    console.log(currentSubtotal);
}

function addToCart(){

    const newRoll = new Roll(rollType, element1.value, element2.value, basePrice);
    console.log('this is the new roll', newRoll)
    let currentCart = JSON.parse(localStorage.getItem('storedCart')) || [];
    currentCart.push(newRoll);
    cart = currentCart;
    console.log('Now this is your cart: ', currentCart)
    saveToLocalStorage();
    updateCart()
}

function saveToLocalStorage(){
    const cartString = JSON.stringify(cart);
    localStorage.setItem('storedCart', cartString);
    console.log('saved to local change');
}

function retrieveFromLocalStorage(){
    const cartString = localStorage.getItem('storedCart');
    cart = JSON.parse(cartString);
}


function clearStorage(){
    localStorage.clear()
    console.log('local storage cleared, just for debugging');
}