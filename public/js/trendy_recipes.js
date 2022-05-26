async function Trendy_contents_change_Main() {
    await $.ajax({
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=81b70d1ee3be478cb65dc0b78bb19e6e&type=maincourse&maxReadyTime=15&number=5",
        dataType: "json",
        success: function (data) {
            $("#Trendy_Food_List").empty();
            for (i = 0; i < data.results.length; i++) {
                $("#Trendy_Food_List").append(
                    "<li class=\"list-group-item\" onclick=" + "location.href='/recipe/" + data.results[i].id + "'>" + data.results[i].title + "</li>"
                );
            }
        }
    })
}

async function Trendy_contents_change_Appetizer() {
    await $.ajax({
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=81b70d1ee3be478cb65dc0b78bb19e6e&type=appetizer&maxReadyTime=15&number=5",
        dataType: "json",
        success: function (data) {
            $("#Trendy_Food_List").empty();
            for (i = 0; i < data.results.length; i++) {
                $("#Trendy_Food_List").append(
                    "<li class=\"list-group-item\" onclick=" + "location.href='/recipe/" + data.results[i].id + "'>" + data.results[i].title + "</li>"
                );
            }
        }
    })
}

async function Trendy_contents_change_Dessert() {
    await $.ajax({
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=81b70d1ee3be478cb65dc0b78bb19e6e&type=dessert&maxReadyTime=15&number=5",
        dataType: "json",
        success: function (data) {
            $("#Trendy_Food_List").empty();
            for (i = 0; i < data.results.length; i++) {
                $("#Trendy_Food_List").append(
                    "<li class=\"list-group-item\" onclick=" + "location.href='/recipe/" + data.results[i].id + "'>" + data.results[i].title + "</li>"
                );
            }
        }
    })
}

function setup() {
    Trendy_contents_change_Main()
}

$(document).ready(setup)