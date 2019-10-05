import React from 'react';
import MyButton from '../../utils/button';

const UserInfo = ({user}) => {
    return (
        <div>
            <h3>Konto</h3>
            <div className="user-info">
                <p>{user.userData.name} {user.userData.lastname}</p>
                <p>{user.userData.email}</p>
            </div>

            <MyButton
                type="default"
                altClass="button"
                title="Edytuj profil"
                linkTo="/user/profil"
            />
        </div>
    );
};

export default UserInfo;
