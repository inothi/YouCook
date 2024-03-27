function makeFoodTable() {
    let mainFoodTable = document.getElementById("mainFoodTable");
    for (let i = 0; i < 24; i++) {
        axios({
            url: "https://www.themealdb.com/api/json/v1/1/random.php"
        }).then(response => {
            let randomRecipe = response.data;
            console.log(randomRecipe);
            mainFoodTable.innerHTML += '<div class="col-lg-3 col-md-4 col-sm-6 col-12 text-center text-light gap-tb img-custom border-custom">' 
                + '<span class="food-name">' + randomRecipe.meals[0].strMeal + '</span>'
                + '<img src="' + randomRecipe.meals[0].strMealThumb + '">'
                + '</div>'
        });
    }
}
makeFoodTable();