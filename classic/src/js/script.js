// footer scripts
(function displayMode() {
    let theme = document.getElementById("light-dark");
    let header = document.querySelector("header");
    let main = document.querySelector("main");
    let navbar = document.getElementById("navbar");
    let nav = document.querySelector("nav");
    let headlining = document.getElementsByClassName("headlining")[0];
    let categoryPath = document.getElementsByClassName("category-path")[0].children[0];
    let footer = document.querySelector("footer");
    theme.addEventListener("click", function() {
        if (document.body.style.backgroundColor == "var(--color-blue)") {
            // body styles
            document.body.style.transition = "all .25s ease";
            document.body.style.backgroundColor = "#eee";
            // header styles
            header.style.transition = "all .25s ease";
            header.style.backgroundColor = "#eee";
            nav.style.boxShadow = "-1px 0px 8px #000, 1px 0px 8px #000";
            // main styles
            main.style.transition = "all .25s ease";
            main.style.backgroundColor = "#bbb";
            main.style.boxShadow = "-1px 0px 8px #000, 1px 0px 8px #000";
            // navbar styles
            navbar.style.transition = "all .25s ease";
            navbar.style.backgroundColor = "#bbb";
            // headlining styles
            headlining.style.transition = "all .25s ease";
            headlining.style.backgroundColor = "var(--color-red-dark)";
            headlining.style.boxShadow = "0px 4px 8px #000";
            categoryPath.style.transition = "all .25s ease";
            categoryPath.style.color = "#999";
            // footer styles
            footer.style.transition = "all .25s ease";
            footer.style.backgroundColor = "var(--color-red-dark)";
            footer.style.boxShadow = "0px -4px 8px #000";
        }
        else {
            // body styles
            document.body.style.backgroundColor = "var(--color-blue)";
            // header styles
            header.style.backgroundColor = "var(--color-blue)";
            nav.style.boxShadow = "-1px 0px 8px var(--color-red-light), 1px 0px 8px var(--color-red-light)";
            // main styles
            main.style.backgroundColor = "var(--color-blue-dark)";
            main.style.boxShadow = "-1px 0px 8px var(--color-red-light), 1px 0px 8px var(--color-red-light)";
            //navbar styles
            navbar.style.backgroundColor = "var(--color-blue-dark)";
            // headlining styles
            headlining.style.backgroundColor = "var(--color-blue-dark-dark)";
            headlining.style.boxShadow = "0px 4px 8px var(--color-red-light)";
            categoryPath.style.color = "#666";
            // footer styles
            footer.style.backgroundColor = "var(--color-blue-dark-dark)";
            footer.style.boxShadow = "0px -4px 8px var(--color-red-light)";
        }
    });
}());