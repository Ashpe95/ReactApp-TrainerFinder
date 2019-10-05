import React from 'react';
import Advert from './advert';

const AdvertBlock = (props) => {

    const renderCards = () => (
        props.list ?
            props.list.map(advert=>(
                <Advert
                    key={advert._id}
                    {...advert}
                    grid={props.grid}
                />
            ))
            :null
    )

    return (
        <div className="advert_block">
            {props.list ?
                props.list.length === 0 ?
                    <div className="no_result">
                        Brak wyników
                    </div>
                    :null
                :null}
            {renderCards(props.list)}
        </div>
    );
};

export default AdvertBlock;
