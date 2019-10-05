import React, {Component} from 'react';
import AdvertsList from '../../Advert/Trainer/adverts_list';
import MyButton from "../../utils/button";

class TrainerAdverts extends Component {
    render() {
        return (
            <div>
                <h3>Moje ogłoszenia</h3>
                <AdvertsList
                    user={this.props.user}
                    limit='3'
                />
                <div style={{paddingTop:'60px'}}>
                    <MyButton
                        type="default"
                        altClass="button all_reservations"
                        title="Wszystkie ogłoszenia"
                        linkTo="/trener/ogloszenia"
                    />
                </div>

            </div>
        );
    }
}

export default TrainerAdverts;
