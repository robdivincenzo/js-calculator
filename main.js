/* Globals */
let numberButtons = document.querySelectorAll("button.number");
let inputButtons = document.querySelectorAll("button.input");
let display = document.querySelector("span.result");
let clearButton = document.querySelector("button.clear");
let dotButton = document.querySelector("button.dot");
let backButton = document.querySelector("button.back");
let clearDisplayFlag = false; //for when we begin operand2
let [operand1, operand2, operator] = "";

/* Event handlers */
numberButtons.forEach( (numberButton) => {
    numberButton.addEventListener( 'click', addNumberToDisplay);
});
inputButtons.forEach( (inputButton) => {
    inputButton.addEventListener( 'click', storeAndOperate );
});
dotButton.addEventListener( 'click', addNumberToDisplay);
clearButton.addEventListener( 'click', clearCalculator );
backButton.addEventListener( 'click', removeNumberFromDisplay);

/* Keyboard event listener */
window.addEventListener( 'keydown', simulateKeyPress);

/* On load run... */
clearCalculator();


/* Functions */
/* Operand / Operator memory functions */
function storeAndOperate(e) {
    if( e.target.innerText == "=") { //if =, evaluate operation and clear memory
        if( operand1 !== "" && operand2 !== "" && operator !== "" ) { //evaluate only if we have all values
            display.innerText = operate(operator, operand1, operand2);
            clearMemory();
            setOperand( display.innerText ); // set value to new operand 1 and prepare next operation    
        }
    } else { // else it's +-*/
        if( operand1 !== "" && operand2 !== "" && operator !== "" ) { // if we already have all the pieces
            display.innerText = operate(operator, operand1, operand2); //operate
            clearMemory();
            setOperand( display.innerText ); // set value to new operand 1 and prepare next operation
            setOperator( e.target.innerText );
            clearDisplayFlag = true; //set calculating flag to true to clear values before starting operand 2
        } else { //else, just set the operator
            setOperator( e.target.innerText ); // set the operator for evaluation
            clearDisplayFlag = true; //set calculating flag to true to clear values before starting operand 2
        }

    }
    
}

function setOperand( displayNum ) {
    if( operator == "" ) { //if no operator, it's operanad 1
        operand1 = Number(displayNum);
    } else { //else set oprand 2
        operand2 = Number(displayNum);        
    }
}

function setOperator( operatorSelected ) {
        operator = operatorSelected;
}


/* DOM functions */
function simulateKeyPress(e) {
    if( e.key == "Enter" ) { //enter key is =
        const keyboardButton = this.document.querySelector(`button[data-key="="]`);
        keyboardButton.click();
    } 
    const keyboardButton = this.document.querySelector(`button[data-key="${e.key}"]`);
    if( keyboardButton !== null ) {
        keyboardButton.click();
    }
}
function addNumberToDisplay(e) {
    if( clearDisplayFlag == true ) {
        clearDisplay();
        clearDisplayFlag = false;
    }
    display.innerText += e.target.innerText;
    setOperand( display.innerText );
}

function removeNumberFromDisplay(e) {
    display.innerText = display.innerText.slice(0, display.innerText.length - 1);
    setOperand( display.innerText );
}

function clearCalculator(e) {
    clearDisplay();
    clearMemory();
}

function clearDisplay() {
    display.innerText = "";
}

function clearMemory() {
    operator = "";
    operand1 = "";
    operand2 = "";
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
    let evaluatedNum = 0;
    switch( operator ){
        case "+":
            evaluatedNum = add(num1, num2);
            break;
        case "-":
            evaluatedNum = subtract(num1, num2);
            break;
        case "*":
            evaluatedNum = multiply(num1, num2);
            break;
        case "/":
            if( num2 == 0) {
                return "Yeah ok.gif";
            }
            evaluatedNum = divide(num1, num2);
            break;
        default:
            return "Invalid operator.";
            break;
    }
    return Math.round(evaluatedNum * 10000) / 10000;
}