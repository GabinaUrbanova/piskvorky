let currentPlayer = "circle";

const fields = document.querySelectorAll(".hraci-pole button");
const currentPlayerImg = document.querySelector(".ikony__left img");

const handleClick = (event) => {
  const clickedField = event.target;

  if (currentPlayer === "circle") {
    clickedField.classList.add("board__field--circle");
    currentPlayer = "cross";
    currentPlayerImg.src = "cross.svg";
    currentPlayerImg.alt = křížek;
  } else {
    clickedField.classList.add("board__field--cross");
    currentPlayer = "circle";
    currentPlayerImg.src = "circle.svg";
    currentPlayerImg.alt = "kolečko";
  }

  clickedField.disabled = true;
};

fields.forEach((field) => {
  field.addEventListener("click", handleClick);
});

