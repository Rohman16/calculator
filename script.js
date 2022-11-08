const pad = document.querySelectorAll(
  "#one,#two,#three,#four,#five,#six,#seven,#eight,#nine,#zero,#period"
);

const operator = document.querySelectorAll("#division,#multiply,#minus,#plus");
const reset = document.getElementById("cie");
const deleteNum = document.getElementById("delete");
const equalTo = document.getElementById("equal");
let operatorOutput = null;
let secondOperatorOutput = null;
let display = document.querySelector(".display");
display.innerHTML = 0;
let number = "";
let secondNumber = "";
let thirdNumber = "";
let resultCalculation = 0;
pad.forEach((elm) =>
  elm.addEventListener("click", (evt) => {
    if (operatorOutput == null) {
      if (resultCalculation !== 0) {
        number = "";
        resultCalculation = 0;
      }
      number = number + evt.target.innerHTML;
      display.innerHTML = number;
    } else if (operatorOutput !== null) {
      if (secondOperatorOutput == null) {
        secondNumber = secondNumber + evt.target.innerHTML;
        display.innerHTML = secondNumber;
      } else if (secondOperatorOutput !== null) {
        thirdNumber = thirdNumber + evt.target.innerHTML;
        if (secondOperatorOutput == "+" || secondOperatorOutput == "-") {
          number = runCalculation(operatorOutput, number, secondNumber);
          secondNumber = thirdNumber;
          operatorOutput = secondOperatorOutput;
        } else if (
          secondOperatorOutput == "\xD7" ||
          secondOperatorOutput == "\xF7"
        ) {
          secondNumber = runCalculation(
            secondOperatorOutput,
            secondNumber,
            thirdNumber
          );
        }
        display.innerHTML = thirdNumber;
        thirdNumber = "";
      }
    }
  })
);

operator.forEach((elm) =>
  elm.addEventListener("click", (evt) => {
    if (number !== "") {
      if (secondNumber == "") {
        operatorOutput = evt.target.innerText;
      } else if (secondNumber !== "") {
        secondOperatorOutput = evt.target.innerText;
      }
    }
  })
);

reset.addEventListener("click", clearAll);

function clearAll() {
  number = "";
  secondNumber = "";
  thirdNumber = "";
  operatorOutput = null;
  secondOperatorOutput = null;
  display.innerHTML = 0;
  resultCalculation = 0;
}

deleteNum.addEventListener("click", () => {
  number = number.toString();
  number = number.slice(0, number.length - 1);
  if (number.length >= 1) {
    display.innerHTML = number;
  } else {
    display.innerHTML = 0;
  }
});

equalTo.addEventListener("click", displayResult);

const runCalculation = function (ops, num1, num2) {
  let myResult = 0;
  if (ops == "+") {
    myResult = Number(num1) + Number(num2);
  } else if (ops == "-") {
    myResult = Number(num1) - Number(num2);
  } else if (ops == "\xD7") {
    myResult = num1 * num2;
  } else if (ops == "\xf7") {
    myResult = num1 / num2;
  }
  return myResult;
};

function displayResult() {
  resultCalculation = runCalculation(operatorOutput, number, secondNumber);
  display.innerHTML = resultCalculation;
  number = resultCalculation;
  secondNumber = "";
  thirdNumber = "";
  operatorOutput = null;
  secondOperatorOutput = null;
}
