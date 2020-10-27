import React from 'react';
import './Alert.css';

function ShowAlert(props){
    return (
        <div className={"alert alert--" + props.type } >
            {props.msg}
        </div>
    )
}
export default ShowAlert;
