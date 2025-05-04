let currentPlayer = 'circle';

const fields = document.querySelectorAll('.hraci-pole button');
const currentPlayerImg = document.querySelector('.ikony__left img');

const handleClick = (event) => {
  const clickedField = event.target;

  if (clickedField.disabled) return;

  if (currentPlayer === 'circle') {
    clickedField.classList.add('board__field--circle');
    currentPlayer = 'cross';
    currentPlayerImg.src = 'cross.svg';
    currentPlayerImg.alt = 'křížek';
  } else {
    clickedField.classList.add('board__field--cross');
    currentPlayer = 'circle';
    currentPlayerImg.src = 'circle.svg';
    currentPlayerImg.alt = 'kolečko';
  }

  clickedField.disabled = true;
};

fields.forEach((field) => {
  field.addEventListener('click', handleClick);
});

const homeBtn = document.querySelector('.ikony__home');
if (homeBtn) {
  homeBtn.addEventListener('click', (e) => {
    const confirmHome = confirm('Opravdu chceš odejít na hlavní stránku?');
    if (!confirmHome) {
      e.preventDefault();
    }
  });
}

const restartBtn = document.querySelector('.ikony__restart');
if (restartBtn) {
  restartBtn.addEventListener('click', (e) => {
    const confirmRestart = confirm('Opravdu chceš restartovat hru?');
    if (!confirmRestart) {
      e.preventDefault();
    }
  });
}
