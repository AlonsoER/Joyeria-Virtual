document.addEventListener('DOMContentLoaded', function(){
    darkMode();
})

function darkMode(){
    const btn__darkMode = document.querySelector('.btn__modo');

    btn__darkMode.addEventListener('click', function(){
        document.body.classList.toggle('dark-mode');
    });
}