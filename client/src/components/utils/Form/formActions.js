

export const validate = (element, formdata= []) => {
    let error = [true,''];


    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Błędny adres e-mail':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Różne hasła':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'Wymagane':''}`;
        error = !valid ? [valid,message] : error;
    }

    return error
}

export const update = (element, formdata, formName ) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    if(element.blur){
        let validData = validate(newElement,formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

export const generateData = (formdata, formName) =>{
    let dataToSubmit = {};

    for(let key in formdata){
        if(key !== 'confirmPassword') {
            dataToSubmit[key] = formdata[key].value;
        }
    }

    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for(let key in formdata){
        formIsValid = formdata[key].valid && formIsValid
    }
    return formIsValid;

}

export const populateOptionFields = (formdata, arrayData=[], field) => {
    const newArray = [];
    const newFormdata = {...formdata};
    const reservationHourArray = [];

    arrayData.forEach(item=>{
        reservationHourArray.push(item.startHour)
    })

    if (field === 'startHour') {
        for(let i=8;i<=19;i++){
            newArray.push({key:i,value:i+':00',disabled:true})
        }
        reservationHourArray.forEach(item=>{
            for(let y = 0;y<newArray.length;y++){
                if(newArray[y].key.toString()===item){
                    newArray.splice(y,1);
                }
            }
        })
    }

    arrayData.forEach(item=>{
        if(field === 'sport'){
            newArray.push({key:item,value:item});
        }
        else if (field === 'startHour') {
            //
        }
        else{
            newArray.push({key:item._id,value:item.name});
        }
    })

    newFormdata[field].config.options = newArray;
    return newFormdata;
}

export const resetFields = (formdata, formName) => {
    const newFormdata = {...formdata};

    for(let key in newFormdata){
        if(key === 'images'){
            newFormdata[key].value = [];
        }
        else{
            newFormdata[key].value = '';
        }
        newFormdata[key].valid = false;
        newFormdata[key].touched = false;
        newFormdata[key].validationMessage = '';
    }

    return newFormdata;
}

export const populateFields = (formdata, fields) => {
    for(let key in formdata){
        formdata[key].value = fields[key];
        formdata[key].valid = true;
        formdata[key].touched = true;
        formdata[key].validationMessage = '';
    }
    return formdata;
}