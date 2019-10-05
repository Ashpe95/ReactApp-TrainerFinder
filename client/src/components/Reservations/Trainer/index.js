import React, {Component} from 'react';
import UserLayout from "../../../hoc/user";
import {connect} from "react-redux";
import TrainerTrainingList from './trainer_training_list';

class TrainerTraining extends Component {
    render() {
        return (
            <UserLayout>
                <div className="page-title">
                    <h2>Moje treningi</h2>
                </div>
                <div className="site-content">
                    <TrainerTrainingList
                        user={this.props.user}
                    />
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(TrainerTraining);
