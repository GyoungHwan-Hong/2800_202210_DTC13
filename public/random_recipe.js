to_add = ''


function processDisplay(data) {
    $("main").empty();

    console.log(data);



    for (i = 0; i < data.recipes.length; i++) {

    to_add +=
    `
     <div class="img_box">
         <img src="${data.recipes[i].image}">
         <p>${data.recipes[i].title} </p>
     </div>
     `

    console.log(data.recipes[i].image);
    console.log(i);
    }

    $("main").html(to_add)
}


async function getRandomRecipe() {
    await $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/recipes/random?apiKey=598dbdb711b34618b52ffcd93f1e1104&number=10`,
        success: processDisplay
    })
}


function setup() {
    getRandomRecipe();
}

$(document).ready(setup)