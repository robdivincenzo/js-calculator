/* Globals */
let numberButtons = document.querySelectorAll("button.number");
let inputButtons = document.querySelectorAll("button.input");
let display = document.querySelector("span.result");
let clearButton = document.querySelector("button.clear");
let operand1 = "";
let calculatingFlag = false;

/* Event handlers */
numberButtons.forEach( (numberButton) => {
    numberButton.addEventListener( 'click', addNumberToDisplay);
});

clearButton.addEventListener( 'click', clearDisplay );

inputButtons.forEach( (inputButton) => {
    inputButton.addEventListener( 'click', function(e) {
        if( display.innerText != "" ) {
            operand1 = Number(display.innerText);
            calculatingFlag = true;
        }
    });
});


/* DOM functions */
function addNumberToDisplay(e) {
    if( calculatingFlag == true ) {
        display.innerText = "";
        calculatingFlag = false;
    }
    if( display.innerText == 0 ) {
        display.innerText = "";
    }
    display.innerText += e.target.innerText;
}

function clearDisplay(e) {
    display.innerText = "";
}


/* Operations functions */
function add(num1, num2) {
    return num1+num2;
}

function subtract(num1, num2) {
    return num1-num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function operate(operator, num1, num2) {
    switch( operator ){
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default:
            return "Invalid operator.";
            break;
    }
}


