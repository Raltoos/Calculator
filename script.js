class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = null;
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0,-1);
        this.updateDisplay();
    }

    appendNumber(number){
        if((number === '.')&&(this.currentOperand.includes('.'))) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return ;
        if(this.prevOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'X':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = null;
        this.prevOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation !== null){
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        }else{
            this.previousOperandTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allClear]');

const previousOperandTextElement = document.querySelector('[data-prevOp]');
const currentOperandTextElement = document.querySelector('[data-currOp]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(element => {
    element.addEventListener('click',()=>{
        calculator.appendNumber(element.innerText);
        calculator.updateDisplay();
    }); 
});
operationButtons.forEach(element => {
    element.addEventListener('click', ()=>{
        calculator.chooseOperation(element.innerText);
        calculator.updateDisplay();
    });
});

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
});

allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
});