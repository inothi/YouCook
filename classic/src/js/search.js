// if search button is click
if (window.location.href.indexOf('index.html') > -1) {
    let searchBtn = document.getElementById("search-button");
    searchBtn.addEventListener("click", () => {
        let inputValue = document.getElementById("search-meals").value;
        if (inputValue === "") {
            return false;
        } else search();
    });
}


// if enter key is pressed on the search input
if (window.location.href.indexOf('index.html') > -1) {
    let searchInput = document.getElementById("search-meals");
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            if (searchInput.value == "") {
                return false;
            } else search();
        }
    });
}


// show search results
function searchResults() {
    let mainSearchFoodTable = document.getElementById("main-food-table");
    mainSearchFoodTable.innerHTML = "";
    let foodName = window.location.href.slice(window.location.href.indexOf('search=') + 7, window.location.href.indexOf('search=').length);
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    }).then((response) => {
        let searchResult = response.data.meals;
        for (let i = 0; i < searchResult.length; i++) {
            mainSearchFoodTable.innerHTML += `<a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-dark" href="./recipes_details.html?id=${searchResult[i].idMeal}">` 
            + '<div class="food-name">' + searchResult[i].strMeal + '</div>'
            + '<img src="' + searchResult[i].strMealThumb + '">'
            + '</a>'
        }
        let categoryPath = document.getElementById("category-path");
        categoryPath.innerHTML = `<a href="./index.html"><i class="fa-solid fa-house fa-2xs"></i></a>`;
        categoryPath.innerHTML += `
            <span><a href="./index.html">Search result</a></span>
            <span><a href="./index.html?search=${foodName}">${foodName.charAt(0).toUpperCase().concat(foodName.substring(1, foodName.length))}</a></span>`;
    }).catch(function(error) {
        // here will be code for a error message on main page;
    }).finally(function() {
        // here will be code for a loading icon;
    });
}


// change url after searching
function changeUrl(name) {
    window.location.href = `?search=${name}`;
    searchResults();
}


// search recipes by food name
function search() {
    // get string from search input
    let searchString = document.getElementById("search-meals").value;
    changeUrl(searchString);
}


// load recipes by area
function areaRecipes() {
    let areaTitle = document.getElementById("section-title");
    let mainAreaFoodTable = document.getElementById("main-food-table");
    let foodArea = window.location.href.slice(window.location.href.indexOf('area=') + 5, window.location.href.indexOf('area=').length);
    let flag = flagsUrlArray.filter((country) => {
        return country.strArea == foodArea;
    });
    areaTitle.innerHTML = `<h3><img src="https://www.themealdb.com/images/icons/flags/big/64/${flag[0].strAreaUrl}.png"> ${foodArea} cuisine</h3>`;
    mainAreaFoodTable.innerHTML = "";
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${foodArea}`
    }).then((response) => {
        let areaResult = response.data.meals;
        for (let i = 0; i < areaResult.length; i++) {
            mainAreaFoodTable.innerHTML += `<a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-dark" href="./recipes_details.html?id=${areaResult[i].idMeal}">` 
            + '<div class="food-name">' + areaResult[i].strMeal + '</div>'
            + '<img src="' + areaResult[i].strMealThumb + '">'
            + '</a>'
        }
        let categoryPath = document.getElementById("category-path");
        categoryPath.innerHTML = `<a href="./index.html"><i class="fa-solid fa-house fa-2xs"></i></a>`;
        categoryPath.innerHTML += `
            <span><a href="./index.html">Area select</a></span>
            <span><a href="./index.html?search=${foodArea}">${foodArea}</a></span>`;
    }).catch(function(error) {
        // here will be code for a error message on main page;
    }).finally(function() {
        // here will be code for a loading icon;
    });
}


// load recipes by category
function categoryRecipes() {
    let categoryTitle = document.getElementById("section-title");
    let mainCategoryFoodTable = document.getElementById("main-food-table");
    let foodCategory = window.location.href.slice(window.location.href.indexOf('category=') + 9, window.location.href.indexOf('category=').length);
    categoryTitle.innerHTML = `<h3><img class="category-image-header" src="https://www.themealdb.com/images/category/${foodCategory}.png"> ${foodCategory} cuisine</h3>`;
    mainCategoryFoodTable.innerHTML = "";
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodCategory}`
    }).then((response) => {
        let categoryResult = response.data.meals;
        for (let i = 0; i < categoryResult.length; i++) {
            mainCategoryFoodTable.innerHTML += `<a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-dark" href="./recipes_details.html?id=${categoryResult[i].idMeal}">` 
            + '<div class="food-name">' + categoryResult[i].strMeal + '</div>'
            + '<img src="' + categoryResult[i].strMealThumb + '">'
            + '</a>'
        }
        let categoryPath = document.getElementById("category-path");
        categoryPath.innerHTML = `<a href="./index.html"><i class="fa-solid fa-house fa-2xs"></i></a>`;
        categoryPath.innerHTML += `
            <span><a href="./index.html">Category select</a></span>
            <span><a href="./index.html?category=${foodCategory}">${foodCategory}</a></span>`;
    }).catch(function(error) {
        // here will be code for a error message on main page;
    }).finally(function() {
        // here will be code for a loading icon;
    });
}


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