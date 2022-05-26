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
                <a class="recipe_name" href="/recipe/${data.recipes[i].id}">${data.recipes[i].title}</a>
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
        url: `https://api.spoonacular.com/recipes/random?apiKey=45bfd0648ab74f6c8cccb1aae6399519&number=10`,
        success: processDisplay
    })
}


function setup() {
    getRandomRecipe();
}

$(document).ready(setup)