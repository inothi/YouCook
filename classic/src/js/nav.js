// adding class 'active-link' for link from navbar 
function activeLink(elem) {
    let changeClass = document.getElementsByTagName("a");
    console.log(changeClass);
    for (let i = 0; i < changeClass.length; i++) {
        changeClass[i].classList.remove("active-link");
    }
    elem.classList.add("active-link");
}