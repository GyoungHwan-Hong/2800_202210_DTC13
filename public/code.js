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
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=904ba18229eb40dba7b8e694b40926ae&includeNutrition=false`,
        success: processPokeResp
    })
}

function getRandomRecipe() {
    await $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=904ba18229eb40dba7b8e694b40926ae&includeNutrition=false`,
        success: processDisplay
    })
}