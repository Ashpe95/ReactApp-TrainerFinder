import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/user_actions';

class Header extends Component {

    state = {
        drawerOpen: false,
        headerShow: false,
        anchorEl: null,
        page:[
            {
                name:'Home',
                linkTo:'/',
                public:true
            }
        ],
        user:[
            {
                name:'Zarejestruj się',
                linkTo:'/rejestracja',
                public:true
            },
            {
                name:'Zaloguj',
                linkTo:'/logowanie',
                public:true
            },
            {
                name:'Konto',
                linkTo:'/user/panel',
                public:false
            },
            {
                name:'Wyloguj',
                linkTo:'/user/wyloguj',
                public:false
            }
        ]
    }

    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll);
    }

    handleScroll = () => {
        if(window.scrollY > 0) {
            this.setState({
                headerShow: true
            })
        }
        else {
            this.setState({
                headerShow: false
            })
        }
    }

    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response=>{
            if(response.payload.success){
                this.props.history.push('/');
            }
        })
    }

    defaultLink = (item,i) => (
        item.name === 'Wyloguj' ?
            <span className="log_out_link" key={i} onClick={()=>this.logoutHandler()}>
                {item.name}
            </span>
            :

            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
    )

    showLinks = (type) => {
        let list = [];

        if(this.props.user.userData){
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item);
                    }
                }
                else{
                    if(item.name !== 'Zaloguj' && item.name !== 'Zarejestruj się'){
                        list.push(item);
                    }
                }
            });
        }
        return list.map((item,i)=>{
            return this.defaultLink(item,i);
        })
    }

    render() {
        return (
            <header>
                <AppBar position="fixed" style={{background: this.state.headerShow ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.4)', boxShadow:'none', padding:'10px 0px'}}>
                    <Toolbar>
                        <div className="container">
                            <div className="left">
                                <div className="logo">
                                    <img src="/images/trainer-finder.svg" alt="logo"/>
                                </div>
                            </div>
                            <div className="right">
                                <div className="links">
                                    {this.showLinks(this.state.page)}
                                    {this.showLinks(this.state.user)}
                                </div>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

function mapStateToProps(state){
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));