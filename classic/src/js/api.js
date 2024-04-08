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
}());
// checkUrl();


// update category path
function updateCategoryPath(id) {
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    }).then((response) => {
        let recipes = response.data;
        console.log(recipes);
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
    let selectedFoodTable = document.getElementById("main-food-table");
    selectedFoodTable.innerHTML = "";
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    }).then((response) => {
        let selectedRecipe = response.data;
        let objectNames = Object.keys(selectedRecipe.meals[0]);
        let objectIngredients = objectNames.filter(elem => elem.startsWith("strIngredient"));
        if (localStorage.getItem("inputChecked") == true) {
            selectedFoodTable.innerHTML += `
            <div class="col-lg-12 col-md-4 col-sm-6 col-12">
                <h1>${selectedRecipe.meals[0].strMeal}</h1>
                <a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-light" href="#">
                    <div class="food-name">${selectedRecipe.meals[0].strMeal}</div>
                    <img src="' + selectedRecipe.meals[0].strMealThumb + '">
                </a>
            </div>`
        }
        else {
            selectedFoodTable.innerHTML += `
            <div class="col-lg-5 col-md-4 col-sm-6 col-12 recipe-header">
                <img src="${selectedRecipe.meals[0].strMealThumb}">
            </div>
            <div class="col-lg-7 col-md-4 col-sm-6 col-12 recipe-header-ingredients">
                <h3>${selectedRecipe.meals[0].strMeal}</h3>
                <h6>Ingredients:</h6>
                <span>
                    <img src="https://www.themealdb.com/images/ingredients/${selectedRecipe.meals[0].strIngredient1}.png">
                    ${selectedRecipe.meals[0].strIngredient1}
                </span>
            </div>`
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
            console.log(localStorage.getItem("inputChecked"));
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


// load more recipes by scrolling to the bottom of the website
window.onscroll = function() {
    // check url is main page
    if (window.location.href.indexOf('index.html') > -1) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            getRandomRecipes();
        };
        let scrollBtn = document.getElementById("scroll-button");
        if ((document.body.scrollTop > 1000) || document.documentElement.scrollTop > 1000) {
            scrollBtn.style.opacity = "1";
        }
        else {
            scrollBtn.style.opacity = "0";
        }
    }
};

// scroll to the top of the website after button 'go to the top' is clicked
function scrollBtn() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

if (window.location.href.indexOf('recipes_details.html') > -1) {
    
}