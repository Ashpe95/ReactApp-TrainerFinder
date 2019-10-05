import React, {Component} from 'react';
import ClientReservationsList from "../../Reservations/Client/client_reservations_list";
import MyButton from "../../utils/button";

class UserReservations extends Component {
    render() {
        return (
            <div>
                <h3>Ostatnie rezerwacje</h3>
                <ClientReservationsList
                    user={this.props.user}
                    limit='3'
                />
                <div style={{paddingTop:'60px'}}>
                    <MyButton
                        type="default"
                        altClass="button all_reservations"
                        title="Wszystkie rezerwacje"
                        linkTo="/user/moje_rezerwacje"
                    />
                </div>

            </div>
        );
    }
}

export default UserReservations;
