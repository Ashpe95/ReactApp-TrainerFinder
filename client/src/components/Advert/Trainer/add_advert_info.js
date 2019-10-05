import React, {Component} from 'react';
import FormField from '../../utils/Form/formfield';
import {connect} from 'react-redux';
import {update, generateData, isFormValid, resetFields, populateOptionFields} from '../../utils/Form/formActions';

import {addAdvert, clearAdvert} from "../../../actions/advert_actions";

class AddAdvertInfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            title: {
                element: 'input',
                value: '',
                config: {
                    label: 'Tytuł ogłoszenia',
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Tytuł'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            trainer: {
                value: '',
                valid: true
            },
            sport: {
                element: 'select',
                value: '',
                config: {
                    label: 'Sport',
                    name: 'sports_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Informacje',
                    name: 'advert_description_input',
                    type: 'text',
                    placeholder: 'Napisz kilka przydatnych informacji na temat szkoleń',
                    rows: 7
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false
            },
            priceperhour: {
                element: 'input',
                value: '',
                config: {
                    label: 'Cena za godzinę',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Cena'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            country: {
                element: 'input',
                value: '',
                config: {
                    label: 'Kraj',
                    name: 'country_input',
                    type: 'text',
                    placeholder: 'Kraj'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            city: {
                element: 'input',
                value: '',
                config: {
                    label: 'Miasto',
                    name: 'city_input',
                    type: 'text',
                    placeholder: 'Miasto'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Opublikowane',
                    name: 'publish_input',
                    options: [
                        {key: true, value: 'Opublikowane'},
                        {key: false, value: 'Schowane'},
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
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'add_advert');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    componentDidMount() {
        const newFormData = populateOptionFields(this.state.formdata, this.props.user.trainerinfo, 'sport');
        this.updateFields(newFormData);
    }

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        })
    }

    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formdata, 'add_advert');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.dispatch(clearAdvert())
            })
        }, 3000)
    }


    submitForm = (event) => {
        event.preventDefault();
        const newFormData = this.state.formdata;
        newFormData.trainer.value = this.props.user._id;
        this.setState({
            formdata: newFormData
        })
        let dataToSubmit = generateData(this.state.formdata, 'add_advert');
        let formIsValid = isFormValid(this.state.formdata, 'add_advert');
        if (formIsValid) {
            this.props.dispatch(addAdvert(dataToSubmit)).then(() => {
                if (this.props.advert.addAdvert.success) {
                    this.resetFieldHandler();
                } else {
                    this.setState({formError: true})
                }
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }


    render() {
        return (
            <div className="site-content">
                <form onSubmit={(event) => this.submitForm(event)}>

                    <h3>Podstawowe informacje</h3>
                    <FormField
                        id={'title'}
                        formdata={this.state.formdata.title}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'sport'}
                        formdata={this.state.formdata.sport}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'priceperhour'}
                        formdata={this.state.formdata.priceperhour}
                        change={(element) => this.updateForm(element)}
                    />

                    <h3>Informacje</h3>
                    <FormField
                        id={'description'}
                        formdata={this.state.formdata.description}
                        change={(element) => this.updateForm(element)}
                    />

                    <h3>Lokalizacja</h3>
                    <FormField
                        id={'country'}
                        formdata={this.state.formdata.country}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'city'}
                        formdata={this.state.formdata.city}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'publish'}
                        formdata={this.state.formdata.publish}
                        change={(element) => this.updateForm(element)}
                    />


                    <div className="button-right">
                        {
                            this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                                </div>
                                : null
                        }
                        {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                            </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Dodaj ogłoszenie
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        advert:state.advert
    }
}

export default connect(mapStateToProps)(AddAdvertInfo);
