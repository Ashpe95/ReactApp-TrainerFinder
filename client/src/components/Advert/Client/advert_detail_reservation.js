import React, {Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {generateData, isFormValid, populateOptionFields, resetFields, update} from "../../utils/Form/formActions";
import FormField from '../../utils/Form/formfield';
import { WEEKDAYS, MONTHS } from "../../utils/Form/fixed_categories";
import {DateUtils} from "react-day-picker";
import { connect } from 'react-redux';
import {addReservation, clearReservation, getReservationsByDay} from "../../../actions/reservation_actions";
import Dialog from "@material-ui/core/Dialog";
import MyButton from "../../utils/button";

class AdvertDetailReservation extends Component {

    state = {
        formError: false,
        formSuccess: false,
        selectedDay:undefined,
        disabledDays:[],
        isEmpty: true,
        isDisabled: false,
        formdata: {
            day: {
                value: '',
                valid: true
            },
            month: {
                value: '',
                valid: true
            },
            year: {
                value: '',
                valid: true
            },
            advert: {
                value: '',
                valid: true
            },
            user: {
                value: '',
                valid: true
            },
            trainer: {
                value: '',
                valid: true
            },
            startHour: {
                element: 'select',
                value: '',
                config: {
                    label: 'Godzina rozpoczęcia',
                    name: 'start_hour_input',
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
            endHour: {
                value: '2',
                valid: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Komentarz',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Napisz kilka przydatnych informacji',
                    rows: 7
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            numberOfPeople: {
                element: 'input',
                value: '',
                config: {
                    label: 'Liczba osób',
                    name: 'number_of_people_input',
                    type: 'number',
                    placeholder: 'Liczba osób'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            price: {
                value: '',
                valid: true
            },
            status: {
                value: 0,
                valid: true
            }
        }
    }

    isDayDisabled = (day) => {
        return !this.state.disabledDays.some(disabledDay =>
            DateUtils.isSameDay(day, disabledDay)
        )
    }

    componentDidMount(){
        let array =[];

        this.props.advert.available.map((item)=>{
            let year = item.year;
            let month = item.month - 1;
            let day = item.day;

            const data = new Date(year,month,day);
            array.push(data);
        })

        this.setState({
            disabledDays:array
        })
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'add_reservation');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFieldHandler = () => {
        const newFormData = resetFields(this.state.formdata, 'add_reservation');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.dispatch(clearReservation())
            })
        }, 3000)
    }

    submitForm = (event) => {
        event.preventDefault();

        const newFormdata = {...this.state.formdata};

        newFormdata.day.value = this.state.selectedDay.getDate();
        newFormdata.month.value = this.state.selectedDay.getMonth() + 1;
        newFormdata.year.value = this.state.selectedDay.getFullYear();
        newFormdata.price.value = this.props.advert.priceperhour;
        newFormdata.advert.value = this.props.advert._id;
        newFormdata.user.value = this.props.user.userData._id;
        newFormdata.trainer.value = this.props.advert.trainer;

        let dataToSubmit = generateData(newFormdata, 'add_reservation');
        let formIsValid = isFormValid(newFormdata, 'add_reservation');

        if (formIsValid) {
            this.props.dispatch(addReservation(dataToSubmit)).then(response=> {
                if (response.payload.success) {
                    this.setState({
                        formError:false,
                        formSuccess:true
                    });
                } else {
                    this.setState({formError: true})
                }
            }).catch(e=>{
                this.setState({
                    formError:true
                })
            })
        } else {
            this.setState({
                formError: true
            })
        }
    }

    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        this.props.dispatch(getReservationsByDay(this.props.advert._id,selectedDay.getDate().toString(),(selectedDay.getMonth()+1).toString(),selectedDay.getFullYear().toString())).then(response=>{
            console.log(this.props.reservation.getReservationsByDay.reservationsByDay);
            const newFormData = populateOptionFields(this.state.formdata, this.props.reservation.getReservationsByDay.reservationsByDay, 'startHour');
            this.setState({
                formdata:newFormData
            })
        })
        const input = dayPickerInput.getInput();
        this.setState({
            selectedDay,
            isEmpty: !input.value.trim(),
            isDisabled: modifiers.disabled === true,
        });
    }

    render() {
        return (
            <div>
                <h3>Rezerwuj trening</h3>
                <form onSubmit={(event) => this.submitForm(event)}>


                    <div className="label_inputs">
                        Dzień
                    </div>
                    <div className="">
                        <DayPickerInput
                            value={this.state.selectedDay}
                            onDayChange={this.handleDayChange}
                            dayPickerProps={{
                                selectedDays: this.state.selectedDay,
                                firstDayOfWeek: 1,
                                weekdaysShort: WEEKDAYS,
                                months: MONTHS,
                                showOutsideDays: true,
                                disabledDays: this.isDayDisabled
                            }}
                        />
                    </div>

                    <FormField
                        id={'startHour'}
                        formdata={this.state.formdata.startHour}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'endHour'}
                        formdata={this.state.formdata.endHour}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'numberOfPeople'}
                        formdata={this.state.formdata.numberOfPeople}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'description'}
                        formdata={this.state.formdata.description}
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
                        {
                            this.props.user.userData.isAuth ?
                                <button onClick={(event) => this.submitForm(event)}>
                                    Rezerwuj
                                </button>
                            :
                                <h4>
                                    Rezerwacja tylko dla zalogowanych użytkowników
                                </h4>
                        }

                    </div>
                </form>

                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <h2>Gratulacje!</h2>
                        <div>
                            Rezerwacja lekcji przebiegła pomyślnie. Zaraz zostaniesz przeniesiony na stronę z listą Twoich rezerwacji.
                        </div>
                        <MyButton
                            type="default"
                            altClass="button"
                            title="OK"
                            linkTo="/user/moje_rezerwacje"
                            addStyles={{
                                margin:'10px 0 0 0'
                            }}
                        />
                    </div>
                </Dialog>

            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        user:state.user,
        reservation:state.reservation
    }
}
export default connect(mapStateToProps)(AdvertDetailReservation);
