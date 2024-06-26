// adding class 'active-link' for link from navbar 
function activeLink(elem) {
    let changeClass = document.getElementsByTagName("a");
    for (let i = 0; i < changeClass.length; i++) {
        changeClass[i].classList.remove("active-link");
    }
    elem.classList.add("active-link");
}


// change classes in menu and main-food-table links
function changeClasses() {
    let navbar = document.getElementById("navbar");
    let navbarLinks = navbar.getElementsByTagName("a");
    let blink = document.querySelector('[class *= "blinking-link"]');

    if (localStorage.getItem("inputChecked") == "true") {
        for (let i = 0; i < navbarLinks.length; i++) {
            navbarLinks[i].classList.remove("links-dark");
            navbarLinks[i].classList.add("links-light");
        }
        blink.classList.remove("blinking-link-dark");
        blink.classList.add("blinking-link-light");
    }
    else {
        for (let i = 0; i < navbarLinks.length; i++) {
            navbarLinks[i].classList.remove("links-light");
            navbarLinks[i].classList.add("links-dark");
        }
        blink.classList.remove("blinking-link-light");
        blink.classList.add("blinking-link-dark");
    }
}