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


// check is url is main page
(function checkUrl() {
    if (window.location.href.indexOf('index.html') > -1) {
        getRandomRecipes();
    }
    else if (window.location.href.indexOf('recipes_details.html') > -1) {
        let id = window.location.href.slice(window.location.href.indexOf('id=') + 3, window.location.href.indexOf('id=') + 8);
        selectedRecipeDetails(id);
    }
    else if (window.location.href.indexOf('shopping_list.html') > -1 ) {
        loadShoppingList();
    }
}());
// checkUrl();


// update category path
function updateCategoryPath(id) {
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    }).then((response) => {
        let recipes = response.data;
        let categoryPath = document.getElementById("category-path");
        categoryPath.innerHTML = `<a href="./index.html"><i class="fa-solid fa-house fa-2xs"></i></a>`;
        categoryPath.innerHTML += `
            <span><a href="#">Recipes book</a></span>
            <span><a href="#">All recipes</a></span>
            <span><a href="#">${recipes.meals[0].strCategory}</a></span>
            <span><a href="#">${recipes.meals[0].strMeal}</a></span>`;
    });
}


// creating details of selected recipe
function selectedRecipeDetails(id) {
    let selectedRecipeImage = document.getElementById("selected-recipe-image");
    let selectedRecipeTitle = document.getElementById("selected-recipe-title");
    let selectedRecipeDetails = document.getElementById("selected-recipe-details");
    let selectedRecipeIngredientsTable = document.getElementById("ingredients-table");
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    }).then((response) => {
        let selectedRecipe = response.data;
        let recipe = Object.entries(selectedRecipe.meals[0]);
        let recipeIngredients = recipe.filter(([key, value]) => (key.startsWith("strIngredient") && value != null && value != ""));
        let recipeMeasures = recipe.filter(([key, value]) => (key.startsWith("strMeasure") && value != "" && value != null));
        let flags = flagsUrlArray.filter((country) => {
            return country.strArea == selectedRecipe.meals[0].strArea;
        });
        if (localStorage.getItem("inputChecked") == true) {
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
                    <a class="recipes-links" href="#">
                        <img 
                            class="country-image" 
                            src="https://www.themealdb.com/images/icons/flags/big/64/${flags[0].strAreaUrl}.png">
                        ${selectedRecipe.meals[0].strArea}
                    </a>
                </div><br /><br />`;
            selectedRecipeDetails.innerHTML += `
                <h4>Recipe category:</h4>
                <div class="img-cat">
                    <a class="recipes-links" href="#">
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
                    <td class="align-middle"><img class="recipe-ingredients-image" src="https://www.themealdb.com/images/ingredients/${recipeIngredients[i][1]}.png">${recipeIngredients[i][1]}</td>
                    <td class="align-middle">${recipeMeasures[i][1]}</td>
                    <td class="align-middle text-center"><span data-tooltip="Add this ingredient to your shopping list" href="#"><i class="fa-solid fa-circle-plus" onClick="addItemToShoppingList('${recipeIngredients[i][1]}', '${recipeMeasures[i][1]}')"></span></i></td>
                </tr>`
            }
        }
    }).catch(function(error) {
        // here will be code for a error message on main page;
    }).finally(function() {
        // here will be code for a loading icon;
    });
    updateCategoryPath(id);
};


// load 16 random recipes from api on the main page
function getRandomRecipes() {
    let mainFoodTable = document.getElementById("main-food-table");
    for (let i = 0; i < 16; i++) {
        axios({
            url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFoodArray.splice(Math.floor(Math.random() * idFoodArray.length), 1)[0]}`
        }).then((response) => {
            let randomRecipe = response.data;
            if (localStorage.getItem("inputChecked") == "true") {
                mainFoodTable.innerHTML += `<a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-light" href="./recipes_details.html?id=${randomRecipe.meals[0].idMeal}">` 
                + '<div class="food-name">' + randomRecipe.meals[0].strMeal + '</div>'
                + '<img src="' + randomRecipe.meals[0].strMealThumb + '">'
                + '</a>'
            }
            else {
                mainFoodTable.innerHTML += `<a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-dark" href="./recipes_details.html?id=${randomRecipe.meals[0].idMeal}">` 
                + '<div class="food-name">' + randomRecipe.meals[0].strMeal + '</div>'
                + '<img src="' + randomRecipe.meals[0].strMealThumb + '">'
                + '</a>'
            }
        }).catch(function(error) {
            // here will be code for a error message on main page;
        }).finally(function() {
            // here will be code for a loading icon;
        });
    }
};