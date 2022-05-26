async function Trendy_contents_change_Main() {
    await $.ajax({
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=d5e421f2028642f7b61972e936d305e1&type=maincourse&maxReadyTime=15&number=5",
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
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=d5e421f2028642f7b61972e936d305e1&type=appetizer&maxReadyTime=15&number=5",
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
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=d5e421f2028642f7b61972e936d305e1&type=dessert&maxReadyTime=15&number=5",
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