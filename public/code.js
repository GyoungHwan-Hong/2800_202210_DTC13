to_add = ''

function getRecipe(data) {
    await $.ajax({
        type: "GET",
        url: `https://api.spoonacular.com/recipes/716429/information?apiKey=598dbdb711b34618b52ffcd93f1e1104&includeNutrition=false`,
        success: processPokeResp
    })
}