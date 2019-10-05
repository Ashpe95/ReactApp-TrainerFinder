import React, {Component} from 'react';
import UserLayout from "../../../hoc/user";
import {connect} from "react-redux";
import ClientReservationsList from './client_reservations_list';

class ClientReservations extends Component {
    render() {
        return (
            <UserLayout>
                <div className="page-title">
                    <h2>Moje rezerwacje</h2>
                </div>
                <div className="site-content">
                    <ClientReservationsList
                         user={this.props.user}
                    />
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(ClientReservations);
