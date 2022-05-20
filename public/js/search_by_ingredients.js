const button = () => {
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', () => {
        burger.classList.toggle('toggle');
    });
}

button();


async function search_by_ingredients() {
    console.log("search by ingredients is called");

    $("results").empty();

    firstItem = $("#firstItem").val();
    secondItem = $("#secondItem").val();
    thirdItem = $("#thirdItem").val();
    cuisineItem = $("#cuisineStyle option:selected").val();

    // console.log(cuisineItem);
    // console.log(firstItem);
    // console.log(secondItem);
    // console.log(thirdItem);

    if (firstItem = secondItem = thirdItem){
        alert("Three of a kind! You've found an Easter Egg!");
    }

    if (cuisineItem = "Alien"){
        alert("There's no Alient type cuisine :p");
    }

    await $.ajax({
        type: "get",
        url: `https://api.spoonacular.com/recipes/findByIngredients?apiKey=69f6b2d77b0e498f9c58c444875354ab&ingredients=${firstItem},+${secondItem},+${thirdItem}&number=10`,
        success: async function (data) {
            console.log("GET request to Spoonacular API made");
            for (i = 0; i < data.length; i++) {
                console.log(data[i]["title"]);
                $("results").append("<div>" + `${data[i]["title"]}` + "</div>");
            }
        }
    })
}


function setup() {
    $("#submit").click(() => {
        search_by_ingredients();
    })
}

$(document).ready(setup)