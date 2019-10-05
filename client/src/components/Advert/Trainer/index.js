import React, {Component} from 'react';
import UserLayout from '../../../hoc/user';
import AdvertsList from './adverts_list';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import MyButton from '../../utils/button';
import { clearAdvert } from "../../../actions/advert_actions";

class AdvertAdmin extends Component {

    componentWillUnmount(){
        this.props.dispatch(clearAdvert());
    }

    render() {
        return (
            <UserLayout>
                <div className="page-title">
                    <h2>Ogłoszenia</h2>
                </div>
                <div className="site-content">
                    <div>
                        <h3 style={{float:'left'}}>Lista ogłoszeń</h3>
                        <MyButton
                            type="icon"
                            altClass="button-icon"
                            icon={faPlus}
                            linkTo="/trener/dodaj_ogloszenie"
                        />
                    </div>
                    <AdvertsList
                        user={this.props.user}
                    />
                </div>
            </UserLayout>
        );
    }
}

export default AdvertAdmin;
