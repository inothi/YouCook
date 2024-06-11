// array of countries
const countiresArray = [
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


if (window.location.href.indexOf("index.html") > -1) {
    let body = document.querySelector("body");
    if (body.onload) {
        addSelectToMainPage();
    }
}


// main page search by category and country
function addSelectToMainPage() {
    let mainPageSelect = document.getElementById("section-title");
    mainPageSelect.innerHTML = `
        <div class="wrapper">
            <h3>Browse by country</h3>
            <select class="select-area" id="select-area">
                <option value="" disabled selected>Select country</option>
            </select>
        </div>
        <div class="wrapper">
            <h3>Browse by category</h3>
            <select class="select-category" id="select-category">
                <option value="" disabled selected>Select category</option>
            </select>
        </div>`;
    let selectArea = document.getElementById("select-area");
    for (let i = 0; i < countiresArray.length; i++) {
        let optionArea = document.createElement("option");
        optionArea.innerHTML = countiresArray[i].strArea;
        optionArea.value = countiresArray[i].strArea;
        selectArea.appendChild(optionArea);
    }

    let selectCategory = document.getElementById("select-category");
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/categories.php`
    }).then((response) => {
        let foodCategories = response.data.categories;
        for (let i = 0; i < foodCategories.length; i++) {
            let optionCategory = document.createElement("option");
            optionCategory.innerHTML = foodCategories[i].strCategory;
            optionCategory.value = foodCategories[i].strCategory;
            selectCategory.appendChild(optionCategory);
        }
    });

    // select country
    let selectCountry = document.getElementById("select-area");
    selectCountry.addEventListener("change", () => {
        let selectedCountry = selectCountry.value;
        window.location.href = `./index.html?area=${selectedCountry}`;
        // reset select before change page
        selectCountry.selectedIndex = 0;
    });

    // select category
    let selectCat = document.getElementById("select-category");
    selectCat.addEventListener("change", () => {
        let selectedCat = selectCat.value;
        window.location.href = `./index.html?category=${selectedCat}`;
        // reset select before change page
        selectCat.selectedIndex = 0;
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
            mainSearchFoodTable.innerHTML += `<a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-dark" href="./recipes_details.html?id=${searchResult[i].idMeal}"> 
            <div class="food-name">${searchResult[i].strMeal}</div>
            <img src="${searchResult[i].strMealThumb}">
            </a>`
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


// get options for areaRecipes select
function loadAreaOptions(country) {
    let areaSelect = document.getElementById("select-area");
    for (let i = 0; i < flagsUrlArray.length; i++) {
        if (flagsUrlArray[i].strArea !== country) {
            let areaOption = document.createElement("option");
            areaOption.innerHTML = flagsUrlArray[i].strArea;
            areaOption.value = flagsUrlArray[i].strArea;
            areaSelect.appendChild(areaOption);
        }
    }
}


// load recipes by area
function areaRecipes() {
    let areaTitle = document.getElementById("section-title");
    let mainAreaFoodTable = document.getElementById("main-food-table");
    let foodArea = window.location.href.slice(window.location.href.indexOf('area=') + 5, window.location.href.indexOf('area=').length);
    let flag = flagsUrlArray.filter((country) => {
        return country.strArea == foodArea;
    });
    areaTitle.innerHTML = `
        <h3>
            <img src="https://www.themealdb.com/images/icons/flags/big/64/${flag[0].strAreaUrl}.png"> ${foodArea} cuisine
        </h3>
        <select class="select-area" id="select-area">
            <option value="" disabled selected>Change country</option>
        </select>`;
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
    loadAreaOptions(foodArea);
        
    // change country
    let changeCountry = document.getElementById("select-area");
    changeCountry.addEventListener("change", () => {
        let newSelectedCountry = changeCountry.value;
        window.location.href = `./index.html?area=${newSelectedCountry}`;
    })
}


// get options for categoryRecipes select
function loadCategoryOptions(category) {
    let categorySelect = document.getElementById("select-category");
    axios({
        url: `https://www.themealdb.com/api/json/v1/1/categories.php`
    }).then((response) => {
        let foodCategories = response.data.categories;
        for (let i = 0; i < foodCategories.length; i++) {
            if (foodCategories[i].strCategory !== category) {
                let categoryOption = document.createElement("option");
                categoryOption.innerHTML = foodCategories[i].strCategory;
                categoryOption.value = foodCategories[i].strCategory;
                categorySelect.appendChild(categoryOption);
            }
        }
    })
}


// load recipes by category
function categoryRecipes() {
    let categoryTitle = document.getElementById("section-title");
    let mainCategoryFoodTable = document.getElementById("main-food-table");
    let foodCategory = window.location.href.slice(window.location.href.indexOf('category=') + 9, window.location.href.indexOf('category=').length);
    categoryTitle.innerHTML = `
        <h3>
            <img class="category-image-header" src="https://www.themealdb.com/images/category/${foodCategory}.png"> ${foodCategory} category
        </h3>
        <select class="select-category" id="select-category">
            <option value="" disabled selected>Change category</option>
        </select>`;
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
    loadCategoryOptions(foodCategory);

    // change category
    let changeCategory = document.getElementById("select-category");
    changeCategory.addEventListener("change", () => {
        let newSelectedCategory = changeCategory.value;
        window.location.href = `./index.html?category=${newSelectedCategory}`;
    })
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