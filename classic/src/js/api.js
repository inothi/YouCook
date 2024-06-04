// array with flags of countries
const flagsUrlArray = [
    {strArea: "American", strAreaUrl: "us"},
    {strArea: "British", strAreaUrl: "gb"},
    {strArea: "Canadian", strAreaUrl: "ca"},
    {strArea: "Chinese", strAreaUrl: "cn"},
    {strArea: "Croatian", strAreaUrl: "hr"},
    {strArea: "Dutch", strAreaUrl: "nl"},
    {strArea: "Egyptian", strAreaUrl: "eg"},
    {strArea: "Filipino", strAreaUrl: "ph"},
    {strArea: "French", strAreaUrl: "fr"},
    {strArea: "Greek", strAreaUrl: "gr"},
    {strArea: "Indian", strAreaUrl: "in"},
    {strArea: "Irish", strAreaUrl: "ie"},
    {strArea: "Italian", strAreaUrl: "it"},
    {strArea: "Jamaican", strAreaUrl: "jm"},
    {strArea: "Japanese", strAreaUrl: "jp"},
    {strArea: "Kenyan", strAreaUrl: "kn"},
    {strArea: "Malaysian", strAreaUrl: "my"},
    {strArea: "Mexican", strAreaUrl: "mx"},
    {strArea: "Moroccan", strAreaUrl: "ma"},
    {strArea: "Polish", strAreaUrl: "pl"},
    {strArea: "Portuguese", strAreaUrl: "pt"},
    {strArea: "Russian", strAreaUrl: "ru"},
    {strArea: "Spanish", strAreaUrl: "es"},
    {strArea: "Thai", strAreaUrl: "th"},
    {strArea: "Tunisian", strAreaUrl: "tn"},
    {strArea: "Turkish", strAreaUrl: "tr"},
    {strArea: "Vietnamese", strAreaUrl: "vn"}
];


// make array with recipes id's
const idFoodArray = [];
for (let i = 52764; i <= 53083; i++) {
    idFoodArray.push(i);
}


// check current url
(function checkUrl() {
    if (window.location.href.indexOf('search') > -1) {
        searchResults();
    }
    else if (window.location.href.indexOf('area') > -1) {
        areaRecipes();
    }
    else if (window.location.href.indexOf('category') > -1) {
        categoryRecipes();
    }
    else if ((window.location.href.indexOf('index.html') > -1) && (window.location.href.indexOf('search')) == -1) {
        getRandomRecipes();
    }
    else if (window.location.href.indexOf('recipes_details.html') > -1) {
        let id = window.location.href.slice(window.location.href.indexOf('id=') + 3, window.location.href.indexOf('id=') + 8);
        selectedRecipeDetails(id);
    }
    else if (window.location.href.indexOf('shopping_list.html') > -1 ) {
        loadShoppingList();
    }
    else if (window.location.href.indexOf('favourite_recipes.html') > -1 ) {
        loadFavouriteRecipes();
    }
}());


// update category path
function updateCategoryPath(id) {
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    }).then((response) => {
        let recipes = response.data;
        let categoryPath = document.getElementById("category-path");
        categoryPath.innerHTML = `<a href="./index.html"><i class="fa-solid fa-house fa-2xs"></i></a>`;
        categoryPath.innerHTML += `
            <span><a href="./index.html">All recipes</a></span>
            <span><a href="./index.html?category=${recipes.meals[0].strCategory}">${recipes.meals[0].strCategory}</a></span>
            <span><a href="#">${recipes.meals[0].strMeal}</a></span>`;
    });
}


// creating details of selected recipe
function selectedRecipeDetails(id) {
    let selectedRecipeImage = document.getElementById("selected-recipe-image");
    let selectedRecipeTitle = document.getElementById("selected-recipe-title");
    let selectedRecipeDetails = document.getElementById("selected-recipe-details");
    let selectedRecipeIngredientsTable = document.getElementById("ingredients-table");
    let selectedRecipeInstructions = document.getElementById("cooking-instructions");
    let selectedRecipeVideo = document.getElementById("video-instructions");
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    }).then((response) => {
        let selectedRecipe = response.data;
        let recipe = Object.entries(selectedRecipe.meals[0]);
        let recipeIngredients = recipe.filter(([key, value]) => (key.startsWith("strIngredient") && value != null && value != ""));
        for (let i = 0; i < recipeIngredients.length; i++) {
            recipeIngredients[i] = recipeIngredients[i][1][0].toUpperCase() + recipeIngredients[i][1].substring(1);
        }
        let recipeMeasures = recipe.filter(([key, value]) => (key.startsWith("strMeasure") && value != "" && value != null));
        let recipeVideo = selectedRecipe.meals[0].strYoutube.substring(selectedRecipe.meals[0].strYoutube.indexOf("?") + 3, selectedRecipe.meals[0].strYoutube.length);
        let recipeInstructions = selectedRecipe.meals[0].strInstructions;
        let flags = flagsUrlArray.filter((country) => {
            return country.strArea == selectedRecipe.meals[0].strArea;
        });
        if (JSON.parse(localStorage.getItem("inputChecked")) == true) {
            // selectedFoodTable.innerHTML += `
            // <div class="col-lg-12 col-md-4 col-sm-6 col-12">
            //     <h1>${selectedRecipe.meals[0].strMeal}</h1>
            //     <a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-light" href="#">
            //         <div class="food-name">${selectedRecipe.meals[0].strMeal}</div>
            //         <img src="' + selectedRecipe.meals[0].strMealThumb + '">
            //     </a>
            // </div>`
        }
        else {
            selectedRecipeTitle.innerHTML += `<h3>${selectedRecipe.meals[0].strMeal}</h3>`;
            selectedRecipeImage.innerHTML += `<img src="${selectedRecipe.meals[0].strMealThumb}">`;
            selectedRecipeDetails.innerHTML += `
                <h4>Specialty of cuisine:</h4>
                <div class="img-cat">
                    <a class="recipes-links" href="./index.html?area=${selectedRecipe.meals[0].strArea}">
                        <img 
                            class="country-image" 
                            src="https://www.themealdb.com/images/icons/flags/big/64/${flags[0].strAreaUrl}.png">
                        ${selectedRecipe.meals[0].strArea}
                    </a>
                </div><br /><br />`;
            selectedRecipeDetails.innerHTML += `
                <h4>Recipe category:</h4>
                <div class="img-cat">
                    <a class="recipes-links" href="./index.html?category=${selectedRecipe.meals[0].strCategory}">
                        <img 
                            class="category-image" 
                            src="https://www.themealdb.com/images/category/${selectedRecipe.meals[0].strCategory}.png">
                        ${selectedRecipe.meals[0].strCategory}
                    </a>
                </div>`;
            for (let i = 0; i < recipeIngredients.length; i++) {
                selectedRecipeIngredientsTable.innerHTML += `
                <tr>
                    <th class="align-middle" scope="row">${i + 1}</th>
                    <td class="align-middle"><img class="recipe-ingredients-image" src="https://www.themealdb.com/images/ingredients/${recipeIngredients[i]}.png">${recipeIngredients[i]}</td>
                    <td class="align-middle">${recipeMeasures[i][1]}</td>
                    <td class="align-middle text-center"><span data-tooltip="Add to your shopping list"><i class="fa-solid fa-circle-plus" onClick="addItemToShoppingList('https://www.themealdb.com/images/ingredients/${recipeIngredients[i]}.png', '${recipeIngredients[i]}', '${recipeMeasures[i][1]}', false)"></span></i></td>
                </tr>`
            }
            checkIsAddedToList();
            if ((recipeVideo != null) || (recipeVideo != "")) {
                selectedRecipeVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${recipeVideo}" frameborder="0" allowfullscreen></iframe>`
            } else {
                selectedRecipeVideo.style.display = "none";
            }
            if ((recipeInstructions != null) || (recipeInstructions != "")) {
                selectedRecipeInstructions.innerHTML = `${recipeInstructions}`;
            } else {
                selectedRecipeInstructions.style.display = "none";
            }
        }
    }).catch(function(error) {
        // here will be code for a error message on main page;
    }).finally(function() {
        // here will be code for a loading icon;
    });
    updateCategoryPath(id);
};


// checking if ingredient is added to shopping list and change icon
function checkIsAddedToList() {
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    let ingredientRow = document.getElementById("ingredients-table").children;
    for (let i = 0; i < ingredientRow.length; i++) {
        let ingredientName = String(ingredientRow[i].children[1].innerHTML.substring(String(ingredientRow[i].children[1].innerHTML.indexOf('>') + 1, String(ingredientRow[i].children[1].innerHTML.length))));
        for (let j = 0; j < shoppingList.length; j++) {
            if (shoppingList[j].ingredient == ingredientName) {
                ingredientRow[i].children[3].innerHTML = `<span data-shopping="This ingredient has already been added to your shopping list"><i class="fa-solid fa-circle-check margin-both" style="color: var(--color-green)";></i></span>`;
            }
        }
    }
}


// validate if recipes was added to favourite
function checkIsFav(el) {
    let addedItem = document.getElementById(el);
    let favouriteRecipes = JSON.parse(localStorage.getItem("favRecipes"));
    let favItem = Number(el.slice(el.indexOf("heart-") + 6, el.indexOf("heart-").length));
    if (favouriteRecipes.includes(favItem)) {
        addedItem.classList.remove("fa-regular");
        addedItem.classList.add("fa-solid");
    }
}


// load 16 random recipes from api on the main page
function getRandomRecipes() {
    let mainFoodTable = document.getElementById("main-food-table");
    for (let i = 0; i < 16; i++) {
        axios({
            url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFoodArray.splice(Math.floor(Math.random() * idFoodArray.length), 1)[0]}`
        }).then((response) => {
            let randomRecipe = response.data;
            if (localStorage.getItem("inputChecked") == "true") {
                mainFoodTable.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-light">
                    <a href="./recipes_details.html?id=${randomRecipe.meals[0].idMeal}"> 
                        <div class="food-name">${randomRecipe.meals[0].strMeal}</div>
                        <img src="${randomRecipe.meals[0].strMealThumb}">
                    </a>
                    <div class="add-to-fav">
                        <i class="fa-regular fa-heart fa-2xl" onClick="addToFav('heart-${randomRecipe.meals[0].idMeal}')" id="heart-${randomRecipe.meals[0].idMeal}"></i>
                    </div>
                </div>`
            }
            else {
                mainFoodTable.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-dark">
                    <a href="./recipes_details.html?id=${randomRecipe.meals[0].idMeal}"> 
                        <div class="food-name">${randomRecipe.meals[0].strMeal}</div>
                        <img src="${randomRecipe.meals[0].strMealThumb}">
                    </a>
                    <div class="add-to-fav">
                        <i class="fa-regular fa-heart fa-2xl" onClick="addToFav('heart-${randomRecipe.meals[0].idMeal}')" id="heart-${randomRecipe.meals[0].idMeal}"></i>
                    </div>
                </div>`
            }
            checkIsFav(`heart-${randomRecipe.meals[0].idMeal}`);
        }).catch(function(error) {
            // here will be code for a error message on main page;
        }).finally(function() {
            // here will be code for a loading icon;
        });
    }
};


// add favourite recipes to localStorage array
function addToFav(el) {
    let favouriteRecipes = JSON.parse(localStorage.getItem("favRecipes"));
    if (favouriteRecipes == null) {
        favouriteRecipes = [];
    }
    let favItem = Number(el.slice(el.indexOf("heart-") + 6, el.indexOf("heart-").length));
    // validation if recipes exist on favourites
    if (!(favouriteRecipes.includes(favItem))) {
        localStorage.setItem("favItem", JSON.stringify(favItem));
        favouriteRecipes.push(favItem);
        localStorage.setItem("favRecipes", JSON.stringify(favouriteRecipes));
    }
    checkIsFav(el);
}


// load favourite recipes
function loadFavouriteRecipes() {
    let mainFoodTable = document.getElementById("main-food-table");
    let favRecipesArray = JSON.parse(localStorage.getItem("favRecipes"));
    for (let i = 0; i < favRecipesArray.length; i++) {
        axios({
            url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favRecipesArray[i]}`
        }).then((response) => {
            let randomRecipe = response.data;
            if (localStorage.getItem("inputChecked") == "true") {
                mainFoodTable.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-light">
                    <a href="./recipes_details.html?id=${randomRecipe.meals[0].idMeal}"> 
                        <div class="food-name">${randomRecipe.meals[0].strMeal}</div>
                        <img src="${randomRecipe.meals[0].strMealThumb}">
                    </a>
                    <div class="remove-from-fav">
                        <i class="fa-solid fa-heart fa-2xl" onClick="removeFromFav(${i})" id="heart-${randomRecipe.meals[0].idMeal}"></i>
                    </div>
                </div>`
            }
            else {
                mainFoodTable.innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-dark">
                    <a href="./recipes_details.html?id=${randomRecipe.meals[0].idMeal}"> 
                        <div class="food-name">${randomRecipe.meals[0].strMeal}</div>
                        <img src="${randomRecipe.meals[0].strMealThumb}">
                    </a>
                    <div class="remove-from-fav">
                        <i class="fa-solid fa-heart fa-2xl" onClick="removeFromFav(${i})" id="heart-${randomRecipe.meals[0].idMeal}"></i>
                    </div>
                </div>`
            }
        }).catch(function(error) {
            // here will be code for a error message on main page;
        }).finally(function() {
            // here will be code for a loading icon;
        });
    }
};


// remove favourite recipes from localStorage array
function removeFromFav(el) {
    let favouriteRecipes = JSON.parse(localStorage.getItem("favRecipes"));
    favouriteRecipes.splice(el, 1);
    localStorage.setItem("favRecipes", JSON.stringify(favouriteRecipes));
    let clearList = document.getElementById("main-food-table");
    clearList.innerHTML = "";
    loadFavouriteRecipes();
}


// 
document.addEventListener("DOMContentLoaded", () => {
    let favIcon = document.querySelectorAll(".remove-from-fav");
    favIcon.forEach((heartBtn) => {
        heartBtn.addEventListener("mouseover", () => {
            console.log("yeah");
        })
    })
    console.log(favIcon);
})