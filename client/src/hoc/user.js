import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
    {
        name:'Panel administracyjny',
        linkTo:'/user/panel'
    },
    {
        name:'Edytuj profil',
        linkTo:'/user/profil'
    },
    {
        name:'Moje rezerwacje',
        linkTo:'/user/moje_rezerwacje'
    }
]

const admin = [
    {
        name:'Zarządzaj ogłoszeniami',
        linkTo:'/trener/ogloszenia'
    },
    {
        name:'Moje treningi',
        linkTo:'/trener/treningi'
    }
]

const UserLayout = (props) => {

    const generateLinks = (links) => (
        links.map((item,i)=>(
            <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
        ))
    )

    return (
        <div className="page_wrapper">
            <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                    { props.user.userData.isTrainer ?
                        <div>
                            <div className="line line-break" style={{width:'40%'}}></div>
                            <div className="links">
                                {generateLinks(admin)}
                            </div>
                        </div>
                        :null
                    }
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
            </div>
        </div>
    );
};

const  mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(UserLayout);
