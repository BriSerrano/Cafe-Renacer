
    document.getElementById("toggle-dark").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    });
const toggleButton = document.getElementById('darkModeToggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Cambiar ícono del botón
    if(document.body.classList.contains('dark-mode')){
        toggleButton.textContent = '☀️';
    } else {
        toggleButton.textContent = '🌙';
    }
});
