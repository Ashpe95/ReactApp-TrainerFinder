import React from 'react';
import UserLayout from '../../../hoc/user';
import AddAdvertInfo from './add_advert_info';
import {connect} from "react-redux";

const AddAdvert = (props) => {
    return (
        <UserLayout>
            <div className="page-title">
                <h2>Dodaj ogłoszenie</h2>
            </div>
            <AddAdvertInfo
                user={props.user.userData}
            />
        </UserLayout>
    );
};

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(AddAdvert);