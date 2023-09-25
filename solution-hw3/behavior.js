

const price = document.getElementById("price");
const glazing = document.getElementById(glazingOptions);
const packSize = document.getElementById(packSizeOptions);
const basePrice = 2.49;

const element = document.getElementById("myElement");

element.textContent = "jsdahdhf";


function glazingChange(this){
    const selectGlazing = document.getElementById(glazingOptions)
    const outPutElement = 0.00

    if (selectGlazing.value == "Keep original"){
        outPutElement = 0.00;
        element = 0;
    }
    else if (selectGlazing.value == "Sugar Milk"){
        outPutElement = 0.00;
        element = 1;
    }
    else if (selectGlazing.value == "Vanilla Milk"){
        outPutElement = 0.50;
    }
    else if (selectGlazing.value == "Double Chocolate"){
        outPutElement = 1.50;
    }

    glazing.textContent = outPutElement;

}

function packSizeChange(this){
    const selectGlazing = document.getElementById(packSizeOptions)
    const outPutElement = 0
    
    if (selectGlazing.value == "1"){
        outPutElement = 1;
    }
    else if (selectGlazing.value == "3"){
        outPutElement = 3;
    }
    else if (selectGlazing.value == "6"){
        outPutElement = 5;
    }
    else if (selectGlazing.value == "12"){
        outPutElement = 10;
    }

    packSize.textcontent = outPutElement;

}

function updatePrice(){
    price.textContent = glazing * packSize;
}