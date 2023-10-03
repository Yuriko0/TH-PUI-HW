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

const cart = [];

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



class Roll {
    constructor(rollType, element1, element2, basePrice) {
        this.type = rollType;
        this.glazing =  element1.value;
        this.size = element2.value;
        this.basePrice = basePrice;

    }
}

function addToCart(){
    const newRoll = new Roll (rollType, element1, element2, basePrice);
    cart.push(newRoll);
    console.log('Successfully added into cart. You may then see the information of the new roll///');
    console.log(newRoll);
    console.log(cart);
}


updateElement()