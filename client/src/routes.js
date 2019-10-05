import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/Home';
import AdvertDetail from './components/Advert/Client/advert_detail';
import Login from './components/Register_login/login';
import Register from './components/Register_login/register';

import UserDashboard from './components/User';
import UpdateProfile from './components/User/update_profile';
import ClientReservations from './components/Reservations/Client';
import TrainerTraining from './components/Reservations/Trainer';

import AdvertAdmin from './components/Advert/Trainer';
import AddAdvert from './components/Advert/Trainer/add_advert';
import EditAdvert from './components/Advert/Trainer/edit_advert';
import AddAvailable from './components/Advert/Trainer/add_available';

const Routes = () => {
    return(
        <Layout>
            <Switch>
                <Route path="/user/panel" exact component={Auth(UserDashboard,true)}/>
                <Route path="/user/profil" exact component={Auth(UpdateProfile,true)}/>
                <Route path="/trener/ogloszenia" exact component={Auth(AdvertAdmin,true)}/>
                <Route path="/trener/dodaj_ogloszenie" exact component={Auth(AddAdvert,true)}/>
                <Route path="/trener/edytuj_ogloszenie/:id" exact component={Auth(EditAdvert,true)}/>
                <Route path="/trener/edytuj_dyspozycyjnosc/:id" exact component={Auth(AddAvailable,true)}/>
                <Route path="/user/moje_rezerwacje" exact component={Auth(ClientReservations,true)}/>
                <Route path="/trener/treningi" exact component={Auth(TrainerTraining,true)}/>

                <Route path="/rejestracja" exact component={Auth(Register,false)}/>
                <Route path="/logowanie" exact component={Auth(Login,false)}/>

                <Route path="/" exact component={Auth(Home,null)}/>
                <Route path="/ogloszenie/:id" exact component={Auth(AdvertDetail,null)}/>
            </Switch>
        </Layout>
    )
}

export default Routes;
