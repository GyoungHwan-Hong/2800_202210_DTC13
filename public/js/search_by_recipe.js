
// function visibility() {
//     console.log("AAAAAAAAAAAAAAAAAAAAA");
//     document.getElementsByTagName("main").visibility = "visible";
// }

async function search_by_recipe() {
    console.log("search by recipe is called!");

    searchItem = $("#searchRecipeItem").val();
    console.log(searchItem);


    $("main").empty();
    
    await $.ajax({
        type: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=91c165549f554a20bf3f4a83ac0e2bf1&query=${searchItem}&number=10`,
        success: async function (data) {
            console.log("GET request to Spoonacular API made for a recipe");
            for (i = 0; i < data.results.length; i++) {
                console.log(data.results[i]["title"]);
                $("main").append(`<div class='recipes'> 
                <img src="${data.results[i].image}">
                <a href="/recipe/${data.results[i].id}">${data.results[i].title}</a>
                </div>`);
            }
        }
    })
}


function setup() {
    $("main").hide;

    
    $("#submit").click(() => {
        $("main").show;
        // visibility();
        search_by_recipe();
    })
}

$(document).ready(setup)