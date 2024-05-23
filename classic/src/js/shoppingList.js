let shoppingList = JSON.parse(localStorage.getItem("shoppingList"));

function loadShoppingList() {
    shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
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
                    <span data-shopping="Edit product"><i onclick="editItemOnShoppingList(${i})" data-toggle="modal" data-target="#exampleModal" data-whatever="Edit" class="fa-solid fa-pen-to-square margin-both"></i></span>
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
                    <span data-shopping="Edit product"><i onclick="editItemOnShoppingList(${i})" data-toggle="modal" data-target="#exampleModal" data-whatever="Add" class="fa-solid fa-pen-to-square margin-both"></i></span>
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


// add manually new item to shopping list
async function addItemManually() {
    let itemName = document.getElementById("product-name").value;
    let itemQty = document.getElementById("product-quantity").value;
    let itemQtyUnit = document.getElementById("product-quantity-unit").value;
    let itemQuantity = itemQty + " " + itemQtyUnit;
    let itemCat = document.getElementById("product-category").value;
    // check if image exist
    let itemImgStatus = await axios({
        url: `https://www.themealdb.com/images/ingredients/${itemName}.png`
    }).then((response) => {
        if (response.status === 200) {
            return true;
        } else return false;
    }).catch(() => {
        console.clear();
        return false;
    })
    let itemImg = "";
    if (itemImgStatus === true) {
        itemImg = `https://www.themealdb.com/images/ingredients/${itemName}.png`;
    } else {
        if (itemCat == 'Foodstuffs') {
            itemImg = `./src/assets/img/icons/foodstuffs.png`;
        } else if (itemCat == 'Pets') {
            itemImg = `./src/assets/img/icons/pets.png`;
        } else if (itemCat == 'House-cleaning') {
            itemImg = `./src/assets/img/icons/house-cleaning.png`;
        } else if (itemCat == 'Garden & DIY') {
            itemImg = `./src/assets/img/icons/garden.png`;
        } else if (itemCat == 'Electronics & Office') {
            itemImg = `./src/assets/img/icons/electronics.png`;
        } else if (itemCat == 'Beauty & Hygiene') {
            itemImg = `./src/assets/img/icons/beauty.png`;
        } else if (itemCat == 'Baby') {
            itemImg = `./src/assets/img/icons/baby.png`;
        } else if (itemCat == 'Health') {
            itemImg = `./src/assets/img/icons/health.png`;
        } else {
            itemImg = `./src/assets/img/icons/other.png`;
        }
    };
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
    };
    clearModalForm();
    let clearList = document.getElementById("shopping-list");
    clearList.innerHTML = "";
    loadShoppingList();
}


// edit items added to shopping list
function editItemOnShoppingList(id) {
    // modal label
    let modalLabel = document.getElementById("exampleModalLabel");
    modalLabel.innerHTML = "Edit item on the shopping list";
    // change 'add' button to 'save'
    let editFormBtn = document.getElementById("modalFormBtn");
    editFormBtn.innerHTML = "Save changes";
    // change onclick function
    editFormBtn.setAttribute("onclick", `saveEditingItem(${id})`);
    editFormBtn.setAttribute("data-dismiss", "modal");
    // editing item name
    var modalItemName = document.getElementById("product-name");
    let shoppingListTable = document.getElementById("shopping-list");
    let listItemName = shoppingListTable.children[id].children[1].innerHTML.substring(String(shoppingListTable.children[id].children[1].innerHTML.indexOf('>') + 1, String(shoppingListTable.children[id].children[1].innerHTML.length)));
    modalItemName.value = listItemName;
    // editing item quantity
    var modalItemQty = document.getElementById("product-quantity");
    var listItemQty = Number(shoppingListTable.children[id].children[2].innerHTML.split(" ")[0]);
    modalItemQty.value = listItemQty;
    // editing item unit
    var modalItemUnit = document.getElementById("product-quantity-unit");
    let listItemUnit = String(shoppingListTable.children[id].children[2].innerHTML.split(" ")[1]);
    modalItemUnit.value = listItemUnit;
    // editing item category
    var modalItemCategory = document.getElementById("product-category");
    let listItemCategory = String(shoppingListTable.children[id].children[3].innerHTML);
    if (listItemCategory.split(" ").length > 1) {
        listItemCategory = String(listItemCategory.split(" ")[0].concat(" & ").concat(listItemCategory.split(" ")[2]));
    }
    modalItemCategory.value = listItemCategory;
}


// validation if modal form is correct
function validateForm() {
    console.log("Zmieniono wpis")
}


// save changes in selected item on the shopping list
async function saveEditingItem(id) {
    // get edited values from modal
    let editedName = String(document.getElementById("product-name").value);
    let editedQty = String(document.getElementById("product-quantity").value);
    let editedUnit = String(document.getElementById("product-quantity-unit").value);
    let editedQuantity = String(editedQty.concat(" ", editedUnit));
    let editedCategory = String(document.getElementById("product-category").value);
    // get shopping list from localStorage
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    let getEditingItem = shoppingList[id];
    // check if image exist
    let itemImgStatus = await axios({
        url: `https://www.themealdb.com/images/ingredients/${editedName}.png`
    }).then((response) => {
        if (response.status === 200) {
            return true;
        } else return false;
    }).catch(() => {
        console.clear();
        return false;
    })
    let itemImg = "";
    if (itemImgStatus === true) {
        itemImg = `https://www.themealdb.com/images/ingredients/${editedName}.png`;
    } else {
        if (editedCategory == 'Foodstuffs') {
            itemImg = `./src/assets/img/icons/foodstuffs.png`;
        } else if (editedCategory == 'Pets') {
            itemImg = `./src/assets/img/icons/pets.png`;
        } else if (editedCategory == 'House-cleaning') {
            itemImg = `./src/assets/img/icons/house-cleaning.png`;
        } else if (editedCategory == 'Garden & DIY') {
            itemImg = `./src/assets/img/icons/garden.png`;
        } else if (editedCategory == 'Electronics & Office') {
            itemImg = `./src/assets/img/icons/electronics.png`;
        } else if (editedCategory == 'Beauty & Hygiene') {
            itemImg = `./src/assets/img/icons/beauty.png`;
        } else if (editedCategory == 'Baby') {
            itemImg = `./src/assets/img/icons/baby.png`;
        } else if (editedCategory == 'Health') {
            itemImg = `./src/assets/img/icons/health.png`;
        } else {
            itemImg = `./src/assets/img/icons/other.png`;
        }
    };
    let replaceItem = {
        "image": itemImg,
        "ingredient": editedName,
        "quantity": editedQuantity,
        "category": editedCategory,
        "bought": getEditingItem.bought
    }
    localStorage.setItem("editingItem", JSON.stringify(replaceItem));
    shoppingList[id] = replaceItem;
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    let clearList = document.getElementById("shopping-list");
    clearList.innerHTML = "";
    loadShoppingList();
}


// change modal label, button and clear form
function modalBtn() {
    clearModalForm();
    // modal label
    let modalLabel = document.getElementById("exampleModalLabel");
    modalLabel.innerHTML = "Add new item to the shopping list";
    // change 'add' button to 'save'
    let editFormBtn = document.getElementById("modalFormBtn");
    editFormBtn.innerHTML = "Add item";
}


// clear modal form
function clearModalForm() {
    let modalItemName = document.getElementById("product-name");
    modalItemName.value = "";
    let modalItemQty = document.getElementById("product-quantity");
    modalItemQty.value = "";
    let modalItemUnit = document.getElementById("product-quantity-unit");
    modalItemUnit.value = "";
}