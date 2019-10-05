import React from 'react';
import UserLayout from '../../../hoc/user';
import EditAdvertInfo from './edit_advert_info';

const AddAdvert = (props) => {

    return (
        <UserLayout>
            <div className="page-title">
                <h2>Edytuj ogłoszenie</h2>
            </div>
            <EditAdvertInfo
                id={props.match.params.id}
            />
        </UserLayout>
    );
};

export default AddAdvert;