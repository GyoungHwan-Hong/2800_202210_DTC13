
async function search_by_recipe() {
    console.log("search by recipe is called!");

    searchItem = $("#searchRecipeItem").val();
    console.log(searchItem);

    const main = document.querySelector("main");
    const classes = main.classList;
    classes.add("d");
    classes.remove("test");
    main.textContent = classes;
   
    $("main").empty();

    await $.ajax({
        type: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=d5e421f2028642f7b61972e936d305e1&query=${searchItem}&number=10`,
        success: async function (data) {
            console.log("GET request to Spoonacular API made for a recipe");
            for (i = 0; i < data.results.length; i++) {
                console.log(data.results[i]["title"]);
                $("main").append(`<div class='recipes'> 
                <img src="${data.results[i].image}">
                <a href="/recipe/${data.results[i].id}" class="recipe-name">${data.results[i].title}</a>
                </div>`);
            }
        }
    })
}


function setup() {

    $("#submit").click(() => {
        search_by_recipe();
    })
}

$(document).ready(setup)