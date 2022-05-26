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
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=45bfd0648ab74f6c8cccb1aae6399519&includeNutrition=false`,
        success: processPokeResp
    })
}

function getRandomRecipe() {
    await $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=45bfd0648ab74f6c8cccb1aae6399519&includeNutrition=false`,
        success: processDisplay
    })
}