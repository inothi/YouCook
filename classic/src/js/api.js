const idFoodArray = [];
for (let i = 52764; i <= 53083; i++) {
    idFoodArray.push(i);
}

function getRandomRecipes() {
    let mainFoodTable = document.getElementById("main-food-table");
    for (let i = 0; i < 16; i++) {
        axios({
            url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFoodArray.splice(Math.floor(Math.random() * idFoodArray.length), 1)[0]}`
        }).then(response => {
            let randomRecipe = response.data;
            if (inputChecked.checked) {
                mainFoodTable.innerHTML += '<a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-light" href="#">' 
                + '<div class="food-name">' + randomRecipe.meals[0].strMeal + '</div>'
                + '<img src="' + randomRecipe.meals[0].strMealThumb + '">'
                + '</a>'
            }
            else {
                mainFoodTable.innerHTML += '<a class="col-lg-3 col-md-4 col-sm-6 col-12 main-food-table food-table-dark" href="#">' 
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
console.log(idFoodArray.length);
}
getRandomRecipes();


window.onscroll = function() {
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
};

function scrollBtn() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}