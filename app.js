const button=()=> {
    const burger = document.querySelector('.burger');
    burger.addEventListener('click',()=>{
        burger.classList.toggle('toggle');
    });
}

button();



function Trendy_contents_change_Today() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li>Kimchi</li><li>Curry rice</li><li>Pasta</li><li>Pizza</li><li>Coffee with Donut</li>";
}

function Trendy_contents_change_Weekly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li>Shushi</li><li>Curry rice</li><li>Pasta</li><li>Pizza</li><li>Coffee with Donut</li>";
}

function Trendy_contents_change_Monthly() {
    document.getElementById("Trendy_Food_List").innerHTML = "<li>Pho</li><li>Curry rice</li><li>Pasta</li><li>Pizza</li><li>Coffee with Donut</li>";
}