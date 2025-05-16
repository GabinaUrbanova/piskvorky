import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const fields = document.querySelectorAll('.hraci-pole button');
const currentPlayerImg = document.querySelector('.ikony__left img');

const getBoardState = () => {
  return Array.from(fields).map((field) => {
    if (field.classList.contains('board__field--circle')) {
      return 'o';
    } else if (field.classList.contains('board__field--cross')) {
      return 'x';
    } else {
      return '_';
    }
  });
};

const playAIMove = async () => {
  const board = getBoardState();

  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        board: board,
        player: 'x',
      }),
    },
  );

  const data = await response.json();
  const { x, y } = data.position;
  const index = x + y * 10;

  fields[index].click();
};

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

  const winner = findWinner(getBoardState());
  if (winner === 'x' || winner === 'o') {
    setTimeout(() => {
      alert(`Vyhrál hráč: ${winner === 'o' ? 'kolečko' : 'křížek'}`);
      location.reload();
    }, 200);
    return;
  }
  if (currentPlayer === 'cross') {
    setTimeout(() => {
      playAIMove();
    }, 500);
  }
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
