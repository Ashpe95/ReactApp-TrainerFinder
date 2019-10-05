import React, {Component} from 'react';
import TrainerTrainingList from "../../Reservations/Trainer/trainer_training_list";
import MyButton from "../../utils/button";

class TrainerReservations extends Component {
    render() {
        return (
            <div>
                <h3>Ostatnio dodane treningi</h3>
                <TrainerTrainingList
                    user={this.props.user}
                    limit='3'
                />
                <div style={{paddingTop:'60px'}}>
                    <MyButton
                        type="default"
                        altClass="button all_reservations"
                        title="Wszystkie treningi"
                        linkTo="/trener/treningi"
                    />
                </div>

            </div>
        );
    }
}

export default TrainerReservations;
