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
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=598dbdb711b34618b52ffcd93f1e1104&includeNutrition=false`,
        success: processPokeResp
    })
}

function getRandomRecipe() {
    await $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=598dbdb711b34618b52ffcd93f1e1104&includeNutrition=false`,
        success: processDisplay
    })
}