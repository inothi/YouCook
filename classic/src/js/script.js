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
        for (let i = 0; i < foodTable.length; i++) {
            foodTable[i].classList.remove("food-table-light");
            foodTable[i].classList.add("food-table-dark");
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
    // changeLayoutMode();
    // changeNavMode();
    // blinkingLink();
    // changeDropdownMenuMode();
    // changeCategoryPathMode();
    // changeMainMode();
    // changeCarouselImages();
    // changeMainFoodTableMode();
    // changeIconMode();
    // changeFooterMode();
};

/*
===============
copy
===============

let inputChecked = document.getElementById("light-dark");


function changeIconMode() {
    let btn = document.getElementById("switch-btn");
    if (inputChecked.checked) { 
        btn.innerHTML = "<i class='fa-solid fa-moon fa-xl'></i>";
    } 
    else btn.innerHTML = "<i class='fa-solid fa-sun fa-xl'></i>";
    changeNavLinksClass();
}


function changeFooterMode() {
    let footer = document.querySelector("footer");
    if (inputChecked.checked) {
        const footerStyles = {
            backgroundColor: "var(--color-red-dark-dark)",
            boxShadow: "0 -4px 4px #000"
        }
        Object.assign(footer.style, footerStyles);
    }
    else {
        const footerStyles2 = {
            backgroundColor: "var(--color-blue-dark-dark)",
            boxShadow: "0 -4px 8px var(--color-red-light)"
        }
        Object.assign(footer.style, footerStyles2);
    }
}


function changeLayoutMode() {
    let header = document.querySelector("header");
    let body = document.querySelector("body");
    if (inputChecked.checked) {
        header.style.backgroundColor = "#eee";
        body.style.backgroundColor = "#eee";
    }
    else {
        header.style.backgroundColor = "var(--color-blue)";
        body.style.backgroundColor = "var(--color-blue)";
    }
}

function changeCategoryPathMode() {
    let categoryPath = document.getElementsByClassName("headlining")[0];
    if (inputChecked.checked) {
        categoryPath.style.backgroundColor = "var(--color-red-dark-dark)";
        categoryPath.style.boxShadow = "0 4px 4px #000";
    }
    else {
        categoryPath.style.backgroundColor = "var(--color-blue-dark-dark)";
        categoryPath.style.boxShadow = "0 4px 8px var(--color-red-light)";
    }
}

function changeMainMode() {
    let main = document.querySelector("main");
    let borderMain = document.getElementsByClassName("main-border")[0];
    let borderCarousel = document.getElementsByClassName("main-carousel-border")[0];
    if (inputChecked.checked) {
        main.style.backgroundColor = "#aaa";
        borderMain.style.boxShadow = "6px 0 4px -4px #000, -6px 0 4px -4px #000";
        borderCarousel.style.boxShadow = "6px 0 25px -4px #000, -6px 0 25px -4px #000";
    }
    else {
        main.style.backgroundColor = "var(--color-blue-dark)";
        borderMain.style.boxShadow = "6px 0 4px -4px var(--color-red-light), -6px 0 4px -4px var(--color-red-light)";
        borderCarousel.style.boxShadow = "6px 0 25px -4px var(--color-red-light), -6px 0 25px -4px var(--color-red-light)";
    }
}

function changeNavMode() {
    let navigation = document.getElementsByClassName("bg-custom")[0];
    let navbar = document.getElementById("navbar");
    if (inputChecked.checked) {
        navigation.style.backgroundColor = "#aaa";
        navbar.style.boxShadow = "-1px 0 8px #000, 1px 0 8px #000";
    }
    else {
        navigation.style.backgroundColor = "var(--color-blue-dark)";
        navbar.style.boxShadow = "6px 0 4px -4px var(--color-red-light), -6px 0 4px -4px var(--color-red-light)";
    }
}

function changeCarouselImages() {
    let carousel = document.getElementsByClassName("carousel-item");
    if (inputChecked.checked) {
        for (let i = 0; i < carousel.length; i++) {
            carousel[i].children[0].src = "../classic/src/assets/img/carouselImg0" + [i + 4] + ".jpg";
        }
    }
    else {
        for (let i = 0; i < carousel.length; i++) {
            carousel[i].children[0].src = "../classic/src/assets/img/carouselImg0" + [i + 1] + ".jpg";
        }
    }
}

function changeMainFoodTableMode() {
    let foodTable = document.getElementById("main-food-table").children;
    if (inputChecked.checked) {
        for (let i = 0; i < foodTable.length; i++) {
            foodTable[i].classList.remove("food-table-dark");
            foodTable[i].classList.add("food-table-light");
        }
    }
    else {
        for (let i = 0; i < foodTable.length; i++) {
            foodTable[i].classList.remove("food-table-light");
            foodTable[i].classList.add("food-table-dark");
        }
    }   
}

function changeDisplayMode() {
    changeLayoutMode();
    changeNavMode();
    blinkingLink();
    changeDropdownMenuMode();
    changeCategoryPathMode();
    changeMainMode();
    changeCarouselImages();
    changeMainFoodTableMode();
    changeIconMode();
    changeFooterMode();
};
*/