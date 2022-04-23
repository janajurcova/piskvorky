const buttons = document.querySelectorAll('button');
let activePlayer = 'circle';
let changeImage = document.querySelector('.game-menu__player img');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        if (buttons[i].classList.length < 1) {
            event.target.classList.add(`game__field--${activePlayer}`, 'game__field');
            if (activePlayer === 'circle') {
                activePlayer = 'cross';
            } else {
                activePlayer = 'circle';
            }
            changeImage.src = `img/${activePlayer}.svg`;
            event.target.disabled = true;
        }
    });
}