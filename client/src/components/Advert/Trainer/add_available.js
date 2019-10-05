import React, {Component} from 'react';
import UserLayout from '../../../hoc/user';
import AddAvailableInfo from './add_available_info';
import { getAdvertById, clearAdvertById } from "../../../actions/advert_actions";
import { connect } from 'react-redux';

class AddAvailable extends Component {

    componentWillMount(){
        this.props.dispatch(getAdvertById(this.props.match.params.id));
    }

    componentWillUnmount(){
        this.props.dispatch(clearAdvertById());
    }

    render(){
        return (
            <UserLayout>
                <div className="page-title">
                    <h2>Dyspozycyjność</h2>
                </div>
                { this.props.advert.advertById ?
                    <AddAvailableInfo
                        id={this.props.match.params.id}
                        advert={this.props.advert.advertById}
                    />
                :null}
            </UserLayout>
        );
    }
};

const mapStateToProps = (state) => {
    return{
        advert:state.advert
    }
}

export default connect(mapStateToProps)(AddAvailable);