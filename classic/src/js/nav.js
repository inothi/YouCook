// adding class 'active-link' for link from navbar 
function activeLink(elem) {
    let changeClass = document.getElementsByTagName("a");
    for (let i = 0; i < changeClass.length; i++) {
        changeClass[i].classList.remove("active-link");
    }
    elem.classList.add("active-link");
}

function changeNavLinksClass() {
    let navbar = document.getElementById("navbar");
    let navbarLinks = navbar.getElementsByTagName("a");
    if (inputChecked.checked) {
        for (let i = 0; i < navbarLinks.length; i++) {
            navbarLinks[i].classList.remove("links-dark");
            navbarLinks[i].classList.add("links-light");
        }
    }
    else {
        for (let i = 0; i < navbarLinks.length; i++) {
            navbarLinks[i].classList.remove("links-light");
            navbarLinks[i].classList.add("links-dark");
        }
    }
}

function blinkingLink() {
    let blink = document.querySelector('[class *= "blinking-link"]');
    if (inputChecked.checked) {
        blink.classList.remove("blinking-link-dark");
        blink.classList.add("blinking-link-light");
    }
    else {
        blink.classList.remove("blinking-link-light");
        blink.classList.add("blinking-link-dark");
    }
}

function changeDropdownMenuMode() {
    let dropdownMenu = document.getElementsByClassName("dropdown-menu")[0];
    if (inputChecked.checked) {
        dropdownMenu.classList.remove("menu-custom-dark");    
        dropdownMenu.classList.add("menu-custom-light");
        let dropdownItems = dropdownMenu.children;
        for (let i = 0; i < dropdownItems.length; i++) {
            dropdownItems[i].classList.remove("item-custom-dark");
            dropdownItems[i].classList.add("item-custom-light");
        }
    }
    else {
        dropdownMenu.classList.remove("menu-custom-light");    
        dropdownMenu.classList.add("menu-custom-dark");

        let dropdownItems = dropdownMenu.children;
        for (let i = 0; i < dropdownItems.length; i++) {
            dropdownItems[i].classList.remove("item-custom-light");
            dropdownItems[i].classList.add("item-custom-dark");
        }
    }
}
