const button=()=> {
    const burger = document.querySelector('.burger');
    burger.addEventListener('click',()=>{
        burger.classList.toggle('toggle');
    });
}

button();



function Trendy_contents_change_Today() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Kimchi</li><li class=\"list-group-item\">Curry rice</li><li class=\"list-group-item\">Pasta</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}

function Trendy_contents_change_Weekly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Shushi</li><li class=\"list-group-item\">Curry rice</li><li class=\"list-group-item\">Pasta</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}

function Trendy_contents_change_Monthly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li class=\"list-group-item\">Pho</li><li class=\"list-group-item\">Curry rice</li><li class=\"list-group-item\">Pasta</li><li class=\"list-group-item\">Pizza</li><li class=\"list-group-item\">Coffee with Donut</li>";
}