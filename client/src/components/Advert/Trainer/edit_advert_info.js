import React, {Component} from 'react';
import FormField from '../../utils/Form/formfield';
import { connect } from 'react-redux';
import { getAdvertById, updateAdvert, clearAdvert } from "../../../actions/advert_actions";
import { update, generateData, isFormValid, populateFields, populateOptionFields } from '../../utils/Form/formActions';

class EditAdvertInfo extends Component {

    state = {
        formError: false,
        formSuccess:false,
        name:[],
        formdata:{
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
            advertId: {
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
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element,this.state.formdata,'update_advert');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm= (event) =>{
        event.preventDefault();

        let newFormdata = {...this.state.formdata};
        newFormdata.advertId.value = this.props.id;
        this.setState({
            formdata: newFormdata
        })

        let dataToSubmit = generateData(this.state.formdata,'update_advert');
        let formIsValid = isFormValid(this.state.formdata,'update_advert');

        if(formIsValid){
            this.props.dispatch(updateAdvert(dataToSubmit)).then(()=>{
                if(this.props.advert.updateAdvert.success){
                    this.setState({
                        formSuccess:true
                    },()=>{
                        setTimeout(()=>{
                            this.props.dispatch(clearAdvert());
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
        const newFormData = populateOptionFields(this.state.formdata, this.props.user.userData.trainerinfo, 'sport');
        this.updateFields(newFormData);
    }

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        })
    }

    componentDidMount(){
        const id = this.props.id;
        this.props.dispatch(getAdvertById(id)).then(response=>{
            const newFormData = populateFields(this.state.formdata,this.props.advert.advertById);
            this.updateFields(newFormData);
        });
    }

    render() {
        return (
            <div className="site-content">
                <form onSubmit={(event)=>this.submitForm(event)}>

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
                                :null
                        }
                        { this.state.formError ?
                            <div className="error_label">
                                Please check your data
                            </div>
                            :null}
                        <button onClick={(event)=> this.submitForm(event)}>
                            Edytuj ogłoszenie
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        advert:state.advert,
        user:state.user
    }
}

export default connect(mapStateToProps)(EditAdvertInfo);
