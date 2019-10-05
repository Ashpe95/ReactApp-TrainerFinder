import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getAdvertsByTrainer } from "../../../actions/advert_actions";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MyButton from "../../utils/button";
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt';

class AdvertsList extends Component {

    componentDidMount(){
        this.props.dispatch(getAdvertsByTrainer(this.props.user.userData._id))
    }

    showAdvertsByTrainer = (adverts) => (
        adverts ?
            adverts.adverts.map((advert,i)=>(
                <TableRow key={i}>
                    <TableCell>{advert.title}</TableCell>
                    <TableCell>{advert.sport}</TableCell>
                    <TableCell>{advert.priceperhour}</TableCell>
                    <TableCell  align="right">
                        <MyButton
                            type="icon"
                            altClass="button-simple"
                            icon={faCalendarAlt}
                            linkTo={`/trener/edytuj_dyspozycyjnosc/${advert._id}`}
                        />
                        <MyButton
                            type="icon"
                            altClass="button-simple"
                            icon={faPencilAlt}
                            linkTo={`/trener/edytuj_ogloszenie/${advert._id}`}
                        />

                    </TableCell>
                </TableRow>
            ))
            :null
    )

    render() {
        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tytuł</TableCell>
                            <TableCell>Sport</TableCell>
                            <TableCell>zł/h</TableCell>
                            <TableCell align="right">Edytuj/dyspozycyjność</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.showAdvertsByTrainer(this.props.advert.advertsByTrainer)}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        advert:state.advert
    }
}

export default connect(mapStateToProps)(AdvertsList);
