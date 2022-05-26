to_add = ''


function processDisplay(data) {
    $("main").empty();

    console.log(data);

    //for (i = 0; i <= 3; i++) {
    to_add +=
            `
    <div class="img_box">
    </div>
    `

    //}
}

function getRecipe(data) {
    await $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=81b70d1ee3be478cb65dc0b78bb19e6e&includeNutrition=false`,
        success: processPokeResp
    })
}

function getRandomRecipe() {
    await $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=81b70d1ee3be478cb65dc0b78bb19e6e&includeNutrition=false`,
        success: processDisplay
    })
}