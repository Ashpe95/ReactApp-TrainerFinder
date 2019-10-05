import React, {Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { WEEKDAYS, MONTHS } from "../../utils/Form/fixed_categories";
const today = new Date();

class AdvertDetailAvailable extends Component {


    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            disabledDays: [],
            selectedDay: null
        };
        this.isDayDisabled = this.isDayDisabled.bind(this)
    }

    isDayDisabled(day) {
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

    handleDayClick(day, { selected }) {
        this.setState({
            selectedDay: selected ? undefined : day,
        });
    }

    render() {
        return (
            <div className="advert-detail-available">
                <h3>Dostępność</h3>
                <DayPicker
                    showOutsideDays
                    numberOfMonths={2}
                    weekdaysShort={WEEKDAYS}
                    months={MONTHS}
                    firstDayOfWeek={1}
                    disabledDays={this.isDayDisabled}
                />
            </div>
        );
    }
}

export default AdvertDetailAvailable;
