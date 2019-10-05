import React from 'react';
import UserLayout from '../../hoc/user';
import UpdatePersonalInfo from './update_personal_info';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <div className="page-title">
                <h2>Edytuj profil</h2>
            </div>
            <UpdatePersonalInfo/>
        </UserLayout>
    );
};

export default UpdateProfile;
