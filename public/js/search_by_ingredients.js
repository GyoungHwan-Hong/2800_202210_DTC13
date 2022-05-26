
async function search_by_ingredients() {
    console.log("search by ingredients is called");

    const main = document.querySelector("main");
    const classes = main.classList;
    classes.add("d");
    classes.remove("test");
    main.textContent = classes;

    $("main").empty();

    firstItem = $("#firstItem").val();
    secondItem = $("#secondItem").val();
    thirdItem = $("#thirdItem").val();


    if (firstItem == secondItem && secondItem == thirdItem && firstItem == thirdItem){
        alert("Three of a kind! I like your hand!");
        $("main").append("<div id='easter-container' style='text-align: center;'>" + "<img src='/img/easteregg2.jpg' id='cards'> </div>");
    }
    
    if (firstItem == "Athos" && secondItem == "Aramis" && thirdItem == "Porthos"){
        alert("All for one and one for all, united we stand divided we fall!");
        $("main").append("<div id='easter-container' style='text-align: center;'> <img src='/img/easteregg1.jpg' id='cards'> </div>")
    }


    await $.ajax({
        type: "get",
        url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=91c165549f554a20bf3f4a83ac0e2bf1&ingredients=${firstItem},+${secondItem},+${thirdItem}&number=10`,
        success: async function (data) {
            console.log("GET request to Spoonacular API made");
            for (i = 0; i < data.length; i++) {
                console.log(data[i]["title"]);
                $("main").append(`<div class='recipes'> 
                <img src="${data[i].image}">
                <a href="/recipe/${data[i].id}" class="recipe-name">${data[i].title}</a>
                </div>`);
            }
        }
    })
}


function setup() {
    $("#submit").click(() => {
        search_by_ingredients();
    })
}

$(document).ready(setup)