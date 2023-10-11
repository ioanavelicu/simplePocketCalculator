let cancel, del, divide, multiply, minus, plus,
        one, two, three, four, five, six, seven, eight, nine;

let calculatorScreen = document.querySelector('#calculatorScreen');
let operations = document.querySelectorAll('.operations');
let numbers = document.querySelectorAll('.number');
let comma = document.querySelector('#comma');
let usedComma = -1;
let cifra = null;
let operator1 = 0;
let operator2 = null;
let operation = null;

function handleClickNumber (e) {
    if(calculatorScreen.textContent == '0' || calculatorScreen.textContent == 'Err') {
        calculatorScreen.textContent = e.target.innerText;
    } else {
        calculatorScreen.textContent += e.target.innerText;
    }

    if(operation == null) {
        if(operator1 == 0) {
            cifra = e.target.innerText;
            operator1 = parseFloat(cifra);
            // if(comma == 0) {
            //     operator1 = parseFloat(calculatorScreen.textContent);
            // }
        } else {
            cifra = e.target.innerText;
            operator1 = parseFloat(operator1.toString() + cifra)
        }
    } else {
        if(operator2 == null) {
            cifra = e.target.innerText;
            operator2 = parseFloat(cifra);
            console.log(operator2);

        } else {
            cifra = e.target.innerText;
            operator2 = parseFloat(operator2.toString() + cifra)
            console.log(operator2);
        }
    }
}

function handleClickOperator(e) {
    operation = e.target.innerText;
    console.log(operator1)
    console.log(usedComma);

    if(cifra == null) {
        calculatorScreen.textContent = calculatorScreen.textContent.slice(0, -1) + operation;
    } else {
        calculatorScreen.textContent += e.target.innerText;
        cifra = null;
    }

    if(operation == 'C') {
        operator1 = 0;
        operator2 = null;
        operation = null;
        calculatorScreen.textContent = "0";
    }

    if(operation == 'del') {
        calculatorScreen.textContent = calculatorScreen.textContent.slice(0, -4);
    }
}

function handleClickEqual(e) {
    if(operation == '+') {
        console.log("operator1 = " + operator1);
        console.log("operator2 = " + operator2);
        operator1 += operator2;
        calculatorScreen.textContent = operator1.toString();
        operation = null;
        operator2 = null;
    }

    if(operation == '-') {
        operator1 -= operator2;
        calculatorScreen.textContent = operator1.toString();
        operation = null;
        operator2 = null;
    }

    if(operation == 'x') {
        operator1 *= operator2;
        calculatorScreen.textContent = operator1.toString();
        operation = null;
        operator2 = null;
    }

    if(operation == '/') {
        if(operator2 == 0) {
            calculatorScreen.textContent = 'Err';
            operator1 = 0;
            operator2 = null;
            operation = null;
        } else {
            operator1 /= operator2;
            calculatorScreen.textContent = operator1.toFixed(3).toString();
            operation = null;
            operator2 = null;
        }
    }
}

function handleClickComma(e) {
    calculatorScreen.textContent = operator1.toString() + '.';
    if(operation == null) {
        usedComma = 0;
    } else if(operator2 != null) {
        usedComma = 1;
    }
}

comma.addEventListener('click', handleClickComma);

equal.addEventListener('click', handleClickEqual);

numbers.forEach(function(e) {
    e.addEventListener('click', handleClickNumber);
})

operations.forEach(function(e) {
    e.addEventListener('click', handleClickOperator);
})