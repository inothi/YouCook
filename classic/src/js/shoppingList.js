let shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

function loadShoppingList() {
    let shoppingListTable = document.getElementById("shopping-list");
    for (let i = 0; i < shoppingList.length; i++) {
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


// list with categories of products
let foodCategories = [
    "Foodstuffs",
    "Pets",
    "House-cleaning",
    "Garden & DIY",
    "Electronics & office",
    "Beauty & hygiene",
    "Baby",
    "Health",
    "Other"
]