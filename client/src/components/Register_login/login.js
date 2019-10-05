import React, {Component} from 'react';
import { connect } from 'react-redux';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import FormField from '../utils/Form/formfield';
import MyButton from '../utils/button';
import { loginUser } from '../../actions/user_actions';
import { withRouter } from 'react-router-dom';

class Login extends Component {

    state = {
        formError: false,
        formSuccess:'',
        formdata:{
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
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata,'login');
        let formIsValid = isFormValid(this.state.formdata,'login');

        if(formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(response=>{
                if(response.payload.loginSuccess){
                    console.log(response.payload);
                    this.props.history.push('/user/panel')
                }
                else{
                    this.setState({
                        formError:true
                    })
                }
            });
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
                            <h2>Zaloguj się przy użyciu swojego adresu e-mail</h2>

                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'password'}
                                formdata={this.state.formdata.password}
                                change={(element)=> this.updateForm(element)}
                            />

                            <div>
                                { this.state.formError ?
                                    <div className="error_label">
                                        Błędne dane logowania
                                    </div>
                                    :null}
                                <button onClick={(event)=> this.submitForm(event)}>
                                    Zaloguj się
                                </button>
                            </div>
                        </form>
                        <div className="line"></div>
                        <div className="">
                            <p>Nie masz konta?</p>
                            <MyButton
                                type="default"
                                title="Zarejestruj się"
                                linkTo="/rejestracja"
                                addStyles={{
                                    margin:'10px 0 0 0'
                                }}
                            />

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect()(withRouter(Login));
