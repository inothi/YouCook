let shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

function loadShoppingList() {
    let shoppingListTable = document.getElementById("shopping-list");
    for (let i = 0; i < shoppingList.length; i++) {
        if (window.matchMedia("(pointer: coarse)").matches) {
            shoppingListTable.innerHTML += `
            <tr>
                <th class="align-middle" scope="row">${i + 1}</th>
                <td class="align-middle"><img class="recipe-ingredients-image" src="${shoppingList[i].image}">${shoppingList[i].ingredient}</td>
                <td class="align-middle">${shoppingList[i].quantity}</td>
                <td class="align-middle">${shoppingList[i].category}</td>
                <td class="align-middle text-center">
                    <span data-shopping="Edit product"><i class="fa-solid fa-pen-to-square margin-both"></i></span>
                    <span data-shopping="Delete product"><i onclick="deleteFromShoppingList(${i})" class="fa-solid fa-trash-can margin-both"></i></span>
                    <span data-shopping="Mark as bought"><i onclick="markAsBought(${i})" class="fa-solid fa-circle-check margin-both"></i></span>
                </td>
            </tr>`
        } else {
            shoppingListTable.innerHTML += `
            <tr>
                <th class="align-middle" scope="row">${i + 1}</th>
                <td class="align-middle"><img class="recipe-ingredients-image" src="${shoppingList[i].image}">${shoppingList[i].ingredient}</td>
                <td class="align-middle">${shoppingList[i].quantity}</td>
                <td class="align-middle">${shoppingList[i].category}</td>
                <td class="align-middle text-center">
                    <span data-shopping="Edit product"><i class="fa-solid fa-pen-to-square margin-both"></i></span>
                    <span data-shopping="Delete product"><i onclick="deleteFromShoppingList(${i})" class="fa-solid fa-trash-can margin-both"></i></span>
                    <span data-shopping="Mark as bought"><i onclick="markAsBought(${i})" class="fa-solid fa-circle-check margin-both"></i></span>
                </td>
            </tr>`
        }
    }
    checkIsBought();
}


// validation if shopping list is sorted
function checkListSorted(key) {
    let bought = shoppingList.filter(el => el.bought == true);
    let unBought = shoppingList.filter(el => el.bought == false);
    for (let i = 0; i < unBought.length - 1; i++) {
        let a = unBought[i][key].toLowerCase();
        let b = unBought[i + 1][key].toLowerCase();
        if (a > b) {
            return false;
        }
    }
    for (let i = 0; i < bought.length - 1; i++) {
        let y = bought[i][key].toLowerCase();
        let z = bought[i + 1][key].toLowerCase();
        if (y > z) {
            return false;
        }
    }
    return true;
}


// sort shopping list
function sortList(key) {
    // checking if the shopping list has been previously sorted
    if (checkListSorted(key)) {
        let bought = shoppingList.filter(el => el.bought == true);
        let unBought = shoppingList.filter(el => el.bought == false);
        unBought.reverse();
        bought.reverse();
        shoppingList = unBought.concat(bought);
    }
    else {
        let bought = shoppingList.filter(el => el.bought == true);
        let unBought = shoppingList.filter(el => el.bought == false);
        unBought.sort((a, b) => {
            if (a[key].toLowerCase() > b[key].toLowerCase()) {
                return 1;
            } else return -1;
        })
        bought.sort((a, b) => {
            if (a[key].toLowerCase() > b[key].toLowerCase()) {
                return 1;
            } else return -1;
        })
        shoppingList = unBought.concat(bought);
    }
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    let clearList = document.getElementById("shopping-list");
    clearList.innerHTML = "";
    loadShoppingList();
}


// deleting ingredient from shopping list
function deleteFromShoppingList(position) {
    shoppingList.splice(position, 1);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    let clearList = document.getElementById("shopping-list");
    clearList.innerHTML = "";
    loadShoppingList();
}


// mark as bought/unbought on the shopping list
function isBought(position) {
    if (shoppingList[position].bought == false) {
        shoppingList[position].bought = true;
    } else {
        shoppingList[position].bought = false;
    }
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    // validate whick elements of list are bought
    checkIsBought();
    // move bought elements to the end of list
    moveToEndOrTop(position);
}


// move bought products to the end of the shopping list
function moveToEndOrTop(position) {
    if (shoppingList[position].bought == true) {
        let item = shoppingList.splice(position, 1);
        localStorage.setItem("item", JSON.stringify(item[0]));
        shoppingList.push(item[0]);
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    } else {
        let item = shoppingList.splice(position, 1);
        localStorage.setItem("item", JSON.stringify(item[0]));
        shoppingList.unshift(item[0]);
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }
    let clearList = document.getElementById("shopping-list");
    clearList.innerHTML = "";
    loadShoppingList();
}


// checking if position on the list is bought
function checkIsBought() {
    let ingredientRow = document.getElementById("shopping-list").children;
    for (let i = 0; i < shoppingList.length; i++) {
        if (shoppingList[i].bought == true) {
            ingredientRow[i].classList.add("bought-products");
            ingredientRow[i].children[4].children[0].style.display = "none";
            ingredientRow[i].children[4].children[1].style.display = "none";
            ingredientRow[i].children[4].children[2].innerHTML = `<span data-shopping="Mark as unbought"><i onclick="isBought(${i})" class="fa-solid fa-rotate-left margin-both" style="color: #fff";></i></span>`;
        }
        else {
            ingredientRow[i].classList.remove("bought-products");
            ingredientRow[i].children[4].children[0].style.display = "inline";
            ingredientRow[i].children[4].children[1].style.display = "inline";
            ingredientRow[i].children[4].children[2].innerHTML = `<span data-shopping="Mark as bought"><i onclick="isBought(${i})" class="fa-solid fa-circle-check margin-both"></i></span>`;
        }
    }
}

// check is image of ingredient exist
function checkImage(url) {
    let img = new Image();
    img.src = `https://www.themealdb.com/images/ingredients/${url}.png`;
    if (img.naturalWidth === 0) {
        return false;
    } else {
        return true;
    }
}


// add manually new item to shopping list
function addItemManually() {
    let itemName = document.getElementById("product-name").value;
    let itemQty = document.getElementById("product-quantity").value;
    let itemQtyUnit = document.getElementById("product-quantity-unit").value;
    let itemQuantity = itemQty + " " + itemQtyUnit;
    let itemCat = document.getElementById("product-category").value;
    let itemImg;
    let imgValidate = checkImage(itemName);
    if (imgValidate) {
        itemImg = `https://www.themealdb.com/images/ingredients/${itemName}.png`;
    } else {
        itemImg = `./src/assets/img/icons/foodstuffs.png`;
    }
    // console.log(itemImg);
    //     itemImg = `./src/assets/img/icons/foodstuffs.png`;
    //     // if (itemCat == 'Foodstuffs') {
    //     //     itemImg = `./src/assets/img/icons/foodstuffs.png`;
    //     // } else if (itemCat == 'Pets') {
    //     //     itemImg = `./src/assets/img/icons/pets.png`;
    //     // } else if (itemCat == 'House-cleaning') {
    //     //     itemImg = `./src/assets/img/icons/house-cleaning.png`;
    //     // } else if (itemCat == 'Garden & DIY') {
    //     //     itemImg = `./src/assets/img/icons/garden.png`;
    //     // } else if (itemCat == 'Electronics & Office') {
    //     //     itemImg = `./src/assets/img/icons/electronics.png`;
    //     // } else if (itemCat == 'Beauty & Hygiene') {
    //     //     itemImg = `./src/assets/img/icons/beauty.png`;
    //     // } else if (itemCat == 'Baby') {
    //     //     itemImg = `./src/assets/img/icons/baby.png`;
    //     // } else if (itemCat == 'Health') {
    //     //     itemImg = `./src/assets/img/icons/health.png`;
    //     // } else {
    //     //     itemImg = `./src/assets/img/icons/other.png`;
    //     // }
    let nameValidate = ingredientsValidation(itemName);
    if (nameValidate) {
        let shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
        if (shoppingList == null) {
            shoppingList = [];
        }
        let image = itemImg;
        let ingredient = itemName;
        let quantity = itemQuantity;
        if (quantity !== Number && quantity <= 0) {
            console.log("błędna ilość");
        }
        let category = itemCat;
        let bought = false;
        let item = {
            "image": image,
            "ingredient": ingredient,
            "quantity": quantity,
            "category": category,
            "bought": bought
        }
        localStorage.setItem("item", JSON.stringify(item));
        shoppingList.unshift(item);
        localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }
    let clearList = document.getElementById("shopping-list");
    clearList.innerHTML = "";
    loadShoppingList();
}