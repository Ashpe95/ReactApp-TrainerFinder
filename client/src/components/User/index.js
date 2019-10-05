import React from 'react';
import UserLayout from '../../hoc/user';
import UserInfo from './Dashboard/user_information';
import UserReservations from './Dashboard/user_reservations';
import TrainerReservations from './Dashboard/trainer_reservations';
import TrainerAdverts from './Dashboard/trainer_adverts';

const UserDashboard = ({user}) => {
    console.log('lalal');
    console.log(user.userData.isTrainer);
    return (
        <UserLayout>
            <div className="page-title">
                <h2>Panel administracyjny</h2>
            </div>
            <div className="site-content" style={{marginBottom:'40px'}}>
                <UserInfo
                    user={user}
                />
                <div className="line line-break" style={{marginBottom:'40px'}}></div>
                <UserReservations
                    user={user}
                />
                {
                    user.userData.isTrainer ?
                        <div>
                            <div className="line line-break" style={{marginBottom:'40px'}}></div>
                            <TrainerAdverts
                                user={user}
                            />
                            <div className="line line-break" style={{marginBottom:'40px'}}></div>
                            <TrainerReservations
                                user={user}
                            />
                        </div>

                    :null
                }
            </div>
        </UserLayout>
    );
};

export default UserDashboard;
