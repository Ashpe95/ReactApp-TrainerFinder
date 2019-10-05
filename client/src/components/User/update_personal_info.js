import React, {Component} from 'react';
import FormField from '../utils/Form/formfield';
import { connect } from 'react-redux';
import { updateUserData, clearUpdateUser} from "../../actions/user_actions";
import { update, generateData, isFormValid, populateFields } from '../utils/Form/formActions';

import { sports } from '../utils/Form/fixed_categories';

import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

class UpdatePersonalInfo extends Component {

    state = {
        formError: false,
        formSuccess:false,
        trainerOpen:false,
        name:[],
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Imię',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Imię'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config:{
                    label: 'Nazwisko',
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Nazwisko'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            email: {
                element: 'input',
                value: '',
                config:{
                    label: 'Adres e-mail',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'E-mail'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            sex: {
                element: 'select',
                value: '',
                config: {
                    label: 'Płeć',
                    name: 'sex_input',
                    options:[
                        {key:'K',value:'Kobieta',disabled:true},
                        {key:'M',value:'Mężczyzna',disabled:true}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            personaldescription: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Opisz siebie',
                    name: 'personal_description_input',
                    type: 'text',
                    placeholder: 'Napisz kilka słów o sobie',
                    rows:7
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false
            },
            role: {
                element: 'checkbox',
                value: '',
                config:{
                    label: 'Jestem trenerem/instruktorem',
                    name: 'role_input',
                    type: 'checkbox',
                    checked:false
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
            trainerinfo: {
                element: 'multiselect',
                value: '',
                config:{
                    label: 'Wybierz sporty, których nauczasz',
                    name: 'trainerinfo_input',
                    type: 'multiselect'
                },
                validation:{
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage:'',
                showlabel: true
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'update_user');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();

        let newFormdata = {...this.state.formdata};
        if(newFormdata.role.value === 0 ){
            newFormdata.trainerinfo.value = [];
        }
        this.setState({
            formdata: newFormdata
        })

        let dataToSubmit = generateData(this.state.formdata,'update_user');
        let formIsValid = isFormValid(this.state.formdata,'update_user');

        console.log(dataToSubmit);
        if(formIsValid){
            this.props.dispatch(updateUserData(dataToSubmit)).then(()=>{
                if(this.props.user.updateUser.success){
                    this.setState({
                        formSuccess:true
                    },()=>{
                        setTimeout(()=>{
                            this.props.dispatch(clearUpdateUser());
                            this.setState({
                                formSuccess:false
                            })
                        },2000)
                    })
                }
            })
        }
        else {
            this.setState({
                formError: true
            })
        }

    }

    componentWillMount(){
        const newFormData = populateFields(this.state.formdata,this.props.user.userData);
        let checked = true;
        newFormData.role.value === 1 ?
            checked = true
            :
            checked = false

        this.setState({
            formdata: newFormData,
            checked
        })
    }

    handleCheck = () => {
        const newFormdata = {...this.state.formdata};
        this.setState({
            checked: !this.state.checked
        });

        this.state.checked ?
            newFormdata.role.value = 0
            :
            newFormdata.role.value = 1;

        this.setState({
            formdata: newFormdata
        })
    }

    handleChange = event => {
        const newFormdata = {...this.state.formdata};
        newFormdata.trainerinfo.value = event.target.value;
        this.setState({ formdata: newFormdata });
    };

    render() {
        return (
            <div className="site-content">
                <form onSubmit={(event)=>this.submitForm(event)}>

                    <h3>Podstawowe informacje</h3>
                    <FormField
                        id={'name'}
                        formdata={this.state.formdata.name}
                        change={(element)=> this.updateForm(element)}
                    />

                    <FormField
                        id={'lastname'}
                        formdata={this.state.formdata.lastname}
                        change={(element)=> this.updateForm(element)}
                    />

                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=> this.updateForm(element)}
                    />

                    <FormField
                        id={'sex'}
                        formdata={this.state.formdata.sex}
                        change={(element)=> this.updateForm(element)}
                    />

                    <h3>Opisz siebie</h3>
                    <FormField
                        id={'personaldescription'}
                        formdata={this.state.formdata.personaldescription}
                        change={(element)=> this.updateForm(element)}
                    />

                    <div className="line line-break"></div>

                    <div className="istrainer">
                        <h3>Czy jesteś trenerem/instruktorem?</h3>
                        <p className="label_inputs">Zaznacz poniższą opcję, jeżeli chcesz mieć możliwość dodawania ofert jako trener/instruktor i uzupełnij odpowiednie dane.</p>
                        <Checkbox
                            color="default"
                            onChange={()=>this.handleCheck()}
                            checked={this.state.checked}
                        />
                        <label>{this.state.formdata.role.config.label}</label>
                    </div>

                    <Collapse in={this.state.checked} timeout="auto" unmountOnExit>
                        <div className="trainer-info">
                            <FormField
                                id={'trainerinfo'}
                                formdata={this.state.formdata.trainerinfo}
                                change={(event)=> this.handleChange(event)}
                                categories={sports}
                                name={this.state.name}
                            />
                        </div>
                    </Collapse>



                    <div className="button-right">
                        {
                            this.state.formSuccess ?
                                <div className="form_success">
                                    Zaktualizowano informacje.
                                </div>
                                :null
                        }
                        { this.state.formError ?
                            <div className="error_label">
                                Coś poszło nie tak. Proszę, sprawdź swoje dane.
                            </div>
                            :null}
                        <button onClick={(event)=> this.submitForm(event)}>
                            Edytuj profil
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(UpdatePersonalInfo);
