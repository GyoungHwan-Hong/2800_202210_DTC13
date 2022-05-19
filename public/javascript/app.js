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
    document.getElementById("Trendy_Food_List").innerHTML = "<li>Kimchi</li><li>Curry rice</li><li>Pasta</li><li>Pizza</li><li>Coffee with Donut</li>";
}

function Trendy_contents_change_Weekly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li>Shushi</li><li>Curry rice</li><li>Pasta</li><li>Pizza</li><li>Coffee with Donut</li>";
}

function Trendy_contents_change_Monthly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li>Pho</li><li>Curry rice</li><li>Pasta</li><li>Pizza</li><li>Coffee with Donut</li>";
}