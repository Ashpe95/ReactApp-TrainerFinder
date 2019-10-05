import React from 'react';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const FormField = ({formdata,change,id,categories,name}) => {

    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case('input'):
                formTemplate = (
                    <div className="formBlock">
                        { formdata.showlabel ?
                            <div className="label_inputs">
                                {formdata.config.label}
                            </div>
                            :null}
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=>change({event,id,blur:true})}
                            onChange={(event)=>change({event,id})}
                        />
                        {showError()}
                    </div>
                )
                break;

            case('select'):
                formTemplate = (
                    <div className="formBlock">
                        { formdata.showlabel ?
                            <div className="label_inputs">
                                {formdata.config.label}
                            </div>
                            :null}
                        <select
                            value={formdata.value}
                            onBlur={(event)=>change({event,id,blur:true})}
                            onChange={(event)=>change({event,id})}
                        >
                            <option value="">Wybierz...</option>
                            {
                                formdata.config.options.map(item=>(
                                    <option key={item.key} value={item.key}
                                            // disabled={item.disabled ? null : true}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
                break;

            case('multiselect'):
                formTemplate = (
                    <div className="formBlock">
                        <FormControl className="multiselect">
                            <InputLabel htmlFor="select-multiple-checkbox">{formdata.config.label}</InputLabel>
                            <Select
                                multiple
                                value={formdata.value}
                                onChange={(event)=>change(event)}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => selected.join(', ')}
                            >
                                {categories.map((item,i) => (
                                    <MenuItem key={i} value={item.name}>
                                        <Checkbox color="default" checked={formdata.value.indexOf(item.name) > -1} />
                                        <ListItemText primary={item.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {showError()}
                    </div>
                )
                break;

            case('textarea'):
                formTemplate = (
                    <div className="formBlock">
                        { formdata.showlabel ?
                            <div className="label_inputs">
                                {formdata.config.label}
                            </div>
                            :null}
                        <textarea
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=>change({event,id,blur:true})}
                            onChange={(event)=>change({event,id})}
                        />
                        {showError()}
                    </div>
                )
                break;

            default:
                formTemplate=null
        }

        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;
