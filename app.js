const button=()=> {
    const burger = document.querySelector('.hamburger_menu');
    burger.addEventListener('click',()=>{
        burger.classList.toggle('toggle');
    });
}

button();