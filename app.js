const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");

let currentOperator = "";
let previousValue = "";
let currentValue = "";
let shouldResetDisplay = false;

display.value = "0";

buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.innerText));
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9]/.test(key) || key === ".") {
    handleButtonClick(key);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    handleButtonClick(key);
  } else if (key === "Enter") {
    handleButtonClick("=");
  } else if (key === "Backspace") {
    handleButtonClick("C");
  } else if (key === "Escape") {
    handleButtonClick("A/C");
  }
});

function handleButtonClick(buttonText) {
  if (buttonText === "A/C") {
    clearCalculator();
  } else if (buttonText === "C") {
    handleBackspace();
  } else if (buttonText === "=") {
    calculateResult();
  } else if (buttonText === "+/-") {
    toggleSign();
  } else if (["+", "-", "*", "/", "%"].includes(buttonText)) {
    handleOperator(buttonText);
  } else {
    handleNumberInput(buttonText);
  }
}

function clearCalculator() {
  display.value = "0";
  currentOperator = "";
  previousValue = "";
  currentValue = "";
}

function handleBackspace() {
  display.value = display.value.length === 1 ? "0" : display.value.slice(0, -1);
}

function toggleSign() {
  display.value = display.value ? String(-parseFloat(display.value)) : "0";
}

function handleOperator(operator) {
  if (previousValue !== "") {
    calculateResult();
  }
  previousValue = parseFloat(display.value);
  currentOperator = operator;
  shouldResetDisplay = true;
}

function handleNumberInput(number) {
  if (shouldResetDisplay) {
    display.value = number === "." ? "0." : number;
    shouldResetDisplay = false;
  } else {
    if (display.value === "0" && number !== ".") {
      display.value = "";
    }
    if (number === "." && display.value.includes(".")) return;
    display.value += number;
  }
}

function calculateResult() {
  if (!currentOperator || previousValue === "") return;
  currentValue = parseFloat(display.value);
  let result;

  switch (currentOperator) {
    case "+":
      result = previousValue + currentValue;
      break;
    case "-":
      result = previousValue - currentValue;
      break;
    case "*":
      result = previousValue * currentValue;
      break;
    case "/":
      result = currentValue !== 0 ? previousValue / currentValue : "Error";
      break;
    case "%":
      result = previousValue % currentValue;
      break;
  }

  display.value = formatDecimal(result);
  previousValue = result;
  currentOperator = "";
  shouldResetDisplay = true;
}

function formatDecimal(value) {
  if (typeof value === "string") return value;
  return Number.isInteger(value) ? value : parseFloat(value.toFixed(5));
}
