
var glazingPriceChange = 0.00;
var packSizePrice = 1.00;
let unitPrice = 2.49;

let element1 = document.querySelector("#glazingOptions");
let element2 = document.querySelector("#packSizeOptions");
let finalPrice = document.querySelector("#price");

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

console.log(queryString);

console.log(rollType);

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
    console.log('gpc updated')
    console.log(finalPrice)



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
    console.log('psp updated')

    updateFinal()
    console.log(finalPrice)

}


function updateFinal(){
    finalPrice.innerHTML ="$ " + ((unitPrice + glazingPriceChange) * packSizePrice).toFixed(2);
}


