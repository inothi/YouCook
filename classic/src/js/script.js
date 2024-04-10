let inputChecked = document.getElementById("light-dark");

function toggleTheme() {
    let btn = document.getElementById("switch-btn");
    let footer = document.querySelector("footer");
    let header = document.querySelector("header");
    let body = document.querySelector("body");
    let categoryPath = document.getElementsByClassName("headlining")[0];
    let main = document.querySelector("main");
    let borderMain = document.getElementsByClassName("main-border")[0];
    let borderCarousel = document.getElementsByClassName("main-carousel-border")[0];
    let navigation = document.getElementsByClassName("bg-custom")[0];
    let navbar = document.getElementById("navbar");
    let carousel = document.getElementsByClassName("carousel-item");
    let foodTable = document.getElementById("main-food-table").children;
    
    if (localStorage.getItem("inputChecked") == "true") { 
        btn.innerHTML = "<i class='fa-solid fa-moon fa-xl'></i>";
        const footerStyles = {
            backgroundColor: "var(--color-red-dark-dark)",
            boxShadow: "0 -4px 4px #000"
        }
        Object.assign(footer.style, footerStyles);
        header.style.backgroundColor = "#eee";
        body.style.backgroundColor = "#eee";
        categoryPath.style.backgroundColor = "var(--color-red-dark-dark)";
        categoryPath.style.boxShadow = "0 4px 4px #000";
        main.style.backgroundColor = "#aaa";
        borderMain.style.boxShadow = "6px 0 4px -4px #000, -6px 0 4px -4px #000";
        borderCarousel.style.boxShadow = "6px 0 25px -4px #000, -6px 0 25px -4px #000";
        navigation.style.backgroundColor = "#aaa";
        navbar.style.boxShadow = "-1px 0 8px #000, 1px 0 8px #000";
        for (let i = 0; i < carousel.length; i++) {
            carousel[i].children[0].src = "../classic/src/assets/img/carouselImg0" + [i + 4] + ".jpg";
        }
        for (let i = 0; i < foodTable.length; i++) {
            foodTable[i].classList.remove("food-table-dark");
            foodTable[i].classList.add("food-table-light");
        }
    } 
    else {
        btn.innerHTML = "<i class='fa-solid fa-sun fa-xl'></i>";
        const footerStyles2 = {
            backgroundColor: "var(--color-blue-dark-dark)",
            boxShadow: "0 -4px 8px var(--color-red-light)"
        }
        Object.assign(footer.style, footerStyles2);
        header.style.backgroundColor = "var(--color-blue)";
        body.style.backgroundColor = "var(--color-blue)";
        categoryPath.style.backgroundColor = "var(--color-blue-dark-dark)";
        categoryPath.style.boxShadow = "0 4px 8px var(--color-red-light)";
        main.style.backgroundColor = "var(--color-blue-dark)";
        borderMain.style.boxShadow = "6px 0 4px -4px var(--color-red-light), -6px 0 4px -4px var(--color-red-light)";
        borderCarousel.style.boxShadow = "6px 0 25px -4px var(--color-red-light), -6px 0 25px -4px var(--color-red-light)";
        navigation.style.backgroundColor = "var(--color-blue-dark)";
        navbar.style.boxShadow = "6px 0 4px -4px var(--color-red-light), -6px 0 4px -4px var(--color-red-light)";
        for (let i = 0; i < carousel.length; i++) {
            carousel[i].children[0].src = "../classic/src/assets/img/carouselImg0" + [i + 1] + ".jpg";
        }
        if (window.location.href.indexOf("index.html") > -1) {
            for (let i = 0; i < foodTable.length; i++) {
                foodTable[i].classList.remove("food-table-light");
                foodTable[i].classList.add("food-table-dark");
            }
        }
    }
}


function changeDisplayMode() {
    if (localStorage.getItem("inputChecked") == "false") {
        localStorage.setItem("inputChecked", "true");
    }
    else localStorage.setItem("inputChecked", "false");
    toggleTheme();
    changeClasses();
};


// load more recipes by scrolling to the bottom of the website
window.onscroll = function() {
    // check url is main page
    if (window.location.href.indexOf('index.html') > -1) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            getRandomRecipes();
        }
    }
    let scrollBtn = document.getElementById("scroll-button");
    if ((document.body.scrollTop > 800) || document.documentElement.scrollTop > 800) {
        scrollBtn.style.opacity = "1";
    }
    else {
        scrollBtn.style.opacity = "0";
    }
};


// scroll to the top of the website after button 'go to the top' is clicked
function scrollBtn() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// shopping list
let shoppingList = [
    {ingredient: "paprika", quantity: 3},
    {ingredient: "onion", quantity: 2},
    {ingredient: "chicken breast", quantity: 1},
    {ingredient: "potato", quantity: 5}
];
console.log(shoppingList);

function loadShoppingList() {
    let shoppingListTable = document.getElementById("shopping-list");
    for (let i = 0; i < shoppingList.length; i++) {
        shoppingListTable.innerHTML += `
        <tr>
            <th class="align-middle" scope="row">${i + 1}</th>
            <td class="align-middle">${shoppingList[i].ingredient}</td>
            <td class="align-middle">${shoppingList[i].quantity}</td>
            <td class="align-middle text-center">
                <i class="fa-solid fa-circle-plus margin-right"></i>&nbsp;
                <i class="fa-solid fa-trash-can margin-right"></i>&nbsp;
                <i class="fa-solid fa-pen-to-square"></i>
            </td>
        </tr>`
    }
    console.log(shoppingListTable);
}
loadShoppingList();