function Trendy_contents_change_Today() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Kimchi</li><li class=\"list-group-item\">Curry rice</li><li class=\"list-group-item\">Pasta</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}

function Trendy_contents_change_Weekly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Sushi</li><li class=\"list-group-item\">Ramen</li><li class=\"list-group-item\">Steak</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}

function Trendy_contents_change_Monthly() {

    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Shushi</li><li class=\"list-group-item\">Curry rice</li><li class=\"list-group-item\">Pasta</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}

var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};
    

function setup() {

    console.log(document.cookie)

    let texttest = getCookie("userNickName")
    $("#name-goes-here2").html(texttest)
}

$(document).ready(setup)
