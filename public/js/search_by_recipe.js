


async function search_by_recipe() {
    console.log("search by recipe is called!");

    searchItem = $("#searchRecipeItem").val();
    console.log(searchItem);

    $("results").empty();
    await $.ajax({
        type: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=45bfd0648ab74f6c8cccb1aae6399519&query=${searchItem}&number=10`,
        success: async function (data) {
            console.log("GET request to Spoonacular API made for a recipe");
            for (i = 0; i < data.results.length; i++) {
                console.log(data.results[i]["title"]);
                $("results").append(`<div class='recipes'> 
                <img src="${data.results[i].image}">
                <a href="/recipe/${data.results[i].id}">${data.results[i].title}</a>
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