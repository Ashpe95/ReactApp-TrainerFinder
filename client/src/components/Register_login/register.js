import React, {Component} from 'react';
import { connect } from 'react-redux';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import FormField from '../utils/Form/formfield';
import MyButton from '../utils/button';
import { registerUser } from "../../actions/user_actions";
import Dialog from '@material-ui/core/Dialog';

class Register extends Component {

    state = {
        formError: false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Imię'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            lastname: {
                element: 'input',
                value: '',
                config:{
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Nazwisko'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            email: {
                element: 'input',
                value: '',
                config:{
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
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Hasło'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config:{
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Potwierdź hasło'
                },
                validation:{
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'register');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'register');
        let formIsValid = isFormValid(this.state.formdata,'register');

        if(formIsValid){
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response=>{
                    if(response.payload.success){
                        this.setState({
                            formError:false,
                            formSuccess:true
                        });
                        setTimeout(()=>{
                            this.props.history.push('/logowanie');
                        },3000)

                    }
                    else{
                        this.setState({
                            formError:true
                        })
                    }
                }).catch(e=>{
                this.setState({
                    formError:true
                })
            })
        }
        else {
            this.setState({
                formError: true
            })
        }

    }

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login">
                        <form onSubmit={(event)=>this.submitForm(event)}>
                            <h2>Zarejestruj się przy użyciu swojego adresu e-mail</h2>
                            <div className="form_block_two">
                                <div className="block">
                                    <FormField
                                        id={'name'}
                                        formdata={this.state.formdata.name}
                                        change={(element)=> this.updateForm(element)}
                                    />
                                </div>
                                <div className="block">
                                    <FormField
                                        id={'lastname'}
                                        formdata={this.state.formdata.lastname}
                                        change={(element)=> this.updateForm(element)}
                                    />
                                </div>
                            </div>
                            <div>
                                <FormField
                                    id={'email'}
                                    formdata={this.state.formdata.email}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </div>
                            <div className="form_block_two">
                                <div className="block">
                                    <FormField
                                        id={'password'}
                                        formdata={this.state.formdata.password}
                                        change={(element)=> this.updateForm(element)}
                                    />
                                </div>
                                <div className="block">
                                    <FormField
                                        id={'confirmPassword'}
                                        formdata={this.state.formdata.confirmPassword}
                                        change={(element)=> this.updateForm(element)}
                                    />
                                </div>
                            </div>
                            <div>
                                { this.state.formError ?
                                    <div className="error_label">
                                        Please check your data
                                    </div>
                                    :null}
                                <button onClick={(event)=> this.submitForm(event)}>
                                    Zarejestruj się
                                </button>
                            </div>
                        </form>
                        <div className="line"></div>
                        <div className="">
                            <p>Masz już konto?</p>
                                <MyButton
                                    type="default"
                                    title="Zaloguj się"
                                    linkTo="/logowanie"
                                    addStyles={{
                                        margin:'10px 0 0 0'
                                    }}
                                />

                        </div>
                    </div>
                </div>

                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <h2>Gratulacje!</h2>
                        <div>
                            Za chwilę zostaniesz przeniesiony na stronę logowania...
                        </div>
                    </div>
                </Dialog>

            </div>
        );
    }
}

export default connect()(Register);
