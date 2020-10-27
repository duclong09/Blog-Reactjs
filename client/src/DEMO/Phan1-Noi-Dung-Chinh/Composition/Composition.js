import React from 'react';
import './Composition.css';

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}


function Compositon() {
    return (
        <div className="wrap-box">
            <FancyBorder color="blue">
                <h1 className="Dialog-title">Demo Composition 1</h1>
                <p className="Dialog-message"> by Tran Cong Hoa</p>
            </FancyBorder>

            <FancyBorder color="red">
                <h1 className="Dialog-title"> Demo Composition 2 </h1>
                <p className="Dialog-message">by Tran Cong Hoa </p>
            </FancyBorder>
        </div>
    );
}
export default Compositon;