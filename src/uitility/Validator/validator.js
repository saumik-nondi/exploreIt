const validate = (val, rules, connectedValues) => {
    let isValid = true;
    for(let rule in rules){
        switch(rule){ 
            case 'isEmail':
                isValid = isValid && emailValidator(val);            
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValues[rule]);
                break;
            case 'notEmpty':
                isValid = isValid && minLengthValidator(val, 1)
            default:
                isValid = true;
                break;
        }

        return isValid;
    }
}

const emailValidator = (val) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
}

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
}

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
}


export default validate;