function calculator(){
    let $calc = $('.my-calculator');
    let $controlAction = $calc.find('[data-action]');
    let $controlValue = $calc.find('[data-value]');
    let $containerDisplay = $calc.find('.container-display');
    let $input = $calc.find('.display');
    let number = "";
    let num1 = "";
    let num2 = "";
    let operator = "";
    let total = "";
    let haveCalculate = false;
    //let havePoint = false;
    //let counter = 0;
    
    function initCalculator(){
        bindEvents(); 
    }

    function bindEvents(){
        $controlValue.on('click', function(e){
            let value = $(this).data('value');
            initValue(value);
        })

        $controlAction.on('click', function(e){
            let action = $(this).data('action');
                initAction(action);
        })
    }
    
    function initAction(action){
        switch (action) {
            case 'CE':
                $input.val("");
                break;

            case 'C':
            refresh();
                break;

             case 'backspace':
             deleteLastDigit();
                break;  

            case '/':
            case '*':
            case '-':
            case '+':
                number = $input.val();
                getNumber(number);
                getOperator(action);
                $input.val("");
                haveCalculate = false;
                console.log(haveCalculate);
                if (counter === 1){
                    counter = 0;
                }
                break;

            case 'iDoNotKnow':
                
                break;

                case '.':
                number = $input.val();
                decimal(action);
                havePoint = true;
                break;

            case '=':
                number = $input.val();
                getNumber(number);
                getOperator(action);
                $input.val(total);
                if (counter === 1){
                    counter = 0;
                console.log("counter e"+counter);
                }
                break;

            default:
                console.log('This is not action');
                break;
        }
    }
    function initValue(value){ 
        if(typeof value !== 'undefined'){
            if(haveCalculate === true && counter === 0){
              $input.val("");  
              havePoint = false;
            }
            counter=1;
            let currentValue = $input.val();
            $input.val(currentValue + value);           
        } 
    }

    function getOperator(action) {
        if (operator === "") {
            operator = action;
            console.log(operator);
            $containerDisplay.val($containerDisplay.val()+" "+ operator+" ");
        } else {
            totalSum();
            operator = action;
            $input.val("");
            $containerDisplay.val($containerDisplay.val()+" "+ operator+" ");
            
        }
    }

    function getNumber(number) {
        if (num1 === '' || haveCalculate === true) { 
            refresh();
            num1 =Number(number) ;

            //if(havePoint === false){
            //    num1 = parseInt(number);
            //    console.log("int");
            //}else{
            //    num1 = parseFloat(number);
            //    console.log("double")
            //}
            
            console.log(num1);
            $containerDisplay.val(num1);
        }else{ 
            num2 = Number(number);

            //if(havePoint === false){
            //    num2 = parseInt(number);
            //    console.log("int");
            //}else{
            //    num2 = parseFloat(number);
            //    console.log("double");
            //}
            console.log(num2);
            $containerDisplay.val($containerDisplay.val()+num2);
           
        }
    }

    function totalSum() {
        switch (operator) {
            case '+':
                total = num1 + num2;
                haveCalculate = true;
                console.log(haveCalculate);
                console.log(total);
                break;

            case '-':
                total = num1 - num2;
                haveCalculate = true;
                console.log(haveCalculate);
                console.log(total);
                break;

            case '/':
                total = num1 / num2;
                haveCalculate = true;
                console.log(haveCalculate);
                console.log(total);
                break;

            case '*':
                total = num1 * num2;
                haveCalculate = true;
                console.log(haveCalculate);
                console.log(total);
                break;

                default:
                console.log('This is not operator');
                    break;
        }
        updateVariables();
    }

    function updateVariables() {
        num1 = total;
        num2 = '';
    }

    function refresh(){
        $input.val("");
        $containerDisplay.val("");
        num1 = "";
        num2="";
        operator = "";
    }
    function deleteLastDigit(){
        $input.val(
            function(index, value){
                return value.substr(0, value.length - 1);
        })
    }
    function decimal(action){
        if (number === ""){
            $input.val("0.");
        }else if (!number.includes('.')) {
            $input.val(number + action);
        }
    }
    initCalculator();
}