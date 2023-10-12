console.log("Please at least enter the detail page one time from the main page so that the URL param could be obtained. Otherwise it may cause errors and malfunctions.")

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
        this.glazing =  element1;
        this.size = element2;
        this.basePrice = basePrice;

    }

    getPrice(){

        let glazingPriceChange, packSizePrice, finalPrice;

        if (this.glazing == "Sugar Milk"){
            glazingPriceChange = 0.00;
            console.log('x')
        } else if (this.glazing == "Vanilla Milk"){
            glazingPriceChange = 0.50;
        } else if (this.glazing == "Original Milk"){
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



const roll1 = new Roll("Original", "Sugar Milk", 1, 2.49);
const roll2 = new Roll("Walnut", "Vanilla Milk", 12, 3.49);
const roll3 = new Roll("Raisin", "Sugar Milk", 3, 2.99);
const roll4 = new Roll("Apple", "Original Milk", 3, 3.49);

let cart = []
cart.push(roll1, roll2, roll3, roll4);
console.log(cart.length);
let subtotal = 0;


function remove(){
    if (cart.length > 0){
        cart.pop()
        const element = document.querySelector("#container");
        element.innerHTML = '';
        subtotal = 0;
        updateCart()
        console.log(cart)
        updateSubtotal()
    }
}

function updateCart(){
    
    for (let i = 0; i < cart.length; i++){

        const name = cart[i].type;

        const template = document.getElementById('myTemplate');
        const clone = document.importNode(template.content, true);

        const image = clone.querySelector('img');
        image.src = "/TH-PUI-HW/assets/products/" + rolls[name].imageFile;
    
        const detail = clone.querySelector('detail');
        detail.innerHTML = cart[i].type + "<br>Glazing: " + cart[i].glazing + "<br>Pack Size: " + cart[i].size;

        const price = clone.querySelector('price');
        price.innerHTML = "$ " + cart[i].getPrice();

        subtotal += Number(cart[i].getPrice());

        console.log(subtotal);

        document.getElementById('container').appendChild(clone);
    }
}

updateCart()
updateSubtotal()


const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const basePrice = rolls[rollType].basePrice;



var glazingPriceChange = 0.00;
var packSizePrice = 1.00;
let unitPrice = rolls[rollType].basePrice;

let element1 = document.querySelector("#glazingOptions");
let element2 = document.querySelector("#packSizeOptions");
let finalPrice = document.querySelector("#price");



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
    currentSubtotal.innerHTML = "$ " + subtotal;
    console.log(currentSubtotal)
}

function addToCart(){
    const newRoll = new Roll (rollType, element1, element2, basePrice);
    cart.push(newRoll);
    console.log('Successfully added into cart. You may then see the information of the new roll///');
    console.log(newRoll);
    console.log(cart);
}
