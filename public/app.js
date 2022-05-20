const button=()=> {
    const burger = document.querySelector('.burger');
    burger.addEventListener('click',()=>{
        burger.classList.toggle('toggle');
    });
}

button();



$.getJSON('https://api.spoonacular.com/recipes/716429/information?apiKey=598dbdb711b34618b52ffcd93f1e1104&includeNutrition=false', function(data) {
        //alert(data.image);

        var $title = data.title;
        var $image_source = data.image; 
        var $summary = data.summary;
        $('#summary').append($summary);
        $('#food_image').append("<img src=" + $image_source +">");
        $('#title').append("<h3>"+ $title + "</h3>");
    });

function Trendy_contents_change_Today() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Kimchi</li><li class=\"list-group-item\">Curry rice</li><li class=\"list-group-item\">Pasta</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}

function Trendy_contents_change_Weekly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Shushi</li><li class=\"list-group-item\">Curry rice</li><li class=\"list-group-item\">Pasta</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}

function Trendy_contents_change_Monthly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Pho</li><li class=\"list-group-item\">Curry rice</li><li class=\"list-group-item\">Pasta</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}