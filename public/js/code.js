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
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=d5e421f2028642f7b61972e936d305e1&includeNutrition=false`,
        success: processPokeResp
    })
}

function getRandomRecipe() {
    await $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=d5e421f2028642f7b61972e936d305e1&includeNutrition=false`,
        success: processDisplay
    })
}