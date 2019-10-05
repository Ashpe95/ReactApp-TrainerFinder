import React, {Component} from 'react';
import AdvertDetailInfo from './advert_detail_info';
import AdvertDetailAvailable from './advert_detail_available';
import AdvertDetailReservation from './advert_detail_reservation';
import { getAdvertById, clearAdvertById } from "../../../actions/advert_actions";
import { connect } from 'react-redux';

class AdvertDetail extends Component {

    componentDidMount(){
        this.props.dispatch(getAdvertById(this.props.match.params.id));
    }

    componentWillUnmount(){
        this.props.dispatch(clearAdvertById());
    }

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    {
                        this.props.advert.advertById ?
                            <div>
                                <div className="advert-detail">
                                    <div className="advert-detail-left">
                                        <AdvertDetailInfo
                                            advert={this.props.advert.advertById}
                                        />
                                        <AdvertDetailAvailable
                                            advert={this.props.advert.advertById}
                                        />
                                    </div>
                                    < div className="advert-detail-right">
                                        <AdvertDetailReservation
                                            advert={this.props.advert.advertById}
                                        />
                                    </div>
                                </div>
                            </div>
                        :null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        advert:state.advert
    }
}

export default connect(mapStateToProps)(AdvertDetail);
