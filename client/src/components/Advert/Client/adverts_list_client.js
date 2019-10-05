import React from 'react';
import AdvertBlock from './advert_block';

const AdvertsListClient = (props) => {
    return (
        <div>
            <div>
                <AdvertBlock
                    grid={props.grid}
                    list={props.adverts}
                />
            </div>
            {
                props.size > 0 && props.size >= props.limit ?
                    <div className="load_more_container">
                        <button onClick={()=>props.loadMore()}>
                            Więcej...
                        </button>
                    </div>
                    :null
            }
        </div>
    );
};

export default AdvertsListClient;