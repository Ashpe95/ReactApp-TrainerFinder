import React, {Component} from 'react';
import {getUserByID} from "../../../actions/user_actions";
import {connect} from "react-redux";

class AdvertDetailInfo extends Component {

    componentDidMount() {
        this.props.dispatch(getUserByID(this.props.advert.trainer));
    }

    render() {
        return (
            <div>
                {
                    this.props.user.userById ?
                        <div>
                            <div className="advert-detail-title">
                                <h2>{this.props.advert.title}</h2>
                            </div>
                            <div className="advert-detail-priceperhour second-col-price">
                                <span className="price-big">{this.props.advert.priceperhour} zł </span>/ 60 minut
                            </div>
                            <div className="line"></div>
                            <div className="advert-detail-trainer-sport">
                                <p>{this.props.advert.sport} | {this.props.user.userById.trainer.name} {this.props.user.userById.trainer.lastname}</p>
                            </div>

                            <div className="advert-detail-localization">
                                <p>{this.props.advert.country}, {this.props.advert.city}</p>
                            </div>
                            <div className="advert-detail-description">
                                {this.props.advert.description}
                            </div>
                            <div className="line"></div>
                        </div>
                :null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(AdvertDetailInfo);
