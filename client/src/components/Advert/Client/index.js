import React, {Component} from 'react';
import AdvertsListClient from './adverts_list_client';
import {sports, price} from "../../utils/Form/fixed_categories";
import { connect } from 'react-redux';
import { getAdvertsToClient } from "../../../actions/advert_actions";
import CollapseMultiSelect from '../../utils/collapse_multiselect';
import CollapseRadio from '../../utils/collapse_radio';

class AdvertsClient extends Component {

    state = {
        limit:10,
        skip:0,
        filters:{
            sport:[],
            priceperhour:[]
        }
    };

    componentDidMount(){
        this.props.dispatch(getAdvertsToClient(
            this.state.skip,
            this.state.limit,
            this.state.filters,
        ));
    }

    handlePrice = (value) => {
        const data = price;
        let array = [];
        for(let key in data){
            if(data[key]._id === parseInt(value,10)){
                array = data[key].array
            }
        }
        return array;
    };

    handleFilters = (filters,category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;
        if(category === "priceperhour"){
            let priceValues = this.handlePrice(filters);
            newFilters[category] = priceValues;
        }
        this.showFilteredResults(newFilters);
        this.setState({
            filters:newFilters
        })
    };

    showFilteredResults = (filters) => {
        this.props.dispatch(getAdvertsToClient(
            0,
            this.state.limit,
            filters
        )).then(()=>{
            this.setState({
                skip:0
            })
        })
    };

    loadMore = () => {
        let skip = this.state.skip + this.state.limit;
        this.props.dispatch(getAdvertsToClient(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.advert.advertsToClient
        )).then(()=>{
            this.setState({
                skip
            })
        })
    };

    render() {
        const adverts = this.props.advert;
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="user_container">
                        <div className="client_left_nav">
                            <h3>FILTRY</h3>
                            <CollapseMultiSelect
                                initState={false}
                                title="Sport"
                                list={sports}
                                handleFilters={(filters)=>this.handleFilters(filters,'sport')}
                            />
                            <CollapseRadio
                                initState={true}
                                title="Cena za godzinę"
                                list={price}
                                handleFilters={(filters)=>this.handleFilters(filters,'priceperhour')}
                            />
                        </div>
                        <div className="client_right">
                            <h2>ZNAJDŹ TRENERA</h2>
                            <AdvertsListClient
                                grid={this.state.grid}
                                limit={this.state.limit}
                                size={adverts.advertsToClientSize}
                                adverts={adverts.advertsToClient}
                                loadMore={()=>this.loadMore()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        advert:state.advert
    }
};

export default connect(mapStateToProps)(AdvertsClient);
