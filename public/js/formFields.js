var formFields = 0;

function fillFormFields(fields) {    
    var keys = Object.keys(fields);
    for (let i = 0; i < fields.length; i++) {
        document.getElementById(keys[i]).innerHTML = fields[i];        
    }
}

fillFormFields(formFields);