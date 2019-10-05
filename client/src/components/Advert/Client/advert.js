import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { getUserByID } from "../../../actions/user_actions";
import MyButton from '../../utils/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt';

class Advert extends Component {

    state = {
        trainer:{
            name:'',
            lastname:'',
            avatar:''
        }
    }

    substringDescription () {
        let text = this.props.description;
        if(text.length>300){
            text = text.substring(0,300) + '...'
        }
        return text;
    }

    componentWillMount(){
        this.props.dispatch(getUserByID(this.props.trainer)).then(()=>{
            const newTrainer = {...this.state.trainer};
            newTrainer.name = this.props.user.userById.trainer.name;
            newTrainer.lastname = this.props.user.userById.trainer.lastname;
            let name = this.props.user.userById.trainer.name;
            name = name.substring(0,1);
            let lastname = this.props.user.userById.trainer.lastname;
            lastname = lastname.substring(0,1);
            let avatar = name + lastname;
            newTrainer.avatar = avatar;
            this.setState({
                trainer:newTrainer
            })
        });
    }

    render() {
        return (
            <div className="advert_client">
                <div className="advert_client_content">
                    <div className="first_col">
                        <Avatar className="big-avatar">{this.state.trainer.avatar}</Avatar>
                    </div>
                    <div className="second_col">
                        <div className="second-col-sport">
                            {this.props.sport} | {this.state.trainer.name} {this.state.trainer.lastname}
                        </div>
                        <div className="second-col-trainer">
                            <h3>{this.props.title}</h3>
                        </div>
                        <div className="second-col-price">
                            <span className="price-big">{this.props.priceperhour} zł </span>/ 60 minut
                        </div>
                        <div className="second-col-description">
                            {this.substringDescription()}
                        </div>
                        <div className="block-inline">
                            <div className="second-col-localization">
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    style={{paddingRight:'20px',color:'#9c9c9c',height:'1.3em',width:'auto'}}
                                />
                                {this.props.country}, {this.props.city}
                            </div>
                            <div className="second-col-readmore">
                                <MyButton
                                    type="default"
                                    title="Czytaj więcej..."
                                    altClass="button-simple"
                                    linkTo={`/ogloszenie/${this.props._id}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Advert);


