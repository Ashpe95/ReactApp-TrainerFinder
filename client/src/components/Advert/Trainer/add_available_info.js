import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { addAvailableToAdvert } from "../../../actions/advert_actions";
import { connect } from 'react-redux';

const WEEKDAYS = ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So'];
const MONTHS = [ 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'];
const today = new Date();

class AddAvailableInfo extends Component {

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDays: []
        };
    }

    componentDidMount(){
        let array =[];

        this.props.advert.advertById.available.map((item)=>{
            let year = item.year;
            let month = item.month - 1;
            let day = item.day;

            const data = new Date(year,month,day);
            array.push(data);
        })

        this.setState({
            selectedDays:array
        })
    }

    handleDayClick(day, { selected }) {
        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays });
    }

    submitForm = (event) => {
        event.preventDefault();

        let daysToSubmit = [];

        this.state.selectedDays.forEach(item=>{
            daysToSubmit.push(
                {
                    year:item.getFullYear(),
                    month:item.getMonth() + 1,
                    day:item.getDate()
                }
            );
        })

        this.props.dispatch(addAvailableToAdvert(this.props.id,daysToSubmit));
    }

    render() {
        return (
            <div className="site-content">
                <div className="available-text">
                    Określ w jakich dniach jesteś dostępny.
                </div>
                {
                    this.props.advert.advertById ?
                        <div>
                            <div>
                                <DayPicker
                                    numberOfMonths={2}
                                    showOutsideDays
                                    selectedDays={this.state.selectedDays}
                                    onDayClick={this.handleDayClick}
                                    weekdaysShort={WEEKDAYS}
                                    months={MONTHS}
                                    firstDayOfWeek={1}
                                    disabledDays={{ before: today }}
                                />
                            </div>
                            <button onClick={(event) => this.submitForm(event)}>
                                OK
                            </button>
                        </div>
                    :null
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        advert:state.advert
    }
}

export default connect(mapStateToProps)(AddAvailableInfo);
