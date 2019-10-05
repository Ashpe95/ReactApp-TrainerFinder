import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getReservationsByClient} from "../../../actions/reservation_actions";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MyButton from "../../utils/button";

class ClientReservationsList extends Component {

    componentDidMount(){
        this.props.dispatch(getReservationsByClient(this.props.user.userData._id,this.props.limit))
    }

    showReservationsByClient = (reservations) => (

        reservations ?
            reservations.reservations.map((reservation,i)=>(
                // console.log('hihi')
                <TableRow key={i}>
                    <TableCell>
                        <MyButton
                            type="default"
                            altClass="advert_title"
                            title={reservation.advert.title}
                            linkTo={`/ogloszenie/${reservation.advert._id}`}
                        />
                    </TableCell>
                    <TableCell>
                        {reservation.day}-
                        {reservation.month<=9 ?
                            '0'+reservation.month
                            :reservation.month
                        }
                        -{reservation.year}
                    </TableCell>
                    <TableCell>{reservation.startHour}:00 - {parseInt(reservation.startHour)+1}:00</TableCell>
                    <TableCell>{reservation.price} zł</TableCell>
                    <TableCell>{reservation.numberOfPeople}</TableCell>
                </TableRow>
            ))
            :null
    )

    render() {
        console.log(this.props.reservation.getReservationsByClient)
        return (
            <div className="">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ogłoszenie</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Godzina</TableCell>
                            <TableCell>Cena</TableCell>
                            <TableCell>Liczba osób</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.showReservationsByClient(this.props.reservation.getReservationsByClient)}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        reservation:state.reservation
    }
}

export default connect(mapStateToProps)(ClientReservationsList);
