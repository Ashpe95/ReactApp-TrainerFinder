import React from 'react';
import { Link } from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const MyButton = (props) => {

    const buttons = () => {
        let template = '';
        switch(props.type){

            case "default":
                template = <Link
                    className={!props.altClass ? 'link_default' : props.altClass}
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>
                break;

            case "icon":
                template = <Link
                    className={!props.altClass ? 'link_default' : props.altClass}
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    <FontAwesomeIcon icon={props.icon} />
                </Link>
                break;

            default:
                template='';
        }

        return template;
    }

    return(
        <div className="my_link">
            {buttons()}
        </div>
    )
}

export default MyButton;