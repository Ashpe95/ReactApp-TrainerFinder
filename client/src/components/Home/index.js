import React, {Component} from 'react';
import AdvertsClient from '../Advert/Client';

class Home extends Component {

    render() {
        return (
            <div style={{height:'1000px'}}>
                <AdvertsClient/>
            </div>
        );
    }
}

export default Home;
