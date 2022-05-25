to_add = ''


function processDisplay(data) {
    $("main").empty();

    console.log(data);

    for (i = 0; i < data.recipes.length; i++) {
        
        console.log(i);
        
        if (i % 2 == 0) {
            to_add += `<div class='recipes_container'>`
        }

        to_add +=
            `
                <div class="recipe_img_box">
                <img src="${data.recipes[i].image}" style="max-width: 100%; height: auto;">
                <p>${data.recipes[i].title} </p>
                <br>
                </div>
                `

        if (i % 2 == 1) {
            to_add += `</div>`
        }
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