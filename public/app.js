async function Trendy_contents_change_Main() {
    await $.ajax({
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=44bee3db3d864814b2a115572ee2f5f4&type=maincourse&maxReadyTime=15&number=5",
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
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=44bee3db3d864814b2a115572ee2f5f4&type=appetizer&maxReadyTime=15&number=5",
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
        url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=44bee3db3d864814b2a115572ee2f5f4&type=dessert&maxReadyTime=15&number=5",
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

var getCookie = function (name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
};


function setup() {

    console.log(document.cookie)
    Trendy_contents_change_Main()
    let texttest = getCookie("userNickName")
    $("#name-goes-here2").html(texttest+"!")
}

$(document).ready(setup)
